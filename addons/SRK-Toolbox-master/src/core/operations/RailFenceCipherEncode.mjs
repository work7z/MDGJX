/**
 * @author Flavio Diez [flaviofdiez+cyberchef@gmail.com]
 * @copyright Crown Copyright 2020
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";

/**
 * Rail Fence Cipher Encode operation
 */
class RailFenceCipherEncode extends Operation {

    /**
     * RailFenceCipherEncode constructor
     */
    constructor() {
        super();

        this.name = "篱笆密码加密";
        this.module = "Ciphers";
        this.description = "根据提供的篱笆数量和偏移量进行篱笆密码（Rail fence Cipher）加密。";
        this.infoURL = "https://wikipedia.org/wiki/Rail_fence_cipher";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                name: "篱笆数量",
                type: "number",
                value: 2
            },
            {
                name: "偏移量",
                type: "number",
                value: 0
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [key, offset] = args;

        const plaintext = input;
        if (key < 2) {
            throw new OperationError("篱笆数量不能少于2");
        } else if (key > plaintext.length) {
            throw new OperationError("篱笆数量不能超过明文长度");
        }

        if (offset < 0) {
            throw new OperationError("偏移量必须为正整数");
        }

        const cycle = (key - 1) * 2;
        const rows = new Array(key).fill("");

        for (let pos = 0; pos < plaintext.length; pos++) {
            const rowIdx = key - 1 - Math.abs(cycle / 2 - (pos + offset) % cycle);

            rows[rowIdx] += plaintext[pos];
        }

        return rows.join("").trim();
    }

}

export default RailFenceCipherEncode;
