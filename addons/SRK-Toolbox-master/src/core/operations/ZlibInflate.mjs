/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import {INFLATE_BUFFER_TYPE} from "../lib/Zlib.mjs";
import zlibAndGzip from "zlibjs/bin/zlib_and_gzip.min.js";

const Zlib = zlibAndGzip.Zlib;

const ZLIB_BUFFER_TYPE_LOOKUP = {
    "自适应": Zlib.Inflate.BufferType.ADAPTIVE,
    "块":    Zlib.Inflate.BufferType.BLOCK,
};

/**
 * Zlib Inflate operation
 */
class ZlibInflate extends Operation {

    /**
     * ZlibInflate constructor
     */
    constructor() {
        super();

        this.name = "Zlib Inflate";
        this.module = "Compression";
        this.description = "解压使用带有Zlib头部的deflate算法压缩的数据。";
        this.infoURL = "https://wikipedia.org/wiki/Zlib";
        this.inputType = "ArrayBuffer";
        this.outputType = "ArrayBuffer";
        this.args = [
            {
                name: "起始索引",
                type: "number",
                value: 0
            },
            {
                name: "起始输出缓冲区尺寸",
                type: "number",
                value: 0
            },
            {
                name: "缓冲区扩展类型",
                type: "option",
                value: INFLATE_BUFFER_TYPE
            },
            {
                name: "解压缩后重置缓冲区尺寸",
                type: "boolean",
                value: false
            },
            {
                name: "验证结果",
                type: "boolean",
                value: false
            }
        ];
        this.checks = [
            {
                pattern: "^\\x78(\\x01|\\x9c|\\xda|\\x5e)",
                flags: "",
                args: [0, 0, "自适应", false, false]
            },
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {ArrayBuffer}
     */
    run(input, args) {
        const inflate = new Zlib.Inflate(new Uint8Array(input), {
            index: args[0],
            bufferSize: args[1],
            bufferType: ZLIB_BUFFER_TYPE_LOOKUP[args[2]],
            resize: args[3],
            verify: args[4]
        });
        return new Uint8Array(inflate.decompress()).buffer;
    }

}

export default ZlibInflate;
