/**
 * @author Raka-loah [i@lotc.cc]
 * @copyright Raka-loah Copyright 2021
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";

/**
 * CNID Verify operation
 */
class CNIDVerify extends Operation {

    /**
     * CNIDVerify constructor
     */
    constructor() {
        super();

        this.name = "身份证校验位验证";
        this.module = "Default";
        this.description = "验证中国大陆18位身份证号码最后一位是否正确。";
        this.infoURL = "https://zh.wikipedia.org/wiki/%E4%B8%AD%E5%8D%8E%E4%BA%BA%E6%B0%91%E5%85%B1%E5%92%8C%E5%9B%BD%E5%85%AC%E6%B0%91%E8%BA%AB%E4%BB%BD%E5%8F%B7%E7%A0%81";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const coeff = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];

        if (input.length !== 18) {
            throw new OperationError("身份证号码必须为18位");
        }

        const first17Digits = input.slice(0, 17);

        if (!/^\d+$/.test(first17Digits)) {
            throw new OperationError("身份证号码前17位必须为数字");
        }

        try {
            let verifyDigit = (12 - coeff.reduce(function(r, a, i) {
                return r + a * first17Digits[i];
            }, 0) % 11) % 11;
            verifyDigit = verifyDigit === 10 ? "X" : verifyDigit.toString();
            if (verifyDigit === input[17]) {
                return `${input}, ${verifyDigit}, 正确`;
            } else {
                return `${input}, ${verifyDigit}, 错误`;
            }
        } catch (err) {
            throw new OperationError(err);
        }

    }

}

export default CNIDVerify;
