/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import Utils from "../Utils.mjs";
import {scanForFileTypes, extractFile} from "../lib/FileType.mjs";
import {FILE_SIGNATURES} from "../lib/FileSignatures.mjs";

/**
 * Extract Files operation
 */
class ExtractFiles extends Operation {

    /**
     * ExtractFiles constructor
     */
    constructor() {
        super();

        // Get the first extension for each signature that can be extracted
        let supportedExts = Object.keys(FILE_SIGNATURES).map(cat => {
            return FILE_SIGNATURES[cat]
                .filter(sig => sig.extractor)
                .map(sig => sig.extension.toUpperCase());
        });

        // Flatten categories and remove duplicates
        supportedExts = [].concat(...supportedExts).unique();

        this.name = "提取文件";
        this.module = "Default";
        this.description = `从输入内容中进行文件雕复来尝试提取文件。<br><br>此操作目前可提取以下格式：
            <ul>
                <li>
                ${supportedExts.join("</li><li>")}
                </li>
            </ul>可以指定最小文件尺寸来防止误判。`;
        this.infoURL = "https://forensics.wiki/file_carving";
        this.inputType = "ArrayBuffer";
        this.outputType = "List<File>";
        this.presentType = "html";
        this.args = Object.keys(FILE_SIGNATURES).map(cat => {
            return {
                name: cat,
                type: "boolean",
                value: cat === "其它" ? false : true
            };
        }).concat([
            {
                name: "忽略失败提取",
                type: "boolean",
                value: true
            },
            {
                name: "最小文件尺寸",
                type: "number",
                value: 100
            }
        ]);
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {List<File>}
     */
    run(input, args) {
        const bytes = new Uint8Array(input),
            categories = [],
            minSize = args.pop(1),
            ignoreFailedExtractions = args.pop(1);

        args.forEach((cat, i) => {
            if (cat) categories.push(Object.keys(FILE_SIGNATURES)[i]);
        });

        // Scan for embedded files
        const detectedFiles = scanForFileTypes(bytes, categories);

        // Extract each file that we support
        const files = [];
        const errors = [];
        detectedFiles.forEach(detectedFile => {
            try {
                const file = extractFile(bytes, detectedFile.fileDetails, detectedFile.offset);
                if (file.size >= minSize)
                    files.push(file);
            } catch (err) {
                if (!ignoreFailedExtractions && err.message.indexOf("No extraction algorithm available") < 0) {
                    errors.push(
                        `Error while attempting to extract ${detectedFile.fileDetails.name} ` +
                        `at offset ${detectedFile.offset}:\n` +
                        `${err.message}`
                    );
                }
            }
        });

        if (errors.length) {
            throw new OperationError(errors.join("\n\n"));
        }

        return files;
    }


    /**
     * Displays the files in HTML for web apps.
     *
     * @param {File[]} files
     * @returns {html}
     */
    async present(files) {
        return await Utils.displayFilesAsHTML(files);
    }

}

export default ExtractFiles;
