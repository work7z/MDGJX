/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import NodeMD6 from "node-md6";

/**
 * MD6 operation
 */
class MD6 extends Operation {

    /**
     * MD6 constructor
     */
    constructor() {
        super();

        this.name = "MD6";
        this.module = "Crypto";
        this.description = "MD6消息摘要算法是一个密码散列函数。它使用默克尔树形式的结构，允许对很长的输入并行进行大量散列计算。";
        this.infoURL = "https://wikipedia.org/wiki/MD6";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "长度",
                "type": "number",
                "value": 256
            },
            {
                "name": "层次（Level）",
                "type": "number",
                "value": 64
            },
            {
                "name": "Key",
                "type": "string",
                "value": ""
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [size, levels, key] = args;

        if (size < 0 || size > 512)
            throw new OperationError("长度必须位于 0 和 512 之间");
        if (levels < 0)
            throw new OperationError("层次必须大于 0");

        return NodeMD6.getHashOfText(input, size, key, levels);
    }

}

export default MD6;
