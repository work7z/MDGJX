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


/**
 * RC2 Encrypt operation
 */
class RC2Encrypt extends Operation {

    /**
     * RC2Encrypt constructor
     */
    constructor() {
        super();

        this.name = "RC2加密";
        this.module = "Ciphers";
        this.description = "RC2（又叫ARC2）是Ron Rivest在1987年发明的对称加密算法。“RC”是“Rivest Cipher”的缩写。<br><br><b>Key:</b> RC2使用变长的key。<br><br>你可以通过密钥派生操作来生成基于密码的key。<br><br><b>IV:</b>CBC模式的初始化向量必须是8字节，如果IV留空则会使用ECB模式。<br><br><b>填充：</b>CBC和ECB模式下会使用PKCS#7填充。";
        this.infoURL = "https://wikipedia.org/wiki/RC2";
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
                "name": "Input",
                "type": "option",
                "value": ["原始内容", "十六进制"]
            },
            {
                "name": "Output",
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
            [,, inputType, outputType] = args,
            cipher = forge.rc2.createEncryptionCipher(key);

        input = Utils.convertToByteString(input, inputType);

        cipher.start(iv || null);
        cipher.update(forge.util.createBuffer(input));
        cipher.finish();

        return outputType === "十六进制" ? cipher.output.toHex() : cipher.output.getBytes();
    }

}

export default RC2Encrypt;
