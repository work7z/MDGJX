/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";

/**
 * Remove whitespace operation
 */
class RemoveWhitespace extends Operation {

    /**
     * RemoveWhitespace constructor
     */
    constructor() {
        super();

        this.name = "移除空白字符";
        this.module = "Default";
        this.description = "从输入文本中移除空格、回车（CR）、换行（LF）、制表符（Tab）和换页（FF）。<br><br>此操作也支持移除英文句点（.），因为有时句点用于表示ASCII中无法显示的字符。";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "空格",
                "type": "boolean",
                "value": true
            },
            {
                "name": "回车（CR，\\r）",
                "type": "boolean",
                "value": true
            },
            {
                "name": "换行（LF，\\n）",
                "type": "boolean",
                "value": true
            },
            {
                "name": "制表符（Tab，\\t）",
                "type": "boolean",
                "value": true
            },
            {
                "name": "换页符(FF，\\f)",
                "type": "boolean",
                "value": true
            },
            {
                "name": "英文句点（.）",
                "type": "boolean",
                "value": false
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [
            removeSpaces,
            removeCarriageReturns,
            removeLineFeeds,
            removeTabs,
            removeFormFeeds,
            removeFullStops
        ] = args;
        let data = input;

        if (removeSpaces) data = data.replace(/ /g, "");
        if (removeCarriageReturns) data = data.replace(/\r/g, "");
        if (removeLineFeeds) data = data.replace(/\n/g, "");
        if (removeTabs) data = data.replace(/\t/g, "");
        if (removeFormFeeds) data = data.replace(/\f/g, "");
        if (removeFullStops) data = data.replace(/\./g, "");
        return data;
    }

}

export default RemoveWhitespace;
