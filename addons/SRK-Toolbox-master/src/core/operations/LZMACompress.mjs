/**
 * @author Matt C [me@mitt.dev]
 * @copyright Crown Copyright 2022
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";

import { compress } from "@blu3r4y/lzma";
import {isWorkerEnvironment} from "../Utils.mjs";

/**
 * LZMA Compress operation
 */
class LZMACompress extends Operation {

    /**
     * LZMACompress constructor
     */
    constructor() {
        super();

        this.name = "LZMA压缩";
        this.module = "Compression";
        this.description = "使用Lempel\u2013Ziv\u2013Markov chain算法压缩数据。压缩模式指定压缩的速度与效率：1为最快但压缩率最低，9最慢但压缩率最高。";
        this.infoURL = "https://wikipedia.org/wiki/Lempel%E2%80%93Ziv%E2%80%93Markov_chain_algorithm";
        this.inputType = "ArrayBuffer";
        this.outputType = "ArrayBuffer";
        this.args = [
            {
                name: "压缩模式",
                type: "option",
                value: [
                    "1", "2", "3", "4", "5", "6", "7", "8", "9"
                ],
                "defaultIndex": 6
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {ArrayBuffer}
     */
    async run(input, args) {
        const mode = Number(args[0]);
        return new Promise((resolve, reject) => {
            compress(new Uint8Array(input), mode, (result, error) => {
                if (error) {
                    reject(new OperationError(`压缩失败： ${error.message}`));
                }
                // The compression returns as an Int8Array, but we can just get the unsigned data from the buffer
                resolve(new Int8Array(result).buffer);
            }, (percent) => {
                if (isWorkerEnvironment()) self.sendStatusMessage(`压缩输入数据： ${(percent*100).toFixed(2)}%`);
            });
        });
    }

}

export default LZMACompress;
