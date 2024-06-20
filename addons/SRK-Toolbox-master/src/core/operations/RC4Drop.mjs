/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import { format } from "../lib/Ciphers.mjs";
import CryptoJS from "crypto-js";

/**
 * RC4 Drop operation
 */
class RC4Drop extends Operation {

    /**
     * RC4Drop constructor
     */
    constructor() {
        super();

        this.name = "RC4 Drop";
        this.module = "Ciphers";
        this.description = "由于RC4加密流前部的数个字节随机性不足且泄露关于key的信息，因此丢弃前部数据能提高加密安全性。通常这种优化后的算法称作RC4-drop。";
        this.infoURL = "https://wikipedia.org/wiki/RC4#Fluhrer,_Mantin_and_Shamir_attack";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "加密密码",
                "type": "toggleString",
                "value": "",
                "toggleValues": ["UTF8", "UTF16", "UTF16LE", "UTF16BE", "Latin1", "十六进制", "Base64"]
            },
            {
                "name": "输入格式",
                "type": "option",
                "value": ["Latin1", "UTF8", "UTF16", "UTF16LE", "UTF16BE", "十六进制", "Base64"]
            },
            {
                "name": "输出格式",
                "type": "option",
                "value": ["Latin1", "UTF8", "UTF16", "UTF16LE", "UTF16BE", "十六进制", "Base64"]
            },
            {
                "name": "Number of dwords to drop",
                "type": "number",
                "value": 192
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const message = format[args[1]].parse(input),
            passphrase = format[args[0].option].parse(args[0].string),
            drop = args[3],
            encrypted = CryptoJS.RC4Drop.encrypt(message, passphrase, { drop: drop });

        return encrypted.ciphertext.toString(format[args[2]]);
    }

    /**
     * Highlight RC4 Drop
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
     * Highlight RC4 Drop in reverse
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

export default RC4Drop;
