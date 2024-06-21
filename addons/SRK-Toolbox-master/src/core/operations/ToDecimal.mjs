/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";
import {DELIM_OPTIONS} from "../lib/Delim.mjs";


/**
 * To Decimal operation
 */
class ToDecimal extends Operation {

    /**
     * ToDecimal constructor
     */
    constructor() {
        super();

        this.name = "字符转十进制";
        this.module = "Default";
        this.description = "将输入字符串转换为对应的十进制表示（使用给定的分隔符）。<br><br>例： <code>Hello</code> 编码为 <code>72 101 108 108 111</code>";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                "name": "分隔符",
                "type": "option",
                "value": DELIM_OPTIONS
            },
            {
                "name": "支持带符号数值（signed int）",
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
        const delim = Utils.charRep(args[0]),
            signed = args[1];
        if (signed) {
            input = input.map(v => v > 0x7F ? v - 0xFF - 1 : v);
        }
        return input.join(delim);
    }

}

export default ToDecimal;
