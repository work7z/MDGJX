/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";
import {COMPRESSION_TYPE, ZLIB_COMPRESSION_TYPE_LOOKUP} from "../lib/Zlib.mjs";
import zip from "zlibjs/bin/zip.min.js";

const Zlib = zip.Zlib;

const ZIP_COMPRESSION_METHOD_LOOKUP = {
    "Deflate":      Zlib.Zip.CompressionMethod.DEFLATE,
    "无压缩 (Store)": Zlib.Zip.CompressionMethod.STORE
};

const ZIP_OS_LOOKUP = {
    "MSDOS":     Zlib.Zip.OperatingSystem.MSDOS,
    "Unix":      Zlib.Zip.OperatingSystem.UNIX,
    "Macintosh": Zlib.Zip.OperatingSystem.MACINTOSH
};

/**
 * Zip operation
 */
class Zip extends Operation {

    /**
     * Zip constructor
     */
    constructor() {
        super();

        this.name = "Zip";
        this.module = "Compression";
        this.description = "将输入数据使用给定的文件名用PKZIP算法进行压缩。<br><br>当前不支持多个文件。";
        this.infoURL = "https://wikipedia.org/wiki/Zip_(file_format)";
        this.inputType = "ArrayBuffer";
        this.outputType = "File";
        this.args = [
            {
                name: "文件名",
                type: "string",
                value: "file.txt"
            },
            {
                name: "注释",
                type: "string",
                value: ""
            },
            {
                name: "密码",
                type: "binaryString",
                value: ""
            },
            {
                name: "压缩方式",
                type: "option",
                value: ["Deflate", "无压缩 (Store)"]
            },
            {
                name: "操作系统",
                type: "option",
                value: ["MSDOS", "Unix", "Macintosh"]
            },
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
     * @returns {File}
     */
    run(input, args) {
        const filename = args[0],
            password = Utils.strToByteArray(args[2]),
            options = {
                filename: Utils.strToByteArray(filename),
                comment: Utils.strToByteArray(args[1]),
                compressionMethod: ZIP_COMPRESSION_METHOD_LOOKUP[args[3]],
                os: ZIP_OS_LOOKUP[args[4]],
                deflateOption: {
                    compressionType: ZLIB_COMPRESSION_TYPE_LOOKUP[args[5]]
                },
            },
            zip = new Zlib.Zip();

        if (password.length)
            zip.setPassword(password);
        zip.addFile(new Uint8Array(input), options);
        return new File([zip.compress()], filename);
    }

}

export default Zip;
