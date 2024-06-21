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
 * To BCD operation
 */
class ToBCD extends Operation {

    /**
     * ToBCD constructor
     */
    constructor() {
        super();

        this.name = "BCD码编码";
        this.module = "Default";
        this.description = "BCD码（Binary-Coded Decimal)是一种十进制数字编码的形式。在这种编码下，每个十进制数字用一串单独的二进制比特来存储与表示。常见的有以4位或8位表示1个十进制数字。有时会用特殊的码位表示特殊符号。";
        this.infoURL = "https://wikipedia.org/wiki/Binary-coded_decimal";
        this.inputType = "BigNumber";
        this.outputType = "string";
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
                "name": "输出格式",
                "type": "option",
                "value": FORMAT
            }
        ];
    }

    /**
     * @param {BigNumber} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        if (input.isNaN())
            throw new OperationError("无效输入");
        if (!input.integerValue(BigNumber.ROUND_DOWN).isEqualTo(input))
            throw new OperationError("BCD不支持非整数");

        const encoding = ENCODING_LOOKUP[args[0]],
            packed = args[1],
            signed = args[2],
            outputFormat = args[3];

        // Split input number up into separate digits
        const digits = input.toFixed().split("");

        if (digits[0] === "-" || digits[0] === "+") {
            digits.shift();
        }

        let nibbles = [];

        digits.forEach(d => {
            const n = parseInt(d, 10);
            nibbles.push(encoding[n]);
        });

        if (signed) {
            if (packed && digits.length % 2 === 0) {
                // If there are an even number of digits, we add a leading 0 so
                // that the sign nibble doesn't sit in its own byte, leading to
                // ambiguity around whether the number ends with a 0 or not.
                nibbles.unshift(encoding[0]);
            }

            nibbles.push(input > 0 ? 12 : 13);
            // 12 ("C") for + (credit)
            // 13 ("D") for - (debit)
        }

        let bytes = [];

        if (packed) {
            let encoded = 0,
                little = false;

            nibbles.forEach(n => {
                encoded ^= little ? n : (n << 4);
                if (little) {
                    bytes.push(encoded);
                    encoded = 0;
                }
                little = !little;
            });

            if (little) bytes.push(encoded);
        } else {
            bytes = nibbles;

            // Add null high nibbles
            nibbles = nibbles.map(n => {
                return [0, n];
            }).reduce((a, b) => {
                return a.concat(b);
            });
        }

        // Output
        switch (outputFormat) {
            case "半字节":
                return nibbles.map(n => {
                    return n.toString(2).padStart(4, "0");
                }).join(" ");
            case "字节":
                return bytes.map(b => {
                    return b.toString(2).padStart(8, "0");
                }).join(" ");
            case "原始数据":
            default:
                return Utils.byteArrayToChars(bytes);
        }
    }

}

export default ToBCD;
