/**
 * @author PenguinGeorge [george@penguingeorge.com]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import Utils from "../Utils.mjs";
import {alphabetName, ALPHABET_OPTIONS} from "../lib/Base85.mjs";

/**
 * To Base85 operation
 */
class ToBase85 extends Operation {

    /**
     * To Base85 constructor
     */
    constructor() {
        super();

        this.name = "Base85编码";
        this.module = "Default";
        this.description = "Base85（也叫Ascii85）是把字节数据转换成特定字符组合的编码方式。通常比Base64效率更高。<br><br>此操作将原始数据编码成使用ASCII字符的Base64字符串。字符表可选，带有预设。<br><br>例如：<code>hello world</code> 编码成 <code>BOu!rD]j7BEbo7</code><br><br>Base85在Adobe的PostScript和PDF格式中较为常见。<br><br><strong>选项</strong><br><u>可用字符</u><ul><li>标准 - 标准字母表，又叫Ascii85</li><li>Z85 (ZeroMQ) - 不带有引号和反斜杠之类，适用于生成字符串。</li><li>IPv6 - 适合编码IPV6地址的变体 (RFC 1924)</li></ul><u>包括分隔符</u><br>在数据开头和结尾添加 '<~' 和 '~>'。Adobe的Base85一般采用此格式。";
        this.infoURL = "https://wikipedia.org/wiki/Ascii85";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                name: "可用字符",
                type: "editableOption",
                value: ALPHABET_OPTIONS
            },
            {
                name: "包括分隔符",
                type: "boolean",
                value: false
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
        const alphabet = Utils.expandAlphRange(args[0]).join(""),
            encoding = alphabetName(alphabet),
            includeDelim = args[1];
        let result = "";

        if (alphabet.length !== 85 ||
            [].unique.call(alphabet).length !== 85) {
            throw new OperationError("错误：字符表必须包含85个字符");
        }

        if (input.length === 0) return "";

        let block;
        for (let i = 0; i < input.length; i += 4) {
            block = (
                ((input[i])          << 24) +
                ((input[i + 1] || 0) << 16) +
                ((input[i + 2] || 0) << 8)  +
                ((input[i + 3] || 0))
            ) >>> 0;

            if (encoding !== "标准" || block > 0) {
                let digits = [];
                for (let j = 0; j < 5; j++) {
                    digits.push(block % 85);
                    block = Math.floor(block / 85);
                }

                digits = digits.reverse();

                if (input.length < i + 4) {
                    digits.splice(input.length - (i + 4), 4);
                }

                result += digits.map(digit => alphabet[digit]).join("");
            } else {
                result += (encoding === "标准") ? "z" : null;
            }
        }

        return includeDelim ? `<~${result}~>` : result;
    }
}

export default ToBase85;
