/**
 * @author mshwed [m@ttshwed.com]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import { search } from "../lib/Extract.mjs";

/**
 * Extract Hash Values operation
 */
class ExtractHashes extends Operation {

    /**
     * ExtractHashValues constructor
     */
    constructor() {
        super();

        this.name = "提取哈希";
        this.module = "Regex";
        this.description = "根据哈希值长度提取哈希值。";
        this.infoURL = "https://wikipedia.org/wiki/Comparison_of_cryptographic_hash_functions";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                name: "哈希值长度",
                type: "number",
                value: 40
            },
            {
                name: "搜索所有种类哈希值",
                type: "boolean",
                value: false
            },
            {
                name: "显示总数",
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
        const results = [];
        let hashCount = 0;

        const [hashLength, searchAllHashes, showDisplayTotal] = args;

        // Convert character length to bit length
        let hashBitLengths = [(hashLength / 2) * 8];

        if (searchAllHashes) hashBitLengths = [4, 8, 16, 32, 64, 128, 160, 192, 224, 256, 320, 384, 512, 1024];

        for (const hashBitLength of hashBitLengths) {
            // Convert bit length to character length
            const hashCharacterLength = (hashBitLength / 8) * 2;

            const regex = new RegExp(`(\\b|^)[a-f0-9]{${hashCharacterLength}}(\\b|$)`, "g");
            const searchResults = search(input, regex, null, false);

            hashCount += searchResults.length;
            results.push(...searchResults);
        }

        let output = "";
        if (showDisplayTotal) {
            output = `结果总数：${hashCount}\n\n`;
        }

        output = output + results.join("\n");
        return output;
    }

}

export default ExtractHashes;
