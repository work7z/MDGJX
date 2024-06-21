/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import {toHex, TO_HEX_DELIM_OPTIONS} from "../lib/Hex.mjs";
import Utils from "../Utils.mjs";

/**
 * To Hex operation
 */
class ToHex extends Operation {

    /**
     * ToHex constructor
     */
    constructor() {
        super();

        this.name = "字符转十六进制";
        this.module = "Default";
        this.description = "将输入字符串转换为对应的十六进制表示（使用给定的分隔符）。<br><br>例如：UTF-8字符串 <code>Γειά σου</code> 编码成 <code>ce 93 ce b5 ce b9 ce ac 20 cf 83 ce bf cf 85 0a</code>";
        this.infoURL = "https://wikipedia.org/wiki/Hexadecimal";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                name: "分隔符",
                type: "option",
                value: TO_HEX_DELIM_OPTIONS
            },
            {
                name: "每行字节数",
                type: "number",
                value: 0
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        let delim, comma;
        if (args[0] === "0x和逗号") {
            delim = "0x";
            comma = ",";
        } else {
            delim = Utils.charRep(args[0] || "空格");
        }
        const lineSize = args[1];

        return toHex(new Uint8Array(input), delim, 2, comma, lineSize);
    }

    /**
     * Highlight to Hex
     *
     * @param {Object[]} pos
     * @param {number} pos[].start
     * @param {number} pos[].end
     * @param {Object[]} args
     * @returns {Object[]} pos
     */
    highlight(pos, args) {
        let delim, commaLen = 0;
        if (args[0] === "0x with comma") {
            delim = "0x";
            commaLen = 1;
        } else {
            delim = Utils.charRep(args[0] || "空格");
        }

        const lineSize = args[1],
            len = delim.length + commaLen;

        const countLF = function(p) {
            // Count the number of LFs from 0 upto p
            return (p / lineSize | 0) - (p >= lineSize && p % lineSize === 0);
        };

        pos[0].start = pos[0].start * (2 + len) + countLF(pos[0].start);
        pos[0].end = pos[0].end * (2 + len) + countLF(pos[0].end);

        // if the delimiters are not prepended, trim the trailing delimiter
        if (!(delim === "0x" || delim === "\\x")) {
            pos[0].end -= delim.length;
        }
        // if there is comma, trim the trailing comma
        pos[0].end -= commaLen;
        return pos;
    }

    /**
     * Highlight from Hex
     *
     * @param {Object[]} pos
     * @param {number} pos[].start
     * @param {number} pos[].end
     * @param {Object[]} args
     * @returns {Object[]} pos
     */
    highlightReverse(pos, args) {
        let delim, commaLen = 0;
        if (args[0] === "0x和逗号") {
            delim = "0x";
            commaLen = 1;
        } else {
            delim = Utils.charRep(args[0] || "空格");
        }

        const lineSize = args[1],
            len = delim.length + commaLen,
            width = len + 2;

        const countLF = function(p) {
            // Count the number of LFs from 0 up to p
            const lineLength = width * lineSize;
            return (p / lineLength | 0) - (p >= lineLength && p % lineLength === 0);
        };

        pos[0].start = pos[0].start === 0 ? 0 : Math.round((pos[0].start - countLF(pos[0].start)) / width);
        pos[0].end = pos[0].end === 0 ? 0 : Math.ceil((pos[0].end - countLF(pos[0].end)) / width);
        return pos;
    }
}

export default ToHex;
