/**
 * LS47 tests.
 *
 * @author n1073645 [n1073645@gmail.com]
 *
 * @copyright Crown Copyright 2020
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */
import TestRegister from "../../lib/TestRegister.mjs";

TestRegister.addTests([
    {
        name: "LS47 Encrypt",
        input: "thequickbrownfoxjumped",
        expectedOutput: "(,t74ci78cp/8trx*yesu:alp1wqy",
        recipeConfig: [
            {
                op: "LS47加密",
                args: ["helloworld", 0, "test"],
            },
        ],
    },
    {
        name: "LS47 Decrypt",
        input: "(,t74ci78cp/8trx*yesu:alp1wqy",
        expectedOutput: "thequickbrownfoxjumped---test",
        recipeConfig: [
            {
                op: "LS47解密",
                args: ["helloworld", 0],
            },
        ],
    },
    {
        name: "LS47 Encrypt",
        input: "thequickbrownfoxjumped",
        expectedOutput: "Letter H is not included in LS47",
        recipeConfig: [
            {
                op: "LS47加密",
                args: ["Helloworld", 0, "test"],
            },
        ],
    }
]);
