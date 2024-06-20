/**
 * Subsection Tests.
 *
 * @author n1073645 [n1073645@gmail.com]
 * @copyright Crown Copyright 2022
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */
import TestRegister from "../../lib/TestRegister.mjs";

TestRegister.addTests([
    {
        name: "Subsection: nothing",
        input: "",
        expectedOutput: "",
        recipeConfig: [
            {
                "op": "Subsection",
                "args": ["", true, true, false],
            },
        ],
    },
    {
        name: "Subsection, Full Merge: nothing",
        input: "",
        expectedOutput: "",
        recipeConfig: [
            {
                "op": "Subsection",
                "args": ["", true, true, false],
            },
            {
                "op": "Merge",
                "args": [true],
            },
        ],
    },
    {
        name: "Subsection, Partial Merge: nothing",
        input: "",
        expectedOutput: "",
        recipeConfig: [
            {
                "op": "Subsection",
                "args": ["", true, true, false],
            },
            {
                "op": "Merge",
                "args": [false],
            },
        ],
    },
    {
        name: "Subsection, Full Merge: Base64 with Hex",
        input: "SGVsbG38675629ybGQ=",
        expectedOutput: "Hello World",
        recipeConfig: [
            {
                "op": "Subsection",
                "args": ["386756", true, true, false],
            },
            {
                "op": "十六进制转字符",
                "args": ["自动"],
            },
            {
                "op": "Merge",
                "args": [true],
            },
            {
                "op": "Base64解码",
                "args": ["A-Za-z0-9+/=", true, false],
            },
        ],
    },
    {
        name: "Subsection, Partial Merge: Base64 with Hex surrounded by binary data.",
        input: "000000000SGVsbG38675629ybGQ=0000000000",
        expectedOutput: "000000000Hello World0000000000",
        recipeConfig: [
            {
                "op": "Subsection",
                "args": ["SGVsbG38675629ybGQ=", true, true, false],
            },
            {
                "op": "Subsection",
                "args": ["386756", true, true, false],
            },
            {
                "op": "十六进制转字符",
                "args": ["自动"],
            },
            {
                "op": "Merge",
                "args": [false],
            },
            {
                "op": "Base64解码",
                "args": ["A-Za-z0-9+/=", true, false],
            },
        ],
    },
]);
