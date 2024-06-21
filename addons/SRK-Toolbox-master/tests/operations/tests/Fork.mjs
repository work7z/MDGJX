/**
 * Fork tests
 *
 * @author tlwr [toby@toby.codes]
 *
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */
import TestRegister from "../../lib/TestRegister.mjs";

TestRegister.addTests([
    {
        name: "Fork: nothing",
        input: "",
        expectedOutput: "",
        recipeConfig: [
            {
                op: "Fork",
                args: ["\n", "\n", false],
            },
        ],
    },
    {
        name: "Fork, Merge: nothing",
        input: "",
        expectedOutput: "",
        recipeConfig: [
            {
                op: "Fork",
                args: ["\n", "\n", false],
            },
            {
                op: "Merge",
                args: [true],
            },
        ],
    },
    {
        name: "Fork, (expect) Error, Merge",
        input: "1,2,3,4\n\n3,4,5,6",
        expectedOutput: "集合数量错误，你可能需要调整集合分隔符或者添加一些数据。",
        recipeConfig: [
            {
                op: "Fork",
                args: ["\n\n", "\n\n", false],
            },
            {
                op: "并集",
                args: ["\n\n", ","],
            },
            {
                op: "Merge",
                args: [true],
            },
        ],
    },
    {
        name: "Fork, Conditional Jump, Encodings",
        input: "Some data with a 1 in it\nSome data with a 2 in it",
        expectedOutput: "U29tZSBkYXRhIHdpdGggYSAxIGluIGl0\n53 6f 6d 65 20 64 61 74 61 20 77 69 74 68 20 61 20 32 20 69 6e 20 69 74",
        recipeConfig: [
            {"op": "Fork", "args": ["\\n", "\\n", false]},
            {"op": "Conditional Jump", "args": ["1", false, "skipReturn", "10"]},
            {"op": "字符转十六进制", "args": ["空格"]},
            {"op": "Return", "args": []},
            {"op": "Label", "args": ["skipReturn"]},
            {"op": "Base64编码", "args": ["A-Za-z0-9+/="]}
        ]
    },
    {
        name: "Fork, Partial Merge",
        input: "Hello World",
        expectedOutput: "48656c6c6f 576f726c64",
        recipeConfig: [
            { "op": "Fork",   "args": [" ", " ", false] },
            { "op": "Fork",   "args": ["l", "l", false] },
            { "op": "Merge",  "args": [false] },
            { "op": "字符转十六进制", "args": ["无", 0] },
        ]
    },
]);
