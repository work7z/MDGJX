/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import {COMPRESSION_TYPE, ZLIB_COMPRESSION_TYPE_LOOKUP} from "../lib/Zlib.mjs";
import gzip from "zlibjs/bin/gzip.min.js";

const Zlib = gzip.Zlib;

/**
 * Gzip operation
 */
class Gzip extends Operation {

    /**
     * Gzip constructor
     */
    constructor() {
        super();

        this.name = "Gzip";
        this.module = "Compression";
        this.description = "使用带有Gzip头部的deflate算法压缩数据。";
        this.infoURL = "https://wikipedia.org/wiki/Gzip";
        this.inputType = "ArrayBuffer";
        this.outputType = "ArrayBuffer";
        this.args = [
            {
                name: "压缩类型",
                type: "option",
                value: COMPRESSION_TYPE
            },
            {
                name: "文件名 (可选)",
                type: "string",
                value: ""
            },
            {
                name: "注释 (可选)",
                type: "string",
                value: ""
            },
            {
                name: "包括文件校验和",
                type: "boolean",
                value: false
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {ArrayBuffer}
     */
    run(input, args) {
        const filename = args[1],
            comment = args[2],
            options = {
                deflateOptions: {
                    compressionType: ZLIB_COMPRESSION_TYPE_LOOKUP[args[0]]
                },
                flags: {
                    fhcrc: args[3]
                }
            };

        if (filename.length) {
            options.flags.fname = true;
            options.filename = filename;
        }
        if (comment.length) {
            options.flags.comment = true;
            options.comment = comment;
        }
        const gzipObj = new Zlib.Gzip(new Uint8Array(input), options);
        const compressed = new Uint8Array(gzipObj.compress());
        if (options.flags.comment && !(compressed[3] & 0x10)) {
            compressed[3] |= 0x10;
        }
        return compressed.buffer;
    }

}

export default Gzip;
