/**
 * PHP tests.
 *
 * @author Jarmo van Lenthe
 *
 * @copyright Crown Copyright 2017
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import TestRegister from "../../lib/TestRegister.mjs";

TestRegister.addTests([
    {
        name: "PHP Deserialize empty array",
        input: "a:0:{}",
        expectedOutput: "{}",
        recipeConfig: [
            {
                op: "PHP反序列化",
                args: [true],
            },
        ],
    },
    {
        name: "PHP Deserialize integer",
        input: "i:10;",
        expectedOutput: "10",
        recipeConfig: [
            {
                op: "PHP反序列化",
                args: [true],
            },
        ],
    },
    {
        name: "PHP Deserialize string",
        input: "s:17:\"PHP Serialization\";",
        expectedOutput: "\"PHP Serialization\"",
        recipeConfig: [
            {
                op: "PHP反序列化",
                args: [true],
            },
        ],
    },
    {
        name: "PHP Deserialize array (JSON)",
        input: "a:2:{s:1:\"a\";i:10;i:0;a:1:{s:2:\"ab\";b:1;}}",
        expectedOutput: "{\"a\": 10,\"0\": {\"ab\": true}}",
        recipeConfig: [
            {
                op: "PHP反序列化",
                args: [true],
            },
        ],
    },
    {
        name: "PHP Deserialize array (non-JSON)",
        input: "a:2:{s:1:\"a\";i:10;i:0;a:1:{s:2:\"ab\";b:1;}}",
        expectedOutput: "{\"a\": 10,0: {\"ab\": true}}",
        recipeConfig: [
            {
                op: "PHP反序列化",
                args: [false],
            },
        ],
    },
]);
