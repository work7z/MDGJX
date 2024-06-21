/**
 * To/From Case Insensitive Regex tests.
 *
 * @author masq [github.cyberchef@masq.cc]
 *
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */
import TestRegister from "../../lib/TestRegister.mjs";

TestRegister.addTests([
    {
        name: "To Case Insensitive Regex: nothing",
        input: "",
        expectedOutput: "",
        recipeConfig: [
            {
                op: "转换为大小写不敏感正则",
                args: [],
            },
        ],
    },
    {
        name: "From Case Insensitive Regex: nothing",
        input: "",
        expectedOutput: "",
        recipeConfig: [
            {
                op: "从大小写不敏感正则恢复",
                args: [],
            },
        ],
    },
    {
        name: "To Case Insensitive Regex: simple test",
        input: "S0meth!ng",
        expectedOutput: "[sS]0[mM][eE][tT][hH]![nN][gG]",
        recipeConfig: [
            {
                op: "转换为大小写不敏感正则",
                args: [],
            },
        ],
    },
    {
        name: "From Case Insensitive Regex: simple test",
        input: "[sS]0[mM][eE][tT][hH]![nN][Gg] [wr][On][g]?",
        expectedOutput: "s0meth!nG [wr][On][g]?",
        recipeConfig: [
            {
                op: "从大小写不敏感正则恢复",
                args: [],
            },
        ],
    },
    {
        name: "To Case Insensitive Regex: [A-Z] -> [A-Za-z]",
        input: "[A-Z]",
        expectedOutput: "[A-Za-z]",
        recipeConfig: [
            {
                op: "转换为大小写不敏感正则",
                args: [],
            },
        ],
    },
    {
        name: "To Case Insensitive Regex: [a-z] -> [A-Za-z]",
        input: "[a-z]",
        expectedOutput: "[A-Za-z]",
        recipeConfig: [
            {
                op: "转换为大小写不敏感正则",
                args: [],
            },
        ],
    },
    {
        name: "To Case Insensitive Regex: [H-d] -> [A-DH-dh-z]",
        input: "[H-d]",
        expectedOutput: "[A-DH-dh-z]",
        recipeConfig: [
            {
                op: "转换为大小写不敏感正则",
                args: [],
            },
        ],
    },
    {
        name: "To Case Insensitive Regex: [!-D] -> [!-Da-d]",
        input: "[!-D]",
        expectedOutput: "[!-Da-d]",
        recipeConfig: [
            {
                op: "转换为大小写不敏感正则",
                args: [],
            },
        ],
    },
    {
        name: "To Case Insensitive Regex: [%-^] -> [%-^a-z]",
        input: "[%-^]",
        expectedOutput: "[%-^a-z]",
        recipeConfig: [
            {
                op: "转换为大小写不敏感正则",
                args: [],
            },
        ],
    },
    {
        name: "To Case Insensitive Regex: [K-`] -> [K-`k-z]",
        input: "[K-`]",
        expectedOutput: "[K-`k-z]",
        recipeConfig: [
            {
                op: "转换为大小写不敏感正则",
                args: [],
            },
        ],
    },
    {
        name: "To Case Insensitive Regex: [[-}] -> [[-}A-Z]",
        input: "[[-}]",
        expectedOutput: "[[-}A-Z]",
        recipeConfig: [
            {
                op: "转换为大小写不敏感正则",
                args: [],
            },
        ],
    },
    {
        name: "To Case Insensitive Regex: [b-}] -> [b-}B-Z]",
        input: "[b-}]",
        expectedOutput: "[b-}B-Z]",
        recipeConfig: [
            {
                op: "转换为大小写不敏感正则",
                args: [],
            },
        ],
    },
    {
        name: "To Case Insensitive Regex: [<-j] -> [<-z]",
        input: "[<-j]",
        expectedOutput: "[<-z]",
        recipeConfig: [
            {
                op: "转换为大小写不敏感正则",
                args: [],
            },
        ],
    },
    {
        name: "To Case Insensitive Regex: [^-j] -> [A-J^-j]",
        input: "[^-j]",
        expectedOutput: "[A-J^-j]",
        recipeConfig: [
            {
                op: "转换为大小写不敏感正则",
                args: [],
            },
        ],
    },
    {
        name: "To Case Insensitive Regex: not simple test",
        input: "Mozilla[A-Z0-9]+[A-Z]Mozilla[0-9whatA-Z][H-d][!-H][a-~](.)+",
        expectedOutput: "[mM][oO][zZ][iI][lL][lL][aA][A-Za-z0-9]+[A-Za-z][mM][oO][zZ][iI][lL][lL][aA][0-9[wW][hH][aA][tT]A-Za-z][A-DH-dh-z][!-Ha-h][a-~A-Z](.)+",
        recipeConfig: [
            {
                op: "转换为大小写不敏感正则",
                args: [],
            },
        ],
    },
    {
        name: "To Case Insensitive Regex: erroneous test",
        input: "Mozilla[A-Z",
        expectedOutput: "无效的正则表达式（请注意此版本的Node不支持正则的后行断言）。",
        recipeConfig: [
            {
                op: "转换为大小写不敏感正则",
                args: [],
            },
        ],
    }
]);
