/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import gunzip from "zlibjs/bin/gunzip.min.js";

const Zlib = gunzip.Zlib;

/**
 * Gunzip operation
 */
class Gunzip extends Operation {

    /**
     * Gunzip constructor
     */
    constructor() {
        super();

        this.name = "Gunzip";
        this.module = "Compression";
        this.description = "解压使用带有Gzip头部的deflate算法压缩的数据。";
        this.infoURL = "https://wikipedia.org/wiki/Gzip";
        this.inputType = "ArrayBuffer";
        this.outputType = "ArrayBuffer";
        this.args = [];
        this.checks = [
            {
                pattern: "^\\x1f\\x8b\\x08",
                flags: "",
                args: []
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {File}
     */
    run(input, args) {
        const gzipObj = new Zlib.Gunzip(new Uint8Array(input));
        return new Uint8Array(gzipObj.decompress()).buffer;
    }

}

export default Gunzip;
