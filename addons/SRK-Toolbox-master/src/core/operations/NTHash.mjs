/**
 * @author brun0ne [brunonblok@gmail.com]
 * @copyright Crown Copyright 2022
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import {runHash} from "../lib/Hash.mjs";

/**
 * NT Hash operation
 */
class NTHash extends Operation {

    /**
     * NTHash constructor
     */
    constructor() {
        super();

        this.name = "NT哈希";
        this.module = "Crypto";
        this.description = "NT哈希，有时又叫NTLM哈希，是Windows系统用于存储密码的一种方法。原理为在UTF-16LE编码的输入上执行MD4。由于NTLM哈希在现代硬件设备上非常容易被暴力破解，目前认为其安全性较弱。";
        this.infoURL = "https://wikipedia.org/wiki/NT_LAN_Manager";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        // Convert to UTF-16LE
        const buf = new ArrayBuffer(input.length * 2);
        const bufView = new Uint16Array(buf);
        for (let i = 0; i < input.length; i++) {
            bufView[i] = input.charCodeAt(i);
        }

        const hashed = runHash("md4", buf);
        return hashed.toUpperCase();
    }
}

export default NTHash;
