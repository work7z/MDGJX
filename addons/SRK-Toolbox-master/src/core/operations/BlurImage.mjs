/**
 * @author j433866 [j433866@gmail.com]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import { isWorkerEnvironment } from "../Utils.mjs";
import { isImage } from "../lib/FileType.mjs";
import { toBase64 } from "../lib/Base64.mjs";
import { gaussianBlur } from "../lib/ImageManipulation.mjs";
import jimp from "jimp";

/**
 * Blur Image operation
 */
class BlurImage extends Operation {

    /**
     * BlurImage constructor
     */
    constructor() {
        super();

        this.name = "模糊图像";
        this.module = "Image";
        this.description = "给图像应用模糊效果。<br><br>高斯模糊比快速模糊运算速度慢很多，但效果较好。";
        this.infoURL = "https://wikipedia.org/wiki/Gaussian_blur";
        this.inputType = "ArrayBuffer";
        this.outputType = "ArrayBuffer";
        this.presentType = "html";
        this.args = [
            {
                name: "模糊量",
                type: "number",
                value: 5,
                min: 1
            },
            {
                name: "类型",
                type: "option",
                value: ["快速", "高斯"]
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {byteArray}
     */
    async run(input, args) {
        const [blurAmount, blurType] = args;

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
            switch (blurType) {
                case "快速":
                    if (isWorkerEnvironment())
                        self.sendStatusMessage("应用快速模糊……");
                    image.blur(blurAmount);
                    break;
                case "高斯":
                    if (isWorkerEnvironment())
                        self.sendStatusMessage("应用高斯模糊……");
                    image = gaussianBlur(image, blurAmount);
                    break;
            }

            let imageBuffer;
            if (image.getMIME() === "image/gif") {
                imageBuffer = await image.getBufferAsync(jimp.MIME_PNG);
            } else {
                imageBuffer = await image.getBufferAsync(jimp.AUTO);
            }
            return imageBuffer.buffer;
        } catch (err) {
            throw new OperationError(`模糊图像出错：(${err})`);
        }
    }

    /**
     * Displays the blurred image using HTML for web apps
     *
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

export default BlurImage;
