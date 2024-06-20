/**
 * @author klaxon [klaxon@veyr.com]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import { GenerateParagraphs, GenerateSentences, GenerateWords, GenerateBytes } from "../lib/LoremIpsum.mjs";

/**
 * Generate Lorem Ipsum operation
 */
class GenerateLoremIpsum extends Operation {

    /**
     * GenerateLoremIpsum constructor
     */
    constructor() {
        super();

        this.name = "生成Lorem Ipsum";
        this.module = "Default";
        this.description = "生成给定长度的lorem ipsum占位文本。";
        this.infoURL = "https://wikipedia.org/wiki/Lorem_ipsum";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "长度",
                "type": "number",
                "value": "3"
            },
            {
                "name": "长度单位",
                "type": "option",
                "value": ["段落", "句子", "单词", "字节"]
            }

        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [length, lengthType] = args;
        if (length < 1) {
            throw new OperationError("长度必须大于0");
        }
        switch (lengthType) {
            case "段落":
                return GenerateParagraphs(length);
            case "句子":
                return GenerateSentences(length);
            case "单词":
                return GenerateWords(length);
            case "字节":
                return GenerateBytes(length);
            default:
                throw new OperationError("无效的长度类型");

        }
    }

}

export default GenerateLoremIpsum;
