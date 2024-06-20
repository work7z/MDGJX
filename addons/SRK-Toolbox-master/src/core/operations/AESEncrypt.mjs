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

/**
 * AES Encrypt operation
 */
class AESEncrypt extends Operation {

    /**
     * AESEncrypt constructor
     */
    constructor() {
        super();

        this.name = "AES加密";
        this.module = "Ciphers";
        this.description = "高级加密标准(AES)是美国联邦政府采用的一种区块加密标准(FIPS)。十五种不同算法，经过五年的甄选流程，Rijndael加密法脱颖而出，成为有效标准。<br><br><b>Key：</b>根据Key的长度，会应用以下不同算法：<ul><li>16字节 = AES-128</li><li>24字节 = AES-192</li><li>32字节 = AES-256</li></ul>你可以通过密钥派生操作来生成基于密码的key。<br><br><b>IV：</b> 初始化向量的长度是16字节。<br><br><b>填充：</b>CBC和ECB模式下会使用PKCS#7填充。";
        this.infoURL = "https://wikipedia.org/wiki/Advanced_Encryption_Standard";
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
                "type": "argSelector",
                "value": [
                    {
                        name: "CBC",
                        off: [5]
                    },
                    {
                        name: "CFB",
                        off: [5]
                    },
                    {
                        name: "OFB",
                        off: [5]
                    },
                    {
                        name: "CTR",
                        off: [5]
                    },
                    {
                        name: "GCM",
                        on: [5]
                    },
                    {
                        name: "ECB",
                        off: [5]
                    }
                ]
            },
            {
                "name": "输入",
                "type": "option",
                "value": ["原始内容", "十六进制"]
            },
            {
                "name": "输出",
                "type": "option",
                "value": ["十六进制", "原始内容"]
            },
            {
                "name": "额外鉴权数据",
                "type": "toggleString",
                "value": "",
                "toggleValues": ["十六进制", "UTF8", "Latin1", "Base64"]
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     *
     * @throws {OperationError} if invalid key length
     */
    run(input, args) {
        const key = Utils.convertToByteString(args[0].string, args[0].option),
            iv = Utils.convertToByteString(args[1].string, args[1].option),
            mode = args[2],
            inputType = args[3],
            outputType = args[4],
            aad = Utils.convertToByteString(args[5].string, args[5].option);

        if ([16, 24, 32].indexOf(key.length) < 0) {
            throw new OperationError(`无效的Key长度： ${key.length} 字节

根据Key的长度，会应用以下不同算法：
  16字节 = AES-128
  24字节 = AES-192
  32字节 = AES-256`);
        }

        input = Utils.convertToByteString(input, inputType);

        const cipher = forge.cipher.createCipher("AES-" + mode, key);
        cipher.start({
            iv: iv,
            additionalData: mode === "GCM" ? aad : undefined
        });
        cipher.update(forge.util.createBuffer(input));
        cipher.finish();

        if (outputType === "十六进制") {
            if (mode === "GCM") {
                return cipher.output.toHex() + "\n\n" +
                    "Tag: " + cipher.mode.tag.toHex();
            }
            return cipher.output.toHex();
        } else {
            if (mode === "GCM") {
                return cipher.output.getBytes() + "\n\n" +
                    "Tag: " + cipher.mode.tag.getBytes();
            }
            return cipher.output.getBytes();
        }
    }

}

export default AESEncrypt;
