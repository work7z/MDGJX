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
import { isImage } from "../lib/FileType.mjs";
import { toBase64 } from "../lib/Base64.mjs";
import jimp from "jimp";

/**
 * View Bit Plane operation
 */
class ViewBitPlane extends Operation {

    /**
     * ViewBitPlane constructor
     */
    constructor() {
        super();

        this.name = "查看位平面";
        this.module = "Image";
        this.description = "提取并显示任何给定图像的位平面。每张图像显示原图像当中每个像素字节数据的给定一个位，通常用于图像隐写术。";
        this.infoURL = "https://wikipedia.org/wiki/Bit_plane";
        this.inputType = "ArrayBuffer";
        this.outputType = "ArrayBuffer";
        this.presentType = "html";
        this.args = [
            {
                name: "颜色",
                type: "option",
                value: COLOUR_OPTIONS
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
     * @returns {ArrayBuffer}
     */
    async run(input, args) {
        if (!isImage(input)) throw new OperationError("请输入合法的图像文件。");

        const [colour, bit] = args,
            parsedImage = await jimp.read(input),
            width = parsedImage.bitmap.width,
            height = parsedImage.bitmap.height,
            colourIndex = COLOUR_OPTIONS.indexOf(colour),
            bitIndex = 7-bit;

        if (bit < 0 || bit > 7) {
            throw new OperationError("错误：位参数只能是 0 到 7");
        }

        let pixel, bin, newPixelValue;

        parsedImage.scan(0, 0, width, height, function(x, y, idx) {
            pixel = this.bitmap.data[idx + colourIndex];
            bin = Utils.bin(pixel);
            newPixelValue = 255;

            if (bin.charAt(bitIndex) === "1") newPixelValue = 0;

            for (let i=0; i < 3; i++) {
                this.bitmap.data[idx + i] = newPixelValue;
            }
            this.bitmap.data[idx + 3] = 255;

        });

        const imageBuffer = await parsedImage.getBufferAsync(jimp.AUTO);

        return new Uint8Array(imageBuffer).buffer;
    }

    /**
     * Displays the extracted data as an image for web apps.
     * @param {ArrayBuffer} data
     * @returns {html}
     */
    present(data) {
        if (!data.byteLength) return "";
        const type = isImage(data);

        return `<img src="data:${type};base64,${toBase64(data)}">`;
    }

}

const COLOUR_OPTIONS = [
    "Red",
    "Green",
    "Blue",
    "Alpha"
];

export default ViewBitPlane;
