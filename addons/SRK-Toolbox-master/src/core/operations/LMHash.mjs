/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2022
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import {smbhash} from "ntlm";

/**
 * LM Hash operation
 */
class LMHash extends Operation {

    /**
     * LMHash constructor
     */
    constructor() {
        super();

        this.name = "LM哈希";
        this.module = "Crypto";
        this.description = "LM哈希，又叫LAN Manager哈希，是较旧的微软操作系统使用的存储密码方式，目前已被废弃。其安全性非常弱，使用现代硬件设备并利用彩虹表能在几秒之内完成破解。";
        this.infoURL = "https://wikipedia.org/wiki/LAN_Manager#Password_hashing_algorithm";
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
        return smbhash.lmhash(input);
    }

}

export default LMHash;
