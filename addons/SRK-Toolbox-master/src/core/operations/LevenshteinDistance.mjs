/**
 * @author mikecat
 * @copyright Crown Copyright 2023
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";

/**
 * Levenshtein Distance operation
 */
class LevenshteinDistance extends Operation {

    /**
     * LevenshteinDistance constructor
     */
    constructor() {
        super();

        this.name = "莱文斯坦距离";
        this.module = "Default";
        this.description = "莱文斯坦距离，又称Levenshtein距离，是编辑距离的一种。指两个字串之间，由一个转成另一个所需的最少编辑操作次数。";
        this.infoURL = "https://wikipedia.org/wiki/Levenshtein_distance";
        this.inputType = "string";
        this.outputType = "number";
        this.args = [
            {
                name: "分隔符",
                type: "binaryString",
                value: "\\n"
            },
            {
                name: "插入操作消耗步数",
                type: "number",
                value: 1
            },
            {
                name: "删除操作消耗步数",
                type: "number",
                value: 1
            },
            {
                name: "替换操作消耗步数",
                type: "number",
                value: 1
            },
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {number}
     */
    run(input, args) {
        const [delim, insCost, delCost, subCost] = args;
        const samples = input.split(delim);
        if (samples.length !== 2) {
            throw new OperationError("错误：计算莱文斯坦距离需要两个字符串，请确保输入按照给定分隔符的两个字符串。");
        }
        if (insCost < 0 || delCost < 0 || subCost < 0) {
            throw new OperationError("消耗量不能为负数。");
        }
        const src = samples[0], dest = samples[1];
        let currentCost = new Array(src.length + 1);
        let nextCost = new Array(src.length + 1);
        for (let i = 0; i < currentCost.length; i++) {
            currentCost[i] = delCost * i;
        }
        for (let i = 0; i < dest.length; i++) {
            const destc = dest.charAt(i);
            nextCost[0] = currentCost[0] + insCost;
            for (let j = 0; j < src.length; j++) {
                let candidate;
                // insertion
                let optCost = currentCost[j + 1] + insCost;
                // deletion
                candidate = nextCost[j] + delCost;
                if (candidate < optCost) optCost = candidate;
                // substitution or matched character
                candidate = currentCost[j];
                if (src.charAt(j) !== destc) candidate += subCost;
                if (candidate < optCost) optCost = candidate;
                // store calculated cost
                nextCost[j + 1] = optCost;
            }
            const tempCost = nextCost;
            nextCost = currentCost;
            currentCost = tempCost;
        }

        return currentCost[currentCost.length - 1];
    }

}

export default LevenshteinDistance;
