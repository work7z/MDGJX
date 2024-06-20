/**
 * @author n1073645 [n1073645@gmail.com]
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2020
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import {UNITS} from "../lib/DateTime.mjs";

/**
 * Get Time operation
 */
class GetTime extends Operation {

    /**
     * GetTime constructor
     */
    constructor() {
        super();

        this.name = "获取当前时间";
        this.module = "Default";
        this.description = "获取当前时间的UNIX时间戳 (从1970-01-01 00:00:00 UTC开始的秒数)。使用W3C High Resolution Time API。";
        this.infoURL = "https://wikipedia.org/wiki/Unix_time";
        this.inputType = "string";
        this.outputType = "number";
        this.args = [
            {
                name: "粒度",
                type: "option",
                value: UNITS
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {number}
     */
    run(input, args) {
        const nowMs = (performance.timeOrigin + performance.now()),
            granularity = args[0];

        switch (granularity) {
            case "纳秒 (ns)":
                return Math.round(nowMs * 1000 * 1000);
            case "微秒 (μs)":
                return Math.round(nowMs * 1000);
            case "毫秒 (ms)":
                return Math.round(nowMs);
            case "秒 (s)":
                return Math.round(nowMs / 1000);
            default:
                throw new OperationError("无效的单位： " + granularity);
        }
    }

}

export default GetTime;
