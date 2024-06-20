/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";
import {toHex, fromHex} from "../lib/Hex.mjs";
import OperationError from "../errors/OperationError.mjs";

/**
 * Swap endianness operation
 */
class SwapEndianness extends Operation {

    /**
     * SwapEndianness constructor
     */
    constructor() {
        super();

        this.name = "端序转换";
        this.module = "Default";
        this.description = "转换输入数据的大小端序。可以读取十六进制或原始文本。输出格式与输入保持一致。";
        this.infoURL = "https://wikipedia.org/wiki/Endianness";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "数据格式",
                "type": "option",
                "value": ["十六进制", "原始文本"]
            },
            {
                "name": "字长 (字节)",
                "type": "number",
                "value": 4
            },
            {
                "name": "填充不完整字编码",
                "type": "boolean",
                "value": true
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [dataFormat, wordLength, padIncompleteWords] = args,
            result = [],
            words = [];
        let i = 0,
            j = 0,
            data = [];

        if (wordLength <= 0) {
            throw new OperationError("字长必须大于0");
        }

        // Convert input to raw data based on specified data format
        switch (dataFormat) {
            case "十六进制":
                data = fromHex(input);
                break;
            case "原始文本":
                data = Utils.strToByteArray(input);
                break;
            default:
                data = input;
        }

        // Split up into words
        for (i = 0; i < data.length; i += wordLength) {
            const word = data.slice(i, i + wordLength);

            // Pad word if too short
            if (padIncompleteWords && word.length < wordLength) {
                for (j = word.length; j < wordLength; j++) {
                    word.push(0);
                }
            }

            words.push(word);
        }

        // Swap endianness and flatten
        for (i = 0; i < words.length; i++) {
            j = words[i].length;
            while (j--) {
                result.push(words[i][j]);
            }
        }

        // Convert data back to specified data format
        switch (dataFormat) {
            case "十六进制":
                return toHex(result);
            case "原始文本":
                return Utils.byteArrayToUtf8(result);
            default:
                return result;
        }
    }

    /**
     * Highlight Swap endianness
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
     * Highlight Swap endianness in reverse
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

export default SwapEndianness;
