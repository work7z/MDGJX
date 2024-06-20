/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import { search } from "../lib/Extract.mjs";
import { ipSort } from "../lib/Sort.mjs";

/**
 * Extract IP addresses operation
 */
class ExtractIPAddresses extends Operation {

    /**
     * ExtractIPAddresses constructor
     */
    constructor() {
        super();

        this.name = "提取IP地址";
        this.module = "Regex";
        this.description = "提取所有的IPv4和IPv6地址。<br><br>警告：类似 <code>710.65.0.456</code> 这样的非有效IP地址输入也会匹配出 <code>10.65.0.45</code>，务必确认输入文本正确！";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                name: "IPv4",
                type: "boolean",
                value: true
            },
            {
                name: "IPv6",
                type: "boolean",
                value: false
            },
            {
                name: "移除内网IPv4地址",
                type: "boolean",
                value: false
            },
            {
                name: "显示总数",
                type: "boolean",
                value: false
            },
            {
                name: "排序",
                type: "boolean",
                value: false
            },
            {
                name: "去重",
                type: "boolean",
                value: false
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [includeIpv4, includeIpv6, removeLocal, displayTotal, sort, unique] = args,
            ipv4 = "(?:(?:\\d|[01]?\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d|\\d)(?:\\/\\d{1,2})?",
            ipv6 = "((?=.*::)(?!.*::.+::)(::)?([\\dA-F]{1,4}:(:|\\b)|){5}|([\\dA-F]{1,4}:){6})(([\\dA-F]{1,4}((?!\\3)::|:\\b|(?![\\dA-F])))|(?!\\2\\3)){2}";
        let ips  = "";

        if (includeIpv4 && includeIpv6) {
            ips = ipv4 + "|" + ipv6;
        } else if (includeIpv4) {
            ips = ipv4;
        } else if (includeIpv6) {
            ips = ipv6;
        }

        if (!ips) return "";

        const regex = new RegExp(ips, "ig");

        const ten = "10\\..+",
            oneninetwo = "192\\.168\\..+",
            oneseventwo = "172\\.(?:1[6-9]|2\\d|3[01])\\..+",
            onetwoseven = "127\\..+",
            removeRegex = new RegExp("^(?:" + ten + "|" + oneninetwo +
                "|" + oneseventwo + "|" + onetwoseven + ")");

        const results = search(
            input,
            regex,
            removeLocal ? removeRegex : null,
            sort ? ipSort : null,
            unique
        );

        if (displayTotal) {
            return `总计： ${results.length}\n\n${results.join("\n")}`;
        } else {
            return results.join("\n");
        }
    }

}

export default ExtractIPAddresses;
