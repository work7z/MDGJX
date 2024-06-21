/**
 * @author Ge0rg3 [georgeomnet+cyberchef@gmail.com]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import { isImage } from "../lib/FileType.mjs";
import jimp from "jimp";

import {RGBA_DELIM_OPTIONS} from "../lib/Delim.mjs";

/**
 * Extract RGBA operation
 */
class ExtractRGBA extends Operation {

    /**
     * ExtractRGBA constructor
     */
    constructor() {
        super();

        this.name = "提取RGBA";
        this.module = "Image";
        this.description = "提取图像中每个像素的RGBA值。此数据有时用于隐写术，可隐藏文字和数据。";
        this.infoURL = "https://wikipedia.org/wiki/RGBA_color_space";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                name: "分隔符",
                type: "editableOption",
                value: RGBA_DELIM_OPTIONS
            },
            {
                name: "包括Alpha",
                type: "boolean",
                value: true
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    async run(input, args) {
        if (!isImage(input)) throw new OperationError("请输入合法的图像文件。");

        const delimiter = args[0],
            includeAlpha = args[1],
            parsedImage = await jimp.read(input);

        let bitmap = parsedImage.bitmap.data;
        bitmap = includeAlpha ? bitmap : bitmap.filter((val, idx) => idx % 4 !== 3);

        return bitmap.join(delimiter);
    }

}

export default ExtractRGBA;
