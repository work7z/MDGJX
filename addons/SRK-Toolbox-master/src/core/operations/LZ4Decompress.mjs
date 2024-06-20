/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2022
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import lz4 from "lz4js";

/**
 * LZ4 Decompress operation
 */
class LZ4Decompress extends Operation {

    /**
     * LZ4Decompress constructor
     */
    constructor() {
        super();

        this.name = "LZ4解压";
        this.module = "Compression";
        this.description = "LZ4是一种无损数据压缩算法，着重于压缩和解压缩速度。它属于面向字节的LZ77压缩方案家族。";
        this.infoURL = "https://wikipedia.org/wiki/LZ4_(compression_algorithm)";
        this.inputType = "ArrayBuffer";
        this.outputType = "ArrayBuffer";
        this.args = [];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {ArrayBuffer}
     */
    run(input, args) {
        const inBuf = new Uint8Array(input);
        const decompressed = lz4.decompress(inBuf);
        return decompressed.buffer;
    }

}

export default LZ4Decompress;
