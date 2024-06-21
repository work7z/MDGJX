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
 * JWT Sign operation
 */
class JWTSign extends Operation {

    /**
     * JWTSign constructor
     */
    constructor() {
        super();

        this.name = "JWT签名";
        this.module = "Crypto";
        this.description = "使用给定的secret/私钥把JSON对象签名为JSON Web Token。<br><br>Key必须是HMAC算法的secret或PEM编码的RSA/ECDSA密钥。";
        this.infoURL = "https://wikipedia.org/wiki/JSON_Web_Token";
        this.inputType = "JSON";
        this.outputType = "string";
        this.args = [
            {
                name: "私钥/Secret",
                type: "text",
                value: "secret"
            },
            {
                name: "签名算法",
                type: "option",
                value: JWT_ALGORITHMS
            }
        ];
    }

    /**
     * @param {JSON} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [key, algorithm] = args;

        try {
            return jwt.sign(input, key, {
                algorithm: algorithm === "None" ? "none" : algorithm
            });
        } catch (err) {
            throw new OperationError(`错误：Key必须是HMAC算法的secret或PEM编码的RSA/ECDSA密钥。

${err}`);
        }
    }

}

export default JWTSign;
