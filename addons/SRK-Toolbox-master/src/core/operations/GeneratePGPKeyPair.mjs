/**
 * @author tlwr [toby@toby.codes]
 * @author Matt C [matt@artemisbot.uk]
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2017
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import kbpgp from "kbpgp";
import { getSubkeySize, ASP } from "../lib/PGP.mjs";
import { cryptNotice } from "../lib/Crypt.mjs";
import * as es6promisify from "es6-promisify";
const promisify = es6promisify.default ? es6promisify.default.promisify : es6promisify.promisify;


/**
 * Generate PGP Key Pair operation
 */
class GeneratePGPKeyPair extends Operation {

    /**
     * GeneratePGPKeyPair constructor
     */
    constructor() {
        super();

        this.name = "生成PGP密钥对";
        this.module = "PGP";
        this.description = `生成PGP公钥/私钥对。支持RSA和椭圆曲线（Eliptic Curve，EC）密钥。<br><br>${cryptNotice}`;
        this.infoURL = "https://wikipedia.org/wiki/Pretty_Good_Privacy";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "密钥类型",
                "type": "option",
                "value": ["RSA-1024", "RSA-2048", "RSA-4096", "ECC-256", "ECC-384", "ECC-521"]
            },
            {
                "name": "口令（非必填）",
                "type": "string",
                "value": ""
            },
            {
                "name": "姓名（非必填）",
                "type": "string",
                "value": ""
            },
            {
                "name": "Email（非必填）",
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
        let [keyType, keySize] = args[0].split("-");
        const password = args[1],
            name = args[2],
            email = args[3];
        let userIdentifier = "";

        keyType = keyType.toLowerCase();
        keySize = parseInt(keySize, 10);

        if (name) userIdentifier += name;
        if (email) userIdentifier += ` <${email}>`;

        let flags = kbpgp.const.openpgp.certify_keys;
        flags |= kbpgp.const.openpgp.sign_data;
        flags |= kbpgp.const.openpgp.auth;
        flags |= kbpgp.const.openpgp.encrypt_comm;
        flags |= kbpgp.const.openpgp.encrypt_storage;

        const keyGenerationOptions = {
            userid: userIdentifier,
            ecc: keyType === "ecc",
            primary: {
                "nbits": keySize,
                "flags": flags,
                "expire_in": 0
            },
            subkeys: [{
                "nbits": getSubkeySize(keySize),
                "flags": kbpgp.const.openpgp.sign_data,
                "expire_in": 86400 * 365 * 8
            }, {
                "nbits": getSubkeySize(keySize),
                "flags": kbpgp.const.openpgp.encrypt_comm | kbpgp.const.openpgp.encrypt_storage,
                "expire_in": 86400 * 365 * 2
            }],
            asp: ASP
        };

        return new Promise(async (resolve, reject) => {
            try {
                const unsignedKey = await promisify(kbpgp.KeyManager.generate)(keyGenerationOptions);
                await promisify(unsignedKey.sign.bind(unsignedKey))({});

                const signedKey = unsignedKey,
                    privateKeyExportOptions = {};

                if (password) privateKeyExportOptions.passphrase = password;
                const privateKey = await promisify(signedKey.export_pgp_private.bind(signedKey))(privateKeyExportOptions);
                const publicKey = await promisify(signedKey.export_pgp_public.bind(signedKey))({});
                resolve(privateKey + "\n" + publicKey.trim());
            } catch (err) {
                reject(`生成公私钥对出错： ${err}`);
            }
        });
    }

}

export default GeneratePGPKeyPair;
