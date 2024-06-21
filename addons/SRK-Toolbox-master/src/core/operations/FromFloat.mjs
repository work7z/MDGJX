/**
 * @author tcode2k16 [tcode2k16@gmail.com]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";
import ieee754 from "ieee754";
import {DELIM_OPTIONS} from "../lib/Delim.mjs";

/**
 * From Float operation
 */
class FromFloat extends Operation {

    /**
     * FromFloat constructor
     */
    constructor() {
        super();

        this.name = "浮点数转字符";
        this.module = "Default";
        this.description = "将 IEEE754 浮点数转换为字符";
        this.infoURL = "https://wikipedia.org/wiki/IEEE_754";
        this.inputType = "string";
        this.outputType = "byteArray";
        this.args = [
            {
                "name": "端序",
                "type": "option",
                "value": [
                    "大端序",
                    "小端序"
                ]
            },
            {
                "name": "类型",
                "type": "option",
                "value": [
                    "Float (4字节)",
                    "Double (8字节)"
                ]
            },
            {
                "name": "分隔符",
                "type": "option",
                "value": DELIM_OPTIONS
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {byteArray}
     */
    run(input, args) {
        if (input.length === 0) return [];

        const [endianness, size, delimiterName] = args;
        const delim = Utils.charRep(delimiterName || "空格");
        const byteSize = size === "Double (8字节)" ? 8 : 4;
        const isLE = endianness === "小端序";
        const mLen = byteSize === 4 ? 23 : 52;
        const floats = input.split(delim);

        const output = new Array(floats.length*byteSize);
        for (let i = 0; i < floats.length; i++) {
            ieee754.write(output, parseFloat(floats[i]), i*byteSize, isLE, mLen, byteSize);
        }
        return output;
    }

}

export default FromFloat;
