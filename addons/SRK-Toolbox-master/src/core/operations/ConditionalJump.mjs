/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import Dish from "../Dish.mjs";
import { getLabelIndex } from "../lib/FlowControl.mjs";

/**
 * Conditional Jump operation
 */
class ConditionalJump extends Operation {

    /**
     * ConditionalJump constructor
     */
    constructor() {
        super();

        this.name = "Conditional Jump";
        this.flowControl = true;
        this.module = "Default";
        this.description = "按给定的条件（正则表达式）跳转到给定的标签位置。";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "匹配规则（正则）",
                "type": "string",
                "value": ""
            },
            {
                "name": "反向匹配",
                "type": "boolean",
                "value": false
            },
            {
                "name": "标签名称",
                "type": "shortString",
                "value": ""
            },
            {
                "name": "最大跳转次数（如果向后跳转）",
                "type": "number",
                "value": 10
            }
        ];
    }

    /**
     * @param {Object} state - The current state of the recipe.
     * @param {number} state.progress - The current position in the recipe.
     * @param {Dish} state.dish - The Dish being operated on.
     * @param {Operation[]} state.opList - The list of operations in the recipe.
     * @param {number} state.numJumps - The number of jumps taken so far.
     * @returns {Object} The updated state of the recipe.
     */
    async run(state) {
        const ings   = state.opList[state.progress].ingValues,
            dish     = state.dish,
            [regexStr, invert, label, maxJumps] = ings,
            jmpIndex = getLabelIndex(label, state);

        if (state.numJumps >= maxJumps || jmpIndex === -1) {
            state.numJumps = 0;
            return state;
        }

        if (regexStr !== "") {
            const str = await dish.get(Dish.STRING);
            const strMatch = str.search(regexStr) > -1;
            if (!invert && strMatch || invert && !strMatch) {
                state.progress = jmpIndex;
                state.numJumps++;
            } else {
                state.numJumps = 0;
            }
        }

        return state;
    }

}

export default ConditionalJump;
