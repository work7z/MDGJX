/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";

/**
 * Reverse operation
 */
class Reverse extends Operation {

    /**
     * Reverse constructor
     */
    constructor() {
        super();

        this.name = "反转";
        this.module = "Default";
        this.description = "反转字符串。";
        this.inputType = "byteArray";
        this.outputType = "byteArray";
        this.args = [
            {
                "name": "粒度",
                "type": "option",
                "value": ["字节", "字符", "行"],
                "defaultIndex": 1
            }
        ];
    }

    /**
     * @param {byteArray} input
     * @param {Object[]} args
     * @returns {byteArray}
     */
    run(input, args) {
        let i;
        if (args[0] === "行") {
            const lines = [];
            let line = [],
                result = [];
            for (i = 0; i < input.length; i++) {
                if (input[i] === 0x0a) {
                    lines.push(line);
                    line = [];
                } else {
                    line.push(input[i]);
                }
            }
            lines.push(line);
            lines.reverse();
            for (i = 0; i < lines.length; i++) {
                result = result.concat(lines[i]);
                result.push(0x0a);
            }
            return result.slice(0, input.length);
        } else if (args[0] === "字符") {
            const inputString = Utils.byteArrayToUtf8(input);
            let result = "";
            for (let i = inputString.length - 1; i >= 0; i--) {
                const c = inputString.charCodeAt(i);
                if (i > 0 && 0xdc00 <= c && c <= 0xdfff) {
                    const c2 = inputString.charCodeAt(i - 1);
                    if (0xd800 <= c2 && c2 <= 0xdbff) {
                        // surrogates
                        result += inputString.charAt(i - 1);
                        result += inputString.charAt(i);
                        i--;
                        continue;
                    }
                }
                result += inputString.charAt(i);
            }
            return Utils.strToUtf8ByteArray(result);
        } else {
            return input.reverse();
        }
    }

}

export default Reverse;
