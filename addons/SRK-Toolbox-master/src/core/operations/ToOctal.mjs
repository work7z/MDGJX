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
 * To Octal operation
 */
class ToOctal extends Operation {

    /**
     * ToOctal constructor
     */
    constructor() {
        super();

        this.name = "字符转八进制";
        this.module = "Default";
        this.description = "将输入字符串转换为对应的八进制表示（使用给定的分隔符）。<br><br>例： UTF-8编码字符串 <code>Γειά σου</code> 编码为 <code>316 223 316 265 316 271 316 254 40 317 203 316 277 317 205</code>";
        this.infoURL = "https://wikipedia.org/wiki/Octal";
        this.inputType = "byteArray";
        this.outputType = "string";
        this.args = [
            {
                "name": "分隔符",
                "type": "option",
                "value": DELIM_OPTIONS
            }
        ];
    }

    /**
     * @param {byteArray} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const delim = Utils.charRep(args[0] || "Space");
        return input.map(val => val.toString(8)).join(delim);
    }

}

export default ToOctal;
