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
 * Derive PBKDF2 key operation
 */
class DerivePBKDF2Key extends Operation {

    /**
     * DerivePBKDF2Key constructor
     */
    constructor() {
        super();

        this.name = "派生PBKDF2密钥";
        this.module = "Ciphers";
        this.description = "PBKDF2是基于口令的密钥派生算法。它是RSA Laboratories的公钥密码学标准（PKCS）中的一部分。包括PBKDF2在内的PKCS #5 v2.0版本已被IETF作为RFC 2898发布。<br><br>在许多加密场景中，用户的数据安全最终取决于密码，但密码通常不能被直接当作加密密钥使用，因此需要一些对应的处理方法来生成密钥。<br><br>对于给定的任意单一密码，通过加盐产生多个不同密钥，然后通过迭代次数提高计算密钥的成本，可以让攻击变得愈发困难。<br><br>如果盐留空，会随机产生一个字符串作为盐使用。";
        this.infoURL = "https://wikipedia.org/wiki/PBKDF2";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "口令",
                "type": "toggleString",
                "value": "",
                "toggleValues": ["UTF8", "Latin1", "十六进制", "Base64"]
            },
            {
                "name": "Key大小",
                "type": "number",
                "value": 128
            },
            {
                "name": "迭代次数",
                "type": "number",
                "value": 1
            },
            {
                "name": "哈希函数",
                "type": "option",
                "value": ["SHA1", "SHA256", "SHA384", "SHA512", "MD5"]
            },
            {
                "name": "盐",
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
     */
    run(input, args) {
        const passphrase = Utils.convertToByteString(args[0].string, args[0].option),
            keySize = args[1],
            iterations = args[2],
            hasher = args[3],
            salt = Utils.convertToByteString(args[4].string, args[4].option) ||
                forge.random.getBytesSync(keySize),
            derivedKey = forge.pkcs5.pbkdf2(passphrase, salt, iterations, keySize / 8, hasher.toLowerCase());

        return forge.util.bytesToHex(derivedKey);
    }

}

export default DerivePBKDF2Key;
