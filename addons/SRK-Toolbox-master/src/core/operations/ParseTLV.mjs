/**
 * @author gchq77703 []
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import TLVParser from "../lib/TLVParser.mjs";
import OperationError from "../errors/OperationError.mjs";

/**
 * Parse TLV operation
 */
class ParseTLV extends Operation {

    /**
     * ParseTLV constructor
     */
    constructor() {
        super();

        this.name = "解析TLV";
        this.module = "Default";
        this.description = "把Type-Length-Value (TLV)编码的字符串转换为JSON对象。可选包含一个 <code>Key</code> / <code>Type</code> 字段。 <br><br>标签： Key-Length-Value, KLV, Length-Value, LV";
        this.infoURL = "https://wikipedia.org/wiki/Type-length-value";
        this.inputType = "ArrayBuffer";
        this.outputType = "JSON";
        this.args = [
            {
                name: "Type/Key大小",
                type: "number",
                value: 1
            },
            {
                name: "Length大小",
                type: "number",
                value: 1
            },
            {
                name: "使用BER",
                type: "boolean",
                value: false
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [bytesInKey, bytesInLength, basicEncodingRules] = args;
        input = new Uint8Array(input);

        if (bytesInKey <= 0 && bytesInLength <= 0)
            throw new OperationError("Type或Length大小必须大于0");

        const tlv = new TLVParser(input, { bytesInLength, basicEncodingRules });

        const data = [];

        while (!tlv.atEnd()) {
            const key = bytesInKey ? tlv.getValue(bytesInKey) : undefined;
            const length = tlv.getLength();
            const value = tlv.getValue(length);

            data.push({ key, length, value });
        }

        return data;
    }

}

export default ParseTLV;
