/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import bson from "bson";
import OperationError from "../errors/OperationError.mjs";

/**
 * BSON deserialise operation
 */
class BSONDeserialise extends Operation {

    /**
     * BSONDeserialise constructor
     */
    constructor() {
        super();

        this.name = "BSON反序列化";
        this.module = "Serialise";
        this.description = "BSON是一种计算机数据交换格式，主要被用作MongoDB数据库中的数据存储和网络传输格式。它是一种二进制表示形式，能用来表示简单数据结构、关联数组（MongoDB中称为“对象”或“文档”）以及MongoDB中的各种数据类型。BSON之名缘于JSON，含义为Binary JSON（二进制JSON）。<br><br>输入数据需要为原始字节数据。";
        this.infoURL = "https://wikipedia.org/wiki/BSON";
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
        if (!input.byteLength) return "";

        try {
            const data = bson.deserialize(new Buffer(input));
            return JSON.stringify(data, null, 2);
        } catch (err) {
            throw new OperationError(err.toString());
        }
    }

}

export default BSONDeserialise;
