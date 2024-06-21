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
import OperationError from "../errors/OperationError.mjs";

/**
 * A1Z26 Cipher Decode operation
 */
class A1Z26CipherDecode extends Operation {

    /**
     * A1Z26CipherDecode constructor
     */
    constructor() {
        super();

        this.name = "A1Z26密码解密";
        this.module = "Ciphers";
        this.description = "把字母表序数转换成对应的字母。<br><br>例： <code>1</code> 解密为 <code>a</code> ， <code>2</code> 解密为 <code>b</code>。";
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
        this.checks = [
            {
                pattern:  "^\\s*([12]?[0-9] )+[12]?[0-9]\\s*$",
                flags:  "",
                args:   ["Space"]
            },
            {
                pattern:  "^\\s*([12]?[0-9],)+[12]?[0-9]\\s*$",
                flags:  "",
                args:   ["Comma"]
            },
            {
                pattern:  "^\\s*([12]?[0-9];)+[12]?[0-9]\\s*$",
                flags:  "",
                args:   ["Semi-colon"]
            },
            {
                pattern:  "^\\s*([12]?[0-9]:)+[12]?[0-9]\\s*$",
                flags:  "",
                args:   ["Colon"]
            },
            {
                pattern:  "^\\s*([12]?[0-9]\\n)+[12]?[0-9]\\s*$",
                flags:  "",
                args:   ["Line feed"]
            },
            {
                pattern:  "^\\s*([12]?[0-9]\\r\\n)+[12]?[0-9]\\s*$",
                flags:  "",
                args:   ["CRLF"]
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

        if (input.length === 0) {
            return [];
        }

        const bites = input.split(delim);
        let latin1 = "";
        for (let i = 0; i < bites.length; i++) {
            if (bites[i] < 1 || bites[i] > 26) {
                throw new OperationError("错误：数字必须在1到26之间。");
            }
            latin1 += Utils.chr(parseInt(bites[i], 10) + 96);
        }
        return latin1;
    }

}

export default A1Z26CipherDecode;
