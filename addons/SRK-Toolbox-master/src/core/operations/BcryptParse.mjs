/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import bcrypt from "bcryptjs";

/**
 * Bcrypt parse operation
 */
class BcryptParse extends Operation {

    /**
     * BcryptParse constructor
     */
    constructor() {
        super();

        this.name = "Bcrypt解析";
        this.module = "Crypto";
        this.description = "解析bcrypt哈希值，计算轮数、盐和密码哈希。";
        this.infoURL = "https://wikipedia.org/wiki/Bcrypt";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    async run(input, args) {
        try {
            return `轮数： ${bcrypt.getRounds(input)}
盐： ${bcrypt.getSalt(input)}
密码哈希： ${input.split(bcrypt.getSalt(input))[1]}
完整哈希： ${input}`;
        } catch (err) {
            throw new OperationError("错误： " + err.toString());
        }
    }

}

export default BcryptParse;
