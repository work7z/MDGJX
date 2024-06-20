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
 * SHA2 operation
 */
class SHA2 extends Operation {

    /**
     * SHA2 constructor
     */
    constructor() {
        super();

        this.name = "SHA2";
        this.module = "Crypto";
        this.description = "SHA-2，名称来自于安全散列算法2（英语：Secure Hash Algorithm 2）的缩写，一种密码散列函数算法标准，由美国国家安全局研发[3]，由美国国家标准与技术研究院（NIST）在2001年发布。属于SHA算法之一，是SHA-1的后继者。其下又可再分为六个不同的算法标准，包括了：SHA-224、SHA-256、SHA-384、SHA-512、SHA-512/224、SHA-512/256。<br><br><ul><li>SHA-512操作于64位字长。</li><li>SHA-256操作于32位字长。</li><li>SHA-384和SHA-512基本相同，但截断到了384字节。</li><li>SHA-224和SHA-256基本相同，但截断到了224字节。</li><li>SHA-512/224和SHA-512/256是SHA-512的截断版本，但初始值使用记载于Federal Information Processing Standards (FIPS)的PUB 180-4文档中的方法计算。</li></ul>此算法对于SHA256系列默认进行64轮运算，对SHA512系列默认160轮。";
        this.infoURL = "https://wikipedia.org/wiki/SHA-2";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                name: "长度",
                type: "argSelector",
                value: [
                    {
                        name: "512",
                        on: [2],
                        off: [1]
                    },
                    {
                        name: "384",
                        on: [2],
                        off: [1]
                    },
                    {
                        name: "256",
                        on: [1],
                        off: [2]
                    },
                    {
                        name: "224",
                        on: [1],
                        off: [2]
                    },
                    {
                        name: "512/256",
                        on: [2],
                        off: [1]
                    },
                    {
                        name: "512/224",
                        on: [2],
                        off: [1]
                    }
                ]
            },
            {
                name: "轮数", // For SHA256 variants
                type: "number",
                value: 64,
                min: 16
            },
            {
                name: "轮数", // For SHA512 variants
                type: "number",
                value: 160,
                min: 32
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const size = args[0];
        const rounds = (size === "256" || size === "224") ? args[1] : args[2];
        return runHash("sha" + size, input, {rounds: rounds});
    }

}

export default SHA2;
