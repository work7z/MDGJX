/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";
import moment from "moment-timezone";
import {DATETIME_FORMATS, FORMAT_EXAMPLES} from "../lib/DateTime.mjs";

/**
 * Translate DateTime Format operation
 */
class TranslateDateTimeFormat extends Operation {

    /**
     * TranslateDateTimeFormat constructor
     */
    constructor() {
        super();

        this.name = "转换DateTime格式";
        this.module = "Default";
        this.description = "将输入的DateTime转换成另一种格式。<br><br>不输入任何内容来查看格式示例字符串。";
        this.infoURL = "https://momentjs.com/docs/#/parsing/string-format/";
        this.inputType = "string";
        this.outputType = "string";
        this.presentType = "html";
        this.args = [
            {
                "name": "内置格式",
                "type": "populateOption",
                "value": DATETIME_FORMATS,
                "target": 1
            },
            {
                "name": "输入格式",
                "type": "binaryString",
                "value": "DD/MM/YYYY HH:mm:ss"
            },
            {
                "name": "输入时区",
                "type": "option",
                "value": ["UTC"].concat(moment.tz.names())
            },
            {
                "name": "输出格式",
                "type": "binaryString",
                "value": "dddd Do MMMM YYYY HH:mm:ss Z z"
            },
            {
                "name": "输出时区",
                "type": "option",
                "value": ["UTC"].concat(moment.tz.names())
            }
        ];

        this.invalidFormatMessage = "无效格式。";
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [inputFormat, inputTimezone, outputFormat, outputTimezone] = args.slice(1);
        let date;

        try {
            date = moment.tz(input, inputFormat, inputTimezone);
            if (!date || date.format() === "Invalid date") throw Error;
        } catch (err) {
            return this.invalidFormatMessage;
        }

        return date.tz(outputTimezone).format(outputFormat.replace(/[<>]/g, ""));
    }

    /**
     * @param {string} data
     * @returns {html}
     */
    present(data) {
        if (data === this.invalidFormatMessage) {
            return `${data}\n\n${FORMAT_EXAMPLES}`;
        }
        return Utils.escapeHtml(data);
    }
}

export default TranslateDateTimeFormat;
