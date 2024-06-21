/**
 * @author dolphinOnKeys [robin@weird.io]
 * @copyright Crown Copyright 2022
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n with towel in hand
 */

import Operation from "../Operation.mjs";
import {toBinary} from "../lib/Binary.mjs";

/**
 * Cetacean Cipher Encode operation
 */
class CetaceanCipherEncode extends Operation {

    /**
     * CetaceanCipherEncode constructor
     */
    constructor() {
        super();

        this.name = "鲸豚密码加密";
        this.module = "Ciphers";
        this.description = "把输入使用鲸豚密码（Cetacean Cipher）加密。 <br/><br/>例如 <code>hi</code> 加密为 <code>EEEEEEEEEeeEeEEEEEEEEEEEEeeEeEEe</code>";
        this.infoURL = "https://hitchhikers.fandom.com/wiki/Dolphins";
        this.inputType = "string";
        this.outputType = "string";
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const result = [];
        const charArray = input.split("");

        charArray.map(character => {
            if (character === " ") {
                result.push(character);
            } else {
                const binaryArray = toBinary(character.charCodeAt(0), "None", 16).split("");
                result.push(binaryArray.map(str => str === "1" ? "e" : "E").join(""));
            }
        });

        return result.join("");
    }
}

export default CetaceanCipherEncode;
