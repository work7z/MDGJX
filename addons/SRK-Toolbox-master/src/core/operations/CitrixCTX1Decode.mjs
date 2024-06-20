/**
 * @author bwhitn [brian.m.whitney@gmail.com]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import cptable from "codepage";

/**
 * Citrix CTX1 Decode operation
 */
class CitrixCTX1Decode extends Operation {

    /**
     * CitrixCTX1Decode constructor
     */
    constructor() {
        super();

        this.name = "Citrix CTX1解码";
        this.module = "Encodings";
        this.description = "把Citrix CTX1密码格式解码为明文。";
        this.infoURL = "https://www.reddit.com/r/AskNetsec/comments/1s3r6y/citrix_ctx1_hash_decoding/";
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
        input = new Uint8Array(input);
        if (input.length % 4 !== 0) {
            throw new OperationError("哈希长度错误");
        }
        const revinput = input.reverse();
        const result = [];
        let temp = 0;
        for (let i = 0; i < revinput.length; i += 2) {
            if (i + 2 >= revinput.length) {
                temp = 0;
            } else {
                temp = ((revinput[i + 2] - 0x41) & 0xf) ^ (((revinput[i + 3]- 0x41) << 4) & 0xf0);
            }
            temp = (((revinput[i] - 0x41) & 0xf) ^ (((revinput[i + 1] - 0x41) << 4) & 0xf0)) ^ 0xa5 ^ temp;
            result.push(temp);
        }
        // Decodes a utf-16le string
        return cptable.utils.decode(1200, result.reverse());
    }

}

export default CitrixCTX1Decode;
