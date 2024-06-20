/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import JSSHA3 from "js-sha3";
import OperationError from "../errors/OperationError.mjs";

/**
 * SHA3 operation
 */
class SHA3 extends Operation {

    /**
     * SHA3 constructor
     */
    constructor() {
        super();

        this.name = "SHA3";
        this.module = "Crypto";
        this.description = "SHA-3第三代安全散列算法(Secure Hash Algorithm 3)在2015年8月5日由 NIST 通过 FIPS 202 正式发表。<br><br>SHA-3是Keccak系列算法的子集。Keccak是由 Guido Bertoni，Joan Daemen，Michaël Peeters，以及Gilles Van Assche在RadioGatún上设计的哈希算法。";
        this.infoURL = "https://wikipedia.org/wiki/SHA-3";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                "name": "长度",
                "type": "option",
                "value": ["512", "384", "256", "224"]
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const size = parseInt(args[0], 10);
        let algo;

        switch (size) {
            case 224:
                algo = JSSHA3.sha3_224;
                break;
            case 384:
                algo = JSSHA3.sha3_384;
                break;
            case 256:
                algo = JSSHA3.sha3_256;
                break;
            case 512:
                algo = JSSHA3.sha3_512;
                break;
            default:
                throw new OperationError("无效长度");
        }

        return algo(input);
    }

}

export default SHA3;
