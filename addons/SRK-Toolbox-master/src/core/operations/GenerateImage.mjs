/**
 * @author pointhi [thomas.pointhuber@gmx.at]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import Utils from "../Utils.mjs";
import {isImage} from "../lib/FileType.mjs";
import {toBase64} from "../lib/Base64.mjs";
import {isWorkerEnvironment} from "../Utils.mjs";
import jimp from "jimp";

/**
 * Generate Image operation
 */
class GenerateImage extends Operation {

    /**
     * GenerateImage constructor
     */
    constructor() {
        super();

        this.name = "生成图像";
        this.module = "Image";
        this.description = "使用输入作为像素值生成图像。";
        this.infoURL = "";
        this.inputType = "ArrayBuffer";
        this.outputType = "ArrayBuffer";
        this.presentType = "html";
        this.args = [
            {
                "name": "模式",
                "type": "option",
                "value": ["灰度", "RG", "RGB", "RGBA", "位"]
            },
            {
                "name": "像素缩放倍率",
                "type": "number",
                "value": 8,
            },
            {
                "name": "每行像素数",
                "type": "number",
                "value": 64,
            }
        ];
    }

    /**
     * @param {byteArray} input
     * @param {Object[]} args
     * @returns {ArrayBuffer}
     */
    async run(input, args) {
        const [mode, scale, width] = args;
        input = new Uint8Array(input);

        if (scale <= 0) {
            throw new OperationError("像素缩放倍率必须大于0");
        }

        if (width <= 0) {
            throw new OperationError("每行像素数必须大于0");
        }

        const bytePerPixelMap = {
            "灰度": 1,
            "RG": 2,
            "RGB": 3,
            "RGBA": 4,
            "位": 1/8,
        };

        const bytesPerPixel = bytePerPixelMap[mode];

        if (bytesPerPixel > 0 && input.length % bytesPerPixel  !== 0) {
            throw new OperationError(`字节数不是 ${bytesPerPixel} 的倍数`);
        }

        const height = Math.ceil(input.length / bytesPerPixel / width);
        const image = await new jimp(width, height, (err, image) => {});

        if (isWorkerEnvironment())
            self.sendStatusMessage("从给定数据生成图像……");

        if (mode === "位") {
            let index = 0;
            for (let j = 0; j < input.length; j++) {
                const curByte = Utils.bin(input[j]);
                for (let k = 0; k < 8; k++, index++) {
                    const x = index % width;
                    const y = Math.floor(index / width);

                    const value = curByte[k] === "0" ? 0xFF : 0x00;
                    const pixel = jimp.rgbaToInt(value, value, value, 0xFF);
                    image.setPixelColor(pixel, x, y);
                }
            }
        } else {
            let i = 0;
            while (i < input.length) {
                const index = i / bytesPerPixel;
                const x = index % width;
                const y = Math.floor(index / width);

                let red = 0x00;
                let green = 0x00;
                let blue = 0x00;
                let alpha = 0xFF;

                switch (mode) {
                    case "灰度":
                        red = green = blue = input[i++];
                        break;

                    case "RG":
                        red = input[i++];
                        green = input[i++];
                        break;

                    case "RGB":
                        red = input[i++];
                        green = input[i++];
                        blue = input[i++];
                        break;

                    case "RGBA":
                        red = input[i++];
                        green = input[i++];
                        blue = input[i++];
                        alpha = input[i++];
                        break;

                    default:
                        throw new OperationError(`不支持的模式：(${mode})`);
                }

                try {
                    const pixel = jimp.rgbaToInt(red, green, blue, alpha);
                    image.setPixelColor(pixel, x, y);
                } catch (err) {
                    throw new OperationError(`生成图像时报错：(${err})`);
                }
            }
        }

        if (scale !== 1) {
            if (isWorkerEnvironment())
                self.sendStatusMessage("缩放图像……");

            image.scaleToFit(width*scale, height*scale, jimp.RESIZE_NEAREST_NEIGHBOR);
        }

        try {
            const imageBuffer = await image.getBufferAsync(jimp.MIME_PNG);
            return imageBuffer.buffer;
        } catch (err) {
            throw new OperationError(`生成图像时报错：(${err})`);
        }
    }

    /**
     * Displays the generated image using HTML for web apps
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

export default GenerateImage;
