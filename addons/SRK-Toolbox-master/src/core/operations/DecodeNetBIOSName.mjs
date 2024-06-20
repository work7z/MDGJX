/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2017
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";

/**
 * Decode NetBIOS Name operation
 */
class DecodeNetBIOSName extends Operation {

    /**
     * DecodeNetBIOSName constructor
     */
    constructor() {
        super();

        this.name = "NetBIOS名称解码";
        this.module = "Default";
        this.description = "在客户端NetBIOS界面看到的NetBIOS名称长度固定为16字节。在NetBIOS-over-TCP协议中，使用一种更长的表示形式。<br><br>编码分为两层。第一层编码把NetBIOS名称映射到域名。第二层编码把域名编码为一种“压缩后”的形式，用于和DNS沟通。<br><br>此操作用于对第一层编码进行解码。详细信息请参考RFC 1001。";
        this.infoURL = "https://wikipedia.org/wiki/NetBIOS";
        this.inputType = "byteArray";
        this.outputType = "byteArray";
        this.args = [
            {
                "name": "偏移量",
                "type": "number",
                "value": 65
            }
        ];
        this.checks = [
            {
                pattern:  "^\\s*\\S{32}$",
                flags:  "",
                args:   [65]
            }
        ];
    }

    /**
     * @param {byteArray} input
     * @param {Object[]} args
     * @returns {byteArray}
     */
    run(input, args) {
        const output = [],
            offset = args[0];

        if (input.length <= 32 && (input.length % 2) === 0) {
            for (let i = 0; i < input.length; i += 2) {
                output.push((((input[i] & 0xff) - offset) << 4) |
                            (((input[i + 1] & 0xff) - offset) & 0xf));
            }
            for (let i = output.length - 1; i > 0; i--) {
                if (output[i] === 32) output.splice(i, i);
                else break;
            }
        }

        return output;
    }

}

export default DecodeNetBIOSName;
