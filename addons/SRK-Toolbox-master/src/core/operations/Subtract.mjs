/**
 * @author bwhitn [brian.m.whitney@outlook.com]
 * @author d98762625 [d98762625@gmail.com]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import BigNumber from "bignumber.js";
import Operation from "../Operation.mjs";
import { sub, createNumArray } from "../lib/Arithmetic.mjs";
import { ARITHMETIC_DELIM_OPTIONS } from "../lib/Delim.mjs";


/**
 * Subtract operation
 */
class Subtract extends Operation {

    /**
     * Subtract constructor
     */
    constructor() {
        super();

        this.name = "求差";
        this.module = "Default";
        this.description = "对一组数字求差（aka. 减法）。非数字的值会被忽略。<br><br>例： <code>0x0a 8 .5</code> 计算为 <code>1.5</code>";
        this.infoURL = "https://wikipedia.org/wiki/Subtraction";
        this.inputType = "string";
        this.outputType = "BigNumber";
        this.args = [
            {
                "name": "分隔符",
                "type": "option",
                "value": ARITHMETIC_DELIM_OPTIONS,
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {BigNumber}
     */
    run(input, args) {
        const val = sub(createNumArray(input, args[0]));
        return BigNumber.isBigNumber(val) ? val : new BigNumber(NaN);
    }

}

export default Subtract;
