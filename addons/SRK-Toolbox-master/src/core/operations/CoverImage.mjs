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
 * Cover Image operation
 */
class CoverImage extends Operation {

    /**
     * CoverImage constructor
     */
    constructor() {
        super();

        this.name = "覆盖图像";
        this.module = "Image";
        this.description = "将图像维持纵横比缩放到完整覆盖给定的宽高范围。图像可能会被裁剪。";
        this.infoURL = "";
        this.inputType = "ArrayBuffer";
        this.outputType = "ArrayBuffer";
        this.presentType = "html";
        this.args = [
            {
                name: "宽",
                type: "number",
                value: 100,
                min: 1
            },
            {
                name: "高",
                type: "number",
                value: 100,
                min: 1
            },
            {
                name: "水平对齐",
                type: "option",
                value: [
                    "左对齐",
                    "居中",
                    "右对齐"
                ],
                defaultIndex: 1
            },
            {
                name: "垂直对齐",
                type: "option",
                value: [
                    "顶端",
                    "中间",
                    "底端"
                ],
                defaultIndex: 1
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
        const [width, height, hAlign, vAlign, alg] = args;

        const resizeMap = {
            "临近": jimp.RESIZE_NEAREST_NEIGHBOR,
            "双线性": jimp.RESIZE_BILINEAR,
            "双三次": jimp.RESIZE_BICUBIC,
            "Hermite": jimp.RESIZE_HERMITE,
            "Bezier": jimp.RESIZE_BEZIER
        };

        const alignMap = {
            "左对齐": jimp.HORIZONTAL_ALIGN_LEFT,
            "居中": jimp.HORIZONTAL_ALIGN_CENTER,
            "右对齐": jimp.HORIZONTAL_ALIGN_RIGHT,
            "顶端": jimp.VERTICAL_ALIGN_TOP,
            "中间": jimp.VERTICAL_ALIGN_MIDDLE,
            "底端": jimp.VERTICAL_ALIGN_BOTTOM
        };

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
                self.sendStatusMessage("覆盖图像……");
            image.cover(width, height, alignMap[hAlign] | alignMap[vAlign], resizeMap[alg]);
            let imageBuffer;
            if (image.getMIME() === "image/gif") {
                imageBuffer = await image.getBufferAsync(jimp.MIME_PNG);
            } else {
                imageBuffer = await image.getBufferAsync(jimp.AUTO);
            }
            return imageBuffer.buffer;
        } catch (err) {
            throw new OperationError(`覆盖图像出错：(${err})`);
        }
    }

    /**
     * Displays the covered image using HTML for web apps
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

export default CoverImage;
