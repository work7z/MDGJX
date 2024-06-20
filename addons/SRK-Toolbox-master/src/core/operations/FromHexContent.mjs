/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";
import {fromHex} from "../lib/Hex.mjs";

/**
 * From Hex Content operation
 */
class FromHexContent extends Operation {

    /**
     * FromHexContent constructor
     */
    constructor() {
        super();

        this.name = "Snort Content解码";
        this.module = "Default";
        this.description = "把十六进制恢复成原始字符。SNORT的Content关键字使用此格式。<br><br>例： <code>foo|3d|bar</code> 解码为<code>foo=bar</code>.";
        this.infoURL = "http://manual-snort-org.s3-website-us-east-1.amazonaws.com/node32.html#SECTION00451000000000000000";
        this.inputType = "string";
        this.outputType = "byteArray";
        this.args = [];
        this.checks = [
            {
                pattern:  "\\|([\\da-f]{2} ?)+\\|",
                flags:  "i",
                args:   []
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {byteArray}
     */
    run(input, args) {
        const regex = /\|([a-f\d ]{2,})\|/gi,
            output = [];
        let m, i = 0;
        while ((m = regex.exec(input))) {
            // Add up to match
            for (; i < m.index;)
                output.push(Utils.ord(input[i++]));

            // Add match
            const bytes = fromHex(m[1]);
            if (bytes) {
                for (let a = 0; a < bytes.length;)
                    output.push(bytes[a++]);
            } else {
                // Not valid hex, print as normal
                for (; i < regex.lastIndex;)
                    output.push(Utils.ord(input[i++]));
            }

            i = regex.lastIndex;
        }
        // Add all after final match
        for (; i < input.length;)
            output.push(Utils.ord(input[i++]));

        return output;
    }

}

export default FromHexContent;
