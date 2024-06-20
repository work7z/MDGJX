/**
 * @author h345983745
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import blakejs from "blakejs";
import OperationError from "../errors/OperationError.mjs";
import Utils from "../Utils.mjs";
import { toBase64 } from "../lib/Base64.mjs";

/**
 * BLAKE2s Operation
 */
class BLAKE2s extends Operation {

    /**
     * BLAKE2s constructor
     */
    constructor() {
        super();

        this.name = "BLAKE2s";
        this.module = "Hashing";
        this.description = `计算输入内容的BLAKE2s哈希值。
        <br><br>BLAKE2s是BLAKE哈希算法的一种，为8到32位平台优化，产生1到32字节长度的哈希。
        <br><br>支持可选的Key。`;
        this.infoURL = "https://wikipedia.org/wiki/BLAKE_(hash_function)#BLAKE2";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                "name": "长度",
                "type": "option",
                "value": ["256", "160", "128"]
            }, {
                "name": "输出编码",
                "type": "option",
                "value": ["十六进制", "Base64", "原始"]
            },
            {
                "name": "Key",
                "type": "toggleString",
                "value": "",
                "toggleValues": ["UTF8", "十进制", "Base64", "十六进制", "Latin1"]
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string} The input having been hashed with BLAKE2s in the encoding format specified.
     */
    run(input, args) {
        const [outSize, outFormat] = args;
        let key = Utils.convertToByteArray(args[2].string || "", args[2].option);
        if (key.length === 0) {
            key = null;
        } else if (key.length > 32) {
            throw new OperationError(["Key不能超过32字节。", "当前为" + key.length + " 字节。"].join("\n"));
        }

        input = new Uint8Array(input);
        switch (outFormat) {
            case "十六进制":
                return blakejs.blake2sHex(input, key, outSize / 8);
            case "Base64":
                return toBase64(blakejs.blake2s(input, key, outSize / 8));
            case "原始":
                return Utils.arrayBufferToStr(blakejs.blake2s(input, key, outSize / 8).buffer);
            default:
                return new OperationError("不支持的输出类型");
        }
    }

}

export default BLAKE2s;
