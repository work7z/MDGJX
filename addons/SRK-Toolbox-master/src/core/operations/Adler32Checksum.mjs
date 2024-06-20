/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";

/**
 * Adler-32 Checksum operation
 */
class Adler32Checksum extends Operation {

    /**
     * Adler32Checksum constructor
     */
    constructor() {
        super();

        this.name = "Adler-32校验和";
        this.module = "Crypto";
        this.description = "Adler-32是一种校验算法，由马克·阿德勒在1995年发明，是对Fletcher校验的一种改进。与相同长度的循环冗余校验相比，它以可靠性换取速度（更倾向于后者）。Adler-32比Fletcher-16更加可靠，比Fletcher-32可靠性稍差。";
        this.infoURL = "https://wikipedia.org/wiki/Adler-32";
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
        const MOD_ADLER = 65521;
        let a = 1,
            b = 0;
        input = new Uint8Array(input);

        for (let i = 0; i < input.length; i++) {
            a += input[i];
            b += a;
        }

        a %= MOD_ADLER;
        b %= MOD_ADLER;

        return Utils.hex(((b << 16) | a) >>> 0, 8);
    }

}

export default Adler32Checksum;
