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
 * PGP Decrypt and Verify operation
 */
class PGPDecryptAndVerify extends Operation {

    /**
     * PGPDecryptAndVerify constructor
     */
    constructor() {
        super();

        this.name = "PGP解密并验证";
        this.module = "PGP";
        this.description = [
            "输入：你想要验证的经过ASCII-armour处理的PGP信息。",
            "<br><br>",
            "参数：经过ASCII-armour处理的签名者PGP公钥",
            "和经过ASCII-armour处理的接收者PGP私钥（以及口令，如果有）。",
            "<br><br>",
            "此操作用PGP来解密并验证数字签名。",
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
                "name": "签名者公钥",
                "type": "text",
                "value": ""
            },
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
     */
    async run(input, args) {
        const signedMessage = input,
            [publicKey, privateKey, passphrase] = args,
            keyring = new kbpgp.keyring.KeyRing();
        let unboxedLiterals;

        if (!publicKey) throw new OperationError("请输入签名者公钥。");
        if (!privateKey) throw new OperationError("请输入接收者私钥。");
        const privKey = await importPrivateKey(privateKey, passphrase);
        const pubKey = await importPublicKey(publicKey);
        keyring.add_key_manager(privKey);
        keyring.add_key_manager(pubKey);

        try {
            unboxedLiterals = await promisify(kbpgp.unbox)({
                armored: signedMessage,
                keyfetch: keyring,
                asp: ASP
            });
            const ds = unboxedLiterals[0].get_data_signer();
            if (ds) {
                const km = ds.get_key_manager();
                if (km) {
                    const signer = km.get_userids_mark_primary()[0].components;
                    let text = "签名： ";
                    if (signer.email || signer.username || signer.comment) {
                        if (signer.username) {
                            text += `${signer.username} `;
                        }
                        if (signer.comment) {
                            text += `(${signer.comment}) `;
                        }
                        if (signer.email) {
                            text += `<${signer.email}>`;
                        }
                        text += "\n";
                    }
                    text += [
                        `PGP key ID：${km.get_pgp_short_key_id()}`,
                        `PGP指纹：${km.get_pgp_fingerprint().toString("hex")}`,
                        `签名时间： ${new Date(ds.sig.when_generated() * 1000).toUTCString()}`,
                        "----------------------------------\n"
                    ].join("\n");
                    text += unboxedLiterals.toString();
                    return text.trim();
                } else {
                    throw new OperationError("Could not identify a key manager.");
                }
            } else {
                throw new OperationError("数据似乎未被签名。");
            }
        } catch (err) {
            throw new OperationError(`无法验证消息： ${err}`);
        }
    }

}

export default PGPDecryptAndVerify;
