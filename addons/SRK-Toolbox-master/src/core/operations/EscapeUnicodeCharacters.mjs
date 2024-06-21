/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";

/**
 * Escape Unicode Characters operation
 */
class EscapeUnicodeCharacters extends Operation {

    /**
     * EscapeUnicodeCharacters constructor
     */
    constructor() {
        super();

        this.name = "Unicode字符转义";
        this.module = "Default";
        this.description = "把Unicode字符根据选定的前缀格式进行转义。<br><br>支持以下前缀：<ul><li><code>\\u</code></li><li><code>%u</code></li><li><code>U+</code></li></ul>例： <code>σου</code> 编码为 <code>\\u03C3\\u03BF\\u03C5</code>";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "前缀",
                "type": "option",
                "value": ["\\u", "%u", "U+"]
            },
            {
                "name": "转义所有字符",
                "type": "boolean",
                "value": false
            },
            {
                "name": "填充位数",
                "type": "number",
                "value": 4
            },
            {
                "name": "十六进制大写",
                "type": "boolean",
                "value": true
            }
        ];
        this.checks = [
            {
                pattern: "\\\\u(?:[\\da-f]{4,6})",
                flags: "i",
                args: ["\\u"]
            },
            {
                pattern: "%u(?:[\\da-f]{4,6})",
                flags: "i",
                args: ["%u"]
            },
            {
                pattern: "U\\+(?:[\\da-f]{4,6})",
                flags: "i",
                args: ["U+"]
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const regexWhitelist = /[ -~]/i,
            [prefix, encodeAll, padding, uppercaseHex] = args;

        let output = "",
            character = "";

        for (let i = 0; i < input.length; i++) {
            character = input[i];
            if (!encodeAll && regexWhitelist.test(character)) {
                // It’s a printable ASCII character so don’t escape it.
                output += character;
                continue;
            }

            let cp = character.codePointAt(0).toString(16);
            if (uppercaseHex) cp = cp.toUpperCase();
            output += prefix + cp.padStart(padding, "0");
        }

        return output;
    }

}

export default EscapeUnicodeCharacters;
