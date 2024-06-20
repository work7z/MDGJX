/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2022
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import "reflect-metadata"; // Required as a shim for the amf library
import { AMF0, AMF3 } from "@astronautlabs/amf";

/**
 * AMF Encode operation
 */
class AMFEncode extends Operation {

    /**
     * AMFEncode constructor
     */
    constructor() {
        super();

        this.name = "AMF编码";
        this.module = "Encodings";
        this.description = "Action Message Format (AMF) 是一种用于序列化对象图（例如ActionScript对象和XML）的二进制格式，通常用于Adobe Flash客户端与服务器（Flash Media Server或其它第三方替代品）的消息传递。";
        this.infoURL = "https://wikipedia.org/wiki/Action_Message_Format";
        this.inputType = "JSON";
        this.outputType = "ArrayBuffer";
        this.args = [
            {
                name: "格式",
                type: "option",
                value: ["AMF0", "AMF3"],
                defaultIndex: 1
            }
        ];
    }

    /**
     * @param {JSON} input
     * @param {Object[]} args
     * @returns {ArrayBuffer}
     */
    run(input, args) {
        const [format] = args;
        const handler = format === "AMF0" ? AMF0 : AMF3;
        const output = handler.Value.any(input).serialize();
        return output.buffer;
    }

}

export default AMFEncode;
