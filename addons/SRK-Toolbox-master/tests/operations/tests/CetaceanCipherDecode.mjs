/**
 * CetaceanCipher Encode tests
 *
 * @author dolphinOnKeys
 * @copyright Crown Copyright 2022
 * @licence Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */
import TestRegister from "../../lib/TestRegister.mjs";

TestRegister.addTests([
    {
        name: "Cetacean Cipher Decode",
        input: "EEEEEEEEEeeEEEEe EEEEEEEEEeeEEEeE EEEEEEEEEeeEEEee EEeeEEEEEeeEEeee",
        expectedOutput: "a b c で",
        recipeConfig: [
            {
                op: "鲸豚密码解密",
                args: []
            },
        ],
    }
]);
