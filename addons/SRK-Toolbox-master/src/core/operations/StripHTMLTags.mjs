/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";

/**
 * Strip HTML tags operation
 */
class StripHTMLTags extends Operation {

    /**
     * StripHTMLTags constructor
     */
    constructor() {
        super();

        this.name = "移除HTML标签";
        this.module = "Default";
        this.description = "从输入中移除所有的HTML标签。";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "移除缩进",
                "type": "boolean",
                "value": true
            },
            {
                "name": "移除多余换行",
                "type": "boolean",
                "value": true
            }
        ];
        this.checks = [
            {
                pattern:  "(</html>|</div>|</body>)",
                flags:  "i",
                args:   [true, true]
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [removeIndentation, removeLineBreaks] = args;

        input = Utils.stripHtmlTags(input);

        if (removeIndentation) {
            input = input.replace(/\n[ \f\t]+/g, "\n");
        }

        if (removeLineBreaks) {
            input = input
                .replace(/^\s*\n/, "") // first line
                .replace(/(\n\s*){2,}/g, "\n"); // all others
        }

        return input;
    }

}

export default StripHTMLTags;
