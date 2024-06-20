/**
 * @author h345983745 []
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import Stream from "../lib/Stream.mjs";
import {toHexFast, fromHex} from "../lib/Hex.mjs";
import {objToTable} from "../lib/Protocol.mjs";
import Utils from "../Utils.mjs";
import OperationError from "../errors/OperationError.mjs";

/**
 * Parse UDP operation
 */
class ParseUDP extends Operation {

    /**
     * ParseUDP constructor
     */
    constructor() {
        super();

        this.name = "解析UDP";
        this.module = "Default";
        this.description = "解析UDP首部和载荷（如果有）。";
        this.infoURL = "https://wikipedia.org/wiki/User_Datagram_Protocol";
        this.inputType = "string";
        this.outputType = "json";
        this.presentType = "html";
        this.args = [
            {
                name: "输入格式",
                type: "option",
                value: ["十六进制", "原始"]
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {Object}
     */
    run(input, args) {
        const format = args[0];

        if (format === "十六进制") {
            input = fromHex(input);
        } else if (format === "原始") {
            input = Utils.strToArrayBuffer(input);
        } else {
            throw new OperationError("未知的输入格式");
        }

        const s = new Stream(new Uint8Array(input));
        if (s.length < 8) {
            throw new OperationError("UDP首部需要至少8字节。");
        }

        // Parse Header
        const UDPPacket = {
            "来源连接端口": s.readInt(2),
            "目的连接端口": s.readInt(2),
            "长度": s.readInt(2),
            "校验和": "0x" + toHexFast(s.getBytes(2))
        };
        // Parse data if present
        if (s.hasMore()) {
            UDPPacket.数据 = "0x" + toHexFast(s.getBytes(UDPPacket.长度 - 8));
        }

        return UDPPacket;
    }

    /**
     * Displays the UDP Packet in a tabular style
     * @param {Object} data
     * @returns {html}
     */
    present(data) {
        return objToTable(data);
    }

}


export default ParseUDP;
