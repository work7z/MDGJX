/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";
import {INPUT_DELIM_OPTIONS} from "../lib/Delim.mjs";

/**
 * Unique operation
 */
class Unique extends Operation {

    /**
     * Unique constructor
     */
    constructor() {
        super();

        this.name = "去重";
        this.module = "Default";
        this.description = "从输入移除重复的字符串。";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                name: "分隔符",
                type: "option",
                value: INPUT_DELIM_OPTIONS
            },
            {
                name: "显示个数",
                type: "boolean",
                value: false
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const delim = Utils.charRep(args[0]),
            count = args[1];

        if (count) {
            const valMap = input.split(delim).reduce((acc, curr) => {
                if (Object.prototype.hasOwnProperty.call(acc, curr)) {
                    acc[curr]++;
                } else {
                    acc[curr] = 1;
                }
                return acc;
            }, {});

            return Object.keys(valMap).map(val => `${valMap[val]} ${val}`).join(delim);
        } else {
            return input.split(delim).unique().join(delim);
        }
    }

}

export default Unique;
