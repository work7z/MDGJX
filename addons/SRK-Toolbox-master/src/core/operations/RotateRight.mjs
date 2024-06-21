/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import {rot, rotr, rotrCarry} from "../lib/Rotate.mjs";


/**
 * Rotate right operation.
 */
class RotateRight extends Operation {

    /**
     * RotateRight constructor
     */
    constructor() {
        super();

        this.name = "循环右移";
        this.module = "Default";
        this.description = "将每个字节按照给定的偏移量循环右移，可选择是否进位。当前只支持8位数值。";
        this.infoURL = "https://wikipedia.org/wiki/Bitwise_operation#Bit_shifts";
        this.inputType = "byteArray";
        this.outputType = "byteArray";
        this.args = [
            {
                name: "偏移量",
                type: "number",
                value: 1
            },
            {
                name: "进位",
                type: "boolean",
                value: false
            }
        ];
    }

    /**
     * @param {byteArray} input
     * @param {Object[]} args
     * @returns {byteArray}
     */
    run(input, args) {
        if (args[1]) {
            return rotrCarry(input, args[0]);
        } else {
            return rot(input, args[0], rotr);
        }
    }

    /**
     * Highlight rotate right
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
     * Highlight rotate right in reverse
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

export default RotateRight;
