/**
 * @author masq [github.cyberchef@masq.cc]
 * @author n1073645
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";

/**
 * To Case Insensitive Regex operation
 */
class ToCaseInsensitiveRegex extends Operation {

    /**
     * ToCaseInsensitiveRegex constructor
     */
    constructor() {
        super();

        this.name = "转换为大小写不敏感正则";
        this.module = "Default";
        this.description = "把大小写敏感正则字符串转换为大小写不敏感形式，用于无法使用正则i选项的场合。<br><br>例如：<code>Mozilla/[0-9].[0-9] .*</code> 转换为 <code>[mM][oO][zZ][iI][lL][lL][aA]/[0-9].[0-9] .*</code>";
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

        /**
         * Simulates look behind behaviour since javascript doesn't support it.
         *
         * @param {string} input
         * @returns {string}
         */
        function preProcess(input) {
            let result = "";
            for (let i = 0; i < input.length; i++) {
                const temp = input.charAt(i);
                if (temp.match(/[a-zA-Z]/g) && (input.charAt(i-1) !== "-") && (input.charAt(i+1) !== "-"))
                    result += "[" + temp.toLowerCase() + temp.toUpperCase() + "]";
                else
                    result += temp;
            }
            return result;
        }

        try {
            RegExp(input);
        } catch (error) {
            throw new OperationError("无效的正则表达式（请注意此版本的Node不支持正则的后行断言）。");
        }

        // Example: [test] -> [[tT][eE][sS][tT]]
        return preProcess(input)

            // Example: [A-Z] -> [A-Za-z]
            .replace(/([A-Z]-[A-Z]|[a-z]-[a-z])/g, m => `${m[0].toUpperCase()}-${m[2].toUpperCase()}${m[0].toLowerCase()}-${m[2].toLowerCase()}`)

            // Example: [H-d] -> [A-DH-dh-z]
            .replace(/[A-Z]-[a-z]/g, m => `A-${m[2].toUpperCase()}${m}${m[0].toLowerCase()}-z`)

            // Example: [!-D] -> [!-Da-d]
            .replace(/\\?[ -@]-[A-Z]/g, m => `${m}a-${m[2].toLowerCase()}`)

            // Example: [%-^] -> [%-^a-z]
            .replace(/\\?[ -@]-\\?[[-`]/g, m => `${m}a-z`)

            // Example: [K-`] -> [K-`k-z]
            .replace(/[A-Z]-\\?[[-`]/g, m => `${m}${m[0].toLowerCase()}-z`)

            // Example: [[-}] -> [[-}A-Z]
            .replace(/\\?[[-`]-\\?[{-~]/g, m => `${m}A-Z`)

            // Example: [b-}] -> [b-}B-Z]
            .replace(/[a-z]-\\?[{-~]/g, m => `${m}${m[0].toUpperCase()}-Z`)

            // Example: [<-j] -> [<-z]
            .replace(/\\?[ -@]-[a-z]/g, m => `${m[0]}-z`)

            // Example: [^-j] -> [A-J^-j]
            .replace(/\\?[[-`]-[a-z]/g, m => `A-${m[2].toUpperCase()}${m}`);

    }
}

export default ToCaseInsensitiveRegex;
