/**
 * @author crespyl [peter@crespyl.net]
 * @copyright Peter Jacobs 2021
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";

import {COMPRESSION_OUTPUT_FORMATS, COMPRESSION_FUNCTIONS} from "../lib/LZString.mjs";

/**
 * LZString Compress operation
 */
class LZStringCompress extends Operation {

    /**
     * LZStringCompress constructor
     */
    constructor() {
        super();

        this.name = "LZString压缩";
        this.module = "Compression";
        this.description = "使用 lz-string 算法压缩输入内容。";
        this.infoURL = "https://pieroxy.net/blog/pages/lz-string/index.html";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                name: "压缩格式",
                type: "option",
                defaultIndex: 0,
                value: COMPRESSION_OUTPUT_FORMATS
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const compress = COMPRESSION_FUNCTIONS[args[0]];
        if (compress) {
            return compress(input);
        } else {
            throw new OperationError("压缩功能不可用");
        }
    }

}

export default LZStringCompress;
