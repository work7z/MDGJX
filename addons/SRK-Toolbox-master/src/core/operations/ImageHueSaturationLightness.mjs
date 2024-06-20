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
 * Image Hue/Saturation/Lightness operation
 */
class ImageHueSaturationLightness extends Operation {

    /**
     * ImageHueSaturationLightness constructor
     */
    constructor() {
        super();

        this.name = "图像色调/饱和度/明度";
        this.module = "Image";
        this.description = "调整图像的色调/饱和度/明度值（HSL）。";
        this.infoURL = "";
        this.inputType = "ArrayBuffer";
        this.outputType = "ArrayBuffer";
        this.presentType = "html";
        this.args = [
            {
                name: "色调",
                type: "number",
                value: 0,
                min: -360,
                max: 360
            },
            {
                name: "饱和度",
                type: "number",
                value: 0,
                min: -100,
                max: 100
            },
            {
                name: "明度",
                type: "number",
                value: 0,
                min: -100,
                max: 100
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {byteArray}
     */
    async run(input, args) {
        const [hue, saturation, lightness] = args;

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
            if (hue !== 0) {
                if (isWorkerEnvironment())
                    self.sendStatusMessage("调整图像色调……");
                image.colour([
                    {
                        apply: "hue",
                        params: [hue]
                    }
                ]);
            }
            if (saturation !== 0) {
                if (isWorkerEnvironment())
                    self.sendStatusMessage("调整图像饱和度……");
                image.colour([
                    {
                        apply: "saturate",
                        params: [saturation]
                    }
                ]);
            }
            if (lightness !== 0) {
                if (isWorkerEnvironment())
                    self.sendStatusMessage("调整图像明度……");
                image.colour([
                    {
                        apply: "lighten",
                        params: [lightness]
                    }
                ]);
            }

            let imageBuffer;
            if (image.getMIME() === "image/gif") {
                imageBuffer = await image.getBufferAsync(jimp.MIME_PNG);
            } else {
                imageBuffer = await image.getBufferAsync(jimp.AUTO);
            }
            return imageBuffer.buffer;
        } catch (err) {
            throw new OperationError(`调整图像色调/饱和度/明度报错：(${err})`);
        }
    }

    /**
     * Displays the image using HTML for web apps
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

export default ImageHueSaturationLightness;
