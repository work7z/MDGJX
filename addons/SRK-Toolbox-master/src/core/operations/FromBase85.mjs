/**
 * @author PenguinGeorge [george@penguingeorge.com]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import Utils from "../Utils.mjs";
import {ALPHABET_OPTIONS} from "../lib/Base85.mjs";

/**
 * From Base85 operation
 */
class FromBase85 extends Operation {

    /**
     * From Base85 constructor
     */
    constructor() {
        super();

        this.name = "Base85解码";
        this.module = "Default";
        this.description = "Base85（也叫Ascii85）是把字节数据转换成特定字符组合的编码方式。通常比Base64效率更高。<br><br>此操作将使用ASCII字符的Base64字符串解码成原始数据。字符表可选，带有预设。<br><br>例： <code>BOu!rD]j7BEbo7</code> 解码成 <code>hello world</code><br><br>Base85在Adobe的PostScript和PDF格式中较为常见。";
        this.infoURL = "https://wikipedia.org/wiki/Ascii85";
        this.inputType = "string";
        this.outputType = "byteArray";
        this.args = [
            {
                name: "可用字符",
                type: "editableOption",
                value: ALPHABET_OPTIONS
            },
            {
                name: "移除不可用字符",
                type: "boolean",
                value: true
            },
            {
                name: "全零分组字符",
                type: "binaryShortString",
                value: "z",
                maxLength: 1
            }
        ];
        this.checks = [
            {
                pattern:
                    "^\\s*(?:<~)?" + // Optional whitespace and starting marker
                    "[\\s!-uz]*" +   // Any amount of base85 characters and whitespace
                    "[!-uz]{15}" +   // At least 15 continoues base85 characters without whitespace
                    "[\\s!-uz]*" +   // Any amount of base85 characters and whitespace
                    "(?:~>)?\\s*$",  // Optional ending marker and whitespace
                args: ["!-u"],
            },
            {
                pattern:
                    "^" +
                    "[\\s0-9a-zA-Z.\\-:+=^!/*?&<>()[\\]{}@%$#]*" +
                    "[0-9a-zA-Z.\\-:+=^!/*?&<>()[\\]{}@%$#]{15}" + // At least 15 continoues base85 characters without whitespace
                    "[\\s0-9a-zA-Z.\\-:+=^!/*?&<>()[\\]{}@%$#]*" +
                    "$",
                args: ["0-9a-zA-Z.\\-:+=^!/*?&<>()[]{}@%$#"],
            },
            {
                pattern:
                    "^" +
                    "[\\s0-9A-Za-z!#$%&()*+\\-;<=>?@^_`{|}~]*" +
                    "[0-9A-Za-z!#$%&()*+\\-;<=>?@^_`{|}~]{15}" + // At least 15 continoues base85 characters without whitespace
                    "[\\s0-9A-Za-z!#$%&()*+\\-;<=>?@^_`{|}~]*" +
                    "$",
                args: ["0-9A-Za-z!#$%&()*+\\-;<=>?@^_`{|}~"],
            },
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {byteArray}
     */
    run(input, args) {
        const alphabet = Utils.expandAlphRange(args[0]).join(""),
            removeNonAlphChars = args[1],
            allZeroGroupChar = typeof args[2] === "string" ? args[2].slice(0, 1) : "",
            result = [];

        if (alphabet.length !== 85 ||
            [].unique.call(alphabet).length !== 85) {
            throw new OperationError("可用字符必须为85个");
        }

        if (allZeroGroupChar && alphabet.includes(allZeroGroupChar)) {
            throw new OperationError("全零分组字符不能出现在可用字符中");
        }

        // Remove delimiters if present
        const matches = input.match(/^<~(.+?)~>$/);
        if (matches !== null) input = matches[1];

        // Remove non-alphabet characters
        if (removeNonAlphChars) {
            const re = new RegExp("[^~" + allZeroGroupChar +alphabet.replace(/[[\]\\\-^$]/g, "\\$&") + "]", "g");
            input = input.replace(re, "");
            // Remove delimiters again if present (incase of non-alphabet characters in front/behind delimiters)
            const matches = input.match(/^<~(.+?)~>$/);
            if (matches !== null) input = matches[1];
        }

        if (input.length === 0) return [];

        let i = 0;
        let block, blockBytes;
        while (i < input.length) {
            if (input[i] === allZeroGroupChar) {
                result.push(0, 0, 0, 0);
                i++;
            } else {
                let digits = [];
                digits = input
                    .substr(i, 5)
                    .split("")
                    .map((chr, idx) => {
                        const digit = alphabet.indexOf(chr);
                        if ((digit < 0 || digit > 84) && chr !== allZeroGroupChar) {
                            throw `无效的字符 '${chr}' ，位置： ${i + idx}`;
                        }
                        return digit;
                    });

                block =
                    digits[0] * 52200625 +
                    digits[1] * 614125 +
                    (i + 2 < input.length ? digits[2] : 84) * 7225 +
                    (i + 3 < input.length ? digits[3] : 84) * 85 +
                    (i + 4 < input.length ? digits[4] : 84);

                blockBytes = [
                    (block >> 24) & 0xff,
                    (block >> 16) & 0xff,
                    (block >> 8) & 0xff,
                    block & 0xff
                ];

                if (input.length < i + 5) {
                    blockBytes.splice(input.length - (i + 5), 5);
                }

                result.push.apply(result, blockBytes);
                i += 5;
            }
        }

        return result;
    }

}

export default FromBase85;
