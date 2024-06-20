/**
 * @author masq [github.cyberchef@masq.cc]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";

/**
 * From Case Insensitive Regex operation
 */
class FromCaseInsensitiveRegex extends Operation {

    /**
     * FromCaseInsensitiveRegex constructor
     */
    constructor() {
        super();

        this.name = "从大小写不敏感正则恢复";
        this.module = "Default";
        this.description = "将大小写不敏感正则字符串恢复为大小写敏感形式（无法保证转换后的大小写形式正确），用于之前正则i选项不能用但现在能用了，所以你想转换回来的场合。<br><br>例如：<code>[mM][oO][zZ][iI][lL][lL][aA]/[0-9].[0-9] .*</code> 转换为 <code>Mozilla/[0-9].[0-9] .*</code>";
        this.infoURL = "https://wikipedia.org/wiki/Regular_expression";
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
        return input.replace(/\[[a-z]{2}\]/ig, m => m[1].toUpperCase() === m[2].toUpperCase() ? m[1] : m);
    }
}

export default FromCaseInsensitiveRegex;
