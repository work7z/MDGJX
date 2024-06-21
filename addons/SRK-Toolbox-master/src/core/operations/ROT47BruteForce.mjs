/**
 * @author MikeCAT
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";

/**
 * ROT47 Brute Force operation.
 */
class ROT47BruteForce extends Operation {

    /**
     * ROT47BruteForce constructor
     */
    constructor() {
        super();

        this.name = "ROT47暴力破解";
        this.module = "Default";
        this.description = "尝试ROT47所有可能的偏移量。<br><br>你可以输入已知的明文部分（Crib）来筛选结果。";
        this.infoURL = "https://wikipedia.org/wiki/ROT13#Variants";
        this.inputType = "byteArray";
        this.outputType = "string";
        this.args = [
            {
                name: "取样长度",
                type: "number",
                value: 100
            },
            {
                name: "取样偏移",
                type: "number",
                value: 0
            },
            {
                name: "输出偏移量",
                type: "boolean",
                value: true
            },
            {
                name: "Crib (已知明文)",
                type: "string",
                value: ""
            }
        ];
    }

    /**
     * @param {byteArray} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [sampleLength, sampleOffset, printAmount, crib] = args;
        const sample = input.slice(sampleOffset, sampleOffset + sampleLength);
        const cribLower = crib.toLowerCase();
        const result = [];
        for (let amount = 1; amount < 94; amount++) {
            const rotated = sample.slice();
            for (let i = 0; i < rotated.length; i++) {
                if (33 <= rotated[i] && rotated[i] <= 126) {
                    rotated[i] = (rotated[i] - 33 + amount) % 94 + 33;
                }
            }
            const rotatedString = Utils.byteArrayToUtf8(rotated);
            if (rotatedString.toLowerCase().indexOf(cribLower) >= 0) {
                const rotatedStringEscaped = Utils.escapeWhitespace(rotatedString);
                if (printAmount) {
                    const amountStr = "偏移量 = " + (" " + amount).slice(-2) + ": ";
                    result.push(amountStr + rotatedStringEscaped);
                } else {
                    result.push(rotatedStringEscaped);
                }
            }
        }
        return result.join("\n");
    }
}

export default ROT47BruteForce;
