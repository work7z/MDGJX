/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import JSCRC from "js-crc";

/**
 * CRC-16 Checksum operation
 */
class CRC16Checksum extends Operation {

    /**
     * CRC16Checksum constructor
     */
    constructor() {
        super();

        this.name = "CRC-16校验和";
        this.module = "Crypto";
        this.description = "循环冗余校验（英语：Cyclic redundancy check，通称“CRC”）是一种根据网络数据包或电脑文件等数据产生简短固定位数校验码的一种散列函数，主要用来检测或校验数据传输或者保存后可能出现的错误。<br><br>此方法是由W. Wesley Peterson于1961年发表。";
        this.infoURL = "https://wikipedia.org/wiki/Cyclic_redundancy_check";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        return JSCRC.crc16(input);
    }

}

export default CRC16Checksum;
