/**
 * @author Karsten Silkenbäumer [github.com/kassi]
 * @copyright Karsten Silkenbäumer 2019
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import {
    BACON_ALPHABETS,
    BACON_TRANSLATION_CASE, BACON_TRANSLATION_AMNZ, BACON_TRANSLATIONS, BACON_CLEARER_MAP, BACON_NORMALIZE_MAP,
    swapZeroAndOne
} from "../lib/Bacon.mjs";

/**
 * Bacon Cipher Decode operation
 */
class BaconCipherDecode extends Operation {
    /**
     * BaconCipherDecode constructor
     */
    constructor() {
        super();

        this.name = "培根密码解密";
        this.module = "Default";
        this.description = "培根密码，又名倍康尼密码（英语：Bacon's cipher）是由弗朗西斯·培根发明的一种隐写术。密文用一段其它文字的形式表现，而不是使用它本身的内容。";
        this.infoURL = "https://wikipedia.org/wiki/Bacon%27s_cipher";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "用字符",
                "type": "option",
                "value": Object.keys(BACON_ALPHABETS)
            },
            {
                "name": "翻译方式",
                "type": "option",
                "value": BACON_TRANSLATIONS
            },
            {
                "name": "反向翻译（0/A换成1/B，1/B换成0/A）",
                "type": "boolean",
                "value": false
            }
        ];
        this.checks = [
            {
                pattern:  "^\\s*([01]{5}\\s?)+$",
                flags:  "",
                args:   ["标准 (I=J, U=V)", "0/1", false]
            },
            {
                pattern:  "^\\s*([01]{5}\\s?)+$",
                flags:  "",
                args:   ["标准 (I=J, U=V)", "0/1", true]
            },
            {
                pattern:  "^\\s*([AB]{5}\\s?)+$",
                flags:  "",
                args:   ["标准 (I=J, U=V)", "A/B", false]
            },
            {
                pattern:  "^\\s*([AB]{5}\\s?)+$",
                flags:  "",
                args:   ["标准 (I=J, U=V)", "A/B", true]
            },
            {
                pattern:  "^\\s*([01]{5}\\s?)+$",
                flags:  "",
                args:   ["完全", "0/1", false]
            },
            {
                pattern:  "^\\s*([01]{5}\\s?)+$",
                flags:  "",
                args:   ["完全", "0/1", true]
            },
            {
                pattern:  "^\\s*([AB]{5}\\s?)+$",
                flags:  "",
                args:   ["完全", "A/B", false]
            },
            {
                pattern:  "^\\s*([AB]{5}\\s?)+$",
                flags:  "",
                args:   ["完全", "A/B", true]
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [alphabet, translation, invert] = args;
        const alphabetObject = BACON_ALPHABETS[alphabet];

        // remove invalid characters
        input = input.replace(BACON_CLEARER_MAP[translation], "");

        // normalize to unique alphabet
        if (BACON_NORMALIZE_MAP[translation] !== undefined) {
            input = input.replace(/./g, function (c) {
                return BACON_NORMALIZE_MAP[translation][c];
            });
        } else if (translation === BACON_TRANSLATION_CASE) {
            const codeA = "A".charCodeAt(0);
            const codeZ = "Z".charCodeAt(0);
            input = input.replace(/./g, function (c) {
                const code = c.charCodeAt(0);
                if (code >= codeA && code <= codeZ) {
                    return "1";
                } else {
                    return "0";
                }
            });
        } else if (translation === BACON_TRANSLATION_AMNZ) {
            const words = input.split(/\s+/);
            const letters = words.map(function (e) {
                if (e) {
                    const code = e[0].toUpperCase().charCodeAt(0);
                    return code >= "N".charCodeAt(0) ? "1" : "0";
                } else {
                    return "";
                }
            });
            input = letters.join("");
        }

        if (invert) {
            input = swapZeroAndOne(input);
        }

        // group into 5
        const inputArray = input.match(/(.{5})/g) || [];

        let output = "";
        for (let i = 0; i < inputArray.length; i++) {
            const code = inputArray[i];
            const number = parseInt(code, 2);
            output += number < alphabetObject.alphabet.length ? alphabetObject.alphabet[number] : "?";
        }
        return output;
    }
}

export default BaconCipherDecode;
