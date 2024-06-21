/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import {fromHex, FROM_HEX_DELIM_OPTIONS} from "../lib/Hex.mjs";
import Utils from "../Utils.mjs";

/**
 * From Hex operation
 */
class FromHex extends Operation {

    /**
     * FromHex constructor
     */
    constructor() {
        super();

        this.name = "十六进制转字符";
        this.module = "Default";
        this.description = "把十六进制字符串解码为原先的内容。<br><br>例如： <code>ce 93 ce b5 ce b9 ce ac 20 cf 83 ce bf cf 85 0a</code> 解码为UTF-8字符串 <code>Γειά σου</code>";
        this.infoURL = "https://wikipedia.org/wiki/Hexadecimal";
        this.inputType = "string";
        this.outputType = "byteArray";
        this.args = [
            {
                name: "分隔符",
                type: "option",
                value: FROM_HEX_DELIM_OPTIONS
            }
        ];
        this.checks = [
            {
                pattern: "^(?:[\\dA-F]{2})+$",
                flags: "i",
                args: ["无"]
            },
            {
                pattern: "^[\\dA-F]{2}(?: [\\dA-F]{2})*$",
                flags: "i",
                args: ["空格"]
            },
            {
                pattern: "^[\\dA-F]{2}(?:,[\\dA-F]{2})*$",
                flags: "i",
                args: ["逗号"]
            },
            {
                pattern: "^[\\dA-F]{2}(?:;[\\dA-F]{2})*$",
                flags: "i",
                args: ["分号"]
            },
            {
                pattern: "^[\\dA-F]{2}(?::[\\dA-F]{2})*$",
                flags: "i",
                args: ["冒号"]
            },
            {
                pattern: "^[\\dA-F]{2}(?:\\n[\\dA-F]{2})*$",
                flags: "i",
                args: ["换行"]
            },
            {
                pattern: "^[\\dA-F]{2}(?:\\r\\n[\\dA-F]{2})*$",
                flags: "i",
                args: ["CRLF"]
            },
            {
                pattern: "^(?:0x[\\dA-F]{2})+$",
                flags: "i",
                args: ["0x"]
            },
            {
                pattern: "^0x[\\dA-F]{2}(?:,0x[\\dA-F]{2})*$",
                flags: "i",
                args: ["0x和逗号"]
            },
            {
                pattern: "^(?:\\\\x[\\dA-F]{2})+$",
                flags: "i",
                args: ["\\x"]
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {byteArray}
     */
    run(input, args) {
        const delim = args[0] || "自动";
        return fromHex(input, delim, 2);
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
        if (args[0] === "自动") return false;
        const delim = Utils.charRep(args[0] || "空格"),
            len = delim === "\r\n" ? 1 : delim.length,
            width = len + 2;

        // 0x and \x are added to the beginning if they are selected, so increment the positions accordingly
        if (delim === "0x" || delim === "\\x") {
            if (pos[0].start > 1) pos[0].start -= 2;
            else pos[0].start = 0;
            if (pos[0].end > 1) pos[0].end -= 2;
            else pos[0].end = 0;
        }

        pos[0].start = pos[0].start === 0 ? 0 : Math.round(pos[0].start / width);
        pos[0].end = pos[0].end === 0 ? 0 : Math.ceil(pos[0].end / width);
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
        const delim = Utils.charRep(args[0] || "空格"),
            len = delim === "\r\n" ? 1 : delim.length;

        pos[0].start = pos[0].start * (2 + len);
        pos[0].end = pos[0].end * (2 + len) - len;

        // 0x and \x are added to the beginning if they are selected, so increment the positions accordingly
        if (delim === "0x" || delim === "\\x") {
            pos[0].start += 2;
            pos[0].end += 2;
        }
        return pos;
    }
}

export default FromHex;
