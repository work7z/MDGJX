/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import {COMPRESSION_TYPE} from "../lib/Zlib.mjs";
import rawdeflate from "zlibjs/bin/rawdeflate.min.js";

const Zlib = rawdeflate.Zlib;

const RAW_COMPRESSION_TYPE_LOOKUP = {
    "静态霍夫曼压缩":   Zlib.RawDeflate.CompressionType.FIXED,
    "动态霍夫曼压缩": Zlib.RawDeflate.CompressionType.DYNAMIC,
    "无压缩 (Store)":           Zlib.RawDeflate.CompressionType.NONE,
};

/**
 * Raw Deflate operation
 */
class RawDeflate extends Operation {

    /**
     * RawDeflate constructor
     */
    constructor() {
        super();

        this.name = "Raw Deflate";
        this.module = "Compression";
        this.description = "使用不带头部的deflate算法压缩数据。";
        this.infoURL = "https://wikipedia.org/wiki/DEFLATE";
        this.inputType = "ArrayBuffer";
        this.outputType = "ArrayBuffer";
        this.args = [
            {
                name: "压缩类型",
                type: "option",
                value: COMPRESSION_TYPE
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {ArrayBuffer}
     */
    run(input, args) {
        const deflate = new Zlib.RawDeflate(new Uint8Array(input), {
            compressionType: RAW_COMPRESSION_TYPE_LOOKUP[args[0]]
        });
        return new Uint8Array(deflate.compress()).buffer;
    }

}

export default RawDeflate;
