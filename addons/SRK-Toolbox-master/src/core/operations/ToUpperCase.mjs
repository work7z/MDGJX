/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";

/**
 * To Upper case operation
 */
class ToUpperCase extends Operation {

    /**
     * ToUpperCase constructor
     */
    constructor() {
        super();

        this.name = "转换为大写";
        this.module = "Default";
        this.description = "将输入字符串转换成大写，可选限制为每个单词、句子或段落首字母大写。";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "粒度",
                "type": "option",
                "value": ["所有字符", "单词", "句子", "段落"]
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        if (!args || args.length === 0) {
            throw new OperationError("未提供操作粒度信息。");
        }

        const scope = args[0];

        if (scope === "所有字符") {
            return input.toUpperCase();
        }

        const scopeRegex = {
            "单词": /(\b\w)/gi,
            "句子": /(?:\.|^)\s*(\b\w)/gi,
            "段落": /(?:\n|^)\s*(\b\w)/gi
        }[scope];

        if (scopeRegex === undefined) {
            throw new OperationError("无效的操作粒度。");
        }

        // Use the regex to capitalize the input
        return input.replace(scopeRegex, function(m) {
            return m.toUpperCase();
        });
    }

    /**
     * Highlight To Upper case
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
     * Highlight To Upper case in reverse
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

export default ToUpperCase;
