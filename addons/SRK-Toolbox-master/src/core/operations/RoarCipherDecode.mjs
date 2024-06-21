/**
 * @author Raka-loah [i@lotc.cc]
 * @copyright Crown Copyright 2022
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";

/**
 * Roar Cipher Decode operation
 */
class RoarCipherDecode extends Operation {

    /**
     * RoarCipherDecode constructor
     */
    constructor() {
        super();

        this.name = "兽音译者解密";
        this.module = "Default";
        this.description = "把各种“嗷呜啊”解密为原始文本，支持自定义字典。";
        this.infoURL = "";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                name: "字典（4个字符）",
                type: "editableOption",
                value: [
                    {
                        name: "默认",
                        value: "嗷呜啊~"
                    },
                    {
                        name: "自定义",
                        value: ""
                    }
                ]
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [alphabet] = args;

        if (alphabet.length !== 4) {
            throw new OperationError("错误：字典长度必须为4个字符！");
        }

        if (input.length <= 5) {
            throw new OperationError("错误：密文长度必须大于5个字符！");
        }

        const alphaList = alphabet.split("");
        const roarChunks = input.substring(3, input.length - 1).match(/.{2}/g);

        const rawHex = roarChunks.reduce(function (rawStr, roarChunk, currentIndex) {
            const roarValue1 = alphaList.indexOf(roarChunk[0]);
            const roarValue2 = alphaList.indexOf(roarChunk[1]);

            if (roarValue1 === -1 || roarValue2 === -1) {
                throw new OperationError("错误：密文中包含不在字典中的字符！");
            }

            let temp = roarValue1 * 4 + roarValue2 - currentIndex % 0x10;
            if (temp < 0) {
                temp += 0x10;
            }

            rawStr += temp.toString(16);

            return rawStr;
        }, "");

        const raw = rawHex.match(/.{4}/g).reduce((rawStr, hexChunk) => rawStr + String.fromCharCode(parseInt("0x" + hexChunk, 16)), "");
        return raw;
    }
}

export default RoarCipherDecode;
