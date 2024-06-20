/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import bcrypt from "bcryptjs";
import { isWorkerEnvironment } from "../Utils.mjs";

/**
 * Bcrypt operation
 */
class Bcrypt extends Operation {

    /**
     * Bcrypt constructor
     */
    constructor() {
        super();

        this.name = "Bcrypt";
        this.module = "Crypto";
        this.description = "bcrypt是一个由美国计算机科学家尼尔斯·普罗沃斯（Niels Provos）以及大卫·马齐耶（David Mazières）根据Blowfish加密算法所设计的密码散列函数，于1999年在USENIX中展示。实现中bcrypt会使用一个加盐的流程以防御彩虹表攻击，同时bcrypt还是适应性函数，它可以借由增加迭代之次数来抵御日益增进的电脑运算能力透过暴力法破解。<br><br>在输入区输入口令来生成对应的哈希值。";
        this.infoURL = "https://wikipedia.org/wiki/Bcrypt";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "迭代次数",
                "type": "number",
                "value": 10
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    async run(input, args) {
        const rounds = args[0];
        const salt = await bcrypt.genSalt(rounds);

        return await bcrypt.hash(input, salt, null, p => {
            // Progress callback
            if (isWorkerEnvironment())
                self.sendStatusMessage(`进度: ${(p * 100).toFixed(0)}%`);
        });

    }

}

export default Bcrypt;
