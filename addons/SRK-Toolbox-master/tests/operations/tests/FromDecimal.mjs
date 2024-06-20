/**
 * From Decimal tests
 *
 * @author qistoph
 * @copyright Crown Copyright 2018
 * @licence Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */
import TestRegister from "../../lib/TestRegister.mjs";

TestRegister.addTests([
    {
        name: "From Decimal",
        input: "83 97 109 112 108 101 32 84 101 120 116",
        expectedOutput: "Sample Text",
        recipeConfig: [
            {
                op: "十进制转字符",
                args: ["空格", false]
            },
        ],
    },
    {
        name: "From Decimal with negatives",
        input: "-130,-140,-152,-151,115,33,0,-1",
        expectedOutput: "~this!\u0000\u00ff",
        recipeConfig: [
            {
                op: "十进制转字符",
                args: ["逗号", true]
            },
        ],
    },
]);
