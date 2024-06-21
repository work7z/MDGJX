/**
 * @author Matt C [matt@artemisbot.uk]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import { genPolybiusSquare } from "../lib/Ciphers.mjs";
import OperationError from "../errors/OperationError.mjs";

/**
 * Bifid Cipher Decode operation
 */
class BifidCipherDecode extends Operation {

    /**
     * BifidCipherDecode constructor
     */
    constructor() {
        super();

        this.name = "双密码解密";
        this.module = "Ciphers";
        this.description = "双密码（Bifid cipher）是使用了换位后的波利比奥斯方阵（Polybius square）的加密方式，在不知道加密关键词的情况下难以手工破解。";
        this.infoURL = "https://wikipedia.org/wiki/Bifid_cipher";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "加密关键词",
                "type": "string",
                "value": ""
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     *
     * @throws {OperationError} if invalid key
     */
    run(input, args) {
        const keywordStr = args[0].toUpperCase().replace("J", "I"),
            keyword = keywordStr.split("").unique(),
            alpha = "ABCDEFGHIKLMNOPQRSTUVWXYZ",
            structure = [];

        let output = "",
            count = 0,
            trans = "";

        if (!/^[A-Z]+$/.test(keywordStr) && keyword.length > 0)
            throw new OperationError("Key只能包含英文字母");

        const polybius = genPolybiusSquare(keywordStr);

        input.replace("J", "I").split("").forEach((letter) => {
            const alpInd = alpha.split("").indexOf(letter.toLocaleUpperCase()) >= 0;
            let polInd;

            if (alpInd) {
                for (let i = 0; i < 5; i++) {
                    polInd = polybius[i].indexOf(letter.toLocaleUpperCase());
                    if (polInd >= 0) {
                        trans += `${i}${polInd}`;
                    }
                }

                if (alpha.split("").indexOf(letter) >= 0) {
                    structure.push(true);
                } else if (alpInd) {
                    structure.push(false);
                }
            } else {
                structure.push(letter);
            }
        });

        structure.forEach(pos => {
            if (typeof pos === "boolean") {
                const coords = [trans[count], trans[count+trans.length/2]];

                output += pos ?
                    polybius[coords[0]][coords[1]] :
                    polybius[coords[0]][coords[1]].toLocaleLowerCase();
                count++;
            } else {
                output += pos;
            }
        });

        return output;
    }

    /**
     * Highlight Bifid Cipher Decode
     *
     * @param {Object[]} pos
     * @param {number} pos[].start
     * @param {number} pos[].end
     * @param {Object[]} args
     * @returns {Object[]} pos
     */
    highlight(pos, args) {
        return pos;
    }

    /**
     * Highlight Bifid Cipher Decode in reverse
     *
     * @param {Object[]} pos
     * @param {number} pos[].start
     * @param {number} pos[].end
     * @param {Object[]} args
     * @returns {Object[]} pos
     */
    highlightReverse(pos, args) {
        return pos;
    }

}

export default BifidCipherDecode;
