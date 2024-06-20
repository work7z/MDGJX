/**
 * @author Matt C [matt@artemisbot.uk]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import notepack from "notepack.io";

/**
 * From MessagePack operation
 */
class FromMessagePack extends Operation {

    /**
     * FromMessagePack constructor
     */
    constructor() {
        super();

        this.name = "MessagePack解码";
        this.module = "Code";
        this.description = "把MessagePack编码的内容还原为JSON。MessagePack是一种计算机数据交换格式。它是一种二进制形式，用于表示简单的数据结构，如数组和关联数组。";
        this.infoURL = "https://wikipedia.org/wiki/MessagePack";
        this.inputType = "ArrayBuffer";
        this.outputType = "JSON";
        this.args = [];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {JSON}
     */
    run(input, args) {
        try {
            const buf = Buffer.from(new Uint8Array(input));
            return notepack.decode(buf);
        } catch (err) {
            throw new OperationError(`无法将 MessagePack 转换为 JSON: ${err}`);
        }
    }

}

export default FromMessagePack;
