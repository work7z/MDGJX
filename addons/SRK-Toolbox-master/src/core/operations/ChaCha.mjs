/**
 * @author joostrijneveld [joost@joostrijneveld.nl]
 * @copyright Crown Copyright 2022
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import Utils from "../Utils.mjs";
import { toHex } from "../lib/Hex.mjs";

/**
 * Computes the ChaCha block function
 *
 * @param {byteArray} key
 * @param {byteArray} nonce
 * @param {byteArray} counter
 * @param {integer} rounds
 * @returns {byteArray}
 */
function chacha(key, nonce, counter, rounds) {
    const tau = "expand 16-byte k";
    const sigma = "expand 32-byte k";

    let state, c;
    if (key.length === 16) {
        c = Utils.strToByteArray(tau);
        state = c.concat(key).concat(key);
    } else {
        c = Utils.strToByteArray(sigma);
        state = c.concat(key);
    }
    state = state.concat(counter).concat(nonce);

    const x = Array();
    for (let i = 0; i < 64; i += 4) {
        x.push(Utils.byteArrayToInt(state.slice(i, i + 4), "little"));
    }
    const a = [...x];

    /**
     * Macro to compute a 32-bit rotate-left operation
     *
     * @param {integer} x
     * @param {integer} n
     * @returns {integer}
     */
    function ROL32(x, n) {
        return ((x << n) & 0xFFFFFFFF) | (x >>> (32 - n));
    }

    /**
     * Macro to compute a single ChaCha quarterround operation
     *
     * @param {integer} x
     * @param {integer} a
     * @param {integer} b
     * @param {integer} c
     * @param {integer} d
     * @returns {integer}
     */
    function quarterround(x, a, b, c, d) {
        x[a] = ((x[a] + x[b]) & 0xFFFFFFFF); x[d] = ROL32(x[d] ^ x[a], 16);
        x[c] = ((x[c] + x[d]) & 0xFFFFFFFF); x[b] = ROL32(x[b] ^ x[c], 12);
        x[a] = ((x[a] + x[b]) & 0xFFFFFFFF); x[d] = ROL32(x[d] ^ x[a], 8);
        x[c] = ((x[c] + x[d]) & 0xFFFFFFFF); x[b] = ROL32(x[b] ^ x[c], 7);
    }

    for (let i = 0; i < rounds / 2; i++)  {
        quarterround(x, 0, 4,  8, 12);
        quarterround(x, 1, 5,  9, 13);
        quarterround(x, 2, 6, 10, 14);
        quarterround(x, 3, 7, 11, 15);
        quarterround(x, 0, 5, 10, 15);
        quarterround(x, 1, 6, 11, 12);
        quarterround(x, 2, 7,  8, 13);
        quarterround(x, 3, 4,  9, 14);
    }

    for (let i = 0; i < 16; i++) {
        x[i] = (x[i] + a[i]) & 0xFFFFFFFF;
    }

    let output = Array();
    for (let i = 0; i < 16; i++) {
        output = output.concat(Utils.intToByteArray(x[i], 4, "little"));
    }
    return output;
}

/**
 * ChaCha operation
 */
class ChaCha extends Operation {

    /**
     * ChaCha constructor
     */
    constructor() {
        super();

        this.name = "ChaCha";
        this.module = "Ciphers";
        this.description = "ChaCha是由Daniel J. Bernstein设计的流密码算法。它是Salsa流密码算法的一个变种。存在多个参数化种类；“ChaCha”可以指原版算法，或在RFC-8439中定义的算法。ChaCha通常和Poly1305配合使用，称作ChaCha20-Poly1305 AEAD算法。<br><br><b>Key：</b>ChaCha使用16或32字节的key（128或256位）。<br><br><b>Nonce：</b>ChaCha使用8或12字节长度的nonce（64或96位）。<br><br><b>Counter：</b>ChaCha使用4或8字节的counter（32或64位）；Nonce和counter必须合计16字节。计数（Counter）从0开始，每64字节的密文流后自增。";
        this.infoURL = "https://wikipedia.org/wiki/Salsa20#ChaCha_variant";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "Key",
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
            throw new OperationError(`无效的key长度： ${key.length} 字节。

ChaCha使用16或32字节的key（128或256位）。`);
        }

        let counter, nonce, counterLength;
        if (nonceType === "整数") {
            nonce = Utils.intToByteArray(parseInt(args[1].string, 10), 12, "little");
            counterLength = 4;
        } else {
            nonce = Utils.convertToByteArray(args[1].string, args[1].option);
            if (!(nonce.length === 12 || nonce.length === 8)) {
                throw new OperationError(`无效的nonce长度： ${nonce.length} 字节。

ChaCha使用8或12字节长度的nonce（64或96位）。`);
            }
            counterLength = 16 - nonce.length;
        }
        counter = Utils.intToByteArray(args[2], counterLength, "little");

        const output = [];
        input = Utils.convertToByteArray(input, inputType);

        let counterAsInt = Utils.byteArrayToInt(counter, "little");
        for (let i = 0; i < input.length; i += 64) {
            counter = Utils.intToByteArray(counterAsInt, counterLength, "little");
            const stream = chacha(key, nonce, counter, rounds);
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
     * Highlight ChaCha
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
     * Highlight ChaCha in reverse
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

export default ChaCha;
