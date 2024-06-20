/**
 * @author MarvinJWendt [git@marvinjwendt.com]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import TestRegister from "../../lib/TestRegister.mjs";

TestRegister.addTests([
    {
        name: "Convert to NATO alphabet: nothing",
        input: "",
        expectedOutput: "",
        recipeConfig: [
            {
                op: "转换为北约音标字母",
                args: []
            }
        ]
    },
    {
        name: "Convert to NATO alphabet: full alphabet with numbers",
        input: "abcdefghijklmnopqrstuvwxyz0123456789,/.",
        expectedOutput: "Alfa Bravo Charlie Delta Echo Foxtrot Golf Hotel India Juliett Kilo Lima Mike November Oscar Papa Quebec Romeo Sierra Tango Uniform Victor Whiskey X-ray Yankee Zulu Zero One Two Three Four Five Six Seven Eight Nine Comma Fraction bar Full stop ",
        recipeConfig: [
            {
                op: "转换为北约音标字母",
                args: []
            }
        ]
    }
]);
