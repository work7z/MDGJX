/**
 * @author tlwr [toby@toby.codes]
 * @copyright Crown Copyright 2017
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import kbpgp from "kbpgp";
import { ASP, importPrivateKey } from "../lib/PGP.mjs";
import OperationError from "../errors/OperationError.mjs";
import * as es6promisify from "es6-promisify";
const promisify = es6promisify.default ? es6promisify.default.promisify : es6promisify.promisify;

/**
 * PGP Decrypt operation
 */
class PGPDecrypt extends Operation {

    /**
     * PGPDecrypt constructor
     */
    constructor() {
        super();

        this.name = "PGP解密";
        this.module = "PGP";
        this.description = [
            "输入：你想要解密的经过ASCII-armour处理的PGP信息。",
            "<br><br>",
            "参数：经过ASCII-armour处理的接收者PGP私钥。",
            "（如果有口令的话还需要填写口令）",
            "<br><br>",
            "PGP（英语：Pretty Good Privacy，直译：优良保密协议）是一套用于讯息加密、验证的应用程序。",
            "<br><br>",
            "此操作使用Keybase实现的PGP。",
        ].join("\n");
        this.infoURL = "https://wikipedia.org/wiki/Pretty_Good_Privacy";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "接收者私钥",
                "type": "text",
                "value": ""
            },
            {
                "name": "私钥口令",
                "type": "string",
                "value": ""
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     *
     * @throws {OperationError} if invalid private key
     */
    async run(input, args) {
        const encryptedMessage = input,
            [privateKey, passphrase] = args,
            keyring = new kbpgp.keyring.KeyRing();
        let plaintextMessage;

        if (!privateKey) throw new OperationError("请输入接收者的私钥");

        const key = await importPrivateKey(privateKey, passphrase);
        keyring.add_key_manager(key);

        try {
            plaintextMessage = await promisify(kbpgp.unbox)({
                armored: encryptedMessage,
                keyfetch: keyring,
                asp: ASP
            });
        } catch (err) {
            throw new OperationError(`无法使用提供的私钥解密： ${err}`);
        }

        return plaintextMessage.toString();
    }

}

export default PGPDecrypt;
