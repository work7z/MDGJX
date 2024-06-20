/**
 * @author tlwr [toby@toby.codes]
 * @copyright Crown Copyright 2017
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import snakeCase from "lodash/snakeCase.js";
import Operation from "../Operation.mjs";
import { replaceVariableNames } from "../lib/Code.mjs";

/**
 * To Snake case operation
 */
class ToSnakeCase extends Operation {

    /**
     * ToSnakeCase constructor
     */
    constructor() {
        super();

        this.name = "转换为Snake case";
        this.module = "Code";
        this.description = "将输入字符串转换为snake case。\n<br><br>\nSnake case是全小写并使用下划线作为单词分隔的格式。\n<br><br>\n例如： this_is_snake_case\n<br><br>\n勾选“尝试识别上下文”后此操作将尝试只转换函数和变量名。";
        this.infoURL = "https://wikipedia.org/wiki/Snake_case";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "尝试识别上下文",
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
        const smart = args[0];

        if (smart) {
            return replaceVariableNames(input, snakeCase);
        } else {
            return snakeCase(input);
        }
    }
}

export default ToSnakeCase;
