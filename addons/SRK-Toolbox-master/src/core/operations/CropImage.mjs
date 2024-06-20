/**
 * @author j433866 [j433866@gmail.com]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import { isImage } from "../lib/FileType.mjs";
import { toBase64 } from "../lib/Base64.mjs";
import { isWorkerEnvironment } from "../Utils.mjs";
import jimp from "jimp";

/**
 * Crop Image operation
 */
class CropImage extends Operation {

    /**
     * CropImage constructor
     */
    constructor() {
        super();

        this.name = "裁剪图像";
        this.module = "Image";
        this.description = "将图像裁剪到给定区域，或自动裁剪到边缘。<br><br><b><u>自动裁剪</u></b><br>自动按照图片中同一颜色的边框裁剪。<br><br><u>自动裁剪容错</u><br>指边框像素之间色差允许的最大百分比值。<br><br><u>仅自动裁剪完整边框</u><br>仅裁剪完整边框（四边边框相同）。<br><br><u>对称自动裁剪</u><br>强制进行对称的自动裁剪（上下和左右裁剪相同长度）。<br><br><u>自动裁剪保留边框</u><br>裁剪边框外保留的像素数。";
        this.infoURL = "https://wikipedia.org/wiki/Cropping_(image)";
        this.inputType = "ArrayBuffer";
        this.outputType = "ArrayBuffer";
        this.presentType = "html";
        this.args = [
            {
                name: "X坐标",
                type: "number",
                value: 0,
                min: 0
            },
            {
                name: "Y坐标",
                type: "number",
                value: 0,
                min: 0
            },
            {
                name: "宽度",
                type: "number",
                value: 10,
                min: 1
            },
            {
                name: "高度",
                type: "number",
                value: 10,
                min: 1
            },
            {
                name: "自动裁剪",
                type: "boolean",
                value: false
            },
            {
                name: "自动裁剪容错 (%)",
                type: "number",
                value: 0.02,
                min: 0,
                max: 100,
                step: 0.01
            },
            {
                name: "仅自动裁剪完整边框",
                type: "boolean",
                value: true
            },
            {
                name: "对称自动裁剪",
                type: "boolean",
                value: false
            },
            {
                name: "自动裁剪保留边框 (px)",
                type: "number",
                value: 0,
                min: 0
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {byteArray}
     */
    async run(input, args) {
        const [xPos, yPos, width, height, autocrop, autoTolerance, autoFrames, autoSymmetric, autoBorder] = args;
        if (!isImage(input)) {
            throw new OperationError("无效的文件类型。");
        }

        let image;
        try {
            image = await jimp.read(input);
        } catch (err) {
            throw new OperationError(`载入图像出错：(${err})`);
        }
        try {
            if (isWorkerEnvironment())
                self.sendStatusMessage("裁剪图像……");
            if (autocrop) {
                image.autocrop({
                    tolerance: (autoTolerance / 100),
                    cropOnlyFrames: autoFrames,
                    cropSymmetric: autoSymmetric,
                    leaveBorder: autoBorder
                });
            } else {
                image.crop(xPos, yPos, width, height);
            }

            let imageBuffer;
            if (image.getMIME() === "image/gif") {
                imageBuffer = await image.getBufferAsync(jimp.MIME_PNG);
            } else {
                imageBuffer = await image.getBufferAsync(jimp.AUTO);
            }
            return imageBuffer.buffer;
        } catch (err) {
            throw new OperationError(`裁剪图像出错：(${err})`);
        }
    }

    /**
     * Displays the cropped image using HTML for web apps
     * @param {ArrayBuffer} data
     * @returns {html}
     */
    present(data) {
        if (!data.byteLength) return "";
        const dataArray = new Uint8Array(data);

        const type = isImage(dataArray);
        if (!type) {
            throw new OperationError("无效的文件类型。");
        }

        return `<img src="data:${type};base64,${toBase64(dataArray)}">`;
    }

}

export default CropImage;
