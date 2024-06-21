/**
 * @author GCHQ Contributor [3]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import Protobuf from "../lib/Protobuf.mjs";

/**
 * VarInt Encode operation
 */
class VarIntEncode extends Operation {

    /**
     * VarIntEncode constructor
     */
    constructor() {
        super();

        this.name = "VarInt编码";
        this.module = "Default";
        this.description = "把整数编码成VarInt。VarInt是效率较高的编码变长整数的方式，通常用于Protobuf。";
        this.infoURL = "https://developers.google.com/protocol-buffers/docs/encoding#varints";
        this.inputType = "number";
        this.outputType = "byteArray";
        this.args = [];
    }

    /**
     * @param {number} input
     * @param {Object[]} args
     * @returns {byteArray}
     */
    run(input, args) {
        try {
            return Protobuf.varIntEncode(input);
        } catch (err) {
            throw new OperationError(err);
        }
    }

}

export default VarIntEncode;
