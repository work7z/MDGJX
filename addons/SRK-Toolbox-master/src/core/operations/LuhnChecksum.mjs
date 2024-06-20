/**
 * @author n1073645 [n1073645@gmail.com]
 * @copyright Crown Copyright 2020
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";

/**
 * Luhn Checksum operation
 */
class LuhnChecksum extends Operation {

    /**
     * LuhnChecksum constructor
     */
    constructor() {
        super();

        this.name = "Luhn校验和";
        this.module = "Default";
        this.description = "卢恩算法（英语：Luhn algorithm），也称为“模10”（Mod 10）算法，是一种简单的校验和算法，一般用于验证身份识别码，例如发卡行识别码、国际移动设备识别码，美国国家提供商标识号码，或是加拿大社会保险号码。该算法由IBM科学家汉斯·彼得·卢恩创造，专利于1954年1月6日申请，1960年8月23日颁证，美国专利号2950048。";
        this.infoURL = "https://wikipedia.org/wiki/Luhn_algorithm";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [];
    }

    /**
     * Generates the Luhn Checksum from the input.
     *
     * @param {string} inputStr
     * @returns {number}
     */
    checksum(inputStr) {
        let even = false;
        return inputStr.split("").reverse().reduce((acc, elem) => {
            // Convert element to integer.
            let temp = parseInt(elem, 10);

            // If element is not an integer.
            if (isNaN(temp))
                throw new OperationError("字符： " + elem + " 不是数字。");

            // If element is in an even position
            if (even) {
                // Double the element and add the quotient and remainder together.
                temp = 2 * elem;
                temp = Math.floor(temp/10) + (temp % 10);
            }

            even = !even;
            return acc + temp;
        }, 0)  % 10;
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        if (!input) return "";

        const checkSum = this.checksum(input);
        let checkDigit = this.checksum(input + "0");
        checkDigit = checkDigit === 0 ? 0 : (10-checkDigit);

        return `校验和： ${checkSum}
检验位： ${checkDigit}
Luhn校验字符串： ${input + "" + checkDigit}`;
    }

}

export default LuhnChecksum;
