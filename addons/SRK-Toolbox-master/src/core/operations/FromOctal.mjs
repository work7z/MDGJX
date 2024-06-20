/**
 * @author Matt C [matt@artemisbot.uk]
 * @copyright Crown Copyright 2017
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";
import {DELIM_OPTIONS} from "../lib/Delim.mjs";

/**
 * From Octal operation
 */
class FromOctal extends Operation {

    /**
     * FromOctal constructor
     */
    constructor() {
        super();

        this.name = "八进制转字符";
        this.module = "Default";
        this.description = "把八进制字符串解码为原先的内容。<br><br>例： <code>316 223 316 265 316 271 316 254 40 317 203 316 277 317 205</code> 解码成UTF-8字符串 <code>Γειά σου</code>";
        this.infoURL = "https://wikipedia.org/wiki/Octal";
        this.inputType = "string";
        this.outputType = "byteArray";
        this.args = [
            {
                "name": "分隔符",
                "type": "option",
                "value": DELIM_OPTIONS
            }
        ];
        this.checks = [
            {
                pattern: "^(?:[0-7]{1,2}|[123][0-7]{2})(?: (?:[0-7]{1,2}|[123][0-7]{2}))*$",
                flags: "",
                args: ["空格"]
            },
            {
                pattern: "^(?:[0-7]{1,2}|[123][0-7]{2})(?:,(?:[0-7]{1,2}|[123][0-7]{2}))*$",
                flags: "",
                args: ["逗号"]
            },
            {
                pattern: "^(?:[0-7]{1,2}|[123][0-7]{2})(?:;(?:[0-7]{1,2}|[123][0-7]{2}))*$",
                flags: "",
                args: ["分号"]
            },
            {
                pattern: "^(?:[0-7]{1,2}|[123][0-7]{2})(?::(?:[0-7]{1,2}|[123][0-7]{2}))*$",
                flags: "",
                args: ["冒号"]
            },
            {
                pattern: "^(?:[0-7]{1,2}|[123][0-7]{2})(?:\\n(?:[0-7]{1,2}|[123][0-7]{2}))*$",
                flags: "",
                args: ["换行"]
            },
            {
                pattern: "^(?:[0-7]{1,2}|[123][0-7]{2})(?:\\r\\n(?:[0-7]{1,2}|[123][0-7]{2}))*$",
                flags: "",
                args: ["CRLF"]
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {byteArray}
     */
    run(input, args) {
        const delim = Utils.charRep(args[0] || "Space");
        if (input.length === 0) return [];
        return input.split(delim).map(val => parseInt(val, 8));
    }

}

export default FromOctal;
