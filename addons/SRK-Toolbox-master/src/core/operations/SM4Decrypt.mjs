/**
 * @author swesven
 * @copyright 2021
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";
import OperationError from "../errors/OperationError.mjs";
import { toHex } from "../lib/Hex.mjs";
import { decryptSM4 } from "../lib/SM4.mjs";

/**
 * SM4 Decrypt operation
 */
class SM4Decrypt extends Operation {

    /**
     * SM4Encrypt constructor
     */
    constructor() {
        super();

        this.name = "SM4解密";
        this.module = "Ciphers";
        this.description = "SM4是128位的分组密码，2016年8月，成为中国国家密码标准（GB/T 32907-2016）。";
        this.infoURL = "https://wikipedia.org/wiki/SM4_(cipher)";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "Key",
                "type": "toggleString",
                "value": "",
                "toggleValues": ["Hex", "UTF8", "Latin1", "Base64"]
            },
            {
                "name": "IV",
                "type": "toggleString",
                "value": "",
                "toggleValues": ["十六进制", "UTF8", "Latin1", "Base64"]
            },
            {
                "name": "模式",
                "type": "option",
                "value": ["CBC", "CFB", "OFB", "CTR", "ECB", "CBC/NoPadding", "ECB/NoPadding"]
            },
            {
                "name": "输入",
                "type": "option",
                "value": ["原始", "十六进制"]
            },
            {
                "name": "输出",
                "type": "option",
                "value": ["原始", "十六进制"]
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const key = Utils.convertToByteArray(args[0].string, args[0].option),
            iv = Utils.convertToByteArray(args[1].string, args[1].option),
            [,, mode, inputType, outputType] = args;

        if (key.length !== 16)
            throw new OperationError(`无效的key长度: ${key.length} 字节

SM4使用16字节(128位)长度的key。`);
        if (iv.length !== 16 && !mode.startsWith("ECB"))
            throw new OperationError(`无效的IV长度: ${iv.length} 字节

SM4使用16字节(128位)长度的IV。
请确认选择了正确的格式 (例如十六进制或UTF8)。`);

        input = Utils.convertToByteArray(input, inputType);
        const output = decryptSM4(input, key, iv, mode.substring(0, 3), mode.endsWith("NoPadding"));
        return outputType === "十六进制" ? toHex(output) : Utils.byteArrayToUtf8(output);
    }

}

export default SM4Decrypt;
