/**
 * From Decimal tests
 *
 * @author n1073645 [n1073645@gmail.com]
 * @copyright Crown Copyright 2020
 * @licence Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */
import TestRegister from "../../lib/TestRegister.mjs";

TestRegister.addTests([
    {
        name: "Luhn Checksum on standard data",
        input: "35641709012469",
        expectedOutput: "校验和： 7\n检验位： 0\nLuhn校验字符串： 356417090124690",
        recipeConfig: [
            {
                op: "Luhn校验和",
                args: []
            },
        ],
    },
    {
        name: "Luhn Checksum on standard data 2",
        input: "896101950123440000",
        expectedOutput: "校验和： 5\n检验位： 1\nLuhn校验字符串： 8961019501234400001",
        recipeConfig: [
            {
                op: "Luhn校验和",
                args: []
            },
        ],
    },
    {
        name: "Luhn Checksum on standard data 3",
        input: "35726908971331",
        expectedOutput: "校验和： 6\n检验位： 7\nLuhn校验字符串： 357269089713317",
        recipeConfig: [
            {
                op: "Luhn校验和",
                args: []
            },
        ],
    },
    {
        name: "Luhn Checksum on invalid data",
        input: "35641709b012469",
        expectedOutput: "字符： b 不是数字。",
        recipeConfig: [
            {
                op: "Luhn校验和",
                args: []
            },
        ],
    },
    {
        name: "Luhn Checksum on empty data",
        input: "",
        expectedOutput: "",
        recipeConfig: [
            {
                op: "Luhn校验和",
                args: []
            },
        ],
    }
]);
