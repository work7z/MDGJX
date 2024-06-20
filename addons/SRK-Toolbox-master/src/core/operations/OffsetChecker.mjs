/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";
import OperationError from "../errors/OperationError.mjs";

/**
 * Offset checker operation
 */
class OffsetChecker extends Operation {

    /**
     * OffsetChecker constructor
     */
    constructor() {
        super();

        this.name = "偏移检测";
        this.module = "Default";
        this.description = "高亮显示在所有给定内容中位置相同的字符，多个输入由给定的分隔符分隔。";
        this.inputType = "string";
        this.outputType = "html";
        this.args = [
            {
                "name": "分隔符",
                "type": "binaryString",
                "value": "\\n\\n"
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {html}
     */
    run(input, args) {
        const sampleDelim = args[0],
            samples = input.split(sampleDelim),
            outputs = new Array(samples.length);
        let i = 0,
            s = 0,
            match = false,
            inMatch = false,
            chr;

        if (!samples || samples.length < 2) {
            throw new OperationError("内容不足，至少需要两组文本，请添加更多内容或重新选择分隔符。");
        }

        // Initialise output strings
        outputs.fill("", 0, samples.length);

        // Loop through each character in the first sample
        for (i = 0; i < samples[0].length; i++) {
            chr = samples[0][i];
            match = false;

            // Loop through each sample to see if the chars are the same
            for (s = 1; s < samples.length; s++) {
                if (samples[s][i] !== chr) {
                    match = false;
                    break;
                }
                match = true;
            }

            // Write output for each sample
            for (s = 0; s < samples.length; s++) {
                if (samples[s].length <= i) {
                    if (inMatch) outputs[s] += "</span>";
                    if (s === samples.length - 1) inMatch = false;
                    continue;
                }

                if (match && !inMatch) {
                    outputs[s] += "<span class='hl5'>" + Utils.escapeHtml(samples[s][i]);
                    if (samples[s].length === i + 1) outputs[s] += "</span>";
                    if (s === samples.length - 1) inMatch = true;
                } else if (!match && inMatch) {
                    outputs[s] += "</span>" + Utils.escapeHtml(samples[s][i]);
                    if (s === samples.length - 1) inMatch = false;
                } else {
                    outputs[s] += Utils.escapeHtml(samples[s][i]);
                    if (inMatch && samples[s].length === i + 1) {
                        outputs[s] += "</span>";
                        if (samples[s].length - 1 !== i) inMatch = false;
                    }
                }

                if (samples[0].length - 1 === i) {
                    if (inMatch) outputs[s] += "</span>";
                    outputs[s] += Utils.escapeHtml(samples[s].substring(i + 1));
                }
            }
        }

        return outputs.join(sampleDelim);
    }

}

export default OffsetChecker;
