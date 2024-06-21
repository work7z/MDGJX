/**
 * @author mikecat
 * @copyright Crown Copyright 2022
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";
import forge from "node-forge";
import { toHexFast } from "../lib/Hex.mjs";
import OperationError from "../errors/OperationError.mjs";

/**
 * CMAC operation
 */
class CMAC extends Operation {

    /**
     * CMAC constructor
     */
    constructor() {
        super();

        this.name = "CMAC";
        this.module = "Crypto";
        this.description = "CMAC是基于块加密算法的消息验证码算法。<br><br>RFC4493定义AES-CMAC，使用128位key的AES加密算法。<br>NIST SP 800-38B建议使用其它key长度的AES算法或3DES。";
        this.infoURL = "https://wikipedia.org/wiki/CMAC";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                "name": "Key",
                "type": "toggleString",
                "value": "",
                "toggleValues": ["十六进制", "UTF8", "Latin1", "Base64"]
            },
            {
                "name": "加密算法",
                "type": "option",
                "value": ["AES", "3DES"]
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const key = Utils.convertToByteString(args[0].string, args[0].option);
        const algo = args[1];

        const info = (function() {
            switch (algo) {
                case "AES":
                    if (key.length !== 16 && key.length !== 24 && key.length !== 32) {
                        throw new OperationError("AES key必须为16、24或32字节长度（当前 " + key.length + " 字节）");
                    }
                    return {
                        "algorithm": "AES-ECB",
                        "key": key,
                        "blockSize": 16,
                        "Rb": new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x87]),
                    };
                case "3DES":
                    if (key.length !== 16 && key.length !== 24) {
                        throw new OperationError("3DES key必须为16或24字节长度（当前 " + key.length + " 字节）");
                    }
                    return {
                        "algorithm": "3DES-ECB",
                        "key": key.length === 16 ? key + key.substring(0, 8) : key,
                        "blockSize": 8,
                        "Rb": new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0x1b]),
                    };
                default:
                    throw new OperationError("未知加密算法");
            }
        })();

        const xor = function(a, b, out) {
            if (!out) out = new Uint8Array(a.length);
            for (let i = 0; i < a.length; i++) {
                out[i] = a[i] ^ b[i];
            }
            return out;
        };

        const leftShift1 = function(a) {
            const out = new Uint8Array(a.length);
            let carry = 0;
            for (let i = a.length - 1; i >= 0; i--) {
                out[i] = (a[i] << 1) | carry;
                carry = a[i] >> 7;
            }
            return out;
        };

        const cipher = forge.cipher.createCipher(info.algorithm, info.key);
        const encrypt = function(a, out) {
            if (!out) out = new Uint8Array(a.length);
            cipher.start();
            cipher.update(forge.util.createBuffer(a));
            cipher.finish();
            const cipherText = cipher.output.getBytes();
            for (let i = 0; i < a.length; i++) {
                out[i] = cipherText.charCodeAt(i);
            }
            return out;
        };

        const L = encrypt(new Uint8Array(info.blockSize));
        const K1 = leftShift1(L);
        if (L[0] & 0x80) xor(K1, info.Rb, K1);
        const K2 = leftShift1(K1);
        if (K1[0] & 0x80) xor(K2, info.Rb, K2);

        const n = Math.ceil(input.byteLength / info.blockSize);
        const lastBlock = (function() {
            if (n === 0) {
                const data = new Uint8Array(K2);
                data[0] ^= 0x80;
                return data;
            }
            const inputLast = new Uint8Array(input, info.blockSize * (n - 1));
            if (inputLast.length === info.blockSize) {
                return xor(inputLast, K1, inputLast);
            } else {
                const data = new Uint8Array(info.blockSize);
                data.set(inputLast, 0);
                data[inputLast.length] = 0x80;
                return xor(data, K2, data);
            }
        })();

        const X = new Uint8Array(info.blockSize);
        const Y = new Uint8Array(info.blockSize);
        for (let i = 0; i < n - 1; i++) {
            xor(X, new Uint8Array(input, info.blockSize * i, info.blockSize), Y);
            encrypt(Y, X);
        }
        xor(lastBlock, X, Y);
        const T = encrypt(Y);
        return toHexFast(T);
    }

}

export default CMAC;
