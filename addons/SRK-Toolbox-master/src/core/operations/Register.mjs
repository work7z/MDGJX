/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import Dish from "../Dish.mjs";
import XRegExp from "xregexp";
import { isWorkerEnvironment } from "../Utils.mjs";

/**
 * Register operation
 */
class Register extends Operation {

    /**
     * Register constructor
     */
    constructor() {
        super();

        this.name = "Register";
        this.flowControl = true;
        this.module = "Regex";
        this.description = "从输入中提取数据并存储在“寄存器（Register）”中，用于作为变量传递到下面的操作参数中。使用正则表达式捕获组来选择需要提取的数据。<br><br>在其它操作的参数中使用<code>$Rn</code>（n是寄存器编号，从0开始）来访问存储的值。<br><br>例如：<br>输入：<code>Test</code><br>提取规则：<code>(.*)</code><br>参数：<code>$R0</code>就代表<code>Test</code><br><br>寄存器语法可以用反斜线来转义。例如：<code>\\$R0</code>代表字符<code>$R0</code>而不是<code>Test</code>。";
        this.infoURL = "https://wikipedia.org/wiki/Regular_expression#Syntax";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "提取规则",
                "type": "binaryString",
                "value": "([\\s\\S]*)"
            },
            {
                "name": "大小写不敏感（i）",
                "type": "boolean",
                "value": true
            },
            {
                "name": "多行匹配（m）",
                "type": "boolean",
                "value": false
            },
            {
                "name": "点允许匹配换行符（s）",
                "type": "boolean",
                "value": false
            }
        ];
    }

    /**
     * @param {Object} state - The current state of the recipe.
     * @param {number} state.progress - The current position in the recipe.
     * @param {Dish} state.dish - The Dish being operated on.
     * @param {Operation[]} state.opList - The list of operations in the recipe.
     * @returns {Object} The updated state of the recipe.
     */
    async run(state) {
        const ings = state.opList[state.progress].ingValues;
        const [extractorStr, i, m, s] = ings;

        let modifiers = "";
        if (i) modifiers += "i";
        if (m) modifiers += "m";
        if (s) modifiers += "s";

        const extractor = new XRegExp(extractorStr, modifiers),
            input = await state.dish.get(Dish.STRING),
            registers = input.match(extractor);

        if (!registers) return state;

        if (isWorkerEnvironment()) {
            self.setRegisters(state.forkOffset + state.progress, state.numRegisters, registers.slice(1));
        }

        /**
         * Replaces references to registers (e.g. $R0) with the contents of those registers.
         *
         * @param {string} str
         * @returns {string}
         */
        function replaceRegister(str) {
            // Replace references to registers ($Rn) with contents of registers
            return str.replace(/(\\*)\$R(\d{1,2})/g, (match, slashes, regNum) => {
                const index = parseInt(regNum, 10) + 1;
                if (index <= state.numRegisters || index >= state.numRegisters + registers.length)
                    return match;
                if (slashes.length % 2 !== 0) return match.slice(1); // Remove escape
                return slashes + registers[index - state.numRegisters];
            });
        }

        // Step through all subsequent ops and replace registers in args with extracted content
        for (let i = state.progress + 1; i < state.opList.length; i++) {
            if (state.opList[i].disabled) continue;

            let args = state.opList[i].ingValues;
            args = args.map(arg => {
                if (typeof arg !== "string" && typeof arg !== "object") return arg;

                if (typeof arg === "object" && Object.prototype.hasOwnProperty.call(arg, "string")) {
                    arg.string = replaceRegister(arg.string);
                    return arg;
                }
                return replaceRegister(arg);
            });
            state.opList[i].ingValues = args;
        }

        state.numRegisters += registers.length - 1;
        return state;
    }

}

export default Register;
