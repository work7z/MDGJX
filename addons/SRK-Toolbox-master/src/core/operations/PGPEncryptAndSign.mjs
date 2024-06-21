/**
 * @author tlwr [toby@toby.codes]
 * @copyright Crown Copyright 2017
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import kbpgp from "kbpgp";
import { ASP, importPrivateKey, importPublicKey } from "../lib/PGP.mjs";
import OperationError from "../errors/OperationError.mjs";
import * as es6promisify from "es6-promisify";
const promisify = es6promisify.default ? es6promisify.default.promisify : es6promisify.promisify;

/**
 * PGP Encrypt and Sign operation
 */
class PGPEncryptAndSign extends Operation {

    /**
     * PGPEncryptAndSign constructor
     */
    constructor() {
        super();

        this.name = "PGP加密并签名";
        this.module = "PGP";
        this.description = [
            "输入：你想要签名的明文内容。",
            "<br><br>",
            "参数：经过ASCII-armour处理的签名者私钥（以及口令，如果有）",
            "经过ASCII-armour处理的接收者公钥。",
            "<br><br>",
            "此操作用PGP产生加密的数字签名。",
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
                "name": "签名者私钥",
                "type": "text",
                "value": ""
            },
            {
                "name": "私钥口令",
                "type": "string",
                "value": ""
            },
            {
                "name": "接收者公钥",
                "type": "text",
                "value": ""
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     *
     * @throws {OperationError} if failure to sign message
     */
    async run(input, args) {
        const message = input,
            [privateKey, passphrase, publicKey] = args;
        let signedMessage;

        if (!privateKey) throw new OperationError("请输入签名者私钥。");
        if (!publicKey) throw new OperationError("请输入接收者公钥。");
        const privKey = await importPrivateKey(privateKey, passphrase);
        const pubKey = await importPublicKey(publicKey);

        try {
            signedMessage = await promisify(kbpgp.box)({
                "msg": message,
                "encrypt_for": pubKey,
                "sign_with": privKey,
                "asp": ASP
            });
        } catch (err) {
            throw new OperationError(`无法给消息签名： ${err}`);
        }

        return signedMessage;
    }

}

export default PGPEncryptAndSign;
