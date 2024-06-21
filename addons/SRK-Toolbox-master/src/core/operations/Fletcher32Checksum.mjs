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
 * Fletcher-32 Checksum operation
 */
class Fletcher32Checksum extends Operation {

    /**
     * Fletcher32Checksum constructor
     */
    constructor() {
        super();

        this.name = "Fletcher-32校验和";
        this.module = "Crypto";
        this.description = "Fletcher校验和是用于计算位置相关校验和的算法，由Lawrence Livermore Labs的John Gould Fletcher在20世纪70年代末期设计。<br><br>Fletcher校验和可以提供接近循环冗余校验（Cyclic redundancy check, CRC）的错误检测功能，但所需的计算更少。";
        this.infoURL = "https://wikipedia.org/wiki/Fletcher%27s_checksum#Fletcher-32";
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
        if (ArrayBuffer.isView(input)) {
            input = new DataView(input.buffer, input.byteOffset, input.byteLength);
        } else {
            input = new DataView(input);
        }

        for (let i = 0; i < input.byteLength - 1; i += 2) {
            a = (a + input.getUint16(i, true)) % 0xffff;
            b = (b + a) % 0xffff;
        }
        if (input.byteLength % 2 !== 0) {
            a = (a + input.getUint8(input.byteLength - 1)) % 0xffff;
            b = (b + a) % 0xffff;
        }

        return Utils.hex(((b << 16) | a) >>> 0, 8);
    }

}

export default Fletcher32Checksum;
