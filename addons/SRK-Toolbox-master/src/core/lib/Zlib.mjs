/**
 * Zlib exports.
 *
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import zlibAndGzip from "zlibjs/bin/zlib_and_gzip.min.js";

const Zlib = zlibAndGzip.Zlib;

export const COMPRESSION_TYPE = ["动态霍夫曼压缩", "静态霍夫曼压缩", "无压缩 (Store)"];
export const INFLATE_BUFFER_TYPE = ["自适应", "块"];
export const ZLIB_COMPRESSION_TYPE_LOOKUP = {
    "静态霍夫曼压缩":   Zlib.Deflate.CompressionType.FIXED,
    "动态霍夫曼压缩": Zlib.Deflate.CompressionType.DYNAMIC,
    "无压缩 (Store)":           Zlib.Deflate.CompressionType.NONE,
};
