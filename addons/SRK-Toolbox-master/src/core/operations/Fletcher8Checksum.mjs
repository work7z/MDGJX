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
 * Fletcher-8 Checksum operation
 */
class Fletcher8Checksum extends Operation {

    /**
     * Fletcher8Checksum constructor
     */
    constructor() {
        super();

        this.name = "Fletcher-8校验和";
        this.module = "Crypto";
        this.description = "Fletcher校验和是用于计算位置相关校验和的算法，由Lawrence Livermore Labs的John Gould Fletcher在20世纪70年代末期设计。<br><br>Fletcher校验和可以提供接近循环冗余校验（Cyclic redundancy check, CRC）的错误检测功能，但所需的计算更少。";
        this.infoURL = "https://wikipedia.org/wiki/Fletcher%27s_checksum";
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
        let a = 0,
            b = 0;
        input = new Uint8Array(input);

        for (let i = 0; i < input.length; i++) {
            a = (a + input[i]) % 0xf;
            b = (b + a) % 0xf;
        }

        return Utils.hex(((b << 4) | a) >>> 0, 2);
    }

}

export default Fletcher8Checksum;
