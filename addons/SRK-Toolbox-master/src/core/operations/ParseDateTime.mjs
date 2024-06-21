/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import moment from "moment-timezone";
import {DATETIME_FORMATS, FORMAT_EXAMPLES} from "../lib/DateTime.mjs";

/**
 * Parse DateTime operation
 */
class ParseDateTime extends Operation {

    /**
     * ParseDateTime constructor
     */
    constructor() {
        super();

        this.name = "解析DateTime";
        this.module = "Default";
        this.description = "根据指定的格式与时区解析DateTime字符串。可解析出以下内容：<ul><li>日期</li><li>时间</li><li>上下午 (AM/PM)</li><li>时区</li><li>UTC偏移量</li><li>夏令时</li><li>闰年</li><li>当月天数</li><li>当年的第几天</li><li>星期</li><li>季度</li></ul>不输入任何内容来查看格式示例字符串。";
        this.infoURL = "https://momentjs.com/docs/#/parsing/string-format/";
        this.inputType = "string";
        this.outputType = "html";
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
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {html}
     */
    run(input, args) {
        const inputFormat = args[1],
            inputTimezone = args[2];
        let date,
            output = "";

        try {
            date = moment.tz(input, inputFormat, inputTimezone);
            if (!date || date.format() === "Invalid date") throw Error;
        } catch (err) {
            return `无效格式。\n\n${FORMAT_EXAMPLES}`;
        }

        output += "日期： " + date.format("dddd Do MMMM YYYY") +
            "\n时间： " + date.format("HH:mm:ss") +
            "\n上下午： " + date.format("A") +
            "\n时区： " + date.format("z") +
            "\nUTC偏移量： " + date.format("ZZ") +
            "\n\n夏令时： " + date.isDST() +
            "\n闰年： " + date.isLeapYear() +
            "\n当月天数： " + date.daysInMonth() +
            "\n\n当年第几天： " + date.dayOfYear() +
            "\n当年第几周： " + date.week() +
            "\n季度： " + date.quarter();

        return output;
    }

}

export default ParseDateTime;
