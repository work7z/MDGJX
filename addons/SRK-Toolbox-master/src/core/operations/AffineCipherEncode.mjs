/**
 * @author Matt C [matt@artemisbot.uk]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import { affineEncode } from "../lib/Ciphers.mjs";

/**
 * Affine Cipher Encode operation
 */
class AffineCipherEncode extends Operation {

    /**
     * AffineCipherEncode constructor
     */
    constructor() {
        super();

        this.name = "仿射密码加密";
        this.module = "Ciphers";
        this.description = "仿射密码（Affine cipher）为单表加密的一种，字母系统中所有字母都藉一简单数学方程加密（<code>(ax + b) % 26</code>），对应至数值，或转回字母。";
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
     */
    run(input, args) {
        return affineEncode(input, args);
    }

    /**
     * Highlight Affine Cipher Encode
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
     * Highlight Affine Cipher Encode in reverse
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

export default AffineCipherEncode;
