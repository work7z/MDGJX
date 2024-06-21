/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";

/**
 * Strip HTTP headers operation
 */
class StripHTTPHeaders extends Operation {

    /**
     * StripHTTPHeaders constructor
     */
    constructor() {
        super();

        this.name = "删除HTTP头部";
        this.module = "Default";
        this.description = "从HTTP请求或响应文本中删除请求头或响应头，使用首次出现的两个换行符作为定位。";
        this.infoURL = "https://wikipedia.org/wiki/Hypertext_Transfer_Protocol#Message_format";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [];
        this.checks = [
            {
                pattern:  "^HTTP(.|\\s)+?(\\r?\\n){2}",
                flags:  "",
                args:   []
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        let headerEnd = input.indexOf("\r\n\r\n");
        headerEnd = (headerEnd < 0) ? input.indexOf("\n\n") + 2 : headerEnd + 4;

        return (headerEnd < 2) ? input : input.slice(headerEnd, input.length);
    }

}

export default StripHTTPHeaders;
