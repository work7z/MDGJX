/**
 * @author gchq77703 [gchq77703@gchq.gov.uk]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";

/**
 * Generate De Bruijn Sequence operation
 */
class GenerateDeBruijnSequence extends Operation {

    /**
     * GenerateDeBruijnSequence constructor
     */
    constructor() {
        super();

        this.name = "生成德布鲁因序列";
        this.module = "Default";
        this.description = "根据给定的元素表和密钥长度生成滚动码。De Bruijn sequence又译德布勒蕴序列、德布莱英序列。";
        this.infoURL = "https://wikipedia.org/wiki/De_Bruijn_sequence";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                name: "元素表长度 (k)",
                type: "number",
                value: 2
            },
            {
                name: "密钥长度 (n)",
                type: "number",
                value: 3
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [k, n] = args;

        if (k < 2 || k > 9) {
            throw new OperationError("无效的元素表长度，必须位于2和9之间（包括2和9）。");
        }

        if (n < 2) {
            throw new OperationError("无效的密钥长度，至少为2。");
        }

        if (Math.pow(k, n) > 50000) {
            throw new OperationError("太多组合数量，请减少k^n到小于50000。");
        }

        const a = new Array(k * n).fill(0);
        const sequence = [];

        (function db(t = 1, p = 1) {
            if (t > n) {
                if (n % p !== 0) return;
                for (let j = 1; j <= p; j++) {
                    sequence.push(a[j]);
                }
                return;
            }

            a[t] = a[t - p];
            db(t + 1, p);
            for (let j = a[t - p] + 1; j < k; j++) {
                a[t] = j;
                db(t + 1, t);
            }
        })();

        return sequence.join("");
    }
}

export default GenerateDeBruijnSequence;
