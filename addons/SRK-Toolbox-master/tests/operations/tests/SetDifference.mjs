/**
 * Set Difference tests.
 *
 * @author d98762625
 *
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */
import TestRegister from "../../lib/TestRegister.mjs";

TestRegister.addTests([
    {
        name: "Set Difference",
        input: "1 2 3 4 5\n\n3 4 5 6 7",
        expectedOutput: "1 2",
        recipeConfig: [
            {
                op: "补集",
                args: ["\n\n", " "],
            },
        ],
    },
    {
        name: "Set Difference: wrong sample count",
        input: "1 2 3 4 5_3_4 5 6 7",
        expectedOutput: "集合数量错误，你可能需要调整集合分隔符或者添加一些数据。",
        recipeConfig: [
            {
                op: "补集",
                args: [" ", "_"],
            },
        ],
    },
    {
        name: "Set Difference: item delimiter",
        input: "1;2;3;4;5\n\n3;4;5;6;7",
        expectedOutput: "1;2",
        recipeConfig: [
            {
                op: "补集",
                args: ["\n\n", ";"],
            },
        ],
    },
    {
        name: "Set Difference: sample delimiter",
        input: "1;2;3;4;5===3;4;5;6;7",
        expectedOutput: "1;2",
        recipeConfig: [
            {
                op: "补集",
                args: ["===", ";"],
            },
        ],
    },
]);
