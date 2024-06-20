/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import { search } from "../lib/Extract.mjs";
import { hexadecimalSort } from "../lib/Sort.mjs";

/**
 * Extract MAC addresses operation
 */
class ExtractMACAddresses extends Operation {

    /**
     * ExtractMACAddresses constructor
     */
    constructor() {
        super();

        this.name = "提取MAC地址";
        this.module = "Regex";
        this.description = "从输入中提取Media Access Control (MAC)地址。";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                name: "显示总数",
                type: "boolean",
                value: false
            },
            {
                name: "排序",
                type: "boolean",
                value: false
            },
            {
                name: "去重",
                type: "boolean",
                value: false
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [displayTotal, sort, unique] = args,
            regex = /[A-F\d]{2}(?:[:-][A-F\d]{2}){5}/ig,
            results = search(
                input,
                regex,
                null,
                sort ? hexadecimalSort : null,
                unique
            );

        if (displayTotal) {
            return `总计： ${results.length}\n\n${results.join("\n")}`;
        } else {
            return results.join("\n");
        }
    }

}

export default ExtractMACAddresses;
