/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";

/**
 * Add line numbers operation
 */
class AddLineNumbers extends Operation {

    /**
     * AddLineNumbers constructor
     */
    constructor() {
        super();

        this.name = "添加行号";
        this.module = "Default";
        this.description = "在输出内容添加行号。";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const lines = input.split("\n"),
            width = lines.length.toString().length;
        let output = "";

        for (let n = 0; n < lines.length; n++) {
            output += (n+1).toString().padStart(width, " ") + " " + lines[n] + "\n";
        }
        return output.slice(0, output.length-1);
    }

}

export default AddLineNumbers;
