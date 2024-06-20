/**
 * @author Tan Zhen Yong [tzy@beyondthesprawl.com]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import argon2 from "argon2-browser";

/**
 * Argon2 compare operation
 */
class Argon2Compare extends Operation {

    /**
     * Argon2Compare constructor
     */
    constructor() {
        super();

        this.name = "Argon2比较";
        this.module = "Crypto";
        this.description = "检测输入的密码是否和给定的Argon2哈希一致。想要同时检测多个密码，使用“Fork”操作。";
        this.infoURL = "https://wikipedia.org/wiki/Argon2";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "编码哈希",
                "type": "string",
                "value": ""
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    async run(input, args) {
        const encoded = args[0];

        try {
            await argon2.verify({
                pass: input,
                encoded
            });

            return `匹配：${input}`;
        } catch (err) {
            return "不匹配";
        }
    }

}

export default Argon2Compare;
