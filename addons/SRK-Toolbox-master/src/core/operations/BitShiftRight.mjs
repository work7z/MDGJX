/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";

/**
 * Bit shift right operation
 */
class BitShiftRight extends Operation {

    /**
     * BitShiftRight constructor
     */
    constructor() {
        super();

        this.name = "按位右移";
        this.module = "Default";
        this.description = "按照给定的偏移量对输入值进行按位右移操作。<br><br><i>逻辑移位：</i> 左侧最高位插入0 <br><i>算术移位：</i> 保留最高有效位，从而保证计算前后的数字符号一致（即正负一致）";
        this.infoURL = "https://wikipedia.org/wiki/Bitwise_operation#Bit_shifts";
        this.inputType = "ArrayBuffer";
        this.outputType = "ArrayBuffer";
        this.args = [
            {
                "name": "偏移量",
                "type": "number",
                "value": 1
            },
            {
                "name": "类型",
                "type": "option",
                "value": ["逻辑移位", "算术移位"]
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {ArrayBuffer}
     */
    run(input, args) {
        const amount = args[0],
            type = args[1],
            mask = type === "逻辑移位" ? 0 : 0x80;
        input = new Uint8Array(input);

        return input.map(b => {
            return (b >>> amount) ^ (b & mask);
        }).buffer;
    }

    /**
     * Highlight Bit shift right
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
     * Highlight Bit shift right in reverse
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

export default BitShiftRight;
