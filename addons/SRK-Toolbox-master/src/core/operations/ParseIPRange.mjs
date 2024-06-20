/**
 * @author n1474335 [n1474335@gmail.com]
 * @author Klaxon [klaxon@veyr.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import {ipv4CidrRange, ipv4HyphenatedRange, ipv4ListedRange, ipv6CidrRange, ipv6HyphenatedRange, ipv6ListedRange} from "../lib/IP.mjs";

/**
 * Parse IP range operation
 */
class ParseIPRange extends Operation {

    /**
     * ParseIPRange constructor
     */
    constructor() {
        super();

        this.name = "解析IP范围";
        this.module = "Default";
        this.description = "输入 CIDR 范围 （例： <code>10.0.0.0/24</code>） 、连字符表示的范围 （例： <code>10.0.0.0 - 10.0.1.0</code>）或一系列的IP和CIDR（回车分隔），此操作会解析输入IP范围的网络信息与列出所有可能的IP地址。<br><br>支持IPv6但不会列出详细地址。";
        this.infoURL = "https://wikipedia.org/wiki/Subnetwork";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "包括网络信息",
                "type": "boolean",
                "value": true
            },
            {
                "name": "列出所有IP地址",
                "type": "boolean",
                "value": true
            },
            {
                "name": "允许大数据量查询",
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
            includeNetworkInfo,
            enumerateAddresses,
            allowLargeList
        ] = args;

        // Check what type of input we are looking at
        const ipv4CidrRegex = /^\s*((?:\d{1,3}\.){3}\d{1,3})\/(\d\d?)\s*$/,
            ipv4RangeRegex = /^\s*((?:\d{1,3}\.){3}\d{1,3})\s*-\s*((?:\d{1,3}\.){3}\d{1,3})\s*$/,
            ipv4ListRegex = /^\s*(((?:\d{1,3}\.){3}\d{1,3})(\/(\d\d?))?(\n|$)(\n*))+\s*$/,
            ipv6CidrRegex = /^\s*(((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\4)::|:\b|(?![\dA-F])))|(?!\3\4)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4}))\/(\d\d?\d?)\s*$/i,
            ipv6RangeRegex = /^\s*(((?=.*::)(?!.*::[^-]+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\4)::|:\b|(?![\dA-F])))|(?!\3\4)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4}))\s*-\s*(((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\17)::|:\b|(?![\dA-F])))|(?!\16\17)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4}))\s*$/i,
            ipv6ListRegex = /^\s*((((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\4)::|:\b|(?![\dA-F])))|(?!\3\4)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4}))(\/(\d\d?\d?))?(\n|$)(\n*))+\s*$/i;
        let match;

        if ((match = ipv4CidrRegex.exec(input))) {
            return ipv4CidrRange(match, includeNetworkInfo, enumerateAddresses, allowLargeList);
        } else if ((match = ipv4RangeRegex.exec(input))) {
            return ipv4HyphenatedRange(match, includeNetworkInfo, enumerateAddresses, allowLargeList);
        } else if ((match = ipv4ListRegex.exec(input))) {
            return ipv4ListedRange(match, includeNetworkInfo, enumerateAddresses, allowLargeList);
        } else if ((match = ipv6CidrRegex.exec(input))) {
            return ipv6CidrRange(match, includeNetworkInfo);
        } else if ((match = ipv6RangeRegex.exec(input))) {
            return ipv6HyphenatedRange(match, includeNetworkInfo);
        } else if ((match = ipv6ListRegex.exec(input))) {
            return ipv6ListedRange(match, includeNetworkInfo);
        } else {
            throw new OperationError("无效的输入。\n\n此操作支持CIDR范围（例：10.0.0.0/24）或连字符表示的范围（例：10.0.0.0 - 10.0.1.0）。同时支持IPv6。");
        }
    }

}


export default ParseIPRange;
