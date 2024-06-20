/**
 * @author gchq77703 []
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import jwt from "jsonwebtoken";
import OperationError from "../errors/OperationError.mjs";

/**
 * JWT Decode operation
 */
class JWTDecode extends Operation {

    /**
     * JWTDecode constructor
     */
    constructor() {
        super();

        this.name = "JWT解码";
        this.module = "Crypto";
        this.description = "在<b>不检查</b>给定的secret/私钥是否正确的情况下解密JSON Web Token。使用'JWT验证'来确定secret/私钥的正确性。";
        this.infoURL = "https://wikipedia.org/wiki/JSON_Web_Token";
        this.inputType = "string";
        this.outputType = "JSON";
        this.args = [];
        this.checks = [
            {
                pattern: "^ey([A-Za-z0-9_-]+)\\.ey([A-Za-z0-9_-]+)\\.([A-Za-z0-9_-]+)$",
                flags: "",
                args: []
            },
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {JSON}
     */
    run(input, args) {
        try {
            const decoded = jwt.decode(input, {
                json: true,
                complete: true
            });

            return decoded.payload;
        } catch (err) {
            throw new OperationError(err);
        }
    }

}

export default JWTDecode;
