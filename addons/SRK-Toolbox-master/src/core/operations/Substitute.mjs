/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";

/**
 * Substitute operation
 */
class Substitute extends Operation {

    /**
     * Substitute constructor
     */
    constructor() {
        super();

        this.name = "替换密码";
        this.module = "Default";
        this.description = "替换密码允许你将明文中的任意字节替换成其它字节。可以用来生成凯撒密码，但同时提供了更多的加密手段。<br><br>输入想要替换的内容在明文框，然后替换成的内容在密文框。<br><br>无法显示的字节可以用转义形式。例如换行可以写成 <code>\\n</code> 或 <code>\\x0a</code>。<br><br>用连字符来指定字节范围。例如 <code>0123456789</code> 可以写成 <code>0-9</code>。<br><br>注意反斜杠是用来转义其它字符的，所以如果需要使用反斜杠，它自身也要被转义（例<code>\\\\</code>）。";
        this.infoURL = "https://wikipedia.org/wiki/Substitution_cipher";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "明文",
                "type": "binaryString",
                "value": "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
            },
            {
                "name": "密文",
                "type": "binaryString",
                "value": "XYZABCDEFGHIJKLMNOPQRSTUVW"
            },
            {
                "name": "忽略大小写",
                "type": "boolean",
                "value": false
            }
        ];
    }

    /**
     * Convert a single character using the dictionary, if ignoreCase is true then
     * check in the dictionary for both upper and lower case versions of the character.
     * In output the input character case is preserved.
     * @param {string} char
     * @param {Object} dict
     * @param {boolean} ignoreCase
     * @returns {string}
     */
    cipherSingleChar(char, dict, ignoreCase) {
        if (!ignoreCase)
            return dict[char] || char;

        const isUpperCase = char === char.toUpperCase();

        // convert using the dictionary keeping the case of the input character

        if (dict[char] !== undefined) {
            // if the character is in the dictionary return the value with the input case
            return isUpperCase ? dict[char].toUpperCase() : dict[char].toLowerCase();
        }

        // check for the other case, if it is in the dictionary return the value with the right case
        if (isUpperCase) {
            if (dict[char.toLowerCase()] !== undefined)
                return dict[char.toLowerCase()].toUpperCase();
        } else {
            if (dict[char.toUpperCase()] !== undefined)
                return dict[char.toUpperCase()].toLowerCase();
        }

        return char;
    }


    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const plaintext = Utils.expandAlphRange([...args[0]]),
            ciphertext = Utils.expandAlphRange([...args[1]]),
            ignoreCase = args[2];
        let output = "";

        if (plaintext.length !== ciphertext.length) {
            output = "警告：明文和密文长度不同\n\n";
        }

        // create dictionary for conversion
        const dict = {};
        for (let i = 0; i < Math.min(ciphertext.length, plaintext.length); i++) {
            dict[plaintext[i]] = ciphertext[i];
        }

        // map every letter with the conversion function
        for (const character of input) {
            output += this.cipherSingleChar(character, dict, ignoreCase);
        }

        return output;
    }

}

export default Substitute;
