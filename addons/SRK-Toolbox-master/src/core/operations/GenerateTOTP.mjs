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
 * Generate TOTP operation
 */
class GenerateTOTP extends Operation {

    /**
     * GenerateTOTP constructor
     */
    constructor() {
        super();

        this.name = "生成TOTP";
        this.module = "Default";
        this.description = "基于时间的一次性密码算法（英语：Time-based One-Time Password，简称：TOTP）是一种根据预共享的密钥与当前时间计算一次性密码的算法。它已被互联网工程任务组接纳为RFC 6238标准，成为主动开放认证（英语：Initiative For Open Authentication）（OATH）的基石，并被用于众多多重要素验证系统当中。TOTP是散列消息认证码（HMAC）当中的一个例子。它结合一个私钥与当前时间戳，使用一个密码散列函数来生成一次性密码。<br><br>在输入框输入secret，或者留空来生成一个随机值。T0和T1的单位是秒。";
        this.infoURL = "https://wikipedia.org/wiki/Time-based_One-time_Password_algorithm";
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
                "name": "纪元偏移（Epoch offset, T0）",
                "type": "number",
                "value": 0
            },
            {
                "name": "计算时间间隔（T1）",
                "type": "number",
                "value": 30
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
            epoch: args[3],
            timeSlice: args[4]
        });
        return `URI： ${otpObj.totpURL}\n\n动态码： ${otpObj.totp()}`;
    }

}

export default GenerateTOTP;
