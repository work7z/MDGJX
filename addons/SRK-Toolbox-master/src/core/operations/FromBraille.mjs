/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import {BRAILLE_LOOKUP} from "../lib/Braille.mjs";

/**
 * From Braille operation
 */
class FromBraille extends Operation {

    /**
     * FromBraille constructor
     */
    constructor() {
        super();

        this.name = "盲文解码";
        this.module = "Default";
        this.description = "把六点盲文转换成文字。";
        this.infoURL = "https://wikipedia.org/wiki/Braille";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        return input.split("").map(b => {
            const idx = BRAILLE_LOOKUP.dot6.indexOf(b);
            return idx < 0 ? b : BRAILLE_LOOKUP.ascii[idx];
        }).join("");
    }

    /**
     * Highlight From Braille
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
     * Highlight From Braille in reverse
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

export default FromBraille;
