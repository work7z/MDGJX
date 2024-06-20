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
 * GOST Key Wrap operation
 */
class GOSTKeyWrap extends Operation {

    /**
     * GOSTKeyWrap constructor
     */
    constructor() {
        super();

        this.name = "GOST密钥包装";
        this.module = "Ciphers";
        this.description = "使用GOST块密码对密钥在不可信环境中进行包装。";
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
                name: "User Key Material",
                type: "toggleString",
                value: "",
                toggleValues: ["十六进制", "UTF8", "Latin1", "Base64"]
            },
            {
                name: "输入类型",
                type: "option",
                value: ["原始字节", "十六进制"]
            },
            {
                name: "输出类型",
                type: "option",
                value: ["十六进制", "原始字节"]
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
                name: "Key包装",
                type: "option",
                value: ["NO", "CP", "SC"]
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    async run(input, args) {
        const [keyObj, ukmObj, inputType, outputType, version, length, sBox, keyWrapping] = args;

        const key = toHexFast(Utils.convertToByteArray(keyObj.string, keyObj.option));
        const ukm = toHexFast(Utils.convertToByteArray(ukmObj.string, ukmObj.option));
        input = inputType === "十六进制" ? input : toHexFast(Utils.strToArrayBuffer(input));

        const versionNum = version === "GOST 28147 (Magma, 1989)" ? 1989 : 2015;
        const blockLength = versionNum === 1989 ? 64 : parseInt(length, 10);
        const sBoxVal = versionNum === 1989 ? sBox : null;

        const algorithm = {
            version: versionNum,
            length: blockLength,
            mode: "KW",
            sBox: sBoxVal,
            keyWrapping: keyWrapping
        };

        try {
            const Hex = CryptoGost.coding.Hex;
            algorithm.ukm = Hex.decode(ukm);

            const cipher = GostEngine.getGostCipher(algorithm);
            const out = Hex.encode(cipher.wrapKey(Hex.decode(key), Hex.decode(input)));

            return outputType === "十六进制" ? out : Utils.byteArrayToChars(fromHex(out));
        } catch (err) {
            if (err.toString().includes("Invalid typed array length")) {
                throw new OperationError("无效的输入长度：必须为块大小的整数倍。");
            }
            throw new OperationError(err);
        }
    }

}

export default GOSTKeyWrap;
