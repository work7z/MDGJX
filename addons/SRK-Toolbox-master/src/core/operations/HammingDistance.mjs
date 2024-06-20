/**
 * @author GCHQ Contributor [2]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";
import {fromHex} from "../lib/Hex.mjs";
import OperationError from "../errors/OperationError.mjs";

/**
 * Hamming Distance operation
 */
class HammingDistance extends Operation {

    /**
     * HammingDistance constructor
     */
    constructor() {
        super();

        this.name = "汉明距离";
        this.module = "Default";
        this.description = "在信息论中，两个等长字符串之间的汉明距离（英语：Hamming distance）是两个字符串对应位置的不同字符的个数。换句话说，它就是将一个字符串变换成另外一个字符串所需要替换的字符个数。";
        this.infoURL = "https://wikipedia.org/wiki/Hamming_distance";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "分隔符",
                "type": "binaryShortString",
                "value": "\\n\\n"
            },
            {
                "name": "单位",
                "type": "option",
                "value": ["字节", "位"]
            },
            {
                "name": "输入格式",
                "type": "option",
                "value": ["原始字符串", "十六进制"]
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const delim = args[0],
            byByte = args[1] === "字节",
            inputType = args[2],
            samples = input.split(delim);

        if (samples.length !== 2) {
            throw new OperationError("错误：计算汉明距离需要两个字符串，请确保输入按照给定分隔符的两个字符串。");
        }

        if (samples[0].length !== samples[1].length) {
            throw new OperationError("错误：两个字符串需要等长。");
        }

        if (inputType === "十六进制") {
            samples[0] = fromHex(samples[0]);
            samples[1] = fromHex(samples[1]);
        } else {
            samples[0] = new Uint8Array(Utils.strToArrayBuffer(samples[0]));
            samples[1] = new Uint8Array(Utils.strToArrayBuffer(samples[1]));
        }

        let dist = 0;

        for (let i = 0; i < samples[0].length; i++) {
            const lhs = samples[0][i],
                rhs = samples[1][i];

            if (byByte && lhs !== rhs) {
                dist++;
            } else if (!byByte) {
                let xord = lhs ^ rhs;

                while (xord) {
                    dist++;
                    xord &= xord - 1;
                }
            }
        }

        return dist.toString();
    }

}

export default HammingDistance;
