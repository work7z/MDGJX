/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";

/**
 * To Base operation
 */
class ToBase extends Operation {

    /**
     * ToBase constructor
     */
    constructor() {
        super();

        this.name = "十进制数转其它进制";
        this.module = "Default";
        this.description = "把十进制数转换成其它给定进制";
        this.infoURL = "https://wikipedia.org/wiki/Radix";
        this.inputType = "BigNumber";
        this.outputType = "string";
        this.args = [
            {
                "name": "进制",
                "type": "number",
                "value": 36
            }
        ];
    }

    /**
     * @param {BigNumber} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        if (!input) {
            throw new OperationError("错误：输入必须是数字");
        }
        const radix = args[0];
        if (radix < 2 || radix > 36) {
            throw new OperationError("错误：进制必须在2~36之间");
        }
        return input.toString(radix);
    }

}

export default ToBase;
