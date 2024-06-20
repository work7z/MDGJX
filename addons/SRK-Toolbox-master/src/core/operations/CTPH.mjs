/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import ctphjs from "ctph.js";

/**
 * CTPH operation
 */
class CTPH extends Operation {

    /**
     * CTPH constructor
     */
    constructor() {
        super();

        this.name = "CTPH";
        this.module = "Crypto";
        this.description = "CTPH也被叫做模糊哈希，可以用来检测数据同源性。例如几段具有相同内容片段的数据，相同片段间的其它内容和长度不同，但CTPH的计算结果相近。<br><br>CTPH源于Dr. Andrew Tridgell的理论研究以及一款称作SpamSum的垃圾邮件检测程序。此算法最终由Jesse Kornblum改进并发表在2006年的DFRWS论文“Identifying Almost Identical Files Using Context Triggered Piecewise Hashing”上。";
        this.infoURL = "https://forensics.wiki/context_triggered_piecewise_hashing/";
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
        return ctphjs.digest(input);
    }

}

export default CTPH;
