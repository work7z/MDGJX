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
 * AES Decrypt operation
 */
class AESDecrypt extends Operation {

    /**
     * AESDecrypt constructor
     */
    constructor() {
        super();

        this.name = "AES解密";
        this.module = "Ciphers";
        this.description = "高级加密标准(AES)是美国联邦政府采用的一种区块加密标准(FIPS)。十五种不同算法，经过五年的甄选流程，Rijndael加密法脱颖而出，成为有效标准。<br><br><b>Key：</b>根据Key的长度，会应用以下不同算法：<ul><li>16字节 = AES-128</li><li>24字节 = AES-192</li><li>32字节 = AES-256</li></ul>你可以通过密钥派生操作来生成基于密码的key。<br><br><b>IV：</b> 初始化向量的长度是16字节。<br><br><b>填充：</b>CBC和ECB模式下会使用PKCS#7填充。<br><br><b>GCM Tag:</b>非GCM模式中忽略。";
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
                "name": "Mode",
                "type": "argSelector",
                "value": [
                    {
                        name: "CBC",
                        off: [5, 6]
                    },
                    {
                        name: "CFB",
                        off: [5, 6]
                    },
                    {
                        name: "OFB",
                        off: [5, 6]
                    },
                    {
                        name: "CTR",
                        off: [5, 6]
                    },
                    {
                        name: "GCM",
                        on: [5, 6]
                    },
                    {
                        name: "ECB",
                        off: [5, 6]
                    },
                    {
                        name: "CBC/NoPadding",
                        off: [5, 6]
                    },
                    {
                        name: "ECB/NoPadding",
                        off: [5, 6]
                    }
                ]
            },
            {
                "name": "输入格式",
                "type": "option",
                "value": ["十六进制", "原始数据"]
            },
            {
                "name": "输出格式",
                "type": "option",
                "value": ["原始数据", "十六进制"]
            },
            {
                "name": "GCM Tag",
                "type": "toggleString",
                "value": "",
                "toggleValues": ["十六进制", "UTF8", "Latin1", "Base64"]
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
     * @throws {OperationError} if cannot decrypt input or invalid key length
     */
    run(input, args) {
        const key = Utils.convertToByteString(args[0].string, args[0].option),
            iv = Utils.convertToByteString(args[1].string, args[1].option),
            mode = args[2].substring(0, 3),
            noPadding = args[2].endsWith("NoPadding"),
            inputType = args[3],
            outputType = args[4],
            gcmTag = Utils.convertToByteString(args[5].string, args[5].option),
            aad = Utils.convertToByteString(args[6].string, args[6].option);

        if ([16, 24, 32].indexOf(key.length) < 0) {
            throw new OperationError(`无效的Key长度： ${key.length} 字节

根据Key的长度，会应用以下不同算法：
  16字节 = AES-128
  24字节 = AES-192
  32字节 = AES-256`);
        }

        input = Utils.convertToByteString(input, inputType);

        const decipher = forge.cipher.createDecipher("AES-" + mode, key);

        /* Allow for a "no padding" mode */
        if (noPadding) {
            decipher.mode.unpad = function(output, options) {
                return true;
            };
        }

        decipher.start({
            iv: iv.length === 0 ? "" : iv,
            tag: mode === "GCM" ? gcmTag : undefined,
            additionalData: mode === "GCM" ? aad : undefined
        });
        decipher.update(forge.util.createBuffer(input));
        const result = decipher.finish();

        if (result) {
            return outputType === "十六进制" ? decipher.output.toHex() : decipher.output.getBytes();
        } else {
            throw new OperationError("无法解密，参数错误");
        }
    }

}

export default AESDecrypt;
