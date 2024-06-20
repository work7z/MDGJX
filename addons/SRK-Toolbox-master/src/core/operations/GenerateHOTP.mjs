/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2017
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import otp from "otp";
import ToBase32 from "./ToBase32.mjs";

/**
 * Generate HOTP operation
 */
class GenerateHOTP extends Operation {

    /**
     * GenerateHOTP constructor
     */
    constructor() {
        super();

        this.name = "生成HOTP";
        this.module = "Default";
        this.description = "基于HMAC的一次性密码算法（英语：HMAC-based One-time Password algorithm，HOTP）是一种基于散列消息验证码（HMAC）的一次性密码（OTP）算法，同时也是开放验证提案的基础（OATH）。HOTP在2005年由IETF发布在RFC 4226标准文档中。<br><br>在输入框输入secret，或者留空来生成一个随机值。";
        this.infoURL = "https://wikipedia.org/wiki/HMAC-based_One-time_Password_algorithm";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                "name": "名称",
                "type": "string",
                "value": ""
            },
            {
                "name": "Key长度",
                "type": "number",
                "value": 32
            },
            {
                "name": "动态码长度",
                "type": "number",
                "value": 6
            },
            {
                "name": "计数器",
                "type": "number",
                "value": 0
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const otpObj = otp({
            name: args[0],
            keySize: args[1],
            codeLength: args[2],
            secret: (new ToBase32).run(input, []).split("=")[0],
        });
        const counter = args[3];
        return `URI： ${otpObj.hotpURL}\n\n动态码： ${otpObj.hotp(counter)}`;
    }

}

export default GenerateHOTP;
