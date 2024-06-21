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
import { toHexFast } from "../lib/Hex.mjs";
import { CryptoGost, GostEngine } from "@wavesenterprise/crypto-gost-js/index.js";

/**
 * GOST Verify operation
 */
class GOSTVerify extends Operation {

    /**
     * GOSTVerify constructor
     */
    constructor() {
        super();

        this.name = "GOST验证";
        this.module = "Ciphers";
        this.description = "使用GOST块加密算法验证明文信息的签名。将签名输入到MAC框中。";
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
                name: "MAC",
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
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    async run(input, args) {
        const [keyObj, ivObj, macObj, inputType, version, length, sBox] = args;

        const key = toHexFast(Utils.convertToByteArray(keyObj.string, keyObj.option));
        const iv = toHexFast(Utils.convertToByteArray(ivObj.string, ivObj.option));
        const mac = toHexFast(Utils.convertToByteArray(macObj.string, macObj.option));
        input = inputType === "十六进制" ? input : toHexFast(Utils.strToArrayBuffer(input));

        const versionNum = version === "GOST 28147 (Magma, 1989)" ? 1989 : 2015;
        const blockLength = versionNum === 1989 ? 64 : parseInt(length, 10);
        const sBoxVal = versionNum === 1989 ? sBox : null;

        const algorithm = {
            version: versionNum,
            length: blockLength,
            mode: "MAC",
            sBox: sBoxVal,
            macLength: mac.length * 4
        };

        try {
            const Hex = CryptoGost.coding.Hex;
            if (iv) algorithm.iv = Hex.decode(iv);

            const cipher = GostEngine.getGostCipher(algorithm);
            const out = cipher.verify(Hex.decode(key), Hex.decode(mac), Hex.decode(input));

            return out ? "签名相符" : "签名不符";
        } catch (err) {
            throw new OperationError(err);
        }
    }

}

export default GOSTVerify;
