/**
 * @author tlwr [toby@toby.codes]
 * @copyright Crown Copyright 2017
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import kbpgp from "kbpgp";
import { ASP, importPublicKey } from "../lib/PGP.mjs";
import OperationError from "../errors/OperationError.mjs";
import * as es6promisify from "es6-promisify";
const promisify = es6promisify.default ? es6promisify.default.promisify : es6promisify.promisify;

/**
 * PGP Encrypt operation
 */
class PGPEncrypt extends Operation {

    /**
     * PGPEncrypt constructor
     */
    constructor() {
        super();

        this.name = "PGP加密";
        this.module = "PGP";
        this.description = [
            "输入：你想要加密的信息。",
            "<br><br>",
            "参数：经过ASCII-armour处理的接收者PGP公钥。",
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
     * @throws {OperationError} if failed private key import or failed encryption
     */
    async run(input, args) {
        const plaintextMessage = input,
            plainPubKey = args[0];
        let encryptedMessage;

        if (!plainPubKey) throw new OperationError("请输入接收者的公钥");

        const key = await importPublicKey(plainPubKey);

        try {
            encryptedMessage = await promisify(kbpgp.box)({
                "msg": plaintextMessage,
                "encrypt_for": key,
                "asp": ASP
            });
        } catch (err) {
            throw new OperationError(`无法使用提供的公钥加密： ${err}`);
        }

        return encryptedMessage.toString();
    }

}

export default PGPEncrypt;
