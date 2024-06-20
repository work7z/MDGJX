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
 * Object Identifier to Hex operation
 */
class ObjectIdentifierToHex extends Operation {

    /**
     * ObjectIdentifierToHex constructor
     */
    constructor() {
        super();

        this.name = "OID转十六进制";
        this.module = "PublicKey";
        this.description = "把对象标识符（object identifier，OID）转换成对应的十六进制字符串。";
        this.infoURL = "https://wikipedia.org/wiki/Object_identifier";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        return r.KJUR.asn1.ASN1Util.oidIntToHex(input);
    }

}

export default ObjectIdentifierToHex;
