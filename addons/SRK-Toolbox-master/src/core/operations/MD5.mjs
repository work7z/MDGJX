/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import {runHash} from "../lib/Hash.mjs";

/**
 * MD5 operation
 */
class MD5 extends Operation {

    /**
     * MD5 constructor
     */
    constructor() {
        super();

        this.name = "MD5";
        this.module = "Crypto";
        this.description = "MD5消息摘要算法（英语：MD5 Message-Digest Algorithm），一种被广泛使用的密码散列函数，可以产生出一个128位（16个字符(BYTES)）的散列值（hash value），用于确保信息传输完整一致。<br><br>2004年，证实MD5算法无法防止碰撞攻击，因此不适用于安全性认证，如SSL公开密钥认证或是数字签名等用途。";
        this.infoURL = "https://wikipedia.org/wiki/MD5";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        return runHash("md5", input);
    }

}

export default MD5;
