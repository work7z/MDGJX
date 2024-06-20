/**
 * Base58 tests.
 *
 * @author tlwr [toby@toby.codes]
 *
 * @copyright Crown Copyright 2017
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */
import TestRegister from "../../lib/TestRegister.mjs";

TestRegister.addTests([
    {
        name: "To Morse Code: 'SOS'",
        input: "SOS",
        expectedOutput: "... --- ...",
        recipeConfig: [
            {
                op: "摩尔斯电码编码",
                args: ["-/.", "空格", "换行"],
            },
        ],
    },
    {
        name: "From Morse Code '... --- ...'",
        input: "... --- ...",
        expectedOutput: "SOS",
        recipeConfig: [
            {
                op: "摩尔斯电码解码",
                args: ["空格", "换行"],
            },
        ],
    },
]);
