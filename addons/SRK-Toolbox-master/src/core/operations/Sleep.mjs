/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";

/**
 * Sleep operation
 */
class Sleep extends Operation {

    /**
     * Sleep constructor
     */
    constructor() {
        super();

        this.name = "Sleep";
        this.module = "Default";
        this.description = "Sleep操作让流程执行时在等待给定的毫秒数后继续。";
        this.inputType = "ArrayBuffer";
        this.outputType = "ArrayBuffer";
        this.args = [
            {
                "name": "时长 (ms)",
                "type": "number",
                "value": 1000
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {ArrayBuffer}
     */
    async run(input, args) {
        const ms = args[0];
        await new Promise(r => setTimeout(r, ms));
        return input;
    }

}

export default Sleep;
