/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import Utils from "../Utils.mjs";
import {fromHex} from "../lib/Hex.mjs";

/**
 * Change IP format operation
 */
class ChangeIPFormat extends Operation {

    /**
     * ChangeIPFormat constructor
     */
    constructor() {
        super();

        this.name = "IP地址格式转换";
        this.module = "Default";
        this.description = "转换IP地址的表示方法。例： <code>172.20.23.54</code> 转换成 <code>ac141736</code>";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "输入格式",
                "type": "option",
                "value": ["十进制用点分隔", "十进制", "八进制", "十六进制"]
            },
            {
                "name": "输出格式",
                "type": "option",
                "value": ["十进制用点分隔", "十进制", "八进制", "十六进制"]
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [inFormat, outFormat] = args,
            lines = input.split("\n");
        let output = "",
            j = 0;

        for (let i = 0; i < lines.length; i++) {
            if (lines[i] === "") continue;
            let baIp = [];
            let octets;

            if (inFormat === outFormat) {
                output += lines[i] + "\n";
                continue;
            }

            // Convert to byte array IP from input format
            switch (inFormat) {
                case "十进制用点分隔":
                    octets = lines[i].split(".");
                    for (j = 0; j < octets.length; j++) {
                        baIp.push(parseInt(octets[j], 10));
                    }
                    break;
                case "十进制":
                    baIp = this.fromNumber(lines[i].toString(), 10);
                    break;
                case "八进制":
                    baIp = this.fromNumber(lines[i].toString(), 8);
                    break;
                case "十六进制":
                    baIp = fromHex(lines[i]);
                    break;
                default:
                    throw new OperationError("不支持输入的IP格式");
            }

            let ddIp;
            let decIp;
            let hexIp;

            // Convert byte array IP to output format
            switch (outFormat) {
                case "十进制用点分隔":
                    ddIp = "";
                    for (j = 0; j < baIp.length; j++) {
                        ddIp += baIp[j] + ".";
                    }
                    output += ddIp.slice(0, ddIp.length-1) + "\n";
                    break;
                case "十进制":
                    decIp = ((baIp[0] << 24) | (baIp[1] << 16) | (baIp[2] << 8) | baIp[3]) >>> 0;
                    output += decIp.toString() + "\n";
                    break;
                case "八进制":
                    decIp = ((baIp[0] << 24) | (baIp[1] << 16) | (baIp[2] << 8) | baIp[3]) >>> 0;
                    output += "0" + decIp.toString(8) + "\n";
                    break;
                case "十六进制":
                    hexIp = "";
                    for (j = 0; j < baIp.length; j++) {
                        hexIp += Utils.hex(baIp[j]);
                    }
                    output += hexIp + "\n";
                    break;
                default:
                    throw new OperationError("不支持的输出IP格式");
            }
        }

        return output.slice(0, output.length-1);
    }

    /**
     * Constructs an array of IP address octets from a numerical value.
     * @param {string} value The value of the IP address
     * @param {number} radix The numeral system to be used
     * @returns {number[]}
     */
    fromNumber(value, radix) {
        const decimal = parseInt(value, radix);
        const baIp = [];
        baIp.push(decimal >> 24 & 255);
        baIp.push(decimal >> 16 & 255);
        baIp.push(decimal >> 8 & 255);
        baIp.push(decimal & 255);
        return baIp;
    }

}

export default ChangeIPFormat;
