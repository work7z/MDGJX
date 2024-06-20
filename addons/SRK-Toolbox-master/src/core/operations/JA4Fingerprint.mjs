/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2024
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";
import {toJA4} from "../lib/JA4.mjs";

/**
 * JA4 Fingerprint operation
 */
class JA4Fingerprint extends Operation {

    /**
     * JA4Fingerprint constructor
     */
    constructor() {
        super();

        this.name = "JA4指纹";
        this.module = "Crypto";
        this.description = "通过将Client Hello中的值进行哈希，生成用于辨识TLS客户端的JA4指纹。<br><br>输入：TLS或QUIC客户端应用层Client Hello包的十六进制流。";
        this.infoURL = "https://medium.com/foxio/ja4-network-fingerprinting-9376fe9ca637";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                name: "输入格式",
                type: "option",
                value: ["十六进制", "Base64", "原始"]
            },
            {
                name: "输出格式",
                type: "option",
                value: ["JA4", "JA4 Original Rendering", "JA4 Raw", "JA4 Raw Original Rendering", "所有"]
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [inputFormat, outputFormat] = args;
        input = Utils.convertToByteArray(input, inputFormat);
        const ja4 = toJA4(new Uint8Array(input));

        // Output
        switch (outputFormat) {
            case "JA4":
                return ja4.JA4;
            case "JA4 Original Rendering":
                return ja4.JA4_o;
            case "JA4 Raw":
                return ja4.JA4_r;
            case "JA4 Raw Original Rendering":
                return ja4.JA4_ro;
            case "所有":
            default:
                return `JA4:    ${ja4.JA4}
JA4_o:  ${ja4.JA4_o}
JA4_r:  ${ja4.JA4_r}
JA4_ro: ${ja4.JA4_ro}`;
        }
    }

}

export default JA4Fingerprint;
