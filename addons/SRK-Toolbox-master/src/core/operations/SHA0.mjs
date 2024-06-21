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
 * SHA0 operation
 */
class SHA0 extends Operation {

    /**
     * SHA0 constructor
     */
    constructor() {
        super();

        this.name = "SHA0";
        this.module = "Crypto";
        this.description = "SHA最初载明的算法于1993年发布，称做安全散列标准（Secure Hash Standard），FIPS PUB 180。这个版本现在常被称为SHA-0。它在发布之后很快就被NSA撤回，并且由1995年发布的修订版本FIPS PUB 180-1（通常称为SHA-1）取代。此算法默认进行80轮运算。";
        this.infoURL = "https://wikipedia.org/wiki/SHA-1#SHA-0";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                name: "轮数",
                type: "number",
                value: 80,
                min: 16
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        return runHash("sha0", input, {rounds: args[0]});
    }

}

export default SHA0;
