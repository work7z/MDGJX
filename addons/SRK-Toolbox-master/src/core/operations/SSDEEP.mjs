/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import ssdeepjs from "ssdeep.js";

/**
 * SSDEEP operation
 */
class SSDEEP extends Operation {

    /**
     * SSDEEP constructor
     */
    constructor() {
        super();

        this.name = "SSDEEP";
        this.module = "Crypto";
        this.description = "SSDEEP是用于计算基于内容分割的分片哈希（Context Triggered Piecewise Hash, CTPH）的程序。CTPH也被叫做模糊哈希，可以用来检测数据同源性。例如几段具有相同内容片段的数据，相同片段间的其它内容和长度不同，但CTPH的计算结果相近。<br><br>SSDEEP哈希现在广泛用于简单的辨识目的（例如VirusTotal的“Basic Properties”）。尽管有“更好”的模糊哈希算法，SSDEEP依然是日常使用首选，得益于它的运算速度，以及它已经成为一个事实标准。<br><br>此操作本质上与下面的CTPH操作是相同的，只是输出格式不同。";
        this.infoURL = "https://forensics.wiki/ssdeep";
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
        return ssdeepjs.digest(input);
    }

}

export default SSDEEP;
