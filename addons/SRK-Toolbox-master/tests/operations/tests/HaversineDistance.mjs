/**
 * Haversine distance tests.
 *
 * @author Dachande663 [dachande663@gmail.com]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */
import TestRegister from "../../lib/TestRegister.mjs";

TestRegister.addTests([
    {
        name: "半正矢距离",
        input: "51.487263,-0.124323, 38.9517,-77.1467",
        expectedOutput: "5902542.836307819",
        recipeConfig: [
            {
                "op": "半正矢距离",
                "args": []
            }
        ],
    },
    {
        name: "Haversine distance, zero distance",
        input: "51.487263,-0.124323, 51.487263,-0.124323",
        expectedOutput: "0",
        recipeConfig: [
            {
                "op": "半正矢距离",
                "args": []
            }
        ],
    }
]);
