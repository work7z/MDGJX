/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";
import forge from "node-forge";
import OperationError from "../errors/OperationError.mjs";
import { Blowfish } from "../lib/Blowfish.mjs";

/**
 * Blowfish Encrypt operation
 */
class BlowfishEncrypt extends Operation {

    /**
     * BlowfishEncrypt constructor
     */
    constructor() {
        super();

        this.name = "Blowfish加密";
        this.module = "Ciphers";
        this.description = "Blowfish是一个对称密钥加密分组密码算法，由布鲁斯·施奈尔于1993年设计，现已应用在多种加密产品。Blowfish算法由于分组长度太小已被认为不安全，施奈尔更建议在现代应用中使用Twofish密码。<br><br><b>IV：</b> 初始化向量必须是8字节长度。";
        this.infoURL = "https://wikipedia.org/wiki/Blowfish_(cipher)";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "Key",
                "type": "toggleString",
                "value": "",
                "toggleValues": ["十六进制", "UTF8", "Latin1", "Base64"]
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
                "value": ["CBC", "CFB", "OFB", "CTR", "ECB"]
            },
            {
                "name": "输入格式",
                "type": "option",
                "value": ["原始内容", "十六进制"]
            },
            {
                "name": "输出格式",
                "type": "option",
                "value": ["十六进制", "原始内容"]
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const key = Utils.convertToByteString(args[0].string, args[0].option),
            iv = Utils.convertToByteString(args[1].string, args[1].option),
            mode = args[2],
            inputType = args[3],
            outputType = args[4];

        if (key.length < 4 || key.length > 56) {
            throw new OperationError(`无效的key长度： ${key.length}字节

Blowfish的key长度需要在4到56字节之间（32-448位）`);
        }

        if (iv.length !== 8) {
            throw new OperationError(`无效的IV长度： ${iv.length}字节。必须为8字节。`);
        }

        input = Utils.convertToByteString(input, inputType);

        const cipher = Blowfish.createCipher(key, mode);
        cipher.start({iv: iv});
        cipher.update(forge.util.createBuffer(input));
        cipher.finish();

        if (outputType === "十六进制") {
            return cipher.output.toHex();
        } else {
            return cipher.output.getBytes();
        }
    }

}

export default BlowfishEncrypt;
