/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2023
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import Utils from "../Utils.mjs";
import { toHexFast, fromHex } from "../lib/Hex.mjs";
import { CryptoGost, GostEngine } from "@wavesenterprise/crypto-gost-js/index.js";

/**
 * GOST Decrypt operation
 */
class GOSTDecrypt extends Operation {

    /**
     * GOSTDecrypt constructor
     */
    constructor() {
        super();

        this.name = "GOST解密";
        this.module = "Ciphers";
        this.description = "GOST块密码（Magma）是苏联和俄罗斯政府标准的对称密钥块密码，块大小为64位，定义在标准GOST 28147-89（RFC 5830）中。最初的标准于1989年发布，未为密码命名，但最新修订的标准GOST R 34.12-2015（RFC 7801，RFC 8891）指定它可以被称为Magma。GOST哈希函数基于该密码。新标准还指定了一个名为Kuznyechik的新的128位块密码。<br><br>该标准在1970年代开发，曾被标记为“绝密”，1990年降级为“机密”。苏联解体后不久，该标准被解密，并在1994年向公众发布。GOST 28147是苏联替代美国标准算法DES的选择，因此两者在结构上非常相似。";
        this.infoURL = "https://wikipedia.org/wiki/GOST_(block_cipher)";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                name: "Key",
                type: "toggleString",
                value: "",
                toggleValues: ["十六进制", "UTF8", "Latin1", "Base64"]
            },
            {
                name: "IV",
                type: "toggleString",
                value: "",
                toggleValues: ["十六进制", "UTF8", "Latin1", "Base64"]
            },
            {
                name: "输入类型",
                type: "option",
                value: ["十六进制", "原始字节"]
            },
            {
                name: "输出类型",
                type: "option",
                value: ["原始字节", "十六进制"]
            },
            {
                name: "算法",
                type: "argSelector",
                value: [
                    {
                        name: "GOST 28147 (Magma, 1989)",
                        off: [5],
                        on: [6]
                    },
                    {
                        name: "GOST R 34.12 (Kuznyechik, 2015)",
                        on: [5],
                        off: [6]
                    }
                ]
            },
            {
                name: "块长度",
                type: "option",
                value: ["64", "128"]
            },
            {
                name: "sBox",
                type: "option",
                value: ["E-TEST", "E-A", "E-B", "E-C", "E-D", "E-SC", "E-Z", "D-TEST", "D-A", "D-SC"]
            },
            {
                name: "块模式",
                type: "option",
                value: ["ECB", "CFB", "OFB", "CTR", "CBC"]
            },
            {
                name: "Key meshing模式",
                type: "option",
                value: ["NO", "CP"]
            },
            {
                name: "填充",
                type: "option",
                value: ["NO", "PKCS5", "ZERO", "RANDOM", "BIT"]
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    async run(input, args) {
        const [keyObj, ivObj, inputType, outputType, version, length, sBox, blockMode, keyMeshing, padding] = args;

        const key = toHexFast(Utils.convertToByteArray(keyObj.string, keyObj.option));
        const iv = toHexFast(Utils.convertToByteArray(ivObj.string, ivObj.option));
        input = inputType === "十六进制" ? input : toHexFast(Utils.strToArrayBuffer(input));

        const versionNum = version === "GOST 28147 (Magma, 1989)" ? 1989 : 2015;
        const blockLength = versionNum === 1989 ? 64 : parseInt(length, 10);
        const sBoxVal = versionNum === 1989 ? sBox : null;

        const algorithm = {
            version: versionNum,
            length: blockLength,
            mode: "ES",
            sBox: sBoxVal,
            block: blockMode,
            keyMeshing: keyMeshing,
            padding: padding
        };

        try {
            const Hex = CryptoGost.coding.Hex;
            if (iv) algorithm.iv = Hex.decode(iv);

            const cipher = GostEngine.getGostCipher(algorithm);
            const out = Hex.encode(cipher.decrypt(Hex.decode(key), Hex.decode(input)));

            return outputType === "十六进制" ? out : Utils.byteArrayToChars(fromHex(out));
        } catch (err) {
            throw new OperationError(err);
        }
    }

}

export default GOSTDecrypt;
