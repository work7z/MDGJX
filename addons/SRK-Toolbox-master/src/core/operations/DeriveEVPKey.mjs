/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";
import CryptoJS from "crypto-js";

/**
 * Derive EVP key operation
 */
class DeriveEVPKey extends Operation {

    /**
     * DeriveEVPKey constructor
     */
    constructor() {
        super();

        this.name = "派生EVP密钥";
        this.module = "Ciphers";
        this.description = "EVP Key Derivation是在OpenSSL中广泛使用的基于口令的密钥派生算法（PBKDF）。在许多加密场景中，用户的数据安全最终取决于密码，但密码通常不能被直接当作加密密钥使用，因此需要一些对应的处理方法来生成密钥。<br><br>对于给定的任意单一密码，通过加盐产生多个不同密钥，然后通过迭代次数提高计算密钥的成本，可以让攻击变得愈发困难。<br><br>如果盐留空，会随机产生一个字符串作为盐使用。";
        this.infoURL = "https://wikipedia.org/wiki/Key_derivation_function";
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
                "toggleValues": ["Hex", "UTF8", "Latin1", "Base64"]
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const passphrase = CryptoJS.enc.Latin1.parse(
                Utils.convertToByteString(args[0].string, args[0].option)),
            keySize = args[1] / 32,
            iterations = args[2],
            hasher = args[3],
            salt = CryptoJS.enc.Latin1.parse(
                Utils.convertToByteString(args[4].string, args[4].option)),
            key = CryptoJS.EvpKDF(passphrase, salt, { // lgtm [js/insufficient-password-hash]
                keySize: keySize,
                hasher: CryptoJS.algo[hasher],
                iterations: iterations,
            });

        return key.toString(CryptoJS.enc.Hex);
    }

}

export default DeriveEVPKey;

/**
 * Overwriting the CryptoJS OpenSSL key derivation function so that it is possible to not pass a
 * salt in.

 * @param {string} password - The password to derive from.
 * @param {number} keySize - The size in words of the key to generate.
 * @param {number} ivSize - The size in words of the IV to generate.
 * @param {WordArray|string} salt (Optional) A 64-bit salt to use. If omitted, a salt will be
 *                 generated randomly. If set to false, no salt will be added.
 *
 * @returns {CipherParams} A cipher params object with the key, IV, and salt.
 *
 * @static
 *
 * @example
 * // Randomly generates a salt
 * var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32);
 * // Uses the salt 'saltsalt'
 * var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32, 'saltsalt');
 * // Does not use a salt
 * var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32, false);
 */
CryptoJS.kdf.OpenSSL.execute = function (password, keySize, ivSize, salt) {
    // Generate random salt if no salt specified and not set to false
    // This line changed from `if (!salt) {` to the following
    if (salt === undefined || salt === null) {
        salt = CryptoJS.lib.WordArray.random(64/8);
    }

    // Derive key and IV
    const key = CryptoJS.algo.EvpKDF.create({ keySize: keySize + ivSize }).compute(password, salt);

    // Separate key and IV
    const iv = CryptoJS.lib.WordArray.create(key.words.slice(keySize), ivSize * 4);
    key.sigBytes = keySize * 4;

    // Return params
    return CryptoJS.lib.CipherParams.create({ key: key, iv: iv, salt: salt });
};


/**
 * Override for the CryptoJS Hex encoding parser to remove whitespace before attempting to parse
 * the hex string.
 *
 * @param {string} hexStr
 * @returns {CryptoJS.lib.WordArray}
 */
CryptoJS.enc.Hex.parse = function (hexStr) {
    // Remove whitespace
    hexStr = hexStr.replace(/\s/g, "");

    // Shortcut
    const hexStrLength = hexStr.length;

    // Convert
    const words = [];
    for (let i = 0; i < hexStrLength; i += 2) {
        words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
    }

    return new CryptoJS.lib.WordArray.init(words, hexStrLength / 2);
};
