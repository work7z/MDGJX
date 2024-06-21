/**
 * @author mikecat
 * @copyright Crown Copyright 2022
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */
import TestRegister from "../../lib/TestRegister.mjs";

TestRegister.addTests([
    {
        name: "Fletcher-16 Checksum: abcde",
        input: "abcde",
        expectedOutput: "c8f0",
        recipeConfig: [
            {
                op: "Fletcher-16校验和",
                args: [],
            },
        ],
    },
    {
        name: "Fletcher-16 Checksum: abcdef",
        input: "abcdef",
        expectedOutput: "2057",
        recipeConfig: [
            {
                op: "Fletcher-16校验和",
                args: [],
            },
        ],
    },
    {
        name: "Fletcher-16 Checksum: abcdefgh",
        input: "abcdefgh",
        expectedOutput: "0627",
        recipeConfig: [
            {
                op: "Fletcher-16校验和",
                args: [],
            },
        ],
    },
    {
        name: "Fletcher-32 Checksum: abcde",
        input: "abcde",
        expectedOutput: "f04fc729",
        recipeConfig: [
            {
                op: "Fletcher-32校验和",
                args: [],
            },
        ],
    },
    {
        name: "Fletcher-32 Checksum: abcdef",
        input: "abcdef",
        expectedOutput: "56502d2a",
        recipeConfig: [
            {
                op: "Fletcher-32校验和",
                args: [],
            },
        ],
    },
    {
        name: "Fletcher-32 Checksum: abcdefgh",
        input: "abcdefgh",
        expectedOutput: "ebe19591",
        recipeConfig: [
            {
                op: "Fletcher-32校验和",
                args: [],
            },
        ],
    },
    {
        name: "Fletcher-64 Checksum: abcde",
        input: "abcde",
        expectedOutput: "c8c6c527646362c6",
        recipeConfig: [
            {
                op: "Fletcher-64校验和",
                args: [],
            },
        ],
    },
    {
        name: "Fletcher-64 Checksum: abcdef",
        input: "abcdef",
        expectedOutput: "c8c72b276463c8c6",
        recipeConfig: [
            {
                op: "Fletcher-64校验和",
                args: [],
            },
        ],
    },
    {
        name: "Fletcher-64 Checksum: abcdefgh",
        input: "abcdefgh",
        expectedOutput: "312e2b28cccac8c6",
        recipeConfig: [
            {
                op: "Fletcher-64校验和",
                args: [],
            },
        ],
    },
]);
