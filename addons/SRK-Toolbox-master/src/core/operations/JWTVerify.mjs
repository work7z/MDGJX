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
import {JWT_ALGORITHMS} from "../lib/JWT.mjs";


/**
 * JWT Verify operation
 */
class JWTVerify extends Operation {

    /**
     * JWTVerify constructor
     */
    constructor() {
        super();

        this.name = "JWT验证";
        this.module = "Crypto";
        this.description = "使用提供的secret或私钥验证JSON Web Token是否有效。<br><br>Key必须是HMAC算法的secret或PEM编码的RSA/ECDSA密钥。";
        this.infoURL = "https://wikipedia.org/wiki/JSON_Web_Token";
        this.inputType = "string";
        this.outputType = "JSON";
        this.args = [
            {
                name: "公钥/Secret",
                type: "text",
                value: "secret"
            },
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [key] = args;
        const algos = JWT_ALGORITHMS;
        algos[algos.indexOf("None")] = "none";

        try {
            const verified = jwt.verify(input, key, { algorithms: algos });

            if (Object.prototype.hasOwnProperty.call(verified, "name") && verified.name === "JsonWebTokenError") {
                throw new OperationError(verified.message);
            }

            return verified;
        } catch (err) {
            throw new OperationError(err);
        }
    }

}

export default JWTVerify;
