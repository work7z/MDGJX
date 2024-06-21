/**
 * @author n1073645 [n1073645@gmail.com]
 * @copyright Crown Copyright 2020
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import * as LS47 from "../lib/LS47.mjs";

/**
 * LS47 Decrypt operation
 */
class LS47Decrypt extends Operation {

    /**
     * LS47Decrypt constructor
     */
    constructor() {
        super();

        this.name = "LS47解密";
        this.module = "Crypto";
        this.description = "LS47是对Alan Kaminsky的ElsieFour加密进行少量优化后的版本。为了编码更为详尽的信息，把原版的6x6网格（几乎不够用）扩充到了7x7。同时提供了一种简单的key扩充算法，因为没人喜欢记密码。和ElsieFour有着类似的安全性考虑。<br>LS47字母表包括以下字符: <code>_abcdefghijklmnopqrstuvwxyz.0123456789,-+*/:?!'()</code><br>LS47 key是字母表49个字符的排列，同时用于加解密。";
        this.infoURL = "https://github.com/exaexa/ls47";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                name: "密码",
                type: "string",
                value: ""
            },
            {
                name: "填充",
                type: "number",
                value: 10
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        this.paddingSize = parseInt(args[1], 10);

        LS47.initTiles();

        const key = LS47.deriveKey(args[0]);
        return LS47.decryptPad(key, input, this.paddingSize);
    }

}

export default LS47Decrypt;
