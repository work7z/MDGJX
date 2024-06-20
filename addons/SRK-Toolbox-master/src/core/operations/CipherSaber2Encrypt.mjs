/**
 * @author n1073645 [n1073645@gmail.com]
 * @copyright Crown Copyright 2020
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import crypto from "crypto";
import { encode } from "../lib/CipherSaber2.mjs";
import Utils from "../Utils.mjs";

/**
 * CipherSaber2 Encrypt operation
 */
class CipherSaber2Encrypt extends Operation {

    /**
     * CipherSaber2Encrypt constructor
     */
    constructor() {
        super();

        this.name = "CipherSaber2加密";
        this.module = "Crypto";
        this.description = "CipherSaber是基于RC4的简单对称加密协议。它提供了足够强的信息加密保护，同时算法设计足够简单，很容易使用编程语言完整实现。";
        this.infoURL = "https://wikipedia.org/wiki/CipherSaber";
        this.inputType = "ArrayBuffer";
        this.outputType = "ArrayBuffer";
        this.args = [
            {
                name: "Key",
                type: "toggleString",
                value: "",
                toggleValues: ["十六进制", "UTF8", "Latin1", "Base64"]
            },
            {
                name: "Rounds",
                type: "number",
                value: 20
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {ArrayBuffer}
     */
    run(input, args) {
        input = new Uint8Array(input);
        const result = [],
            key = Utils.convertToByteArray(args[0].string, args[0].option),
            rounds = args[1];

        // Assign into initialisation vector based on cipher mode.
        const tempIVP = crypto.randomBytes(10);
        for (let m = 0; m < 10; m++)
            result.push(tempIVP[m]);

        return new Uint8Array(result.concat(encode(tempIVP, key, rounds, input))).buffer;
    }

}

export default CipherSaber2Encrypt;
