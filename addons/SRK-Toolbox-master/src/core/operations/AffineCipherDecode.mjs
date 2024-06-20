/**
 * @author Matt C [matt@artemisbot.uk]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";
import OperationError from "../errors/OperationError.mjs";

/**
 * Affine Cipher Decode operation
 */
class AffineCipherDecode extends Operation {

    /**
     * AffineCipherDecode constructor
     */
    constructor() {
        super();

        this.name = "仿射密码解密";
        this.module = "Ciphers";
        this.description = "仿射密码（Affine cipher）为单表加密的一种，字母系统中所有字母都藉一简单数学方程加密，对应至数值，或转回字母。";
        this.infoURL = "https://wikipedia.org/wiki/Affine_cipher";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "a",
                "type": "number",
                "value": 1
            },
            {
                "name": "b",
                "type": "number",
                "value": 0
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     *
     * @throws {OperationError} if a or b values are invalid
     */
    run(input, args) {
        const alphabet = "abcdefghijklmnopqrstuvwxyz",
            [a, b] = args,
            aModInv = Utils.modInv(a, 26); // Calculates modular inverse of a
        let output = "";

        if (!/^\+?(0|[1-9]\d*)$/.test(a) || !/^\+?(0|[1-9]\d*)$/.test(b)) {
            throw new OperationError("a和b必须为整数");
        }

        if (Utils.gcd(a, 26) !== 1) {
            throw new OperationError("`a`必须和26互质");
        }

        for (let i = 0; i < input.length; i++) {
            if (alphabet.indexOf(input[i]) >= 0) {
                // Uses the affine decode function (y-b * A') % m = x (where m is length of the alphabet and A' is modular inverse)
                output += alphabet[Utils.mod((alphabet.indexOf(input[i]) - b) * aModInv, 26)];
            } else if (alphabet.indexOf(input[i].toLowerCase()) >= 0) {
                // Same as above, accounting for uppercase
                output += alphabet[Utils.mod((alphabet.indexOf(input[i].toLowerCase()) - b) * aModInv, 26)].toUpperCase();
            } else {
                // Non-alphabetic characters
                output += input[i];
            }
        }
        return output;
    }

    /**
     * Highlight Affine Cipher Decode
     *
     * @param {Object[]} pos
     * @param {number} pos[].start
     * @param {number} pos[].end
     * @param {Object[]} args
     * @returns {Object[]} pos
     */
    highlight(pos, args) {
        return pos;
    }

    /**
     * Highlight Affine Cipher Decode in reverse
     *
     * @param {Object[]} pos
     * @param {number} pos[].start
     * @param {number} pos[].end
     * @param {Object[]} args
     * @returns {Object[]} pos
     */
    highlightReverse(pos, args) {
        return pos;
    }

}

export default AffineCipherDecode;
