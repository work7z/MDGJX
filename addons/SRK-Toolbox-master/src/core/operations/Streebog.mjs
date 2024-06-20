/**
 * @author mshwed [m@ttshwed.com]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import GostDigest from "../vendor/gost/gostDigest.mjs";
import {toHexFast} from "../lib/Hex.mjs";

/**
 * Streebog operation
 */
class Streebog extends Operation {

    /**
     * Streebog constructor
     */
    constructor() {
        super();

        this.name = "Streebog";
        this.module = "Hashing";
        this.description = "Streebog是俄罗斯国家标准GOST R 34.11-2012 <i>Information Technology \u2013 Cryptographic Information Security \u2013 Hash Function</i>定义的哈希算法。此算法设计的初衷为替换旧GOST哈希算法GOST R 34.11-94，同时也是为了对标由美国国安局发起的SHA-3。";
        this.infoURL = "https://wikipedia.org/wiki/Streebog";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                "name": "长度",
                "type": "option",
                "value": ["256", "512"]
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [length] = args;

        const algorithm = {
            version: 2012,
            mode: "HASH",
            length: parseInt(length, 10)
        };

        try {
            const gostDigest = new GostDigest(algorithm);

            return toHexFast(gostDigest.digest(input));
        } catch (err) {
            throw new OperationError(err);
        }
    }

}

export default Streebog;
