/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";
import { scanForFileTypes } from "../lib/FileType.mjs";
import { FILE_SIGNATURES } from "../lib/FileSignatures.mjs";

/**
 * Scan for Embedded Files operation
 */
class ScanForEmbeddedFiles extends Operation {

    /**
     * ScanForEmbeddedFiles constructor
     */
    constructor() {
        super();

        this.name = "扫描嵌入文件";
        this.module = "Default";
        this.description = "在输入内容中检测魔术字节（Magic bytes）来扫描潜在的嵌入文件。此操作容易误报。<br><br>警告：超过100KB的文件可能会需要<strong>非常长</strong>的时间处理。";
        this.infoURL = "https://wikipedia.org/wiki/List_of_file_signatures";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = Object.keys(FILE_SIGNATURES).map(cat => {
            return {
                name: cat,
                type: "boolean",
                value: cat === "Miscellaneous" ? false : true
            };
        });
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        let output = "在输入内容中检测魔术字节（Magic bytes）来扫描潜在的嵌入文件。以下内容可能为误报，因为足够长的数据通常都会碰巧具有这些魔术字节。\n",
            numFound = 0;
        const categories = [],
            data = new Uint8Array(input);

        args.forEach((cat, i) => {
            if (cat) categories.push(Object.keys(FILE_SIGNATURES)[i]);
        });

        const types = scanForFileTypes(data, categories);

        if (types.length) {
            types.forEach(type => {
                numFound++;
                output += `\n偏移量 ${type.offset} (0x${Utils.hex(type.offset)})：
  文件类型：  ${type.fileDetails.name}
  扩展名：   ${type.fileDetails.extension}
  MIME类型： ${type.fileDetails.mime}\n`;

                if (type?.fileDetails?.description?.length) {
                    output += `  描述： ${type.fileDetails.description}\n`;
                }
            });
        }

        if (numFound === 0) {
            output += "\n未找到嵌入的文件。";
        }

        return output;
    }

}

export default ScanForEmbeddedFiles;
