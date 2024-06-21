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
 * Keccak operation
 */
class Keccak extends Operation {

    /**
     * Keccak constructor
     */
    constructor() {
        super();

        this.name = "Keccak";
        this.module = "Crypto";
        this.description = "Keccak是一个加密散列算法，由 Guido Bertoni，Joan Daemen，Michaël Peeters，以及Gilles Van Assche在RadioGatún上设计。2012年10月2日，Keccak被选为NIST散列函数竞赛的胜利者。<br><br>此版本算法为Keccak[c=2d]，和SHA-3略有不同。";
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
                algo = JSSHA3.keccak224;
                break;
            case 384:
                algo = JSSHA3.keccak384;
                break;
            case 256:
                algo = JSSHA3.keccak256;
                break;
            case 512:
                algo = JSSHA3.keccak512;
                break;
            default:
                throw new OperationError("无效长度");
        }

        return algo(input);
    }

}

export default Keccak;
