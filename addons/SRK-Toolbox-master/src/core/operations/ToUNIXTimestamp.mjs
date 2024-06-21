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
 * To UNIX Timestamp operation
 */
class ToUNIXTimestamp extends Operation {

    /**
     * ToUNIXTimestamp constructor
     */
    constructor() {
        super();

        this.name = "转换到UNIX时间戳";
        this.module = "Default";
        this.description = "解析DateTime字符串（UTC时区）并返回对应的UNIX时间戳。<br><br>例： <code>Mon 1 January 2001 11:00:00</code> 转换为 <code>978346800</code><br><br>UNIX时间，或称POSIX时间是UNIX或类UNIX系统使用的时间表示方式：从UTC1970年1月1日0时0分0秒起至现在的总秒数，不考虑闰秒。";
        this.infoURL = "https://wikipedia.org/wiki/Unix_time";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "单位",
                "type": "option",
                "value": UNITS
            },
            {
                "name": "当作UTC时间",
                "type": "boolean",
                "value": true
            },
            {
                "name": "显示解析后的DateTime",
                "type": "boolean",
                "value": true
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     *
     * @throws {OperationError} if unit unrecognised
     */
    run(input, args) {
        const [units, treatAsUTC, showDateTime] = args,
            d = treatAsUTC ? moment.utc(input) : moment(input);

        let result = "";

        if (units === "秒 (s)") {
            result = d.unix();
        } else if (units === "毫秒 (ms)") {
            result = d.valueOf();
        } else if (units === "微秒 (μs)") {
            result = d.valueOf() * 1000;
        } else if (units === "纳秒 (ns)") {
            result = d.valueOf() * 1000000;
        } else {
            throw new OperationError("无效单位");
        }

        return showDateTime ? `${result} (${d.tz("UTC").format("ddd D MMMM YYYY HH:mm:ss")} UTC)` : result.toString();
    }

}

export default ToUNIXTimestamp;
