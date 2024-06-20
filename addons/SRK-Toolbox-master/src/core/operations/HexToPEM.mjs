/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import r from "jsrsasign";
import Operation from "../Operation.mjs";

/**
 * Hex to PEM operation
 */
class HexToPEM extends Operation {

    /**
     * HexToPEM constructor
     */
    constructor() {
        super();

        this.name = "十六进制转PEM";
        this.module = "PublicKey";
        this.description = "把十六进制DER(Distinguished Encoding Rules)字符串转换成PEM(Privacy Enhanced Mail)格式。";
        this.infoURL = "https://wikipedia.org/wiki/Privacy-Enhanced_Mail";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "Header字符串",
                "type": "string",
                "value": "CERTIFICATE"
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        return r.KJUR.asn1.ASN1Util.getPEMStringFromHex(input.replace(/\s/g, ""), args[0]);
    }

}

export default HexToPEM;
