/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import UAParser from "ua-parser-js";

/**
 * Parse User Agent operation
 */
class ParseUserAgent extends Operation {

    /**
     * ParseUserAgent constructor
     */
    constructor() {
        super();

        this.name = "解析User Agent";
        this.module = "UserAgent";
        this.description = "尝试对User-Agent字符串中的内容进行解析。";
        this.infoURL = "https://wikipedia.org/wiki/User_agent";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [];
        this.checks = [
            {
                pattern:  "^(User-Agent:|Mozilla\\/)[^\\n\\r]+\\s*$",
                flags:  "i",
                args:   []
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const ua = UAParser(input);
        return `浏览器
    名称: ${ua.browser.name || "未知"}
    版本: ${ua.browser.version || "未知"}
设备
    型号: ${ua.device.model || "未知"}
    类型: ${ua.device.type || "未知"}
    厂商: ${ua.device.vendor || "未知"}
内核
    名称: ${ua.engine.name || "未知"}
    版本: ${ua.engine.version || "未知"}
操作系统
    名称: ${ua.os.name || "未知"}
    版本: ${ua.os.version || "未知"}
CPU
    架构: ${ua.cpu.architecture || "未知"}`;
    }

}

export default ParseUserAgent;
