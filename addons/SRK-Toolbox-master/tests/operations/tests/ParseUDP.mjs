/**
 * Parse UDP tests.
 *
 * @author h345983745
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */
import TestRegister from "../../lib/TestRegister.mjs";

TestRegister.addTests([
    {
        name: "Parse UDP: No Data - JSON",
        input: "04 89 00 35 00 2c 01 01",
        expectedOutput: "{\"来源连接端口\":1161,\"目的连接端口\":53,\"长度\":44,\"校验和\":\"0x0101\"}",
        recipeConfig: [
            {
                op: "解析UDP",
                args: ["十六进制"],
            },
            {
                op: "JSON压缩",
                args: [],
            },
        ],
    }, {
        name: "Parse UDP: With Data - JSON",
        input: "04 89 00 35 00 2c 01 01 02 02",
        expectedOutput: "{\"来源连接端口\":1161,\"目的连接端口\":53,\"长度\":44,\"校验和\":\"0x0101\",\"数据\":\"0x0202\"}",
        recipeConfig: [
            {
                op: "解析UDP",
                args: ["十六进制"],
            },
            {
                op: "JSON压缩",
                args: [],
            },
        ],
    },
    {
        name: "Parse UDP: Not Enough Bytes",
        input: "04 89 00",
        expectedOutput: "UDP首部需要至少8字节。",
        recipeConfig: [
            {
                op: "解析UDP",
                args: ["十六进制"],
            },
            {
                op: "JSON压缩",
                args: [],
            },
        ],
    }
]);
