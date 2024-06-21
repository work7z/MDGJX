/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";
import OperationError from "../errors/OperationError.mjs";
import forge from "node-forge";

/**
 * DES Encrypt operation
 */
class DESEncrypt extends Operation {

    /**
     * DESEncrypt constructor
     */
    constructor() {
        super();

        this.name = "DES加密";
        this.module = "Ciphers";
        this.description = "数据加密标准（英语：Data Encryption Standard，缩写为 DES）是一种对称密钥加密块密码算法，1976年被美国联邦政府的国家标准局确定为联邦资料处理标准（FIPS），随后在国际上广泛流传开来。DES现在已经不是一种安全的加密方法，主要因为它使用的56位密钥过短。<br><br><b>Key：</b>DES的key长度为8字节（64位）。<br>三重DES的key长度为24字节（192位）。<br><br>你可以通过密钥派生操作来生成基于密码的key。<br><br><b>IV：</b>初始化向量的长度是8字节。<br><br><b>填充：</b>CBC和ECB模式下会使用PKCS#7填充。";
        this.infoURL = "https://wikipedia.org/wiki/Data_Encryption_Standard";
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
            iv = Utils.convertToByteArray(args[1].string, args[1].option),
            [,, mode, inputType, outputType] = args;

        if (key.length !== 8) {
            throw new OperationError(`无效的key长度： ${key.length} 字节

DES的key长度为8字节（64位）。
三重DES的key长度为24字节（192位）。`);
        }
        if (iv.length !== 8 && mode !== "ECB") {
            throw new OperationError(`无效的IV长度： ${iv.length} 字节

DES的IV长度为8字节（64位）。
核实IV格式选取正确（例：十六进制或UTF8）。`);
        }

        input = Utils.convertToByteString(input, inputType);

        const cipher = forge.cipher.createCipher("DES-" + mode, key);
        cipher.start({iv: iv});
        cipher.update(forge.util.createBuffer(input));
        cipher.finish();

        return outputType === "十六进制" ? cipher.output.toHex() : cipher.output.getBytes();
    }

}

export default DESEncrypt;
