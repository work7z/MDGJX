/**
 * @author tcode2k16 [tcode2k16@gmail.com]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import Utils from "../Utils.mjs";
import ieee754 from "ieee754";
import {DELIM_OPTIONS} from "../lib/Delim.mjs";

/**
 * To Float operation
 */
class ToFloat extends Operation {

    /**
     * ToFloat constructor
     */
    constructor() {
        super();

        this.name = "字符转浮点数";
        this.module = "Default";
        this.description = "转换为 IEEE754 浮点数";
        this.infoURL = "https://wikipedia.org/wiki/IEEE_754";
        this.inputType = "byteArray";
        this.outputType = "string";
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
     * @param {byteArray} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [endianness, size, delimiterName] = args;
        const delim = Utils.charRep(delimiterName || "空格");
        const byteSize = size === "Double (8字节)" ? 8 : 4;
        const isLE = endianness === "小端序";
        const mLen = byteSize === 4 ? 23 : 52;

        if (input.length % byteSize !== 0) {
            throw new OperationError(`输入长度不是 ${byteSize} 字节的倍数`);
        }

        const output = [];
        for (let i = 0; i < input.length; i+=byteSize) {
            output.push(ieee754.read(input, i, isLE, mLen, byteSize));
        }
        return output.join(delim);
    }

}

export default ToFloat;
