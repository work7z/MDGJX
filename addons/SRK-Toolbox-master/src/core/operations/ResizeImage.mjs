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
 * Resize Image operation
 */
class ResizeImage extends Operation {

    /**
     * ResizeImage constructor
     */
    constructor() {
        super();

        this.name = "图像尺寸修改";
        this.module = "Image";
        this.description = "将图像尺寸变更为给定的高和宽。";
        this.infoURL = "https://wikipedia.org/wiki/Image_scaling";
        this.inputType = "ArrayBuffer";
        this.outputType = "ArrayBuffer";
        this.presentType = "html";
        this.args = [
            {
                name: "宽度",
                type: "number",
                value: 100,
                min: 1
            },
            {
                name: "高度",
                type: "number",
                value: 100,
                min: 1
            },
            {
                name: "单位",
                type: "option",
                value: ["像素", "百分比"]
            },
            {
                name: "保持长宽比",
                type: "boolean",
                value: false
            },
            {
                name: "缩放插值算法",
                type: "option",
                value: [
                    "临近",
                    "双线性",
                    "双三次",
                    "Hermite",
                    "Bezier"
                ],
                defaultIndex: 1
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {byteArray}
     */
    async run(input, args) {
        let width = args[0],
            height = args[1];
        const unit = args[2],
            aspect = args[3],
            resizeAlg = args[4];

        const resizeMap = {
            "临近": jimp.RESIZE_NEAREST_NEIGHBOR,
            "双线性": jimp.RESIZE_BILINEAR,
            "双三次": jimp.RESIZE_BICUBIC,
            "Hermite": jimp.RESIZE_HERMITE,
            "Bezier": jimp.RESIZE_BEZIER
        };

        if (!isImage(input)) {
            throw new OperationError("无效的文件类型。");
        }

        let image;
        try {
            image = await jimp.read(input);
        } catch (err) {
            throw new OperationError(`载入图片错误：(${err})`);
        }
        try {
            if (unit === "百分比") {
                width = image.getWidth() * (width / 100);
                height = image.getHeight() * (height / 100);
            }

            if (isWorkerEnvironment())
                self.sendStatusMessage("缩放图像……");
            if (aspect) {
                image.scaleToFit(width, height, resizeMap[resizeAlg]);
            } else {
                image.resize(width, height, resizeMap[resizeAlg]);
            }

            let imageBuffer;
            if (image.getMIME() === "image/gif") {
                imageBuffer = await image.getBufferAsync(jimp.MIME_PNG);
            } else {
                imageBuffer = await image.getBufferAsync(jimp.AUTO);
            }
            return imageBuffer.buffer;
        } catch (err) {
            throw new OperationError(`缩放图像出错：(${err})`);
        }
    }

    /**
     * Displays the resized image using HTML for web apps
     * @param {ArrayBuffer} data
     * @returns {html}
     */
    present(data) {
        if (!data.byteLength) return "";
        const dataArray = new Uint8Array(data);

        const type = isImage(dataArray);
        if (!type) {
            throw new OperationError("无效的文件类型");
        }

        return `<img src="data:${type};base64,${toBase64(dataArray)}">`;
    }

}

export default ResizeImage;
