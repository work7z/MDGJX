/**
 * BSON tests.
 *
 * @author n1474335 [n1474335@gmail.com]
 *
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */
import TestRegister from "../../lib/TestRegister.mjs";

TestRegister.addTests([
    {
        name: "BSON serialise: nothing",
        input: "",
        expectedOutput: "",
        recipeConfig: [
            {
                op: "BSON序列化",
                args: [],
            },
        ],
    },
    {
        name: "BSON serialise: basic",
        input: "{\"hello\":\"world\"}",
        expectedOutput: "\x16\x00\x00\x00\x02hello\x00\x06\x00\x00\x00world\x00\x00",
        recipeConfig: [
            {
                op: "BSON序列化",
                args: [],
            },
        ],
    },
    {
        name: "BSON deserialise: nothing",
        input: "",
        expectedOutput: "",
        recipeConfig: [
            {
                op: "BSON反序列化",
                args: [],
            },
        ],
    },
    {
        name: "BSON deserialise: basic",
        input: "\x16\x00\x00\x00\x02hello\x00\x06\x00\x00\x00world\x00\x00",
        expectedOutput: "{\n  \"hello\": \"world\"\n}",
        recipeConfig: [
            {
                op: "BSON反序列化",
                args: [],
            },
        ],
    },
]);
