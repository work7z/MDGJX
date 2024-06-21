/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import {runHash} from "../lib/Hash.mjs";

/**
 * HAS-160 operation
 */
class HAS160 extends Operation {

    /**
     * HAS-160 constructor
     */
    constructor() {
        super();

        this.name = "HAS-160";
        this.module = "Crypto";
        this.description = "HAS-160是设计用于韩国KCDSA数据签名的哈希算法。它是SHA-1的变种，并进行了提高安全性的修改。此算法产生160位长度的输出。<br><br>HAS-160和SHA-1计算方法相同。首先把输入分割成512位长度的块，并补齐最后一块。摘要函数按顺序处理块并不断更新哈希值。<br><br>此算法默认进行80轮运算。";
        this.infoURL = "https://wikipedia.org/wiki/HAS-160";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                name: "轮数",
                type: "number",
                value: 80,
                min: 1,
                max: 80
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        return runHash("has160", input, {rounds: args[0]});
    }

}

export default HAS160;
