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
 * Rison Encode operation
 */
class RisonEncode extends Operation {

    /**
     * RisonEncode constructor
     */
    constructor() {
        super();

        this.name = "Rison编码";
        this.module = "Encodings";
        this.description = "Rison是一种紧凑的数据序列化格式，专门为能在URI中使用进行了优化。Rison在JSON的基础上进行了少量改进，使得序列化数据在URI编码后看起来十分直观。Rison表示的数据结构和JSON是一致的，因此数据可以在两种格式间无损互转。";
        this.infoURL = "https://github.com/Nanonid/rison";
        this.inputType = "Object";
        this.outputType = "string";
        this.args = [
            {
                name: "编码选项",
                type: "Option",
                value: ["普通编码", "编码为对象（O-Rison）", "编码为数组（A-Rison）", "编码为URI"]
            },
        ];
    }

    /**
     * @param {Object} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [encodeOption] = args;
        switch (encodeOption) {
            case "普通编码":
                return rison.encode(input);
            case "编码为对象（O-Rison）":
                return rison.encode_object(input);
            case "编码为数组（A-Rison）":
                return rison.encode_array(input);
            case "编码为URI":
                return rison.encode_uri(input);
            default:
                throw new OperationError("无效的编码选项");
        }
    }
}

export default RisonEncode;
