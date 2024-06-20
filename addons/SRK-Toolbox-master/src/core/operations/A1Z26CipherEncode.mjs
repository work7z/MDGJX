/**
 * @author Jarmo van Lenthe [github.com/jarmovanlenthe]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";
import {DELIM_OPTIONS} from "../lib/Delim.mjs";

/**
 * A1Z26 Cipher Encode operation
 */
class A1Z26CipherEncode extends Operation {

    /**
     * A1Z26CipherEncode constructor
     */
    constructor() {
        super();

        this.name = "A1Z26密码加密";
        this.module = "Ciphers";
        this.description = "把字母转换为在字母表中对应的位置序数。<br><br>例： <code>a</code> 加密为 <code>1</code> ， <code>b</code> 加密为 <code>2</code>。<br><br>不在26个字母中的其他字符会被忽略。";
        this.infoURL = "";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                name: "分隔符",
                type: "option",
                value: DELIM_OPTIONS
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const delim = Utils.charRep(args[0] || "Space");
        let output = "";

        const sanitizedinput = input.toLowerCase(),
            charcode = Utils.strToCharcode(sanitizedinput);

        for (let i = 0; i < charcode.length; i++) {
            const ordinal = charcode[i] - 96;

            if (ordinal > 0 && ordinal <= 26) {
                output += ordinal.toString(10) + delim;
            }
        }
        return output.slice(0, -delim.length);
    }

}

export default A1Z26CipherEncode;
