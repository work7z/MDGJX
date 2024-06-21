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
 * MD4 operation
 */
class MD4 extends Operation {

    /**
     * MD4 constructor
     */
    constructor() {
        super();

        this.name = "MD4";
        this.module = "Crypto";
        this.description = "MD4是麻省理工学院教授Ronald Rivest于1990年设计的一种信息摘要算法。它是一种用来测试信息完整性的密码散列函数的实行。其摘要长度为128位。这个算法影响了后来的算法如MD5、SHA家族和RIPEMD等。<br><br>MD4算法具有严重的安全漏洞，目前已被淘汰。";
        this.infoURL = "https://wikipedia.org/wiki/MD4";
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
        return runHash("md4", input);
    }

}

export default MD4;
