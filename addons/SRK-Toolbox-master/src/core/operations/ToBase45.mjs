/**
 * @author Thomas Weißschuh [thomas@t-8ch.de]
 * @copyright Crown Copyright 2021
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import {ALPHABET, highlightToBase45, highlightFromBase45} from "../lib/Base45.mjs";
import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";

/**
 * To Base45 operation
 */
class ToBase45 extends Operation {

    /**
     * ToBase45 constructor
     */
    constructor() {
        super();

        this.name = "Base45编码";
        this.module = "Default";
        this.description = "Base45是把字节数据转换成特定字符组合的编码方式，编码后便于人类阅读，也方便计算机读取。越高的Base数目会生成越短的字符串。Base45是为二维码优化的编码方式。";
        this.infoURL = "https://wikipedia.org/wiki/List_of_numeral_systems";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                name: "可用字符",
                type: "string",
                value: ALPHABET
            }
        ];

        this.highlight = highlightToBase45;
        this.highlightReverse = highlightFromBase45;
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        if (!input) return "";
        input = new Uint8Array(input);
        const alphabet = Utils.expandAlphRange(args[0]);

        const res = [];

        for (const pair of Utils.chunked(input, 2)) {
            let b = 0;
            for (const e of pair) {
                b *= 256;
                b += e;
            }

            let chars = 0;
            do {
                res.push(alphabet[b % 45]);
                chars++;
                b = Math.floor(b / 45);
            } while (b > 0);

            if (chars < 2) {
                res.push("0");
                chars++;
            }
            if (pair.length > 1 && chars < 3) {
                res.push("0");
            }
        }


        return res.join("");

    }

}

export default ToBase45;
