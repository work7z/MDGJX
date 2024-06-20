/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";
import * as JsDiff from "diff";
import OperationError from "../errors/OperationError.mjs";

/**
 * Diff operation
 */
class Diff extends Operation {

    /**
     * Diff constructor
     */
    constructor() {
        super();

        this.name = "Diff";
        this.module = "Diff";
        this.description = "比较两个输入内容（分隔符自选）并高亮显示之间的差异。";
        this.infoURL = "https://wikipedia.org/wiki/File_comparison";
        this.inputType = "string";
        this.outputType = "html";
        this.args = [
            {
                "name": "内容分隔符",
                "type": "binaryString",
                "value": "\\n\\n"
            },
            {
                "name": "Diff粒度",
                "type": "option",
                "value": ["字符", "单词", "行", "句子", "CSS", "JSON"]
            },
            {
                "name": "显示增加部分",
                "type": "boolean",
                "value": true
            },
            {
                "name": "显示删除部分",
                "type": "boolean",
                "value": true
            },
            {
                "name": "仅显示差异部分",
                "type": "boolean",
                "value": false
            },
            {
                "name": "忽略空白字符",
                "type": "boolean",
                "value": false,
                "hint": "适用于按单词或按行Diff"
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {html}
     */
    run(input, args) {
        const [
                sampleDelim,
                diffBy,
                showAdded,
                showRemoved,
                showSubtraction,
                ignoreWhitespace
            ] = args,
            samples = input.split(sampleDelim);
        let output = "",
            diff;

        // Node and Webpack load modules slightly differently
        const jsdiff = JsDiff.default ? JsDiff.default : JsDiff;

        if (!samples || samples.length !== 2) {
            throw new OperationError("输入内容数量不正确，请添加足够的内容或重新选择分隔符。");
        }

        switch (diffBy) {
            case "字符":
                diff = jsdiff.diffChars(samples[0], samples[1]);
                break;
            case "单词":
                if (ignoreWhitespace) {
                    diff = jsdiff.diffWords(samples[0], samples[1]);
                } else {
                    diff = jsdiff.diffWordsWithSpace(samples[0], samples[1]);
                }
                break;
            case "行":
                if (ignoreWhitespace) {
                    diff = jsdiff.diffTrimmedLines(samples[0], samples[1]);
                } else {
                    diff = jsdiff.diffLines(samples[0], samples[1]);
                }
                break;
            case "句子":
                diff = jsdiff.diffSentences(samples[0], samples[1]);
                break;
            case "CSS":
                diff = jsdiff.diffCss(samples[0], samples[1]);
                break;
            case "JSON":
                diff = jsdiff.diffJson(samples[0], samples[1]);
                break;
            default:
                throw new OperationError("无效的“Diff粒度”选项");
        }

        for (let i = 0; i < diff.length; i++) {
            if (diff[i].added) {
                if (showAdded) output += "<ins>" + Utils.escapeHtml(diff[i].value) + "</ins>";
            } else if (diff[i].removed) {
                if (showRemoved) output += "<del>" + Utils.escapeHtml(diff[i].value) + "</del>";
            } else if (!showSubtraction) {
                output += Utils.escapeHtml(diff[i].value);
            }
        }

        return output;
    }

}

export default Diff;
