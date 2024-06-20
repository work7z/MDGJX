/**
 * Convert co-ordinate format tests
 *
 * @author j433866
 *
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

/**
 * TEST CO-ORDINATES
 * DD: 51.504°,-0.126°,
 * DDM: 51° 30.24',-0° 7.56',
 * DMS: 51° 30' 14.4",-0° 7' 33.6",
 * Geohash: gcpvj0h0x,
 * MGRS: 30U XC 99455 09790,
 * OSNG: TQ 30163 80005,
 * UTM: 30N 699456 5709791,
 */

import TestRegister from "../../lib/TestRegister.mjs";

TestRegister.addTests([
    {
        name: "Co-ordinates: From Decimal Degrees to Degrees Minutes Seconds",
        input: "51.504°,-0.126°,",
        expectedOutput: "51° 30' 14.4\",-0° 7' 33.6\",",
        recipeConfig: [
            {
                op: "坐标格式转换",
                args: ["度数", "逗号", "度分秒", "逗号", "无", 1]
            },
        ],
    },
    {
        name: "Co-ordinates: From Degrees Minutes Seconds to Decimal Degrees",
        input: "51° 30' 14.4\",-0° 7' 33.6\",",
        expectedOutput: "51.504°,-0.126°,",
        recipeConfig: [
            {
                op: "坐标格式转换",
                args: ["度分秒", "逗号", "度数", "逗号", "无", 3]
            },
        ],
    },
    {
        name: "Co-ordinates: From Decimal Degrees to Degrees Decimal Minutes",
        input: "51.504°,-0.126°,",
        expectedOutput: "51° 30.24',-0° 7.56',",
        recipeConfig: [
            {
                op: "坐标格式转换",
                args: ["度数", "逗号", "度分", "逗号", "无", 2]
            }
        ]
    },
    {
        name: "Co-ordinates: From Degrees Decimal Minutes to Decimal Degrees",
        input: "51° 30.24',-0° 7.56',",
        expectedOutput: "51.504°,-0.126°,",
        recipeConfig: [
            {
                op: "坐标格式转换",
                args: ["度分", "逗号", "度数", "逗号", "无", 3]
            }
        ]
    },
    {
        name: "Co-ordinates: From Decimal Degrees to Decimal Degrees",
        input: "51.504°,-0.126°,",
        expectedOutput: "51.504°,-0.126°,",
        recipeConfig: [
            {
                op: "坐标格式转换",
                args: ["度数", "逗号", "度数", "逗号", "无", 3]
            }
        ]
    },
    {
        name: "Co-ordinates: From Decimal Degrees to Geohash",
        input: "51.504°,-0.126°,",
        expectedOutput: "gcpvj0h0x,",
        recipeConfig: [
            {
                op: "坐标格式转换",
                args: ["度数", "逗号", "Geohash", "逗号", "无", 9]
            },
        ],
    },
    {
        name: "Co-ordinates: From Geohash to Decimal Degrees",
        input: "gcpvj0h0x,",
        expectedOutput: "51.504°,-0.126°,",
        recipeConfig: [
            {
                op: "坐标格式转换",
                args: ["Geohash", "逗号", "度数", "逗号", "无", 3]
            },
        ],
    },
    {
        name: "Co-ordinates: From Decimal Degrees to MGRS",
        input: "51.504°,-0.126°,",
        expectedOutput: "30U XC 99455 09790,",
        recipeConfig: [
            {
                op: "坐标格式转换",
                args: ["度数", "逗号", "军事格网参考系统", "逗号", "无", 10]
            },
        ],
    },
    {
        name: "Co-ordinates: From MGRS to Decimal Degrees",
        input: "30U XC 99455 09790,",
        expectedOutput: "51.504°,-0.126°,",
        recipeConfig: [
            {
                op: "坐标格式转换",
                args: ["军事格网参考系统", "逗号", "度数", "逗号", "无", 3]
            }
        ]
    },
    {
        name: "Co-ordinates: From Decimal Degrees to OSNG",
        input: "51.504°,-0.126°,",
        expectedOutput: "TQ 30163 80005,",
        recipeConfig: [
            {
                op: "坐标格式转换",
                args: ["度数", "逗号", "地形测量局国家格网参考系统", "逗号", "无", 10]
            },
        ],
    },
    {
        name: "Co-ordinates: From OSNG to Decimal Degrees",
        input: "TQ 30163 80005,",
        expectedOutput: "51.504°,-0.126°,",
        recipeConfig: [
            {
                op: "坐标格式转换",
                args: ["地形测量局国家格网参考系统", "逗号", "度数", "逗号", "无", 3]
            },
        ],
    },
    {
        name: "Co-ordinates: From Decimal Degrees to UTM",
        input: "51.504°,-0.126°,",
        expectedOutput: "30 N 699456 5709791,",
        recipeConfig: [
            {
                op: "坐标格式转换",
                args: ["度数", "逗号", "通用横轴墨卡托投影", "逗号", "无", 0]
            },
        ],
    },
    {
        name: "Co-ordinates: From UTM to Decimal Degrees",
        input: "30 N 699456 5709791,",
        expectedOutput: "51.504°,-0.126°,",
        recipeConfig: [
            {
                op: "坐标格式转换",
                args: ["通用横轴墨卡托投影", "逗号", "度数", "逗号", "无", 3]
            },
        ],
    },
    {
        name: "Co-ordinates: Directions in input, not output",
        input: "N51.504°,W0.126°,",
        expectedOutput: "51.504°,-0.126°,",
        recipeConfig: [
            {
                op: "坐标格式转换",
                args: ["度数", "逗号", "度数", "逗号", "无", 3]
            },
        ],
    },
    {
        name: "Co-ordinates: Directions in input and output",
        input: "N51.504°,W0.126°,",
        expectedOutput: "N 51.504°,W 0.126°,",
        recipeConfig: [
            {
                op: "坐标格式转换",
                args: ["度数", "逗号", "度数", "逗号", "在前", 3]
            },
        ],
    },
    {
        name: "Co-ordinates: Directions not in input, in output",
        input: "51.504°,-0.126°,",
        expectedOutput: "N 51.504°,W 0.126°,",
        recipeConfig: [
            {
                op: "坐标格式转换",
                args: ["度数", "逗号", "度数", "逗号", "在前", 3]
            },
        ],
    },
    {
        name: "Co-ordinates: Directions not in input, in converted output",
        input: "51.504°,-0.126°,",
        expectedOutput: "N 51° 30' 14.4\",W 0° 7' 33.6\",",
        recipeConfig: [
            {
                op: "坐标格式转换",
                args: ["度数", "逗号", "度分秒", "逗号", "在前", 3]
            },
        ],
    }
]);
