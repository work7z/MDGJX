/**
 * @author n1474335 [n1474335@gmail.com]
 * @author mshwed [m@ttshwed.com]
 * @author Matt C [me@mitt.dev]
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

import process from "process";
import { createWorker } from "tesseract.js";

/**
 * Optical Character Recognition operation
 */
class OpticalCharacterRecognition extends Operation {

    /**
     * OpticalCharacterRecognition constructor
     */
    constructor() {
        super();

        this.name = "光学字符识别";
        this.module = "OCR";
        this.description = "光学字符识别（英语：Optical Character Recognition，OCR）是指对文本资料的图像文件进行分析识别处理，获取文字及版面信息的过程。<br><br>目前仅支持识别英文。<br><br>支持的图像格式：png、 jpg、bmp、pbm。";
        this.infoURL = "https://wikipedia.org/wiki/Optical_character_recognition";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                name: "显示置信度",
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
        const [showConfidence] = args;

        if (!isWorkerEnvironment()) throw new OperationError("此操作仅支持在浏览器运行");

        const type = isImage(input);
        if (!type) {
            throw new OperationError("不支持的文件格式（仅支持：jpg、png、pbm、bmp）或未提供文件");
        }

        const assetDir = isWorkerEnvironment() ? `${self.docURL}/assets/` : `${process.cwd()}/src/core/vendor/`;

        try {
            self.sendStatusMessage("启动Tesseract worker……");
            const image = `data:${type};base64,${toBase64(input)}`;
            const worker = createWorker({
                workerPath: `${assetDir}tesseract/worker.min.js`,
                langPath: `${assetDir}tesseract/lang-data`,
                corePath: `${assetDir}tesseract/tesseract-core.wasm.js`,
                logger: progress => {
                    if (isWorkerEnvironment()) {
                        self.sendStatusMessage(`状态： ${progress.status}${progress.status === "recognizing text" ? ` - ${(parseFloat(progress.progress)*100).toFixed(2)}%`: "" }`);
                    }
                }
            });
            await worker.load();
            self.sendStatusMessage(`载入英文语言包……`);
            await worker.loadLanguage("eng");
            self.sendStatusMessage("初始化Tesseract API……");
            await worker.initialize("eng");
            self.sendStatusMessage("识别文本……");
            const result = await worker.recognize(image);

            if (showConfidence) {
                return `置信度 ${result.data.confidence}%\n\n${result.data.text}`;
            } else {
                return result.data.text;
            }
        } catch (err) {
            throw new OperationError(`OCR时报错：(${err})`);
        }
    }
}

export default OpticalCharacterRecognition;
