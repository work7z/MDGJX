/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";

/**
 * Format MAC addresses operation
 */
class FormatMACAddresses extends Operation {

    /**
     * FormatMACAddresses constructor
     */
    constructor() {
        super();

        this.name = "MAC地址格式化";
        this.module = "Default";
        this.description = "将给定的MAC地址用多种不同格式显示。<br><br>列表需要用回车、空格或逗号分隔。<br><br>警告：无法验证MAC地址的有效性。";
        this.infoURL = "https://wikipedia.org/wiki/MAC_address#Notational_conventions";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "输出大小写",
                "type": "option",
                "value": ["大小写", "仅大写", "仅小写"]
            },
            {
                "name": "无分隔",
                "type": "boolean",
                "value": true
            },
            {
                "name": "横杠分隔",
                "type": "boolean",
                "value": true
            },
            {
                "name": "冒号分隔",
                "type": "boolean",
                "value": true
            },
            {
                "name": "思科Style",
                "type": "boolean",
                "value": false
            },
            {
                "name": "IPv6接口ID",
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
        if (!input) return "";

        const [
                outputCase,
                noDelim,
                dashDelim,
                colonDelim,
                ciscoStyle,
                ipv6IntID
            ] = args,
            outputList = [],
            macs = input.toLowerCase().split(/[,\s\r\n]+/);

        macs.forEach(function(mac) {
            const cleanMac = mac.replace(/[:.-]+/g, ""),
                macHyphen = cleanMac.replace(/(.{2}(?=.))/g, "$1-"),
                macColon = cleanMac.replace(/(.{2}(?=.))/g, "$1:"),
                macCisco = cleanMac.replace(/(.{4}(?=.))/g, "$1.");
            let macIPv6 = cleanMac.slice(0, 6) + "fffe" + cleanMac.slice(6);

            macIPv6 = macIPv6.replace(/(.{4}(?=.))/g, "$1:");
            let bite = parseInt(macIPv6.slice(0, 2), 16) ^ 2;
            bite = bite.toString(16).padStart(2, "0");
            macIPv6 = bite + macIPv6.slice(2);

            if (outputCase === "仅小写") {
                if (noDelim) outputList.push(cleanMac);
                if (dashDelim) outputList.push(macHyphen);
                if (colonDelim) outputList.push(macColon);
                if (ciscoStyle) outputList.push(macCisco);
                if (ipv6IntID) outputList.push(macIPv6);
            } else if (outputCase === "仅大写") {
                if (noDelim) outputList.push(cleanMac.toUpperCase());
                if (dashDelim) outputList.push(macHyphen.toUpperCase());
                if (colonDelim) outputList.push(macColon.toUpperCase());
                if (ciscoStyle) outputList.push(macCisco.toUpperCase());
                if (ipv6IntID) outputList.push(macIPv6.toUpperCase());
            } else {
                if (noDelim) outputList.push(cleanMac, cleanMac.toUpperCase());
                if (dashDelim) outputList.push(macHyphen, macHyphen.toUpperCase());
                if (colonDelim) outputList.push(macColon, macColon.toUpperCase());
                if (ciscoStyle) outputList.push(macCisco, macCisco.toUpperCase());
                if (ipv6IntID) outputList.push(macIPv6, macIPv6.toUpperCase());
            }

            outputList.push(
                "" // Empty line to delimit groups
            );
        });

        // Return the data as a string
        return outputList.join("\n");
    }

}

export default FormatMACAddresses;
