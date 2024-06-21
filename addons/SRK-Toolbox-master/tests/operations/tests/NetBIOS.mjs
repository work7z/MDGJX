/**
 * NetBIOS tests.
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
        name: "Encode NetBIOS name",
        input: "The NetBIOS name",
        expectedOutput: "FEGIGFCAEOGFHEECEJEPFDCAGOGBGNGF",
        recipeConfig: [
            {
                op: "NetBIOS名称编码",
                args: [65],
            },
        ],
    },
    {
        name: "Decode NetBIOS Name",
        input: "FEGIGFCAEOGFHEECEJEPFDCAGOGBGNGF",
        expectedOutput: "The NetBIOS name",
        recipeConfig: [
            {
                op: "NetBIOS名称解码",
                args: [65],
            },
        ],
    },
]);
