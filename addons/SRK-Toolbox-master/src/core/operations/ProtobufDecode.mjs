/**
 * @author GCHQ Contributor [3]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import Protobuf from "../lib/Protobuf.mjs";

/**
 * Protobuf Decode operation
 */
class ProtobufDecode extends Operation {

    /**
     * ProtobufDecode constructor
     */
    constructor() {
        super();

        this.name = "Protobuf解码";
        this.module = "Protobuf";
        this.description = "将Protobuf编码的数据解码为JSON表示，使用字段数值作为字段key。<br><br>如果指定了.proto模式文件，数据将会引用模式文件内容进行解码。只会解码一个消息实例。<br><br><u>显示未知字段</u><br>当指定了模式文件时，如果输入数据在模式文件中没有定义，勾选此选项强行显示这些数据。<br><br><u>显示类型</u><br>在字段名称旁边显示其类型。对于未定义的字段，显示其Wire Type和示例类型。";
        this.infoURL = "https://wikipedia.org/wiki/Protocol_Buffers";
        this.inputType = "ArrayBuffer";
        this.outputType = "JSON";
        this.args = [
            {
                name: "模式文件（Schema，.proto文本）",
                type: "text",
                value: "",
                rows: 8,
                hint: "可以直接拖放文件到此位置"
            },
            {
                name: "显示未知字段",
                type: "boolean",
                value: false
            },
            {
                name: "显示类型",
                type: "boolean",
                value: false
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {JSON}
     */
    run(input, args) {
        input = new Uint8Array(input);
        try {
            return Protobuf.decode(input, args);
        } catch (err) {
            throw new OperationError(err);
        }
    }

}

export default ProtobufDecode;
