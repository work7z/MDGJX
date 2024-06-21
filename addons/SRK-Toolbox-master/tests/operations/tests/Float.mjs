/**
 * Float tests.
 *
 * @author tcode2k16 [tcode2k16@gmail.com]
 *
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import TestRegister from "../../lib/TestRegister.mjs";


TestRegister.addTests([
    {
        name: "To Float: nothing",
        input: "",
        expectedOutput: "",
        recipeConfig: [
            {
                op: "十六进制转字符",
                args: ["自动"]
            },
            {
                op: "字符转浮点数",
                args: ["大端序", "Float (4字节)", "空格"]
            }
        ],
    },
    {
        name: "To Float (Big Endian, 4 bytes): 0.5",
        input: "3f0000003f000000",
        expectedOutput: "0.5 0.5",
        recipeConfig: [
            {
                op: "十六进制转字符",
                args: ["自动"]
            },
            {
                op: "字符转浮点数",
                args: ["大端序", "Float (4字节)", "空格"]
            }
        ]
    },
    {
        name: "To Float (Little Endian, 4 bytes): 0.5",
        input: "0000003f0000003f",
        expectedOutput: "0.5 0.5",
        recipeConfig: [
            {
                op: "十六进制转字符",
                args: ["自动"]
            },
            {
                op: "字符转浮点数",
                args: ["小端序", "Float (4字节)", "空格"]
            }
        ]
    },
    {
        name: "To Float (Big Endian, 8 bytes): 0.5",
        input: "3fe00000000000003fe0000000000000",
        expectedOutput: "0.5 0.5",
        recipeConfig: [
            {
                op: "十六进制转字符",
                args: ["自动"]
            },
            {
                op: "字符转浮点数",
                args: ["大端序", "Double (8字节)", "空格"]
            }
        ]
    },
    {
        name: "To Float (Little Endian, 8 bytes): 0.5",
        input: "000000000000e03f000000000000e03f",
        expectedOutput: "0.5 0.5",
        recipeConfig: [
            {
                op: "十六进制转字符",
                args: ["自动"]
            },
            {
                op: "字符转浮点数",
                args: ["小端序", "Double (8字节)", "空格"]
            }
        ]
    },
    {
        name: "From Float: nothing",
        input: "",
        expectedOutput: "",
        recipeConfig: [
            {
                op: "浮点数转字符",
                args: ["大端序", "Float (4字节)", "空格"]
            },
            {
                op: "字符转十六进制",
                args: ["无"]
            }
        ]
    },
    {
        name: "From Float (Big Endian, 4 bytes): 0.5",
        input: "0.5 0.5",
        expectedOutput: "3f0000003f000000",
        recipeConfig: [
            {
                op: "浮点数转字符",
                args: ["大端序", "Float (4字节)", "空格"]
            },
            {
                op: "字符转十六进制",
                args: ["无"]
            }
        ]
    },
    {
        name: "From Float (Little Endian, 4 bytes): 0.5",
        input: "0.5 0.5",
        expectedOutput: "0000003f0000003f",
        recipeConfig: [
            {
                op: "浮点数转字符",
                args: ["小端序", "Float (4字节)", "空格"]
            },
            {
                op: "字符转十六进制",
                args: ["无"]
            }
        ]
    },
    {
        name: "From Float (Big Endian, 8 bytes): 0.5",
        input: "0.5 0.5",
        expectedOutput: "3fe00000000000003fe0000000000000",
        recipeConfig: [
            {
                op: "浮点数转字符",
                args: ["大端序", "Double (8字节)", "空格"]
            },
            {
                op: "字符转十六进制",
                args: ["无"]
            }
        ]
    },
    {
        name: "From Float (Little Endian, 8 bytes): 0.5",
        input: "0.5 0.5",
        expectedOutput: "000000000000e03f000000000000e03f",
        recipeConfig: [
            {
                op: "浮点数转字符",
                args: ["小端序", "Double (8字节)", "空格"]
            },
            {
                op: "字符转十六进制",
                args: ["无"]
            }
        ]
    }
]);
