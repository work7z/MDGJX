/**
 * Base92 tests.
 *
 * @author sg5506844 [sg5506844@gmail.com]
 * @copyright Crown Copyright 2021
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import TestRegister from "../../lib/TestRegister.mjs";

TestRegister.addTests([
    {
        name: "To Base92: nothing",
        input: "",
        expectedOutput: "",
        recipeConfig: [
            {
                op: "Base92编码",
                args: [],
            },
        ],
    },
    {
        name: "To Base92: Spec encoding example 1",
        input: "AB",
        expectedOutput: "8y2",
        recipeConfig: [
            {
                op: "Base92编码",
                args: [],
            },
        ],
    },
    {
        name: "To Base92: Spec encoding example 2",
        input: "Hello!!",
        expectedOutput: ";K_$aOTo&",
        recipeConfig: [
            {
                op: "Base92编码",
                args: [],
            },
        ],
    },
    {
        name: "To Base92: Spec encoding example 3",
        input: "base-92",
        expectedOutput: "DX2?V<Y(*",
        recipeConfig: [
            {
                op: "Base92编码",
                args: [],
            },
        ],
    },
    {
        name: "From Base92: nothing",
        input: "",
        expectedOutput: "",
        recipeConfig: [
            {
                op: "Base92解码",
                args: [],
            },
        ],
    },
    {
        name: "From Base92: Spec decoding example 1",
        input: "G'_DW[B",
        expectedOutput: "ietf!",
        recipeConfig: [
            {
                op: "Base92解码",
                args: [],
            },
        ],
    },
    {
        name: "From Base92: Invalid character",
        input: "~",
        expectedOutput: "~ 不是有效的Base92字符",
        recipeConfig: [
            {
                op: "Base92解码",
                args: [],
            },
        ],
    },
]);
