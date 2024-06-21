/**
 * @author MikeCAT
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";

/**
 * ROT13 Brute Force operation.
 */
class ROT13BruteForce extends Operation {

    /**
     * ROT13BruteForce constructor
     */
    constructor() {
        super();

        this.name = "ROT13暴力破解";
        this.module = "Default";
        this.description = "尝试ROT13所有可能的偏移量。<br><br>你可以输入已知的明文部分（Crib）来筛选结果。";
        this.infoURL = "https://wikipedia.org/wiki/ROT13";
        this.inputType = "byteArray";
        this.outputType = "string";
        this.args = [
            {
                name: "偏移小写字母",
                type: "boolean",
                value: true
            },
            {
                name: "偏移大写字母",
                type: "boolean",
                value: true
            },
            {
                name: "偏移数字",
                type: "boolean",
                value: false
            },
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
        const [rotateLower, rotateUpper, rotateNum, sampleLength, sampleOffset, printAmount, crib] = args;
        const sample = input.slice(sampleOffset, sampleOffset + sampleLength);
        const cribLower = crib.toLowerCase();
        const lowerStart = "a".charCodeAt(0), upperStart = "A".charCodeAt(0), numStart = "0".charCodeAt(0);
        const result = [];
        for (let amount = 1; amount < 26; amount++) {
            const rotated = sample.slice();
            for (let i = 0; i < rotated.length; i++) {
                if (rotateLower && lowerStart <= rotated[i] && rotated[i] < lowerStart + 26) {
                    rotated[i] = (rotated[i] - lowerStart + amount) % 26 + lowerStart;
                } else if (rotateUpper && upperStart <= rotated[i] && rotated[i] < upperStart + 26) {
                    rotated[i] = (rotated[i] - upperStart + amount) % 26 + upperStart;
                } else if (rotateNum && numStart <= rotated[i] && rotated[i] < numStart + 10) {
                    rotated[i] = (rotated[i] - numStart + amount) % 10 + numStart;
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

export default ROT13BruteForce;
