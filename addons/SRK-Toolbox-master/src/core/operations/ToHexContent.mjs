/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";
import {toHex} from "../lib/Hex.mjs";

/**
 * To Hex Content operation
 */
class ToHexContent extends Operation {

    /**
     * ToHexContent constructor
     */
    constructor() {
        super();

        this.name = "Snort Content编码";
        this.module = "Default";
        this.description = "把字符串的特殊字符转换成十六进制。SNORT的Content关键字使用此格式。<br><br>例： <code>foo=bar</code> 编码为 <code>foo|3d|bar</code>.";
        this.infoURL = "http://manual-snort-org.s3-website-us-east-1.amazonaws.com/node32.html#SECTION00451000000000000000";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                "name": "转换",
                "type": "option",
                "value": ["仅特殊字符", "仅特殊字符（包括空格）", "所有字符"]
            },
            {
                "name": "字节间用空格分隔",
                "type": "boolean",
                "value": false
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
        const convert = args[0];
        const spaces = args[1];
        if (convert === "所有字符") {
            let result = "|" + toHex(input) + "|";
            if (!spaces) result = result.replace(/ /g, "");
            return result;
        }

        let output = "",
            inHex = false,
            b;
        const convertSpaces = convert === "仅特殊字符（包括空格）";
        for (let i = 0; i < input.length; i++) {
            b = input[i];
            if ((b === 32 && convertSpaces) || (b < 48 && b !== 32) || (b > 57 && b < 65) || (b > 90 && b < 97) || b > 122) {
                if (!inHex) {
                    output += "|";
                    inHex = true;
                } else if (spaces) output += " ";
                output += toHex([b]);
            } else {
                if (inHex) {
                    output += "|";
                    inHex = false;
                }
                output += Utils.chr(input[i]);
            }
        }
        if (inHex) output += "|";
        return output;
    }

}

export default ToHexContent;
