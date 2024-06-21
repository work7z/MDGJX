/**
 * GOST tests.
 *
 * The GOST library already includes a range of tests for the correctness of
 * the algorithms. These tests are intended only to confirm that the library
 * has been correctly integrated into CyberChef.
 *
 * @author n1474335 [n1474335@gmail.com]
 *
 * @copyright Crown Copyright 2023
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */
import TestRegister from "../../lib/TestRegister.mjs";

TestRegister.addTests([
    {
        name: "GOST Encrypt: Magma",
        input: "Hello, World!",
        expectedOutput: "f124ac5c0853870906dbaf9b56",
        recipeConfig: [
            {
                op: "GOST加密",
                args: [
                    { "option": "十六进制", "string": "00112233" },
                    { "option": "十六进制", "string": "0011223344556677" },
                    "原始字节",
                    "十六进制",
                    "GOST 28147 (Magma, 1989)",
                    "64",
                    "E-SC",
                    "OFB",
                    "CP",
                    "ZERO"
                ]
            }
        ],
    },
    {
        name: "GOST Encrypt: Kuznyechik",
        input: "Hello, World!",
        expectedOutput: "8673d490dfa4a66d5e3ff00ba316724f",
        recipeConfig: [
            {
                op: "GOST加密",
                args: [
                    { "option": "十六进制", "string": "00112233" },
                    { "option": "十六进制", "string": "00112233445566778899aabbccddeeff" },
                    "原始字节",
                    "十六进制",
                    "GOST R 34.12 (Kuznyechik, 2015)",
                    "128",
                    "E-SC",
                    "CBC",
                    "CP",
                    "PKCS5"
                ]
            }
        ],
    },
    {
        name: "GOST Decrypt: Magma",
        input: "f124ac5c0853870906dbaf9b56",
        expectedOutput: "Hello, World!",
        recipeConfig: [
            {
                op: "GOST解密",
                args: [
                    { "option": "十六进制", "string": "00112233" },
                    { "option": "十六进制", "string": "0011223344556677" },
                    "十六进制",
                    "原始字节",
                    "GOST 28147 (Magma, 1989)",
                    "128",
                    "E-SC",
                    "OFB",
                    "CP",
                    "ZERO"
                ]
            }
        ],
    },
    {
        name: "GOST Decrypt: Kuznyechik",
        input: "8673d490dfa4a66d5e3ff00ba316724f",
        expectedOutput: "Hello, World!\0\0\0",
        recipeConfig: [
            {
                op: "GOST解密",
                args: [
                    { "option": "十六进制", "string": "00112233" },
                    { "option": "十六进制", "string": "00112233445566778899aabbccddeeff" },
                    "十六进制",
                    "原始字节",
                    "GOST R 34.12 (Kuznyechik, 2015)",
                    "128",
                    "E-TEST",
                    "CBC",
                    "CP",
                    "PKCS5"
                ]
            }
        ],
    },
    {
        name: "GOST Sign",
        input: "Hello, World!",
        expectedOutput: "810d0c40e965",
        recipeConfig: [
            {
                op: "GOST签名",
                args: [
                    { "option": "十六进制", "string": "00112233" },
                    { "option": "十六进制", "string": "0011223344556677" },
                    "原始字节",
                    "十六进制",
                    "GOST 28147 (Magma, 1989)",
                    "64",
                    "E-C",
                    48
                ]
            }
        ],
    },
    {
        name: "GOST Verify",
        input: "Hello, World!",
        expectedOutput: "签名相符",
        recipeConfig: [
            {
                op: "GOST验证",
                args: [
                    { "option": "十六进制", "string": "00112233" },
                    { "option": "十六进制", "string": "00112233445566778899aabbccddeeff" },
                    { "option": "十六进制", "string": "42b77fb3d6f6bf04" },
                    "原始字节",
                    "GOST R 34.12 (Kuznyechik, 2015)",
                    "128",
                    "E-TEST"
                ]
            }
        ],
    },
    {
        name: "GOST Key Wrap",
        input: "Hello, World!123",
        expectedOutput: "0bb706e92487fceef97589911faeb28200000000000000000000000000000000\r\n6b7bfd16",
        recipeConfig: [
            {
                op: "GOST密钥包装",
                args: [
                    { "option": "十六进制", "string": "00112233" },
                    { "option": "十六进制", "string": "0011223344556677" },
                    "原始字节",
                    "十六进制",
                    "GOST R 34.12 (Kuznyechik, 2015)",
                    "64",
                    "E-TEST",
                    "CP"
                ]
            }
        ],
    },
    {
        name: "GOST Key Unwrap",
        input: "c8e58458a42d21974d50103d59b469f2c8e58458a42d21974d50103d59b469f2\r\na32a1575",
        expectedOutput: "0123456789abcdef0123456789abcdef",
        recipeConfig: [
            {
                op: "GOST密钥解包装",
                args: [
                    { "option": "十六进制", "string": "" },
                    { "option": "Latin1", "string": "00112233" },
                    "十六进制",
                    "原始字节",
                    "GOST 28147 (Magma, 1989)",
                    "64",
                    "E-Z",
                    "CP"
                ]
            }
        ],
    },
]);
