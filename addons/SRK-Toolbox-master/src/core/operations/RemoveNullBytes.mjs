/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";

/**
 * Remove null bytes operation
 */
class RemoveNullBytes extends Operation {

    /**
     * RemoveNullBytes constructor
     */
    constructor() {
        super();

        this.name = "移除空字节";
        this.module = "Default";
        this.description = "从输入内容中移除所有的空字节（<code>0x00</code>）。";
        this.inputType = "ArrayBuffer";
        this.outputType = "byteArray";
        this.args = [];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {byteArray}
     */
    run(input, args) {
        input = new Uint8Array(input);
        const output = [];
        for (let i = 0; i < input.length; i++) {
            if (input[i] !== 0) output.push(input[i]);
        }
        return output;
    }

}

export default RemoveNullBytes;
