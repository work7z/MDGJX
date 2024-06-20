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
    BACON_TRANSLATIONS_FOR_ENCODING, BACON_TRANSLATION_AB,
    swapZeroAndOne
} from "../lib/Bacon.mjs";

/**
 * Bacon Cipher Encode operation
 */
class BaconCipherEncode extends Operation {
    /**
     * BaconCipherEncode constructor
     */
    constructor() {
        super();

        this.name = "培根密码加密";
        this.module = "Default";
        this.description = "培根密码，又名倍康尼密码（英语：Bacon's cipher）是由弗朗西斯·培根发明的一种隐写术。密文用一段其它文字的形式表现，而不是使用它本身的内容。";
        this.infoURL = "https://wikipedia.org/wiki/Bacon%27s_cipher";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "可用字符",
                "type": "option",
                "value": Object.keys(BACON_ALPHABETS)
            },
            {
                "name": "翻译方式",
                "type": "option",
                "value": BACON_TRANSLATIONS_FOR_ENCODING
            },
            {
                "name": "保留无法编码的其它字符",
                "type": "boolean",
                "value": false
            },
            {
                "name": "反向翻译（0/A换成1/B，1/B换成0/A）",
                "type": "boolean",
                "value": false
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [alphabet, translation, keep, invert] = args;

        const alphabetObject = BACON_ALPHABETS[alphabet];
        const charCodeA = "A".charCodeAt(0);
        const charCodeZ = "Z".charCodeAt(0);

        let output = input.replace(/./g, function (c) {
            const charCode = c.toUpperCase().charCodeAt(0);
            if (charCode >= charCodeA && charCode <= charCodeZ) {
                let code = charCode - charCodeA;
                if (alphabetObject.codes !== undefined) {
                    code = alphabetObject.codes[code];
                }
                const bacon = ("00000" + code.toString(2)).substr(-5, 5);
                return bacon;
            } else {
                return c;
            }
        });

        if (invert) {
            output = swapZeroAndOne(output);
        }
        if (!keep) {
            output = output.replace(/[^01]/g, "");
            const outputArray = output.match(/(.{5})/g) || [];
            output = outputArray.join(" ");
        }
        if (translation === BACON_TRANSLATION_AB) {
            output = output.replace(/[01]/g, function (c) {
                return {
                    "0": "A",
                    "1": "B"
                }[c];
            });
        }

        return output;
    }
}

export default BaconCipherEncode;
