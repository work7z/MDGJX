/**
 * @author sg5506844 [sg5506844@gmail.com]
 * @copyright Crown Copyright 2021
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import TestRegister from "../../lib/TestRegister.mjs";

TestRegister.addTests([
    {
        name: "Rison Encode: Encoding example 1",
        input: JSON.stringify({ any: "json", yes: true }),
        expectedOutput: "(any:json,yes:!t)",
        recipeConfig: [
            {
                op: "Rison编码",
                args: ["普通编码"]
            }
        ]
    },
    {
        name: "Rison Encode: Encoding example 2",
        input: JSON.stringify({ supportsObjects: true, ints: 435 }),
        expectedOutput: "ints:435,supportsObjects:!t",
        recipeConfig: [
            {
                op: "Rison编码",
                args: ["编码为对象（O-Rison）"]
            }
        ]
    },
    {
        name: "Rison Encode: Encoding example 3",
        input: JSON.stringify(["A", "B", { supportsObjects: true }]),
        expectedOutput: "A,B,(supportsObjects:!t)",
        recipeConfig: [
            {
                op: "Rison编码",
                args: ["编码为数组（A-Rison）"]
            }
        ]
    },
    {
        name: "Rison Encode: Object for an array",
        input: JSON.stringify({ supportsObjects: true, ints: 435 }),
        expectedOutput: "Rison编码 - rison.encode_array expects an array argument",
        expectedError: "Rison编码 - rison.encode_array expects an array argument",
        recipeConfig: [
            {
                op: "Rison编码",
                args: ["编码为数组（A-Rison）"]
            }
        ]
    },
    {
        name: "Rison Decode: Decoding example 1",
        input: "(any:json,yes:!t)",
        expectedOutput: JSON.stringify({ any: "json", yes: true }, null, 4),
        recipeConfig: [
            {
                op: "Rison解码",
                args: ["普通解码"]
            }
        ]
    }
]);
