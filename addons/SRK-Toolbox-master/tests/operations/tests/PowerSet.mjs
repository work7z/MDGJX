/**
 * Power Set tests.
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
        name: "Power set: nothing",
        input: "",
        expectedOutput: "",
        recipeConfig: [
            {
                op: "幂集",
                args: [","],
            },
        ],
    },
    {
        name: "Power set",
        input: "1 2 4",
        expectedOutput: "\n4\n2\n1\n2 4\n1 4\n1 2\n1 2 4\n",
        recipeConfig: [
            {
                op: "幂集",
                args: [" "],
            },
        ],
    },
]);
