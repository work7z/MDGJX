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
import { isWorkerEnvironment } from "../Utils.mjs";

/**
 * To MessagePack operation
 */
class ToMessagePack extends Operation {

    /**
     * ToMessagePack constructor
     */
    constructor() {
        super();

        this.name = "MessagePack编码";
        this.module = "Code";
        this.description = "把JSON转换成MessagePack编码的字节buffer。MessagePack是一种计算机数据交换格式。它是一种二进制形式，用于表示简单的数据结构，如数组和关联数组。";
        this.infoURL = "https://wikipedia.org/wiki/MessagePack";
        this.inputType = "JSON";
        this.outputType = "ArrayBuffer";
        this.args = [];
    }

    /**
     * @param {JSON} input
     * @param {Object[]} args
     * @returns {ArrayBuffer}
     */
    run(input, args) {
        try {
            if (isWorkerEnvironment()) {
                return notepack.encode(input);
            } else {
                const res = notepack.encode(input);
                // Safely convert from Node Buffer to ArrayBuffer using the correct view of the data
                return (new Uint8Array(res)).buffer;
            }
        } catch (err) {
            throw new OperationError(`无法将 JSON 转换为 MessagePack: ${err}`);
        }
    }

}

export default ToMessagePack;
