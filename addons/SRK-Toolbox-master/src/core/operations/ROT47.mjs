/**
 * @author Matt C [matt@artemisbot.uk]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";


/**
 * ROT47 operation.
 */
class ROT47 extends Operation {

    /**
     * ROT47 constructor
     */
    constructor() {
        super();

        this.name = "ROT47";
        this.module = "Default";
        this.description = "稍微复杂点的凯撒密码，使用了ASCII里从 33 '!' 到 126 '~'的字符。默认的偏移数量是47。";
        this.infoURL = "https://wikipedia.org/wiki/ROT13#Variants";
        this.inputType = "byteArray";
        this.outputType = "byteArray";
        this.args = [
            {
                name: "偏移数量",
                type: "number",
                value: 47
            },
        ];
    }

    /**
     * @param {byteArray} input
     * @param {Object[]} args
     * @returns {byteArray}
     */
    run(input, args) {
        const output = input;
        let amount = args[0],
            chr;

        if (amount) {
            if (amount < 0) {
                amount = 94 - (Math.abs(amount) % 94);
            }

            for (let i = 0; i < input.length; i++) {
                chr = input[i];
                if (chr >= 33 && chr <= 126) {
                    chr = (chr - 33 + amount) % 94;
                    output[i] = chr + 33;
                }
            }
        }
        return output;
    }

    /**
     * Highlight ROT47
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
     * Highlight ROT47 in reverse
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

export default ROT47;
