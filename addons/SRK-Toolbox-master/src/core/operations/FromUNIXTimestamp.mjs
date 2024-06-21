/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import moment from "moment-timezone";
import {UNITS} from "../lib/DateTime.mjs";
import OperationError from "../errors/OperationError.mjs";

/**
 * From UNIX Timestamp operation
 */
class FromUNIXTimestamp extends Operation {

    /**
     * FromUNIXTimestamp constructor
     */
    constructor() {
        super();

        this.name = "从UNIX时间戳提取";
        this.module = "Default";
        this.description = "将UNIX时间戳转换为DateTime字符串。<br><br>例： <code>978346800</code> 转换为 <code>Mon 1 January 2001 11:00:00 UTC</code><br><br>UNIX时间，或称POSIX时间是UNIX或类UNIX系统使用的时间表示方式：从UTC1970年1月1日0时0分0秒起至现在的总秒数，不考虑闰秒。";
        this.infoURL = "https://wikipedia.org/wiki/Unix_time";
        this.inputType = "number";
        this.outputType = "string";
        this.args = [
            {
                "name": "单位",
                "type": "option",
                "value": UNITS
            }
        ];
        this.checks = [
            {
                pattern: "^1?\\d{9}$",
                flags: "",
                args: ["秒 (s)"]
            },
            {
                pattern: "^1?\\d{12}$",
                flags: "",
                args: ["毫秒 (ms)"]
            },
            {
                pattern: "^1?\\d{15}$",
                flags: "",
                args: ["微秒 (μs)"]
            },
            {
                pattern: "^1?\\d{18}$",
                flags: "",
                args: ["纳秒 (ns)"]
            }
        ];
    }

    /**
     * @param {number} input
     * @param {Object[]} args
     * @returns {string}
     *
     * @throws {OperationError} if invalid unit
     */
    run(input, args) {
        const units = args[0];
        let d;

        input = parseFloat(input);

        if (units === "秒 (s)") {
            d = moment.unix(input);
            return d.tz("UTC").format("ddd D MMMM YYYY HH:mm:ss") + " UTC";
        } else if (units === "毫秒 (ms)") {
            d = moment(input);
            return d.tz("UTC").format("ddd D MMMM YYYY HH:mm:ss.SSS") + " UTC";
        } else if (units === "微秒 (μs)") {
            d = moment(input / 1000);
            return d.tz("UTC").format("ddd D MMMM YYYY HH:mm:ss.SSS") + " UTC";
        } else if (units === "纳秒 (ns)") {
            d = moment(input / 1000000);
            return d.tz("UTC").format("ddd D MMMM YYYY HH:mm:ss.SSS") + " UTC";
        } else {
            throw new OperationError("无效单位");
        }
    }

}

export default FromUNIXTimestamp;
