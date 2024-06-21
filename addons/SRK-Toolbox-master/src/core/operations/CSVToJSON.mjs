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

/**
 * CSV to JSON operation
 */
class CSVToJSON extends Operation {

    /**
     * CSVToJSON constructor
     */
    constructor() {
        super();

        this.name = "CSV转JSON";
        this.module = "Default";
        this.description = "把CSV文件转成JSON格式。";
        this.infoURL = "https://wikipedia.org/wiki/Comma-separated_values";
        this.inputType = "string";
        this.outputType = "JSON";
        this.args = [
            {
                name: "单元格分隔符",
                type: "binaryShortString",
                value: ","
            },
            {
                name: "行分隔符",
                type: "binaryShortString",
                value: "\\r\\n"
            },
            {
                name: "格式",
                type: "option",
                value: ["字典数组", "数组数组"]
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {JSON}
     */
    run(input, args) {
        const [cellDelims, rowDelims, format] = args;
        let json, header;

        try {
            json = Utils.parseCSV(input, cellDelims.split(""), rowDelims.split(""));
        } catch (err) {
            throw new OperationError("无法解析CSV： " + err);
        }

        switch (format) {
            case "字典数组":
                header = json[0];
                return json.slice(1).map(row => {
                    const obj = {};
                    header.forEach((h, i) => {
                        obj[h] = row[i];
                    });
                    return obj;
                });
            case "数组数组":
            default:
                return json;
        }
    }

}

export default CSVToJSON;
