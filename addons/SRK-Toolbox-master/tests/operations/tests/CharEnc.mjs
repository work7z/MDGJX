/**
 * CharEnc tests.
 *
 * @author tlwr [toby@toby.codes]
 * @copyright Crown Copyright 2017
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */
import TestRegister from "../../lib/TestRegister.mjs";

TestRegister.addTests([
    {
        name: "Encode text, Decode text: nothing",
        input: "",
        expectedOutput: "",
        recipeConfig: [
            {
                "op": "文本编码",
                "args": ["UTF-8 (65001)"]
            },
            {
                "op": "文本解码",
                "args": ["UTF-8 (65001)"]
            },
        ],
    },
    {
        name: "Encode text, Decode text: hello",
        input: "hello",
        expectedOutput: "hello",
        recipeConfig: [
            {
                "op": "文本编码",
                "args": ["UTF-8 (65001)"]
            },
            {
                "op": "文本解码",
                "args": ["UTF-8 (65001)"]
            },
        ],
    },
    {
        name: "Encode text (EBCDIC): hello",
        input: "hello",
        expectedOutput: "88 85 93 93 96",
        recipeConfig: [
            {
                "op": "文本编码",
                "args": ["IBM EBCDIC International (500)"]
            },
            {
                "op": "字符转十六进制",
                "args": ["Space"]
            },
        ],
    },
    {
        name: "Decode text (EBCDIC): 88 85 93 93 96",
        input: "88 85 93 93 96",
        expectedOutput: "hello",
        recipeConfig: [
            {
                "op": "十六进制转字符",
                "args": ["Space"]
            },
            {
                "op": "文本解码",
                "args": ["IBM EBCDIC International (500)"]
            },
        ],
    },
    {
        name: "Generate Base64 Windows PowerShell",
        input: "ZABpAHIAIAAiAGMAOgBcAHAAcgBvAGcAcgBhAG0AIABmAGkAbABlAHMAIgAgAA==",
        expectedOutput: "dir \"c:\\program files\" ",
        recipeConfig: [
            {
                "op": "Base64解码",
                "args": ["A-Za-z0-9+/=", true]
            },
            {
                "op": "文本解码",
                "args": ["UTF-16LE (1200)"]
            },
            {
                "op": "文本编码",
                "args": ["UTF-8 (65001)"]
            },
        ],
    },
]);
