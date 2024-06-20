/**
 * Text Encoding Brute Force tests.
 *
 * @author Cynser
 *
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */
import TestRegister from "../../lib/TestRegister.mjs";

TestRegister.addTests([
    {
        name: "Text Encoding Brute Force - Encode",
        input: "Р‘СѓР»РєС– РїСЂР°Р· Р»СЏРЅС–РІР° СЃР°Р±Р°РєСѓ.",
        expectedMatch: /Windows-1251 Cyrillic \(1251\).{1,10}Булкі праз ляніва сабаку\./,
        recipeConfig: [
            {
                op: "文本编码暴力破解",
                args: ["编码"],
            },
        ],
    },
    {
        name: "Text Encoding Brute Force - Decode",
        input: "Áóëê³ ïðàç ëÿí³âà ñàáàêó.",
        expectedMatch: /Windows-1251 Cyrillic \(1251\).{1,10}Булкі праз ляніва сабаку\./,
        recipeConfig: [
            {
                op: "文本编码暴力破解",
                args: ["解码"],
            },
        ],
    }
]);

