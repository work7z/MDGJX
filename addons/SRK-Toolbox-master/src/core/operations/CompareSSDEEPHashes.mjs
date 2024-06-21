/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";
import {HASH_DELIM_OPTIONS} from "../lib/Delim.mjs";
import ssdeepjs from "ssdeep.js";
import OperationError from "../errors/OperationError.mjs";

/**
 * Compare SSDEEP hashes operation
 */
class CompareSSDEEPHashes extends Operation {

    /**
     * CompareSSDEEPHashes constructor
     */
    constructor() {
        super();

        this.name = "比较SSDEEP哈希值";
        this.module = "Crypto";
        this.description = "比较两个SSDEEP模糊哈希值，并按相似度从0到100打分。";
        this.infoURL = "https://forensics.wiki/ssdeep/";
        this.inputType = "string";
        this.outputType = "Number";
        this.args = [
            {
                "name": "分隔符",
                "type": "option",
                "value": HASH_DELIM_OPTIONS
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {Number}
     */
    run(input, args) {
        const samples = input.split(Utils.charRep(args[0]));
        if (samples.length !== 2) throw new OperationError("样本数量错误。");
        return ssdeepjs.similarity(samples[0], samples[1]);
    }

}

export default CompareSSDEEPHashes;
