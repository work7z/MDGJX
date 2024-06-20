/**
 * @author sg5506844 [sg5506844@gmail.com]
 * @copyright Crown Copyright 2021
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import rison from "rison";

/**
 * Rison Decode operation
 */
class RisonDecode extends Operation {

    /**
     * RisonDecode constructor
     */
    constructor() {
        super();

        this.name = "Rison解码";
        this.module = "Encodings";
        this.description = "Rison是一种紧凑的数据序列化格式，专门为能在URI中使用进行了优化。Rison在JSON的基础上进行了少量改进，使得序列化数据在URI编码后看起来十分直观。Rison表示的数据结构和JSON是一致的，因此数据可以在两种格式间无损互转。";
        this.infoURL = "https://github.com/Nanonid/rison";
        this.inputType = "string";
        this.outputType = "Object";
        this.args = [
            {
                name: "解码选项",
                type: "Option",
                value: ["普通解码", "解码为对象（O-Rison）", "解码为数组（A-Rison）"]
            },
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {Object}
     */
    run(input, args) {
        const [decodeOption] = args;
        switch (decodeOption) {
            case "普通解码":
                return rison.decode(input);
            case "解码为对象（O-Rison）":
                return rison.decode_object(input);
            case "解码为数组（A-Rison）":
                return rison.decode_array(input);
            default:
                throw new OperationError("无效的解码选项");
        }
    }
}

export default RisonDecode;
