/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";
import CryptoApi from "crypto-api/src/crypto-api.mjs";

/**
 * HMAC operation
 */
class HMAC extends Operation {

    /**
     * HMAC constructor
     */
    constructor() {
        super();

        this.name = "HMAC";
        this.module = "Crypto";
        this.description = "HMAC (有时扩展为 英语：keyed-hash message authentication code, 密钥散列消息认证码, 或 英语：hash-based message authentication code，散列消息认证码），是一种通过特别计算方式之后产生的消息认证码（MAC），使用密码散列函数，同时结合一个加密密钥。它可以用来保证资料的完整性，同时可以用来作某个消息的身份验证。";
        this.infoURL = "https://wikipedia.org/wiki/HMAC";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                "name": "Key",
                "type": "toggleString",
                "value": "",
                "toggleValues": ["十六进制", "十进制", "Base64", "UTF8", "Latin1"]
            },
            {
                "name": "哈希算法",
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
                ]
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const key = Utils.convertToByteString(args[0].string || "", args[0].option),
            hashFunc = args[1].toLowerCase(),
            msg = Utils.arrayBufferToStr(input, false),
            hasher = CryptoApi.getHasher(hashFunc);

        const mac = CryptoApi.getHmac(key, hasher);
        mac.update(msg);
        return CryptoApi.encoder.toHex(mac.finalize());
    }

}

export default HMAC;
