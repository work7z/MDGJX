/**
 * LZString tests.
 *
 * @author crespyl [peter@crespyl.net]
 * @copyright Peter Jacobs 2021
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */
import TestRegister from "../../lib/TestRegister.mjs";

TestRegister.addTests([
    {
        name: "LZString Compress To Base64",
        input: "hello world",
        expectedOutput: "BYUwNmD2AEDukCcwBMg=",
        recipeConfig: [
            {
                "op": "LZString压缩",
                "args": ["Base64"]
            }
        ],
    },
    {
        name: "LZString Decompress From Base64",
        input: "BYUwNmD2AEDukCcwBMg=",
        expectedOutput: "hello world",
        recipeConfig: [
            {
                "op": "LZString解压",
                "args": ["Base64"]
            }
        ],
    }
]);
