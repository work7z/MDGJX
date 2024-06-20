/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";
import { bitOp, xor } from "../lib/BitwiseOp.mjs";
import { toHex } from "../lib/Hex.mjs";
import { isWorkerEnvironment } from "../Utils.mjs";

/**
 * XOR Brute Force operation
 */
class XORBruteForce extends Operation {

    /**
     * XORBruteForce constructor
     */
    constructor() {
        super();

        this.name = "XOR暴力破解";
        this.module = "Default";
        this.description = "枚举所有的XOR解码结果。受限于浏览器性能，目前仅限key长度不超过2。<br><br>你可以输入一个已知的明文字符串来筛选结果（已知明文攻击中称为crib）。";
        this.infoURL = "https://wikipedia.org/wiki/Exclusive_or";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                "name": "Key长度",
                "type": "number",
                "value": 1
            },
            {
                "name": "样本长度",
                "type": "number",
                "value": 100
            },
            {
                "name": "样本偏移量",
                "type": "number",
                "value": 0
            },
            {
                "name": "加密方式",
                "type": "option",
                "value": ["标准", "输入差分", "输出差分"]
            },
            {
                "name": "保留Null",
                "type": "boolean",
                "value": false
            },
            {
                "name": "输出key",
                "type": "boolean",
                "value": true
            },
            {
                "name": "输出十六进制",
                "type": "boolean",
                "value": false
            },
            {
                "name": "Crib（已知明文部分）",
                "type": "binaryString",
                "value": ""
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        input = new Uint8Array(input);
        const [
                keyLength,
                sampleLength,
                sampleOffset,
                scheme,
                nullPreserving,
                printKey,
                outputHex,
                rawCrib
            ] = args,
            crib = rawCrib.toLowerCase(),
            output = [];
        let result,
            resultUtf8,
            record = "";

        input = input.slice(sampleOffset, sampleOffset + sampleLength);

        if (isWorkerEnvironment())
            self.sendStatusMessage("正在计算 " + Math.pow(256, keyLength) + " 种结果...");

        /**
         * Converts an integer to an array of bytes expressing that number.
         *
         * @param {number} int
         * @param {number} len - Length of the resulting array
         * @returns {array}
         */
        const intToByteArray = (int, len) => {
            const res = Array(len).fill(0);
            for (let i = len - 1; i >= 0; i--) {
                res[i] = int & 0xff;
                int = int >>> 8;
            }
            return res;
        };

        for (let key = 1, l = Math.pow(256, keyLength); key < l; key++) {
            if (key % 10000 === 0 && isWorkerEnvironment()) {
                self.sendStatusMessage("正在计算 " + l + " 种结果... " + Math.floor(key / l * 100) + "%");
            }

            result = bitOp(input, intToByteArray(key, keyLength), xor, nullPreserving, scheme);
            resultUtf8 = Utils.byteArrayToUtf8(result);
            record = "";

            if (crib && resultUtf8.toLowerCase().indexOf(crib) < 0) continue;
            if (printKey) record += "Key = " + Utils.hex(key, (2*keyLength)) + ": ";
            record += outputHex ? toHex(result) : Utils.escapeWhitespace(resultUtf8);

            output.push(record);
        }

        return output.join("\n");
    }

}

export default XORBruteForce;
