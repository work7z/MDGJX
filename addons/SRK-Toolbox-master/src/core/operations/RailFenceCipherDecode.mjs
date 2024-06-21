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
 * Rail Fence Cipher Decode operation
 */
class RailFenceCipherDecode extends Operation {

    /**
     * RailFenceCipherDecode constructor
     */
    constructor() {
        super();

        this.name = "篱笆密码解密";
        this.module = "Ciphers";
        this.description = "根据提供的篱笆数量和偏移量进行篱笆密码（Rail fence Cipher）解密。";
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

        const cipher = input;

        if (key < 2) {
            throw new OperationError("篱笆数量不少于2");
        } else if (key > cipher.length) {
            throw new OperationError("篱笆数量不能超过明文长度");
        }

        if (offset < 0) {
            throw new OperationError("偏移量必须为正整数");
        }

        const cycle = (key - 1) * 2;
        const plaintext = new Array(cipher.length);

        let j = 0;
        let x, y;

        for (y = 0; y < key; y++) {
            for (x = 0; x < cipher.length; x++) {
                if ((y + x + offset) % cycle === 0 || (y - x - offset) % cycle === 0) {
                    plaintext[x] = cipher[j++];
                }
            }
        }

        return plaintext.join("").trim();
    }

}


export default RailFenceCipherDecode;
