/**
 * JSONBeautify tests.
 *
 * @author Phillip Nordwall [Phillip.Nordwall@gmail.com]
 *
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */
import TestRegister from "../../lib/TestRegister.mjs";

TestRegister.addTests([
    {
        name: "JSON Beautify: space, ''",
        input: "",
        expectedOutput: "",
        recipeConfig: [
            {
                op: "JSON美化",
                args: [" ", false, false],
            },
        ],
    },
    {
        name: "JSON Beautify: space, number",
        input: "42",
        expectedOutput: "42",
        recipeConfig: [
            {
                op: "JSON美化",
                args: [" ", false, false],
            },
        ],
    },
    {
        name: "JSON Beautify: space, string",
        input: "\"string\"",
        expectedOutput: "\"string\"",
        recipeConfig: [
            {
                op: "JSON美化",
                args: [" ", false, false],
            },
            {
                op: "HTML转文本",
                args: []
            }
        ],
    },
    {
        name: "JSON Beautify: space, boolean",
        input: "false",
        expectedOutput: "false",
        recipeConfig: [
            {
                op: "JSON美化",
                args: [" ", false, false],
            },
        ],
    },
    {
        name: "JSON Beautify: space, emptyList",
        input: "[]",
        expectedOutput: "[]",
        recipeConfig: [
            {
                op: "JSON美化",
                args: [" ", false, false],
            },
        ],
    },
    {
        name: "JSON Beautify: space, list",
        input: "[2,1]",
        expectedOutput: "[\n 2,\n 1\n]",
        recipeConfig: [
            {
                op: "JSON美化",
                args: [" ", false, false],
            },
        ],
    },
    {
        name: "JSON Beautify: tab, list",
        input: "[2,1]",
        expectedOutput: "[\n\t2,\n\t1\n]",
        recipeConfig: [
            {
                op: "JSON美化",
                args: ["\t", false, false],
            },
        ],
    },
    {
        name: "JSON Beautify: space, object",
        input: "{\"second\":2,\"first\":3}",
        expectedOutput: "{\n \"second\": 2,\n \"first\": 3\n}",
        recipeConfig: [
            {
                op: "JSON美化",
                args: [" ", false, false],
            },
            {
                op: "HTML转文本",
                args: []
            }
        ],
    },
    {
        name: "JSON Beautify: tab, nested",
        input: "[2,{\"second\":2,\"first\":3,\"beginning\":{\"j\":\"3\",\"i\":[2,3,false]}},1,2,3]",
        expectedOutput: "[\n\t2,\n\t{\n\t\t\"second\": 2,\n\t\t\"first\": 3,\n\t\t\"beginning\": {\n\t\t\t\"j\": \"3\",\n\t\t\t\"i\": [\n\t\t\t\t2,\n\t\t\t\t3,\n\t\t\t\tfalse\n\t\t\t]\n\t\t}\n\t},\n\t1,\n\t2,\n\t3\n]",
        recipeConfig: [
            {
                op: "JSON美化",
                args: ["\t", false, false],
            },
            {
                op: "HTML转文本",
                args: []
            }
        ],
    },
    {
        name: "JSON Beautify: tab, nested, sorted",
        input: "[2,{\"second\":2,\"first\":3,\"beginning\":{\"j\":\"3\",\"i\":[2,3,false]}},1,2,3]",
        expectedOutput: "[\n\t2,\n\t{\n\t\t\"beginning\": {\n\t\t\t\"i\": [\n\t\t\t\t2,\n\t\t\t\t3,\n\t\t\t\tfalse\n\t\t\t],\n\t\t\t\"j\": \"3\"\n\t\t},\n\t\t\"first\": 3,\n\t\t\"second\": 2\n\t},\n\t1,\n\t2,\n\t3\n]",
        recipeConfig: [
            {
                op: "JSON美化",
                args: ["\t", true, false],
            },
            {
                op: "HTML转文本",
                args: []
            }
        ],
    },
]);
