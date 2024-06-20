/**
 * BCD tests
 *
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2017
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */
import TestRegister from "../../lib/TestRegister.mjs";

TestRegister.addTests([
    {
        name: "To BCD: default 0",
        input: "0",
        expectedOutput: "0000",
        recipeConfig: [
            {
                "op": "BCD码编码",
                "args": ["8 4 2 1", true, false, "半字节"]
            }
        ]
    },
    {
        name: "To BCD: unpacked nibbles",
        input: "1234567890",
        expectedOutput: "0000 0001 0000 0010 0000 0011 0000 0100 0000 0101 0000 0110 0000 0111 0000 1000 0000 1001 0000 0000",
        recipeConfig: [
            {
                "op": "BCD码编码",
                "args": ["8 4 2 1", false, false, "半字节"]
            }
        ]
    },
    {
        name: "To BCD: packed, signed bytes",
        input: "1234567890",
        expectedOutput: "00000001 00100011 01000101 01100111 10001001 00001100",
        recipeConfig: [
            {
                "op": "BCD码编码",
                "args": ["8 4 2 1", true, true, "字节"]
            }
        ]
    },
    {
        name: "To BCD: packed, signed nibbles, 8 4 -2 -1",
        input: "-1234567890",
        expectedOutput: "0000 0111 0110 0101 0100 1011 1010 1001 1000 1111 0000 1101",
        recipeConfig: [
            {
                "op": "BCD码编码",
                "args": ["8 4 -2 -1", true, true, "半字节"]
            }
        ]
    },
    {
        name: "From BCD: default 0",
        input: "0000",
        expectedOutput: "0",
        recipeConfig: [
            {
                "op": "BCD码解码",
                "args": ["8 4 2 1", true, false, "半字节"]
            }
        ]
    },
    {
        name: "From BCD: packed, signed bytes",
        input: "00000001 00100011 01000101 01100111 10001001 00001101",
        expectedOutput: "-1234567890",
        recipeConfig: [
            {
                "op": "BCD码解码",
                "args": ["8 4 2 1", true, true, "字节"]
            }
        ]
    },
    {
        name: "From BCD: Excess-3, unpacked, unsigned",
        input: "00000100 00000101 00000110 00000111 00001000 00001001 00001010 00001011 00001100 00000011",
        expectedOutput: "1234567890",
        recipeConfig: [
            {
                "op": "BCD码解码",
                "args": ["余3码", false, false, "半字节"]
            }
        ]
    },
    {
        name: "BCD: raw 4 2 2 1, packed, signed",
        input: "1234567890",
        expectedOutput: "1234567890",
        recipeConfig: [
            {
                "op": "BCD码编码",
                "args": ["4 2 2 1", true, true, "原始"]
            },
            {
                "op": "BCD码解码",
                "args": ["4 2 2 1", true, true, "原始"]
            }
        ]
    },
]);
