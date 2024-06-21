/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import hljs from "highlight.js";

/**
 * Syntax highlighter operation
 */
class SyntaxHighlighter extends Operation {

    /**
     * SyntaxHighlighter constructor
     */
    constructor() {
        super();

        this.name = "语法高亮";
        this.module = "Code";
        this.description = "为多种编程语言添加语法高亮。注意：此操作不会对代码进行缩进，需配合使用对应的“美化（Beautify）”操作。";
        this.infoURL = "https://wikipedia.org/wiki/Syntax_highlighting";
        this.inputType = "string";
        this.outputType = "html";
        this.args = [
            {
                "name": "语言",
                "type": "option",
                "value": ["自动检测"].concat(hljs.listLanguages())
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {html}
     */
    run(input, args) {
        const language = args[0];

        if (language === "自动检测") {
            return hljs.highlightAuto(input).value;
        }

        return hljs.highlight(language, input, true).value;
    }

    /**
     * Highlight Syntax highlighter
     *
     * @param {Object[]} pos
     * @param {number} pos[].start
     * @param {number} pos[].end
     * @param {Object[]} args
     * @returns {Object[]} pos
     */
    highlight(pos, args) {
        return pos;
    }

    /**
     * Highlight Syntax highlighter in reverse
     *
     * @param {Object[]} pos
     * @param {number} pos[].start
     * @param {number} pos[].end
     * @param {Object[]} args
     * @returns {Object[]} pos
     */
    highlightReverse(pos, args) {
        return pos;
    }

}

export default SyntaxHighlighter;
