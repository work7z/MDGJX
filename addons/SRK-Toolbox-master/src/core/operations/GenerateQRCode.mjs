/**
 * @author j433866 [j433866@gmail.com]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import { generateQrCode } from "../lib/QRCode.mjs";
import { toBase64 } from "../lib/Base64.mjs";
import { isImage } from "../lib/FileType.mjs";
import Utils from "../Utils.mjs";

/**
 * Generate QR Code operation
 */
class GenerateQRCode extends Operation {

    /**
     * GenerateQRCode constructor
     */
    constructor() {
        super();

        this.name = "生成二维码";
        this.module = "Image";
        this.description = "从输入生成一个Quick Response (QR)二维码。<br><br>QR码/图码（英语：Quick Response Code；全称为快速响应矩阵图码）是二维码的一种，于1994年由日本汽车零组件大厂电装公司的原昌宏所发明。条形码或称条码（英语：barcode），是将宽度不等的多个黑条和空白，按照一定的编码规则排列，用以表达一组信息的图形标识符。";
        this.infoURL = "https://wikipedia.org/wiki/QR_code";
        this.inputType = "string";
        this.outputType = "ArrayBuffer";
        this.presentType = "html";
        this.args = [
            {
                "name": "图像格式",
                "type": "option",
                "value": ["PNG", "SVG", "EPS", "PDF"]
            },
            {
                "name": "码点大小 (px)",
                "type": "number",
                "value": 5,
                "min": 1
            },
            {
                "name": "留白 (码点数)",
                "type": "number",
                "value": 4,
                "min": 0
            },
            {
                "name": "错误检测",
                "type": "option",
                "value": ["Low", "Medium", "Quartile", "High"],
                "defaultIndex": 1
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {ArrayBuffer}
     */
    run(input, args) {
        const [format, size, margin, errorCorrection] = args;

        return generateQrCode(input, format, size, margin, errorCorrection);
    }

    /**
     * Displays the QR image using HTML for web apps
     *
     * @param {ArrayBuffer} data
     * @returns {html}
     */
    present(data, args) {
        if (!data.byteLength && !data.length) return "";
        const dataArray = new Uint8Array(data),
            [format] = args;
        if (format === "PNG") {
            const type = isImage(dataArray);
            if (!type) {
                throw new OperationError("无效的文件类型。");
            }

            return `<img src="data:${type};base64,${toBase64(dataArray)}">`;
        }

        return Utils.arrayBufferToStr(data);
    }

}

export default GenerateQRCode;
