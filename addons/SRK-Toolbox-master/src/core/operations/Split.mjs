/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import {SPLIT_DELIM_OPTIONS, JOIN_DELIM_OPTIONS} from "../lib/Delim.mjs";

/**
 * Split operation
 */
class Split extends Operation {

    /**
     * Split constructor
     */
    constructor() {
        super();

        this.name = "拆分";
        this.module = "Default";
        this.description = "使用给定的分隔符拆分字符串。";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "Split delimiter",
                "type": "editableOptionShort",
                "value": SPLIT_DELIM_OPTIONS
            },
            {
                "name": "Join delimiter",
                "type": "editableOptionShort",
                "value": JOIN_DELIM_OPTIONS
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const splitDelim = args[0],
            joinDelim = args[1],
            sections = input.split(splitDelim);

        return sections.join(joinDelim);
    }

}

export default Split;
