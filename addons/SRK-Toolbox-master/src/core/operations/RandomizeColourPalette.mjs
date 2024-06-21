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
import { runHash } from "../lib/Hash.mjs";
import { toBase64 } from "../lib/Base64.mjs";
import jimp from "jimp";

/**
 * Randomize Colour Palette operation
 */
class RandomizeColourPalette extends Operation {

    /**
     * RandomizeColourPalette constructor
     */
    constructor() {
        super();

        this.name = "色板随机化";
        this.module = "Image";
        this.description = "将给定图片中的每种颜色单独进行随机化处理。通常用于显示使用非常相近颜色隐写的文字或符号。";
        this.infoURL = "https://wikipedia.org/wiki/Indexed_color";
        this.inputType = "ArrayBuffer";
        this.outputType = "ArrayBuffer";
        this.presentType = "html";
        this.args = [
            {
                name: "随机数种子",
                type: "string",
                value: ""
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

        const seed = args[0] || (Math.random().toString().substr(2)),
            parsedImage = await jimp.read(input),
            width = parsedImage.bitmap.width,
            height = parsedImage.bitmap.height;

        let rgbString, rgbHash, rgbHex;

        parsedImage.scan(0, 0, width, height, function(x, y, idx) {
            rgbString = this.bitmap.data.slice(idx, idx+3).join(".");
            rgbHash = runHash("md5", Utils.strToArrayBuffer(seed + rgbString));
            rgbHex = rgbHash.substr(0, 6) + "ff";
            parsedImage.setPixelColor(parseInt(rgbHex, 16), x, y);
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

export default RandomizeColourPalette;
