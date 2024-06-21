/**
 * @author j433866 [j433866@gmail.com]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import Recipe from "../Recipe.mjs";
import Dish from "../Dish.mjs";

/**
 * Subsection operation
 */
class Subsection extends Operation {

    /**
     * Subsection constructor
     */
    constructor() {
        super();

        this.name = "Subsection";
        this.flowControl = true;
        this.module = "Default";
        this.description = "使用正则对输入数据进行匹配，然后对匹配到的内容进行下面的所有操作。<br><br>最多只能使用一个捕获组，整个流程只会针对这个捕获组的匹配内容进行操作。如果有多个捕获组，只会使用第一个的内容。<br><br>使用Merge操作来重置Subsection操作的效果。";
        this.infoURL = "";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "匹配内容（正则）",
                "type": "string",
                "value": ""
            },
            {
                "name": "大小写不敏感（i）",
                "type": "boolean",
                "value": true
            },
            {
                "name": "全局匹配（g）",
                "type": "boolean",
                "value": true
            },
            {
                "name": "忽略报错",
                "type": "boolean",
                "value": false
            }
        ];
    }

    /**
     * @param {Object} state - The current state of the recipe.
     * @param {number} state.progress - The current position in the recipe.
     * @param {Dish} state.dish - The Dish being operated on
     * @param {Operation[]} state.opList - The list of operations in the recipe
     * @returns {Object} - The updated state of the recipe
     */
    async run(state) {
        const opList    = state.opList,
            inputType   = opList[state.progress].inputType,
            outputType  = opList[state.progress].outputType,
            input       = await state.dish.get(inputType),
            ings        = opList[state.progress].ingValues,
            [section, caseSensitive, global, ignoreErrors] = ings,
            subOpList   = [];

        if (input && section !== "") {
            // Set to 1 as if we are here, then there is one, the current one.
            let numOp = 1;
            // Create subOpList for each tranche to operate on
            // all remaining operations unless we encounter a Merge
            for (let i = state.progress + 1; i < opList.length; i++) {
                if (opList[i].name === "Merge" && !opList[i].disabled) {
                    numOp--;
                    if (numOp === 0 || opList[i].ingValues[0])
                        break;
                    else
                        // Not this subsection's Merge.
                        subOpList.push(opList[i]);
                } else {
                    if (opList[i].name === "Fork" || opList[i].name === "Subsection")
                        numOp++;
                    subOpList.push(opList[i]);
                }
            }

            let flags = "",
                inOffset = 0,
                output = "",
                m,
                progress = 0;

            if (!caseSensitive) flags += "i";
            if (global) flags += "g";

            const regex = new RegExp(section, flags),
                recipe = new Recipe();

            recipe.addOperations(subOpList);
            state.forkOffset += state.progress + 1;

            // Take a deep(ish) copy of the ingredient values
            const ingValues = subOpList.map(op => JSON.parse(JSON.stringify(op.ingValues)));
            let matched = false;

            // Run recipe over each match
            while ((m = regex.exec(input))) {
                matched = true;
                // Add up to match
                let matchStr = m[0];

                if (m.length === 1) { // No capture groups
                    output += input.slice(inOffset, m.index);
                    inOffset = m.index + m[0].length;
                } else if (m.length >= 2) {
                    matchStr = m[1];

                    // Need to add some of the matched string that isn't in the capture group
                    output += input.slice(inOffset, m.index + m[0].indexOf(m[1]));
                    // Set i to be after the end of the first capture group
                    inOffset = m.index + m[0].indexOf(m[1]) + m[1].length;
                }

                // Baseline ing values for each tranche so that registers are reset
                recipe.opList.forEach((op, i) => {
                    op.ingValues = JSON.parse(JSON.stringify(ingValues[i]));
                });

                const dish = new Dish();
                dish.set(matchStr, inputType);

                try {
                    progress = await recipe.execute(dish, 0, state);
                } catch (err) {
                    if (!ignoreErrors) {
                        throw err;
                    }
                    progress = err.progress + 1;
                }
                output += await dish.get(outputType);
                if (!regex.global) break;
            }

            // If no matches were found, advance progress to after a Merge op
            // Otherwise, the operations below Subsection will be run on all the input data
            if (!matched) {
                state.progress += subOpList.length + 1;
            }

            output += input.slice(inOffset);
            state.progress += progress;
            state.dish.set(output, outputType);
        }
        return state;
    }

}

export default Subsection;
