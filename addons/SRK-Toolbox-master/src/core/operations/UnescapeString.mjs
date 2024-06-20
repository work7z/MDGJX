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
 * Unescape string operation
 */
class UnescapeString extends Operation {

    /**
     * UnescapeString constructor
     */
    constructor() {
        super();

        this.name = "字符串转义恢复";
        this.module = "Default";
        this.description = "将已经转义的字符串恢复。例如，<code>Don\\'t stop me now</code> 恢复为 <code>Don't stop me now</code>。<br><br>支持以下的字符转义：<ul><li><code>\\n</code> （换行，LF）</li><li><code>\\r</code> （回车，CR）</li><li><code>\\t</code> （制表符）</li><li><code>\\b</code> （退格）</li><li><code>\\f</code> （换页，FF）</li><li><code>\\xnn</code> （十六进制，n是0到f）</li><li><code>\\\\</code> （反斜杠）</li><li><code>\\'</code> （单引号）</li><li><code>\\&quot;</code> （双引号）</li><li><code>\\unnnn</code> （Unicode字符）</li><li><code>\\u{nnnnnn}</code> （Unicode码点）</li></ul>";
        this.infoURL = "https://wikipedia.org/wiki/Escape_sequence";
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
        return Utils.parseEscapedChars(input);
    }

}

export default UnescapeString;
