/**
 * Caesar Box Cipher tests.
 *
 * @author n1073645 [n1073645@gmail.com]
 *
 * @copyright Crown Copyright 2020
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */
import TestRegister from "../../lib/TestRegister.mjs";

TestRegister.addTests([
    {
        name: "Caesar Box Cipher: nothing",
        input: "",
        expectedOutput: "",
        recipeConfig: [
            {
                op: "恺撒箱密码",
                args: ["1"],
            },
        ],
    },
    {
        name: "Caesar Box Cipher: Hello World!",
        input: "Hello World!",
        expectedOutput: "Hlodeor!lWl",
        recipeConfig: [
            {
                op: "恺撒箱密码",
                args: ["3"],
            },
        ],
    },
    {
        name: "Caesar Box Cipher: Hello World!",
        input: "Hlodeor!lWl",
        expectedOutput: "HelloWorld!",
        recipeConfig: [
            {
                op: "恺撒箱密码",
                args: ["4"],
            },
        ],
    }
]);
