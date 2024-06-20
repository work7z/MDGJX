/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";
import XRegExp from "xregexp";

/**
 * Find / Replace operation
 */
class FindReplace extends Operation {

    /**
     * FindReplace constructor
     */
    constructor() {
        super();

        this.name = "查找/替换";
        this.module = "Regex";
        this.description = "把第一个字符串用第二个字符串替换。<br><br>支持正则表达式（regex）、简单字符串和扩展字符串（即使用转义字符\\n, \\r, \\t, \\b, \\f和用\\x表示的十六进制字节，例如 \\x00 代表空字节）。";
        this.infoURL = "https://wikipedia.org/wiki/Regular_expression";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "查找内容",
                "type": "toggleString",
                "value": "",
                "toggleValues": ["正则表达式", "扩展 (\\n, \\t, \\x...)", "简单字符串"]
            },
            {
                "name": "替换",
                "type": "binaryString",
                "value": ""
            },
            {
                "name": "全局匹配（g）",
                "type": "boolean",
                "value": true
            },
            {
                "name": "不区分大小写（i）",
                "type": "boolean",
                "value": false
            },
            {
                "name": "匹配多行（m）",
                "type": "boolean",
                "value": true
            },
            {
                "name": "点（.）匹配所有字符（s）",
                "type": "boolean",
                "value": false
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [{option: type}, replace, g, i, m, s] = args;
        let find = args[0].string,
            modifiers = "";

        if (g) modifiers += "g";
        if (i) modifiers += "i";
        if (m) modifiers += "m";
        if (s) modifiers += "s";

        if (type === "正则表达式") {
            find = new XRegExp(find, modifiers);
            return input.replace(find, replace);
        }

        if (type.indexOf("扩展") === 0) {
            find = Utils.parseEscapedChars(find);
        }

        find = new XRegExp(Utils.escapeRegex(find), modifiers);

        return input.replace(find, replace);
    }

}

export default FindReplace;
