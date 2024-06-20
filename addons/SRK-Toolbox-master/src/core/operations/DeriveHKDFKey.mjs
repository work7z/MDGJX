/**
 * @author mikecat
 * @copyright Crown Copyright 2023
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";
import OperationError from "../errors/OperationError.mjs";
import CryptoApi from "crypto-api/src/crypto-api.mjs";

/**
 * Derive HKDF Key operation
 */
class DeriveHKDFKey extends Operation {

    /**
     * DeriveHKDFKey constructor
     */
    constructor() {
        super();

        this.name = "派生HKDF密钥";
        this.module = "Crypto";
        this.description = "一个简单的基于Hashed Message Authenticaton Code (HMAC)的密钥派生算法(HKDF)。定义于RFC5869。";
        this.infoURL = "https://wikipedia.org/wiki/HKDF";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                "name": "盐",
                "type": "toggleString",
                "value": "",
                "toggleValues": ["十六进制", "十进制", "Base64", "UTF8", "Latin1"]
            },
            {
                "name": "信息",
                "type": "toggleString",
                "value": "",
                "toggleValues": ["十六进制", "十进制", "Base64", "UTF8", "Latin1"]
            },
            {
                "name": "哈希函数",
                "type": "option",
                "value": [
                    "MD2",
                    "MD4",
                    "MD5",
                    "SHA0",
                    "SHA1",
                    "SHA224",
                    "SHA256",
                    "SHA384",
                    "SHA512",
                    "SHA512/224",
                    "SHA512/256",
                    "RIPEMD128",
                    "RIPEMD160",
                    "RIPEMD256",
                    "RIPEMD320",
                    "HAS160",
                    "Whirlpool",
                    "Whirlpool-0",
                    "Whirlpool-T",
                    "Snefru"
                ],
                "defaultIndex": 6
            },
            {
                "name": "提取模式",
                "type": "argSelector",
                "value": [
                    {
                        "name": "加盐",
                        "on": [0]
                    },
                    {
                        "name": "不加盐",
                        "off": [0]
                    },
                    {
                        "name": "跳过",
                        "off": [0]
                    }
                ]
            },
            {
                "name": "L (输出的八比特组数)",
                "type": "number",
                "value": 16,
                "min": 0
            },
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {ArrayBuffer}
     */
    run(input, args) {
        const argSalt = Utils.convertToByteString(args[0].string || "", args[0].option),
            info = Utils.convertToByteString(args[1].string || "", args[1].option),
            hashFunc = args[2].toLowerCase(),
            extractMode = args[3],
            L = args[4],
            IKM = Utils.arrayBufferToStr(input, false),
            hasher = CryptoApi.getHasher(hashFunc),
            HashLen = hasher.finalize().length;

        if (L < 0) {
            throw new OperationError("L不能是负数");
        }
        if (L > 255 * HashLen) {
            throw new OperationError("L的值太大（对于" + args[2] + "的最大长度是" + (255 * HashLen) + "）");
        }

        const hmacHash = function(key, data) {
            hasher.reset();
            const mac = CryptoApi.getHmac(key, hasher);
            mac.update(data);
            return mac.finalize();
        };
        const salt = extractMode === "加盐" ? argSalt : "\0".repeat(HashLen);
        const PRK = extractMode === "跳过" ? IKM : hmacHash(salt, IKM);
        let T = "";
        let result = "";
        for (let i = 1; i <= 255 && result.length < L; i++) {
            const TNext = hmacHash(PRK, T + info + String.fromCharCode(i));
            result += TNext;
            T = TNext;
        }
        return CryptoApi.encoder.toHex(result.substring(0, L));
    }

}

export default DeriveHKDFKey;
