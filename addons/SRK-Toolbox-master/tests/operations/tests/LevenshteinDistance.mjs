/**
 * @author mikecat
 * @copyright Crown Copyright 2023
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */
import TestRegister from "../../lib/TestRegister.mjs";

TestRegister.addTests([
    {
        "name": "Levenshtein Distance: Wikipedia example 1",
        "input": "kitten\nsitting",
        "expectedOutput": "3",
        "recipeConfig": [
            {
                "op": "莱文斯坦距离",
                "args": [
                    "\\n", 1, 1, 1,
                ],
            },
        ],
    },
    {
        "name": "Levenshtein Distance: Wikipedia example 2",
        "input": "saturday\nsunday",
        "expectedOutput": "3",
        "recipeConfig": [
            {
                "op": "莱文斯坦距离",
                "args": [
                    "\\n", 1, 1, 1,
                ],
            },
        ],
    },
    {
        "name": "Levenshtein Distance: Wikipedia example 1 with substitution cost 2",
        "input": "kitten\nsitting",
        "expectedOutput": "5",
        "recipeConfig": [
            {
                "op": "莱文斯坦距离",
                "args": [
                    "\\n", 1, 1, 2,
                ],
            },
        ],
    },
    {
        "name": "Levenshtein Distance: varied costs 1",
        "input": "kitten\nsitting",
        "expectedOutput": "230",
        "recipeConfig": [
            {
                "op": "莱文斯坦距离",
                "args": [
                    "\\n", 10, 100, 1000,
                ],
            },
        ],
    },
    {
        "name": "Levenshtein Distance: varied costs 2",
        "input": "kitten\nsitting",
        "expectedOutput": "1020",
        "recipeConfig": [
            {
                "op": "莱文斯坦距离",
                "args": [
                    "\\n", 1000, 100, 10,
                ],
            },
        ],
    },
    {
        "name": "Levenshtein Distance: another delimiter",
        "input": "kitten sitting",
        "expectedOutput": "3",
        "recipeConfig": [
            {
                "op": "莱文斯坦距离",
                "args": [
                    " ", 1, 1, 1,
                ],
            },
        ],
    },
    {
        "name": "Levenshtein Distance: too few samples",
        "input": "kitten",
        "expectedOutput": "错误：计算莱文斯坦距离需要两个字符串，请确保输入按照给定分隔符的两个字符串。",
        "recipeConfig": [
            {
                "op": "莱文斯坦距离",
                "args": [
                    "\\n", 1, 1, 1,
                ],
            },
        ],
    },
    {
        "name": "Levenshtein Distance: too many samples",
        "input": "kitten\nsitting\nkitchen",
        "expectedOutput": "错误：计算莱文斯坦距离需要两个字符串，请确保输入按照给定分隔符的两个字符串。",
        "recipeConfig": [
            {
                "op": "莱文斯坦距离",
                "args": [
                    "\\n", 1, 1, 1,
                ],
            },
        ],
    },
    {
        "name": "Levenshtein Distance: negative insertion cost",
        "input": "kitten\nsitting",
        "expectedOutput": "消耗量不能为负数。",
        "recipeConfig": [
            {
                "op": "莱文斯坦距离",
                "args": [
                    "\\n", -1, 1, 1,
                ],
            },
        ],
    },
    {
        "name": "Levenshtein Distance: negative deletion cost",
        "input": "kitten\nsitting",
        "expectedOutput": "消耗量不能为负数。",
        "recipeConfig": [
            {
                "op": "莱文斯坦距离",
                "args": [
                    "\\n", 1, -1, 1,
                ],
            },
        ],
    },
    {
        "name": "Levenshtein Distance: negative substitution cost",
        "input": "kitten\nsitting",
        "expectedOutput": "消耗量不能为负数。",
        "recipeConfig": [
            {
                "op": "莱文斯坦距离",
                "args": [
                    "\\n", 1, 1, -1,
                ],
            },
        ],
    },
    {
        "name": "Levenshtein Distance: cost zero",
        "input": "kitten\nsitting",
        "expectedOutput": "0",
        "recipeConfig": [
            {
                "op": "莱文斯坦距离",
                "args": [
                    "\\n", 0, 0, 0,
                ],
            },
        ],
    },
]);
