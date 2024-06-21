/**
 * @author tlwr [toby@toby.codes]
 * @copyright Crown Copyright 2017
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import ExifParser from "exif-parser";
import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";

/**
 * Extract EXIF operation
 */
class ExtractEXIF extends Operation {

    /**
     * ExtractEXIF constructor
     */
    constructor() {
        super();

        this.name = "提取EXIF";
        this.module = "Image";
        this.description = [
            "从图像中提取EXIF数据。",
            "<br><br>",
            "EXIF数据是嵌入在图片(JPEG, JPG, TIFF)和音频文件中的元数据。",
            "<br><br>",
            "照片的EXIF数据通常包括图像本身以及拍摄设备的信息。",
        ].join("\n");
        this.infoURL = "https://wikipedia.org/wiki/Exif";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        try {
            const parser = ExifParser.create(input);
            const result = parser.parse();

            const lines = [];
            for (const tagName in result.tags) {
                const value = result.tags[tagName];
                lines.push(`${tagName}: ${value}`);
            }

            const numTags = lines.length;
            lines.unshift(`找到 ${numTags} 个标签。\n`);
            return lines.join("\n");
        } catch (err) {
            throw new OperationError(`无法从图片中提取EXIF数据： ${err}`);
        }
    }

}

export default ExtractEXIF;
