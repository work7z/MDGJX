/**
 * DateTime tests.
 *
 * @author bwhitn [brian.m.whitney@outlook.com]
 *
 * @copyright Crown Copyright 2017
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */
import TestRegister from "../../lib/TestRegister.mjs";

TestRegister.addTests([
    {
        name: "Filetime to Unix",
        input: "129207366395297693",
        expectedOutput: "1276263039529769300",
        recipeConfig: [
            {
                op: "Windows Filetime转UNIX时间戳",
                args: ["纳秒 (ns)", "十进制"],
            },
        ],
    },
    {
        name: "Unix to Filetime",
        input: "1276263039529769300",
        expectedOutput: "129207366395297693",
        recipeConfig: [
            {
                op: "UNIX时间戳转Windows Filetime",
                args: ["纳秒 (ns)", "十进制"],
            },
        ],
    },
    {
        name: "DateTime Delta Positive",
        input: "20/02/2024 13:36:00",
        expectedOutput: "20/02/2024 13:37:00",
        recipeConfig: [
            {
                op: "DateTime推算",
                args: ["标准日期时间格式", "DD/MM/YYYY HH:mm:ss", "加", 0, 0, 1, 0],
            },
        ],
    },
    {
        name: "DateTime Delta Negative",
        input: "20/02/2024 14:37:00",
        expectedOutput: "20/02/2024 13:37:00",
        recipeConfig: [
            {
                op: "DateTime推算",
                args: ["标准日期时间格式", "DD/MM/YYYY HH:mm:ss", "减", 0, 1, 0, 0],
            },
        ],
    },
]);
