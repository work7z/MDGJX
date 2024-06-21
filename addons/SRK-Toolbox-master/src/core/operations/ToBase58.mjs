/**
 * @author tlwr [toby@toby.codes]
 * @copyright Crown Copyright 2017
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";
import OperationError from "../errors/OperationError.mjs";
import {ALPHABET_OPTIONS} from "../lib/Base58.mjs";

/**
 * To Base58 operation
 */
class ToBase58 extends Operation {

    /**
     * ToBase58 constructor
     */
    constructor() {
        super();

        this.name = "Base58编码";
        this.module = "Default";
        this.description = "Base58（类似于Base64）是把字节数据转换成特定字符组合的编码方式。和Base64的区别是移除了形状相近的易混字符（例如l、I、0和O)来提高可读性。<br><br>此操作将原始数据编码成使用ASCII字符的Base64字符串。<br><br>例： <code>hello world</code> 编码为 <code>StV1DL6CwTryKyV</code><br><br>Base58常见于加密货币（比特币、Ripple等)。";
        this.infoURL = "https://wikipedia.org/wiki/Base58";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                "name": "可用字符",
                "type": "editableOption",
                "value": ALPHABET_OPTIONS
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        input = new Uint8Array(input);
        let alphabet = args[0] || ALPHABET_OPTIONS[0].value,
            result = [];

        alphabet = Utils.expandAlphRange(alphabet).join("");

        if (alphabet.length !== 58 ||
            [].unique.call(alphabet).length !== 58) {
            throw new OperationError("错误：可用字符必须是58个");
        }

        if (input.length === 0) return "";

        let zeroPrefix = 0;
        for (let i = 0; i < input.length && input[i] === 0; i++) {
            zeroPrefix++;
        }

        input.forEach(function(b) {
            let carry = b;

            for (let i = 0; i < result.length; i++) {
                carry += result[i] << 8;
                result[i] = carry % 58;
                carry = (carry / 58) | 0;
            }

            while (carry > 0) {
                result.push(carry % 58);
                carry = (carry / 58) | 0;
            }
        });

        result = result.map(function(b) {
            return alphabet[b];
        }).reverse().join("");

        while (zeroPrefix--) {
            result = alphabet[0] + result;
        }

        return result;
    }

}

export default ToBase58;
