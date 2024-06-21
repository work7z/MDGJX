/**
 * @author mikecat
 * @copyright Crown Copyright 2022
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";
import { toHexFast } from "../lib/Hex.mjs";
import forge from "node-forge";
import OperationError from "../errors/OperationError.mjs";

/**
 * AES Key Wrap operation
 */
class AESKeyWrap extends Operation {

    /**
     * AESKeyWrap constructor
     */
    constructor() {
        super();

        this.name = "AES密钥包装";
        this.module = "Ciphers";
        this.description = "使用AES加密的密钥包装算法（由RFC3394定义），用于在非可信存储和通信环境中保护密钥。<br><br>此算法使用AES key（KEK: key-encryption key）和64位长度的IV来加密64位长度的块。";
        this.infoURL = "https://wikipedia.org/wiki/Key_wrap";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "Key (KEK)",
                "type": "toggleString",
                "value": "",
                "toggleValues": ["十六进制", "UTF8", "Latin1", "Base64"]
            },
            {
                "name": "IV",
                "type": "toggleString",
                "value": "a6a6a6a6a6a6a6a6",
                "toggleValues": ["十六进制", "UTF8", "Latin1", "Base64"]
            },
            {
                "name": "输入",
                "type": "option",
                "value": ["十六进制", "原始"]
            },
            {
                "name": "输出",
                "type": "option",
                "value": ["十六进制", "原始"]
            },
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const kek = Utils.convertToByteString(args[0].string, args[0].option),
            iv = Utils.convertToByteString(args[1].string, args[1].option),
            inputType = args[2],
            outputType = args[3];

        if (kek.length !== 16 && kek.length !== 24 && kek.length !== 32) {
            throw new OperationError("KEK必须为16、24或32字节长度（当前 " + kek.length + " 字节）");
        }
        if (iv.length !== 8) {
            throw new OperationError("IV必须为8字节长度（当前 " + iv.length + " 字节）");
        }
        const inputData = Utils.convertToByteString(input, inputType);
        if (inputData.length % 8 !== 0 || inputData.length < 16) {
            throw new OperationError("输入必须为8n (n>=2)字节长度（当前 " + inputData.length + " 字节）");
        }

        const cipher = forge.cipher.createCipher("AES-ECB", kek);

        let A = iv;
        const R = [];
        for (let i = 0; i < inputData.length; i += 8) {
            R.push(inputData.substring(i, i + 8));
        }
        let cntLower = 1, cntUpper = 0;
        for (let j = 0; j < 6; j++) {
            for (let i = 0; i < R.length; i++) {
                cipher.start();
                cipher.update(forge.util.createBuffer(A + R[i]));
                cipher.finish();
                const B = cipher.output.getBytes();
                const msbBuffer = Utils.strToArrayBuffer(B.substring(0, 8));
                const msbView = new DataView(msbBuffer);
                msbView.setUint32(0, msbView.getUint32(0) ^ cntUpper);
                msbView.setUint32(4, msbView.getUint32(4) ^ cntLower);
                A = Utils.arrayBufferToStr(msbBuffer, false);
                R[i] = B.substring(8, 16);
                cntLower++;
                if (cntLower > 0xffffffff) {
                    cntUpper++;
                    cntLower = 0;
                }
            }
        }
        const C = A + R.join("");

        if (outputType === "十六进制") {
            return toHexFast(Utils.strToArrayBuffer(C));
        }
        return C;
    }

}

export default AESKeyWrap;
