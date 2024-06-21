/**
 * Index of Coincidence tests.
 *
 * @author George O [georgeomnet+cyberchef@gmail.com]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */
import TestRegister from "../../lib/TestRegister.mjs";

TestRegister.addTests([
    {
        name: "Index of Coincidence",
        input: "Hello world, this is a test to determine the correct IC value.",
        expectedMatch: /^重合因子： 0\.07142857142857142\n标准化： 1\.857142857142857/,
        recipeConfig: [
            {
                "op": "重合因子",
                "args": []
            },
        ],
    },
]);
