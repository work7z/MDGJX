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
 * Snefru operation
 */
class Snefru extends Operation {

    /**
     * Snefru constructor
     */
    constructor() {
        super();

        this.name = "Snefru";
        this.module = "Crypto";
        this.description = "Snefru是由Ralph Merkle于1990年在Xerox PARC工作时设计的哈希算法。此算法支持128位和256位长度的输出。它的名字来源于埃及法老斯尼夫鲁（Sneferu），和该作者的Khufu和Khafre块加密算法采用了相同的命名方式。<br><br>Snefru原始设计的安全漏洞由Eli Biham和Adi Shamir发现，他们使用差分密码分析找到了哈希碰撞。后续该算法通过将计算轮数从2提高到8次来解决此问题。";
        this.infoURL = "https://wikipedia.org/wiki/Snefru";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                name: "长度",
                type: "number",
                value: 128,
                min: 32,
                max: 480,
                step: 32
            },
            {
                name: "轮数",
                type: "option",
                value: ["8", "4", "2"]
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        return runHash("snefru", input, {
            length: args[0],
            rounds: args[1]
        });
    }

}

export default Snefru;
