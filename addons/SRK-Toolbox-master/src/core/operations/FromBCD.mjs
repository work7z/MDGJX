/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2017
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";
import OperationError from "../errors/OperationError.mjs";
import {ENCODING_SCHEME, ENCODING_LOOKUP, FORMAT} from "../lib/BCD.mjs";
import BigNumber from "bignumber.js";

/**
 * From BCD operation
 */
class FromBCD extends Operation {

    /**
     * FromBCD constructor
     */
    constructor() {
        super();

        this.name = "BCD码解码";
        this.module = "Default";
        this.description = "BCD码（Binary-Coded Decimal)是一种十进制数字编码的形式。在这种编码下，每个十进制数字用一串单独的二进制比特来存储与表示。常见的有以4位或8位表示1个十进制数字。有时会用特殊的码位表示特殊符号。";
        this.infoURL = "https://wikipedia.org/wiki/Binary-coded_decimal";
        this.inputType = "string";
        this.outputType = "BigNumber";
        this.args = [
            {
                "name": "编码方式",
                "type": "option",
                "value": ENCODING_SCHEME
            },
            {
                "name": "压缩",
                "type": "boolean",
                "value": true
            },
            {
                "name": "有符号",
                "type": "boolean",
                "value": false
            },
            {
                "name": "输入格式",
                "type": "option",
                "value": FORMAT
            }
        ];
        this.checks = [
            {
                pattern: "^(?:\\d{4} ){3,}\\d{4}$",
                flags: "",
                args: ["8 4 2 1", true, false, "半字节"]
            },
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {BigNumber}
     */
    run(input, args) {
        const encoding = ENCODING_LOOKUP[args[0]],
            packed = args[1],
            signed = args[2],
            inputFormat = args[3],
            nibbles = [];

        let output = "",
            byteArray;

        // Normalise the input
        switch (inputFormat) {
            case "半字节":
            case "字节":
                input = input.replace(/\s/g, "");
                for (let i = 0; i < input.length; i += 4) {
                    nibbles.push(parseInt(input.substr(i, 4), 2));
                }
                break;
            case "原始数据":
            default:
                byteArray = new Uint8Array(Utils.strToArrayBuffer(input));
                byteArray.forEach(b => {
                    nibbles.push(b >>> 4);
                    nibbles.push(b & 15);
                });
                break;
        }

        if (!packed) {
            // Discard each high nibble
            for (let i = 0; i < nibbles.length; i++) {
                nibbles.splice(i, 1); // lgtm [js/loop-iteration-skipped-due-to-shifting]
            }
        }

        if (signed) {
            const sign = nibbles.pop();
            if (sign === 13 ||
                sign === 11) {
                // Negative
                output += "-";
            }
        }

        nibbles.forEach(n => {
            if (isNaN(n)) throw new OperationError("无效输入");
            const val = encoding.indexOf(n);
            if (val < 0) throw new OperationError(`值 ${Utils.bin(n, 4)} 无法被编码`);
            output += val.toString();
        });

        return new BigNumber(output);
    }

}

export default FromBCD;
