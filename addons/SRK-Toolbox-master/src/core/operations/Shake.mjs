/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import JSSHA3 from "js-sha3";

/**
 * Shake operation
 */
class Shake extends Operation {

    /**
     * Shake constructor
     */
    constructor() {
        super();

        this.name = "Shake";
        this.module = "Crypto";
        this.description = "Shake是SHA-3算法的一个可扩展输出函数（Extendable Output Function, XOF），Keccak系列算法之一，允许可变的输出长度。";
        this.infoURL = "https://wikipedia.org/wiki/SHA-3#Instances";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                "name": "容量（Capacity）",
                "type": "option",
                "value": ["256", "128"]
            },
            {
                "name": "长度",
                "type": "number",
                "value": 512
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const capacity = parseInt(args[0], 10),
            size = args[1];
        let algo;

        if (size < 0)
            throw new OperationError("长度必须大于0");

        switch (capacity) {
            case 128:
                algo = JSSHA3.shake128;
                break;
            case 256:
                algo = JSSHA3.shake256;
                break;
            default:
                throw new OperationError("无效长度");
        }

        return algo(input, size);
    }

}

export default Shake;
