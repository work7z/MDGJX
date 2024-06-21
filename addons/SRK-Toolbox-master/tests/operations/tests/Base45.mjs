/**
 * Base45 tests.
 *
 * @author Thomas Weißschuh [thomas@t-8ch.de]
 *
 * @copyright Crown Copyright 2021
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import TestRegister from "../../lib/TestRegister.mjs";

const defaultB45Alph = "0-9A-Z $%*+\\-./:";

TestRegister.addTests([
    {
        name: "To Base45: nothing",
        input: "",
        expectedOutput: "",
        recipeConfig: [
            {
                op: "Base45编码",
                args: [defaultB45Alph],
            },
        ],
    },
    {
        name: "To Base45: Spec encoding example 1",
        input: "AB",
        expectedOutput: "BB8",
        recipeConfig: [
            {
                op: "Base45编码",
                args: [defaultB45Alph],
            },
        ],
    },
    {
        name: "To Base45: Spec encoding example 2",
        input: "Hello!!",
        expectedOutput: "%69 VD92EX0",
        recipeConfig: [
            {
                op: "Base45编码",
                args: [defaultB45Alph],
            },
        ],
    },
    {
        name: "To Base45: Spec encoding example 3",
        input: "base-45",
        expectedOutput: "UJCLQE7W581",
        recipeConfig: [
            {
                op: "Base45编码",
                args: [defaultB45Alph],
            },
        ],
    },
    {
        name: "From Base45: nothing",
        input: "",
        expectedOutput: "",
        recipeConfig: [
            {
                op: "Base45解码",
                args: [defaultB45Alph],
            },
        ],
    },
    {
        name: "From Base45: Spec decoding example 1",
        input: "QED8WEX0",
        expectedOutput: "ietf!",
        recipeConfig: [
            {
                op: "Base45解码",
                args: [defaultB45Alph],
            },
        ],
    },
    {
        name: "From Base45: Invalid character",
        input: "!",
        expectedOutput: "非可用字符: '!'",
        recipeConfig: [
            {
                op: "Base45解码",
                args: [defaultB45Alph],
            },
        ],
    },
    {
        name: "From Base45: Invalid triplet value",
        input: "ZZZ",
        expectedOutput: "超出编码范围: 'ZZZ'",
        recipeConfig: [
            {
                op: "Base45解码",
                args: [defaultB45Alph],
            },
        ],
    },
]);
