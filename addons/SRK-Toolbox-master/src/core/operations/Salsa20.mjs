/**
 * @author joostrijneveld [joost@joostrijneveld.nl]
 * @copyright Crown Copyright 2024
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import Utils from "../Utils.mjs";
import { toHex } from "../lib/Hex.mjs";
import { salsa20Block } from "../lib/Salsa20.mjs";

/**
 * Salsa20 operation
 */
class Salsa20 extends Operation {

    /**
     * Salsa20 constructor
     */
    constructor() {
        super();

        this.name = "Salsa20";
        this.module = "Ciphers";
        this.description = "Salsa20是一种流加密算法，由丹尼尔·J·伯恩斯坦提交到eSTREAM。Salsa20/8和Salsa20/12是加密轮数减少的版本。Salsa20和ChaCha流加密算法有着紧密联系。<br><br><b>密钥：</b> Salsa20使用16或32字节（128或256位）长度的密钥。<br><br><b>Nonce：</b> Salsa20使用8字节（64位）长度的nonce。<br><br><b>计数：</b> Salsa使用8字节（64位）长度的计数。计数在流的起始处为0，每64字节递增。";
        this.infoURL = "https://wikipedia.org/wiki/Salsa20";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "密钥",
                "type": "toggleString",
                "value": "",
                "toggleValues": ["十六进制", "UTF8", "Latin1", "Base64"]
            },
            {
                "name": "Nonce",
                "type": "toggleString",
                "value": "",
                "toggleValues": ["十六进制", "UTF8", "Latin1", "Base64", "整数"]
            },
            {
                "name": "计数",
                "type": "number",
                "value": 0,
                "min": 0
            },
            {
                "name": "轮数",
                "type": "option",
                "value": ["20", "12", "8"]
            },
            {
                "name": "输入",
                "type": "option",
                "value": ["十六进制", "原始"]
            },
            {
                "name": "输出",
                "type": "option",
                "value": ["原始", "十六进制"]
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const key = Utils.convertToByteArray(args[0].string, args[0].option),
            nonceType = args[1].option,
            rounds = parseInt(args[3], 10),
            inputType = args[4],
            outputType = args[5];

        if (key.length !== 16 && key.length !== 32) {
            throw new OperationError(`无效的密钥长度： ${key.length} 字节。

Salsa20使用16或32字节（128或256位）的密钥。`);
        }

        let counter, nonce;
        if (nonceType === "整数") {
            nonce = Utils.intToByteArray(parseInt(args[1].string, 10), 8, "little");
        } else {
            nonce = Utils.convertToByteArray(args[1].string, args[1].option);
            if (!(nonce.length === 8)) {
                throw new OperationError(`无效的nonce长度： ${nonce.length} 字节。

Salsa20使用8字节（64位）的nonce。`);
            }
        }
        counter = Utils.intToByteArray(args[2], 8, "little");

        const output = [];
        input = Utils.convertToByteArray(input, inputType);

        let counterAsInt = Utils.byteArrayToInt(counter, "little");
        for (let i = 0; i < input.length; i += 64) {
            counter = Utils.intToByteArray(counterAsInt, 8, "little");
            const stream = salsa20Block(key, nonce, counter, rounds);
            for (let j = 0; j < 64 && i + j < input.length; j++) {
                output.push(input[i + j] ^ stream[j]);
            }
            counterAsInt++;
        }

        if (outputType === "十六进制") {
            return toHex(output);
        } else {
            return Utils.arrayBufferToStr(Uint8Array.from(output).buffer);
        }
    }

    /**
     * Highlight Salsa20
     *
     * @param {Object[]} pos
     * @param {number} pos[].start
     * @param {number} pos[].end
     * @param {Object[]} args
     * @returns {Object[]} pos
     */
    highlight(pos, args) {
        const inputType = args[4],
            outputType = args[5];
        if (inputType === "原始" && outputType === "原始") {
            return pos;
        }
    }

    /**
     * Highlight Salsa20 in reverse
     *
     * @param {Object[]} pos
     * @param {number} pos[].start
     * @param {number} pos[].end
     * @param {Object[]} args
     * @returns {Object[]} pos
     */
    highlightReverse(pos, args) {
        const inputType = args[4],
            outputType = args[5];
        if (inputType === "原始" && outputType === "原始") {
            return pos;
        }
    }

}

export default Salsa20;
