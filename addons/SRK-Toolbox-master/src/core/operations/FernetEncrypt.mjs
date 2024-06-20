/**
 * @author Karsten Silkenbäumer [github.com/kassi]
 * @copyright Karsten Silkenbäumer 2019
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import fernet from "fernet";

/**
 * FernetEncrypt operation
 */
class FernetEncrypt extends Operation {
    /**
     * FernetEncrypt constructor
     */
    constructor() {
        super();

        this.name = "Fernet加密";
        this.module = "Default";
        this.description = "Fernet是一种对称加密算法，设计目的是确保加密过的信息在没有密钥的情况下无法被解密和修改。密钥使用URL安全编码。Fernet使用128位AES算法（CBC模式，PKCS7填充）和使用SHA256算法的HMAC进行校验。IV使用os.random()生成。<br><br><b>密钥：</b>密钥长度必须为32字节（256位），使用Base64编码。";
        this.infoURL = "https://asecuritysite.com/encryption/fer";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "密钥",
                "type": "string",
                "value": ""
            },
        ];
    }
    /**
     * @param {String} input
     * @param {Object[]} args
     * @returns {String}
     */
    run(input, args) {
        const [secretInput] = args;
        try {
            const secret = new fernet.Secret(secretInput);
            const token = new fernet.Token({
                secret: secret,
            });
            return token.encode(input);
        } catch (err) {
            throw new OperationError(err);
        }
    }
}

export default FernetEncrypt;
