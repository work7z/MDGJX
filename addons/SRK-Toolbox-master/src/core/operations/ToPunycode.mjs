/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import punycode from "punycode";

/**
 * To Punycode operation
 */
class ToPunycode extends Operation {

    /**
     * ToPunycode constructor
     */
    constructor() {
        super();

        this.name = "Punycode编码";
        this.module = "Encodings";
        this.description = "Punycode是用ASCII字符的一个子集来编码Unicode域名的一种方法。<br><br>例： <code>m\xfcnchen</code> 编码为 <code>mnchen-3ya</code>";
        this.infoURL = "https://wikipedia.org/wiki/Punycode";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "国际化域名（带xn--）",
                "type": "boolean",
                "value": false
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const idn = args[0];

        if (idn) {
            return punycode.toASCII(input);
        } else {
            return punycode.encode(input);
        }
    }

}

export default ToPunycode;
