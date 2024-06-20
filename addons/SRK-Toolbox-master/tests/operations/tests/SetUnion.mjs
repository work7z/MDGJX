/**
 * Set Union tests.
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
        name: "Set Union: Nothing",
        input: "\n\n",
        expectedOutput: "",
        recipeConfig: [
            {
                op: "并集",
                args: ["\n\n", " "],
            },
        ],
    },
    {
        name: "并集",
        input: "1 2 3 4 5\n\n3 4 5 6 7",
        expectedOutput: "1 2 3 4 5 6 7",
        recipeConfig: [
            {
                op: "并集",
                args: ["\n\n", " "],
            },
        ],
    },
    {
        name: "Set Union: invalid sample number",
        input: "1 2 3 4 5\n\n3 4 5 6 7\n\n1",
        expectedOutput: "集合数量错误，你可能需要调整集合分隔符或者添加一些数据。",
        recipeConfig: [
            {
                op: "并集",
                args: ["\n\n", " "],
            },
        ],
    },
    {
        name: "Set Union: item delimiter",
        input: "1,2,3,4,5\n\n3,4,5,6,7",
        expectedOutput: "1,2,3,4,5,6,7",
        recipeConfig: [
            {
                op: "并集",
                args: ["\n\n", ","],
            },
        ],
    },
    {
        name: "Set Union: sample delimiter",
        input: "1 2 3 4 5whatever3 4 5 6 7",
        expectedOutput: "1 2 3 4 5 6 7",
        recipeConfig: [
            {
                op: "并集",
                args: ["whatever", " "],
            },
        ],
    },
]);
