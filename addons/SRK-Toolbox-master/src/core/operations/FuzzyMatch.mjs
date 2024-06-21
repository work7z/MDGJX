/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2021
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import {fuzzyMatch, calcMatchRanges, DEFAULT_WEIGHTS} from "../lib/FuzzyMatch.mjs";
import Utils from "../Utils.mjs";

/**
 * Fuzzy Match operation
 */
class FuzzyMatch extends Operation {

    /**
     * FuzzyMatch constructor
     */
    constructor() {
        super();

        this.name = "模糊匹配";
        this.module = "Default";
        this.description = "根据指定的权重对输入进行模糊匹配。<br><br>例如：搜索 <code>dpan</code> 可匹配 <code><b>D</b>on't <b>Pan</b>ic</code>";
        this.infoURL = "https://wikipedia.org/wiki/Fuzzy_matching_(computer-assisted_translation)";
        this.inputType = "string";
        this.outputType = "html";
        this.args = [
            {
                name: "查找内容",
                type: "binaryString",
                value: ""
            },
            {
                name: "顺序加成",
                type: "number",
                value: DEFAULT_WEIGHTS.sequentialBonus,
                hint: "如果匹配内容相邻则提高权重"
            },
            {
                name: "分隔符加成",
                type: "number",
                value: DEFAULT_WEIGHTS.separatorBonus,
                hint: "如果匹配内容刚好在分隔符后则提高权重"
            },
            {
                name: "驼峰加成",
                type: "number",
                value: DEFAULT_WEIGHTS.camelBonus,
                hint: "如果匹配内容是大写而上一个匹配是小写则提高权重"
            },
            {
                name: "首字母加成",
                type: "number",
                value: DEFAULT_WEIGHTS.firstLetterBonus,
                hint: "如果首字母匹配则提高权重"
            },
            {
                name: "前置字母惩罚",
                type: "number",
                value: DEFAULT_WEIGHTS.leadingLetterPenalty,
                hint: "根据首个匹配之前的字符数降低权重"
            },
            {
                name: "前置字母惩罚最大值",
                type: "number",
                value: DEFAULT_WEIGHTS.maxLeadingLetterPenalty,
                hint: "前置字母惩罚可降低权重的最大值"
            },
            {
                name: "不匹配字母惩罚",
                type: "number",
                value: DEFAULT_WEIGHTS.unmatchedLetterPenalty
            },
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {html}
     */
    run(input, args) {
        const searchStr = args[0];
        const weights = {
            sequentialBonus: args[1],
            separatorBonus: args[2],
            camelBonus: args[3],
            firstLetterBonus: args[4],
            leadingLetterPenalty: args[5],
            maxLeadingLetterPenalty: args[6],
            unmatchedLetterPenalty: args[7]
        };
        const matches = fuzzyMatch(searchStr, input, true, weights);

        if (!matches) {
            return "未找到对应内容。";
        }

        let result = "", pos = 0, hlClass = "hl1";
        matches.forEach(([matches, score, idxs]) => {
            const matchRanges = calcMatchRanges(idxs);

            matchRanges.forEach(([start, length], i) => {
                result += Utils.escapeHtml(input.slice(pos, start));
                if (i === 0) result += `<span class="${hlClass}">`;
                pos = start + length;
                result += `<b>${Utils.escapeHtml(input.slice(start, pos))}</b>`;
            });
            result += "</span>";
            hlClass = hlClass === "hl1" ? "hl2" : "hl1";
        });

        result += Utils.escapeHtml(input.slice(pos, input.length));

        return result;
    }

}

export default FuzzyMatch;
