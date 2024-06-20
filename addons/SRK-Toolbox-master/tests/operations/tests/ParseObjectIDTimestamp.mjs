/**
 * Parse ObjectID timestamp tests
 *
 * @author dmfj [dominic@dmfj.io]
 *
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */
import TestRegister from "../../lib/TestRegister.mjs";


TestRegister.addTests([
    {
        name: "Parse ISO timestamp from ObjectId",
        input: "000000000000000000000000",
        expectedOutput: "1970-01-01T00:00:00.000Z",
        recipeConfig: [
            {
                op: "解析ObjectID时间戳",
                args: [],
            }
        ],
    }
]);
