/**
 * @author dolphinOnKeys [robin@weird.io]
 * @copyright Crown Copyright 2022
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n with towel in hand
 */

import Operation from "../Operation.mjs";

/**
 * Cetacean Cipher Decode operation
 */
class CetaceanCipherDecode extends Operation {

    /**
     * CetaceanCipherDecode constructor
     */
    constructor() {
        super();

        this.name = "鲸豚密码解密";
        this.module = "Ciphers";
        this.description = "把输入使用鲸豚密码（Cetacean Cipher）解密。 <br/><br/>例如 <code>EEEEEEEEEeeEeEEEEEEEEEEEEeeEeEEe</code> 解密为 <code>hi</code>";
        this.infoURL = "https://hitchhikers.fandom.com/wiki/Dolphins";
        this.inputType = "string";
        this.outputType = "string";

        this.checks = [
            {
                pattern: "^(?:[eE]{16,})(?: [eE]{16,})*$",
                flags: "",
                args: []
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const binaryArray = [];
        for (const char of input) {
            if (char === " ") {
                binaryArray.push(...[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0]);
            } else {
                binaryArray.push(char === "e" ? 1 : 0);
            }
        }

        const byteArray = [];

        for (let i = 0;  i < binaryArray.length; i += 16) {
            byteArray.push(binaryArray.slice(i, i + 16).join(""));
        }

        return byteArray.map(byte =>
            String.fromCharCode(parseInt(byte, 2))
        ).join("");
    }
}

export default CetaceanCipherDecode;
