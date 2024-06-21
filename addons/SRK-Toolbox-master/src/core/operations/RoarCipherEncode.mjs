/**
 * @author Raka-loah [i@lotc.cc]
 * @copyright Crown Copyright 2022
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";

/**
 * Roar Cipher Encode operation
 */
class RoarCipherEncode extends Operation {

    /**
     * RoarCipherEncode constructor
     */
    constructor() {
        super();

        this.name = "兽音译者加密";
        this.module = "Default";
        this.description = "把输入的文本加密为各种“嗷呜啊”，支持自定义字典。";
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

        if (input.length === 0) {
            return "";
        }

        const alphaList = alphabet.split("");
        const hexInput = input.split("").map(character => character.charCodeAt(0).toString(16).padStart(4, "0")).join("");
        const roar = hexInput.split("").reduce(function (roarStr, hexStr, currentIndex) {
            let temp = 0;
            temp = parseInt("0x" + hexStr, 16) + currentIndex % 0x10;
            if (temp >= 0x10) {
                temp -= 0x10;
            }
            roarStr += alphaList[parseInt(temp / 4, 10)] + alphaList[temp % 4];
            return roarStr;
        }, "");

        return alphaList[3] + alphaList[1] + alphaList[0] + roar + alphaList[2];
    }

}

export default RoarCipherEncode;
