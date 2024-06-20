/**
 * StrUtils tests.
 *
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2017
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */
import TestRegister from "../../lib/TestRegister.mjs";

TestRegister.addTests([
    {
        name: "Regex: non-HTML op",
        input: "/<>",
        expectedOutput: "/<>",
        recipeConfig: [
            {
                "op": "正则表达式",
                "args": ["自定义", "", true, true, false, false, false, false, "高亮匹配"]
            },
            {
                "op": "移除空白字符",
                "args": [true, true, true, true, true, false]
            }
        ],
    },
    {
        name: "Regex: Dot matches all",
        input: "Hello\nWorld",
        expectedOutput: "Hello\nWorld",
        recipeConfig: [
            {
                "op": "正则表达式",
                "args": ["自定义", ".+", true, true, true, false, false, false, "列出匹配"]
            }
        ],
    },
    {
        name: "Regex: Astral off",
        input: "𝌆😆",
        expectedOutput: "",
        recipeConfig: [
            {
                "op": "正则表达式",
                "args": ["自定义", "\\pS", true, true, false, false, false, false, "列出匹配"]
            }
        ],
    },
    {
        name: "Regex: Astral on",
        input: "𝌆😆",
        expectedOutput: "𝌆\n😆",
        recipeConfig: [
            {
                "op": "正则表达式",
                "args": ["自定义", "\\pS", true, true, false, false, true, false, "列出匹配"]
            }
        ],
    }
]);
