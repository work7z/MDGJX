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
 * Fletcher-64 Checksum operation
 */
class Fletcher64Checksum extends Operation {

    /**
     * Fletcher64Checksum constructor
     */
    constructor() {
        super();

        this.name = "Fletcher-64校验和";
        this.module = "Crypto";
        this.description = "Fletcher校验和是用于计算位置相关校验和的算法，由Lawrence Livermore Labs的John Gould Fletcher在20世纪70年代末期设计。<br><br>Fletcher校验和可以提供接近循环冗余校验（Cyclic redundancy check, CRC）的错误检测功能，但所需的计算更少。";
        this.infoURL = "https://wikipedia.org/wiki/Fletcher%27s_checksum#Fletcher-64";
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

        for (let i = 0; i < input.byteLength - 3; i += 4) {
            a = (a + input.getUint32(i, true)) % 0xffffffff;
            b = (b + a) % 0xffffffff;
        }
        if (input.byteLength % 4 !== 0) {
            let lastValue = 0;
            for (let i = 0; i < input.byteLength % 4; i++) {
                lastValue = (lastValue << 8) | input.getUint8(input.byteLength - 1 - i);
            }
            a = (a + lastValue) % 0xffffffff;
            b = (b + a) % 0xffffffff;
        }

        return Utils.hex(b >>> 0, 8) + Utils.hex(a >>> 0, 8);
    }

}

export default Fletcher64Checksum;
