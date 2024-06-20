/**
 * @author sg5506844 [sg5506844@gmail.com]
 * @copyright Crown Copyright 2021
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import { base92Chr } from "../lib/Base92.mjs";
import Operation from "../Operation.mjs";

/**
 * To Base92 operation
 */
class ToBase92 extends Operation {
    /**
     * ToBase92 constructor
     */
    constructor() {
        super();

        this.name = "Base92编码";
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

        while (input.length > 0) {
            while (bitString.length < 13 && input.length > 0) {
                bitString += input[0].charCodeAt(0).toString(2).padStart(8, "0");
                input = input.slice(1);
            }
            if (bitString.length < 13)
                break;
            const i = parseInt(bitString.slice(0, 13), 2);
            res.push(base92Chr(Math.floor(i / 91)));
            res.push(base92Chr(i % 91));
            bitString = bitString.slice(13);
        }

        if (bitString.length > 0) {
            if (bitString.length < 7) {
                bitString = bitString.padEnd(6, "0");
                res.push(base92Chr(parseInt(bitString, 2)));
            } else {
                bitString = bitString.padEnd(13, "0");
                const i = parseInt(bitString.slice(0, 13), 2);
                res.push(base92Chr(Math.floor(i / 91)));
                res.push(base92Chr(i % 91));
            }
        }

        return res;

    }
}

export default ToBase92;
