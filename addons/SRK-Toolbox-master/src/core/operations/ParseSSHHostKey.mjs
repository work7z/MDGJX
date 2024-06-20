/**
 * @author j433866 [j433866@gmail.com]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import Utils from "../Utils.mjs";
import { fromBase64 } from "../lib/Base64.mjs";
import { fromHex, toHexFast } from "../lib/Hex.mjs";

/**
 * Parse SSH Host Key operation
 */
class ParseSSHHostKey extends Operation {

    /**
     * ParseSSHHostKey constructor
     */
    constructor() {
        super();

        this.name = "解析SSH主机密钥";
        this.module = "Default";
        this.description = "解析SSH主机密钥（host key），提取其中字段。<br>支持的密钥类型：<ul><li>ssh-rsa</li><li>ssh-dss</li><li>ecdsa-sha2</li><li>ssh-ed25519</li></ul>密钥可以为十六进制或Base64格式";
        this.infoURL = "https://wikipedia.org/wiki/Secure_Shell";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                name: "输入格式",
                type: "option",
                value: [
                    "自动",
                    "Base64",
                    "十六进制"
                ]
            }
        ];
        this.checks = [
            {
                pattern:  "^\\s*([A-F\\d]{2}[,;:]){15,}[A-F\\d]{2}\\s*$",
                flags:  "i",
                args:   ["十六进制"]
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [inputFormat] = args,
            inputKey = this.convertKeyToBinary(input.trim(), inputFormat),
            fields = this.parseKey(inputKey),
            keyType = Utils.byteArrayToChars(fromHex(fields[0]), "");

        let output = `密钥类型： ${keyType}`;

        if (keyType === "ssh-rsa") {
            output += `\n指数： 0x${fields[1]}`;
            output += `\n模数： 0x${fields[2]}`;
        } else if (keyType === "ssh-dss") {
            output += `\np: 0x${fields[1]}`;
            output += `\nq: 0x${fields[2]}`;
            output += `\ng: 0x${fields[3]}`;
            output += `\ny: 0x${fields[4]}`;
        } else if (keyType.startsWith("ecdsa-sha2")) {
            output += `\n曲线： ${Utils.byteArrayToChars(fromHex(fields[1]))}`;
            output += `\n点位： 0x${fields.slice(2)}`;
        } else if (keyType === "ssh-ed25519") {
            output += `\nx: 0x${fields[1]}`;
        } else {
            output += "\n不支持的密钥类型";
            output += `\n参数： ${fields.slice(1)}`;
        }

        return output;
    }

    /**
     * Converts the key to binary format from either hex or base64
     *
     * @param {string} inputKey
     * @param {string} inputFormat
     * @returns {byteArray}
     */
    convertKeyToBinary(inputKey, inputFormat) {
        const keyPattern = new RegExp(/^(?:ssh|ecdsa-sha2)\S+\s+(\S*)/),
            keyMatch = inputKey.match(keyPattern);

        if (keyMatch) {
            inputKey = keyMatch[1];
        }

        if (inputFormat === "自动") {
            inputFormat = this.detectKeyFormat(inputKey);
        }
        if (inputFormat === "十六进制") {
            return fromHex(inputKey);
        } else if (inputFormat === "Base64") {
            return fromBase64(inputKey, null, "byteArray");
        } else {
            throw new OperationError("无效的输入格式");
        }
    }


    /**
     * Detects if the key is base64 or hex encoded
     *
     * @param {string} inputKey
     * @returns {string}
     */
    detectKeyFormat(inputKey) {
        const hexPattern = new RegExp(/^(?:[\dA-Fa-f]{2}[ ,;:]?)+$/);
        const b64Pattern = new RegExp(/^\s*(?:[A-Za-z\d+/]{4})+(?:[A-Za-z\d+/]{2}==|[A-Za-z\d+/]{3}=)?\s*$/);

        if (hexPattern.test(inputKey)) {
            return "十六进制";
        } else if (b64Pattern.test(inputKey)) {
            return "Base64";
        } else {
            throw new OperationError("无法检测密钥格式。");
        }
    }


    /**
     * Parses fields from the key
     *
     * @param {byteArray} key
     */
    parseKey(key) {
        const fields = [];
        while (key.length > 0) {
            const lengthField = key.slice(0, 4);
            let decodedLength = 0;
            for (let i = 0; i < lengthField.length; i++) {
                decodedLength += lengthField[i];
                decodedLength = decodedLength << 8;
            }
            decodedLength = decodedLength >> 8;
            // Break if length wasn't decoded correctly
            if (decodedLength <= 0) break;

            fields.push(toHexFast(key.slice(4, 4 + decodedLength)));
            key = key.slice(4 + decodedLength);
        }

        return fields;
    }

}

export default ParseSSHHostKey;
