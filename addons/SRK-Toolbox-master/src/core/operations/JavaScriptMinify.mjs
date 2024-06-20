/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import OperationError from "../errors/OperationError.mjs";
import Operation from "../Operation.mjs";
import * as terser from "terser";

/**
 * JavaScript Minify operation
 */
class JavaScriptMinify extends Operation {

    /**
     * JavaScriptMinify constructor
     */
    constructor() {
        super();

        this.name = "JavaScript压缩";
        this.module = "Code";
        this.description = "压缩JavaScript代码（Minify/Uglify）。";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    async run(input, args) {
        const result = await terser.minify(input);
        if (result.error) {
            throw new OperationError(`压缩JavaScript时出错。 (${result.error})`);
        }
        return result.code;
    }

}

export default JavaScriptMinify;
