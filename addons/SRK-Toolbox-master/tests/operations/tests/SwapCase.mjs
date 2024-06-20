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
        "name": "Swap Case: basic example",
        "input": "Hello, World!",
        "expectedOutput": "hELLO, wORLD!",
        "recipeConfig": [
            {
                "op": "大小写互换",
                "args": [
                ],
            },
        ],
    },
    {
        "name": "Swap Case: empty input",
        "input": "",
        "expectedOutput": "",
        "recipeConfig": [
            {
                "op": "大小写互换",
                "args": [
                ],
            },
        ],
    },
]);
