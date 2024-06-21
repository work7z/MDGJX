/**
 * @author sg5506844 [sg5506844@gmail.com]
 * @copyright Crown Copyright 2021
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import { base92Ord } from "../lib/Base92.mjs";
import Operation from "../Operation.mjs";

/**
 * From Base92 operation
 */
class FromBase92 extends Operation {
    /**
     * FromBase92 constructor
     */
    constructor() {
        super();

        this.name = "Base92解码";
        this.module = "Default";
        this.description = "Base92是把字节数据转换成特定字符组合的编码方式，编码后便于人类阅读，也方便计算机读取。";
        this.infoURL = "https://wikipedia.org/wiki/List_of_numeral_systems";
        this.inputType = "string";
        this.outputType = "byteArray";
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {byteArray}
     */
    run(input, args) {
        const res = [];
        let bitString = "";

        for (let i = 0; i < input.length; i += 2) {
            if (i + 1 !== input.length) {
                const x = base92Ord(input[i]) * 91 + base92Ord(input[i + 1]);
                bitString += x.toString(2).padStart(13, "0");
            } else {
                const x = base92Ord(input[i]);
                bitString += x.toString(2).padStart(6, "0");
            }
            while (bitString.length >= 8) {
                res.push(parseInt(bitString.slice(0, 8), 2));
                bitString = bitString.slice(8);
            }
        }

        return res;
    }
}

export default FromBase92;
