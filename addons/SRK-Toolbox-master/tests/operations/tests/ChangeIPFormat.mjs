/**
 * Change IP format tests.
 *
 * @author Chris Smith
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */
import TestRegister from "../../lib/TestRegister.mjs";

TestRegister.addTests([
    {
        name: "Change IP format: Dotted Decimal to Hex",
        input: "192.168.1.1",
        expectedOutput: "c0a80101",
        recipeConfig: [
            {
                op: "IP地址格式转换",
                args: ["十进制用点分隔", "十六进制"],
            },
        ],
    }, {
        name: "Change IP format: Decimal to Dotted Decimal",
        input: "3232235777",
        expectedOutput: "192.168.1.1",
        recipeConfig: [
            {
                op: "IP地址格式转换",
                args: ["十进制", "十进制用点分隔"],
            },
        ],
    }, {
        name: "Change IP format: Hex to Octal",
        input: "c0a80101",
        expectedOutput: "030052000401",
        recipeConfig: [
            {
                op: "IP地址格式转换",
                args: ["十六进制", "八进制"],
            },
        ],
    }, {
        name: "Change IP format: Octal to Decimal",
        input: "030052000401",
        expectedOutput: "3232235777",
        recipeConfig: [
            {
                op: "IP地址格式转换",
                args: ["八进制", "十进制"],
            },
        ],
    },
]);
