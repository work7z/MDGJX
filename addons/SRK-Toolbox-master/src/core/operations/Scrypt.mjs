/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";
import OperationError from "../errors/OperationError.mjs";
import scryptsy from "scryptsy";
import { isWorkerEnvironment } from "../Utils.mjs";

/**
 * Scrypt operation
 */
class Scrypt extends Operation {

    /**
     * Scrypt constructor
     */
    constructor() {
        super();

        this.name = "Scrypt";
        this.module = "Crypto";
        this.description = "scrypt（念作“ess crypt”），是加拿大计算机科学家暨计算机安全研究人员科林·珀西瓦尔（Colin Percival）于2009年所发明的密钥派生函数，当初设计用在他所创立的Tarsnap服务上。设计时考虑到大规模的客制硬件攻击而刻意设计需要大量内存运算。2016年，scrypt算法发布在RFC 7914。<br><br>在输入区输入口令来生成对应的哈希值。";
        this.infoURL = "https://wikipedia.org/wiki/Scrypt";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "盐",
                "type": "toggleString",
                "value": "",
                "toggleValues": ["十六进制", "Base64", "UTF8", "Latin1"]
            },
            {
                "name": "迭代次数(N)",
                "type": "number",
                "value": 16384
            },
            {
                "name": "内存因子(r)",
                "type": "number",
                "value": 8
            },
            {
                "name": "并行因子(p)",
                "type": "number",
                "value": 1
            },
            {
                "name": "Key长度",
                "type": "number",
                "value": 64
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const salt = Buffer.from(Utils.convertToByteArray(args[0].string || "", args[0].option)),
            iterations = args[1],
            memFactor = args[2],
            parallelFactor = args[3],
            keyLength = args[4];

        try {
            const data = scryptsy(
                input, salt, iterations, memFactor, parallelFactor, keyLength,
                p => {
                    // Progress callback
                    if (isWorkerEnvironment())
                        self.sendStatusMessage(`进度: ${p.percent.toFixed(0)}%`);
                }
            );

            return data.toString("hex");
        } catch (err) {
            throw new OperationError("错误: " + err.toString());
        }
    }

}

export default Scrypt;
