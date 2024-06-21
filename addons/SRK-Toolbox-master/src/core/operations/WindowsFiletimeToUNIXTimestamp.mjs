/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2017
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import BigNumber from "bignumber.js";
import OperationError from "../errors/OperationError.mjs";

/**
 * Windows Filetime to UNIX Timestamp operation
 */
class WindowsFiletimeToUNIXTimestamp extends Operation {

    /**
     * WindowsFiletimeToUNIXTimestamp constructor
     */
    constructor() {
        super();

        this.name = "Windows Filetime转UNIX时间戳";
        this.module = "Default";
        this.description = "将Windows Filetime值转换为UNIX时间戳。<br><br>Windows Filetime是对应从1601年1月1日（UTC）开始的以100纳秒为单位的64位数值。<br><br>UNIX 时间戳是对应从1970年1月1日（UTC）开始的以秒为单位的32位数值。<br><br>此操作也支持不同的UNIX时间单位如毫秒、微秒和纳秒。";
        this.infoURL = "https://msdn.microsoft.com/en-us/library/windows/desktop/ms724284(v=vs.85).aspx";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "输出单位",
                "type": "option",
                "value": ["秒 (s)", "毫秒 (ms)", "微秒 (μs)", "纳秒 (ns)"]
            },
            {
                "name": "输入格式",
                "type": "option",
                "value": ["十进制", "十六进制 (大端序)", "十六进制 (小端序)"]
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [units, format] = args;

        if (!input) return "";

        if (format === "Hex (小端序)") {
            // Swap endianness
            let result = "";
            if (input.length % 2 !== 0) {
                result += input.charAt(input.length - 1);
            }
            for (let i = input.length - input.length % 2 - 2; i >= 0; i -= 2) {
                result += input.charAt(i);
                result += input.charAt(i + 1);
            }
            input = result;
        }

        if (format.startsWith("十六进制")) {
            input = new BigNumber(input, 16);
        } else {
            input = new BigNumber(input);
        }

        input = input.minus(new BigNumber("116444736000000000"));

        if (units === "秒 (s)") {
            input = input.dividedBy(new BigNumber("10000000"));
        } else if (units === "毫秒 (ms)") {
            input = input.dividedBy(new BigNumber("10000"));
        } else if (units === "微秒 (μs)") {
            input = input.dividedBy(new BigNumber("10"));
        } else if (units === "纳秒 (ns)") {
            input = input.multipliedBy(new BigNumber("100"));
        } else {
            throw new OperationError("无效单位");
        }

        return input.toFixed();
    }

}

export default WindowsFiletimeToUNIXTimestamp;
