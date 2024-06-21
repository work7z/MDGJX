/**
 * NTLM test.
 *
 * @author brun0ne [brunonblok@gmail.com]
 * @copyright Crown Copyright 2022
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */
import TestRegister from "../../lib/TestRegister.mjs";

TestRegister.addTests([
    {
        name: "NT Hash",
        input: "QWERTYUIOPASDFGHJKLZXCVBNM1234567890!@#$%^&*()_+.,?/",
        expectedOutput: "C5FA1C40E55734A8E528DBFE21766D23",
        recipeConfig: [
            {
                op: "NT哈希",
                args: [],
            },
        ],
    },
    {
        name: "LM Hash",
        input: "QWERTYUIOPASDFGHJKLZXCVBNM1234567890!@#$%^&*()_+.,?/",
        expectedOutput: "6D9DF16655336CA75A3C13DD18BA8156",
        recipeConfig: [
            {
                op: "LM哈希",
                args: [],
            },
        ],
    },

]);
