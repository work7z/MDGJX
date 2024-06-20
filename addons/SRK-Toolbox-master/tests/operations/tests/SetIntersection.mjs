/**
 * Set Intersection tests.
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
        name: "Set  Intersection",
        input: "1 2 3 4 5\n\n3 4 5 6 7",
        expectedOutput: "3 4 5",
        recipeConfig: [
            {
                op: "交集",
                args: ["\n\n", " "],
            },
        ],
    },
    {
        name: "Set Intersection: only one set",
        input: "1 2 3 4 5 6 7 8",
        expectedOutput: "集合数量错误，你可能需要调整集合分隔符或者添加一些数据。",
        recipeConfig: [
            {
                op: "交集",
                args: ["\n\n", " "],
            },
        ],
    },
    {
        name: "Set Intersection: item delimiter",
        input: "1-2-3-4-5\n\n3-4-5-6-7",
        expectedOutput: "3-4-5",
        recipeConfig: [
            {
                op: "交集",
                args: ["\n\n", "-"],
            },
        ],
    },
    {
        name: "Set Intersection: sample delimiter",
        input: "1-2-3-4-5z3-4-5-6-7",
        expectedOutput: "3-4-5",
        recipeConfig: [
            {
                op: "交集",
                args: ["z", "-"],
            },
        ],
    }
]);
