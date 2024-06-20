/**
 * @author n1073645 [n1073645@gmail.com]
 * @copyright Crown Copyright 2020
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";

/**
 * Caesar Box Cipher operation
 */
class CaesarBoxCipher extends Operation {

    /**
     * CaesarBoxCipher constructor
     */
    constructor() {
        super();

        this.name = "恺撒箱密码";
        this.module = "Ciphers";
        this.description = "恺撒箱密码（Caesar Box Cipher）是古罗马帝国使用的一种换位密码。密文按行写成正方或长方形后，按列读取。";
        this.infoURL = "https://www.dcode.fr/caesar-box-cipher";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                name: "箱高度",
                type: "number",
                value: 1
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const tableHeight = args[0];
        const tableWidth = Math.ceil(input.length / tableHeight);
        while (input.indexOf(" ") !== -1)
            input = input.replace(" ", "");
        for (let i = 0; i < (tableHeight * tableWidth) - input.length; i++) {
            input += "\x00";
        }
        let result = "";
        for (let i = 0; i < tableHeight; i++) {
            for (let j = i; j < input.length; j += tableHeight) {
                if (input.charAt(j) !== "\x00") {
                    result += input.charAt(j);
                }
            }
        }
        return result;
    }

}

export default CaesarBoxCipher;
