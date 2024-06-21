/**
 * @author Vel0x [dalemy@microsoft.com]
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import jsesc from "jsesc";

/**
 * Escape string operation
 */
class EscapeString extends Operation {

    /**
     * EscapeString constructor
     */
    constructor() {
        super();

        this.name = "转义字符串";
        this.module = "Default";
        this.description = "将字符串中的特殊字符转义，防止和代码发生冲突。例如，<code>Don't stop me now</code> 转义成 <code>Don\\'t stop me now</code>。<br><br>支持以下的字符转义：<ul><li><code>\\n</code> （换行，LF）</li><li><code>\\r</code> （回车，CR）</li><li><code>\\t</code> （制表符）</li><li><code>\\b</code> （退格）</li><li><code>\\f</code> （换页，FF）</li><li><code>\\xnn</code> （十六进制，n是0到f）</li><li><code>\\\\</code> （反斜杠）</li><li><code>\\'</code> （单引号）</li><li><code>\\&quot;</code> （双引号）</li><li><code>\\unnnn</code> （Unicode字符）</li><li><code>\\u{nnnnnn}</code> （Unicode码点）</li></ul>";
        this.infoURL = "https://wikipedia.org/wiki/Escape_sequence";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "转义等级",
                "type": "option",
                "value": ["特殊字符", "所有", "最少"]
            },
            {
                "name": "转义引号",
                "type": "option",
                "value": ["单引号", "双引号", "反勾号"]
            },
            {
                "name": "JSON兼容",
                "type": "boolean",
                "value": false
            },
            {
                "name": "ES6兼容",
                "type": "boolean",
                "value": true
            },
            {
                "name": "十六进制大写",
                "type": "boolean",
                "value": false
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     *
     * @example
     * EscapeString.run("Don't do that", [])
     * > "Don\'t do that"
     * EscapeString.run(`Hello
     * World`, [])
     * > "Hello\nWorld"
     */
    run(input, args) {
        const level = args[0],
            quotes = args[1],
            jsonCompat = args[2],
            es6Compat = args[3],
            lowercaseHex = !args[4];

        const quotesDict = {
            "单引号": "single",
            "双引号": "double",
            "反勾号": "backtick"
        };

        return jsesc(input, {
            quotes: quotesDict[quotes],
            es6: es6Compat,
            escapeEverything: level === "所有",
            minimal: level === "最少",
            json: jsonCompat,
            lowercaseHex: lowercaseHex,
        });
    }

}

export default EscapeString;
