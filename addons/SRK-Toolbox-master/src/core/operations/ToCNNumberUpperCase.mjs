/**
 * @author Raka-loah [i@lotc.cc]
 * @copyright Crown Copyright 2022
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";


/**
 * To CN Number Upper Case operation
 */
class ToCNNumberUpperCase extends Operation {

    /**
     * ToCNNumberUpperCase constructor
     */
    constructor() {
        super();

        this.name = "转换为大写数字";
        this.module = "Default";
        this.description = "把简体中文汉字数字转换为对应的大写形式。<br><br>例如： <code>一十一万四千五百一十四</code> 转换为 <code>壹拾壹万肆仟伍佰壹拾肆</code>。";
        this.infoURL = "https://zh.wikipedia.org/wiki/%E5%A4%A7%E5%86%99%E6%95%B0%E5%AD%97";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const numberDict = {
            "一": "壹",
            "二": "贰",
            "三": "叁",
            "四": "肆",
            "五": "伍",
            "六": "陆",
            "七": "柒",
            "八": "捌",
            "九": "玖",
            "十": "拾",
            "〇": "零",
            "百": "佰",
            "千": "仟"
        };

        const upperStr = input.split("").map(ch => numberDict[ch] ?? ch).join("");

        return upperStr;
    }

    /**
     * Highlight To CN Number Upper Case
     *
     * @param {Object[]} pos
     * @param {number} pos[].start
     * @param {number} pos[].end
     * @param {Object[]} args
     * @returns {Object[]} pos
     */
    highlight(pos, args) {
        return pos;
    }

    /**
     * Highlight To CN Number Upper Case in reverse
     *
     * @param {Object[]} pos
     * @param {number} pos[].start
     * @param {number} pos[].end
     * @param {Object[]} args
     * @returns {Object[]} pos
     */
    highlightReverse(pos, args) {
        return pos;
    }

}

export default ToCNNumberUpperCase;
