/**
 * @author Ge0rg3 [georgeomnet+cyberchef@gmail.com]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import Utils from "../Utils.mjs";
import { fromBinary } from "../lib/Binary.mjs";
import { isImage } from "../lib/FileType.mjs";
import jimp from "jimp";

/**
 * Extract LSB operation
 */
class ExtractLSB extends Operation {

    /**
     * ExtractLSB constructor
     */
    constructor() {
        super();

        this.name = "提取LSB";
        this.module = "Image";
        this.description = "提取图像每个像素的最低有效位（Least Significant Bit, LSB）数据。常见于图像隐写术用于隐藏数据。";
        this.infoURL = "https://wikipedia.org/wiki/Bit_numbering#Least_significant_bit_in_digital_steganography";
        this.inputType = "ArrayBuffer";
        this.outputType = "byteArray";
        this.args = [
            {
                name: "通道 #1",
                type: "option",
                value: COLOUR_OPTIONS,
            },
            {
                name: "通道 #2",
                type: "option",
                value: ["", ...COLOUR_OPTIONS],
            },
            {
                name: "通道 #3",
                type: "option",
                value: ["", ...COLOUR_OPTIONS],
            },
            {
                name: "通道 #4",
                type: "option",
                value: ["", ...COLOUR_OPTIONS],
            },
            {
                name: "像素顺序",
                type: "option",
                value: ["按行", "按列"],
            },
            {
                name: "位",
                type: "number",
                value: 0
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {byteArray}
     */
    async run(input, args) {
        if (!isImage(input)) throw new OperationError("请输入合法的图像文件。");

        const bit = 7 - args.pop(),
            pixelOrder = args.pop(),
            colours = args.filter(option => option !== "").map(option => COLOUR_OPTIONS.indexOf(option)),
            parsedImage = await jimp.read(input),
            width = parsedImage.bitmap.width,
            height = parsedImage.bitmap.height,
            rgba = parsedImage.bitmap.data;

        if (bit < 0 || bit > 7) {
            throw new OperationError("错误：位参数只能是 0 到 7");
        }

        let i, combinedBinary = "";

        if (pixelOrder === "按行") {
            for (i = 0; i < rgba.length; i += 4) {
                for (const colour of colours) {
                    combinedBinary += Utils.bin(rgba[i + colour])[bit];
                }
            }
        } else {
            let rowWidth;
            const pixelWidth = width * 4;
            for (let col = 0; col < width; col++) {
                for (let row = 0; row < height; row++) {
                    rowWidth = row * pixelWidth;
                    for (const colour of colours) {
                        i = rowWidth + (col + colour * 4);
                        combinedBinary += Utils.bin(rgba[i])[bit];
                    }
                }
            }
        }

        return fromBinary(combinedBinary);
    }

}

const COLOUR_OPTIONS = ["R", "G", "B", "A"];

export default ExtractLSB;
