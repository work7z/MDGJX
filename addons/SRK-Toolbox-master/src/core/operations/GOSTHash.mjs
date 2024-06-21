/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import GostDigest from "../vendor/gost/gostDigest.mjs";
import { toHexFast } from "../lib/Hex.mjs";

/**
 * GOST hash operation
 */
class GOSTHash extends Operation {

    /**
     * GOSTHash constructor
     */
    constructor() {
        super();

        this.name = "GOST哈希";
        this.module = "Hashing";
        this.description = "GOST哈希算法，由标准GOST R 34.11-94和GOST 34.311-95定义，是一种256位哈希算法。最初为俄罗斯国家标准GOST R 34.11-94 <i>Information Technology – Cryptographic Information Security – Hash Function</i>。由其它独联体国家使用的等效标准是GOST 34.311-95。<br><br>此算法不是新标准GOST R 34.11-2012当中定义的Streebog哈希算法。<br><br>GOST哈希算法基于GOST块加密算法。";
        this.infoURL = "https://wikipedia.org/wiki/GOST_(hash_function)";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                name: "算法",
                type: "argSelector",
                value: [
                    {
                        name: "GOST 28147 (1994)",
                        off: [1],
                        on: [2]
                    },
                    {
                        name: "GOST R 34.11 (Streebog, 2012)",
                        on: [1],
                        off: [2]
                    }
                ]
            },
            {
                name: "摘要长度",
                type: "option",
                value: ["256", "512"]
            },
            {
                name: "sBox",
                type: "option",
                value: ["E-TEST", "E-A", "E-B", "E-C", "E-D", "E-SC", "E-Z", "D-TEST", "D-A", "D-SC"]
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [version, length, sBox] = args;

        const versionNum = version === "GOST 28147 (1994)" ? 1994 : 2012;
        const algorithm = {
            name: versionNum === 1994 ? "GOST 28147" : "GOST R 34.10",
            version: versionNum,
            mode: "HASH"
        };

        if (versionNum === 1994) {
            algorithm.sBox = sBox;
        } else {
            algorithm.length = parseInt(length, 10);
        }

        try {
            const gostDigest = new GostDigest(algorithm);

            return toHexFast(gostDigest.digest(input));
        } catch (err) {
            throw new OperationError(err);
        }
    }

}

export default GOSTHash;
