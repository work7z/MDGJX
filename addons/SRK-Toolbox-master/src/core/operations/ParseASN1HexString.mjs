/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import r from "jsrsasign";
import Operation from "../Operation.mjs";

/**
 * Parse ASN.1 hex string operation
 */
class ParseASN1HexString extends Operation {

    /**
     * ParseASN1HexString constructor
     */
    constructor() {
        super();

        this.name = "解析ASN.1十六进制字符串";
        this.module = "PublicKey";
        this.description = "在电信和计算机网络领域，ASN.1（Abstract Syntax Notation One) 是一套标准，是描述数据的表示、编码、传输、解码的灵活的记法。<br><br>此操作可解析任意的ASN.1数据（必须为十六进制字符串，如果需要可以用“字符转十六进制”操作预处理）并展示结果树。";
        this.infoURL = "https://wikipedia.org/wiki/Abstract_Syntax_Notation_One";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "起始位置索引",
                "type": "number",
                "value": 0
            },
            {
                "name": "截断超过以下长度的八字节字符串",
                "type": "number",
                "value": 32
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [index, truncateLen] = args;
        return r.ASN1HEX.dump(input.replace(/\s/g, "").toLowerCase(), {
            "ommit_long_octet": truncateLen
        }, index);
    }

}

export default ParseASN1HexString;
