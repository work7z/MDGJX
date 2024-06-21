/**
 * Parse TCP tests.
 *
 * @author n1474335
 * @copyright Crown Copyright 2022
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */
import TestRegister from "../../lib/TestRegister.mjs";

TestRegister.addTests([
    {
        name: "Parse TCP: No options",
        input: "c2eb0050a138132e70dc9fb9501804025ea70000",
        expectedMatch: /1026 \(扩大后: 1026\)/,
        recipeConfig: [
            {
                op: "解析TCP",
                args: ["十六进制"],
            }
        ],
    },
    {
        name: "Parse TCP: Options",
        input: "c2eb0050a1380c1f000000008002faf080950000020405b40103030801010402",
        expectedMatch: /1460/,
        recipeConfig: [
            {
                op: "解析TCP",
                args: ["十六进制"],
            }
        ],
    },
    {
        name: "Parse TCP: Timestamps",
        input: "9e90e11574d57b2c00000000a002ffffe5740000020405b40402080aa4e8c8f50000000001030308",
        expectedMatch: /2766719221/,
        recipeConfig: [
            {
                op: "解析TCP",
                args: ["十六进制"],
            }
        ],
    }
]);
