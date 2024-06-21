/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import XRegExp from "xregexp";
import { search } from "../lib/Extract.mjs";
import { caseInsensitiveSort } from "../lib/Sort.mjs";

/**
 * Strings operation
 */
class Strings extends Operation {

    /**
     * Strings constructor
     */
    constructor() {
        super();

        this.name = "Strings";
        this.module = "Regex";
        this.description = "从输入中提取所有的字符串，类似Unix的strings工具。";
        this.infoURL = "https://wikipedia.org/wiki/Strings_(Unix)";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                name: "编码",
                type: "option",
                value: ["单字节", "16位小端序", "16位大端序", "所有"]
            },
            {
                name: "最短长度",
                type: "number",
                value: 4
            },
            {
                name: "匹配类型",
                type: "option",
                value: [
                    "[ASCII]", "字母数字+标点 (A)", "所有可打印字符 (A)", "C风格字符串 (A)",
                    "[Unicode]", "字母数字+标点 (U)", "所有可打印字符 (U)", "C风格字符串 (U)"
                ]
            },
            {
                name: "显示总数",
                type: "boolean",
                value: false
            },
            {
                name: "排序",
                type: "boolean",
                value: false
            },
            {
                name: "去重",
                type: "boolean",
                value: false
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [encoding, minLen, matchType, displayTotal, sort, unique] = args,
            alphanumeric = "A-Z\\d",
            punctuation = "/\\-:.,_$%'\"()<>= !\\[\\]{}@",
            printable = "\x20-\x7e",
            uniAlphanumeric = "\\pL\\pN",
            uniPunctuation = "\\pP\\pZ",
            uniPrintable = "\\pL\\pM\\pZ\\pS\\pN\\pP";

        let strings = "";

        switch (matchType) {
            case "字母数字+标点 (A)":
                strings = `[${alphanumeric + punctuation}]`;
                break;
            case "所有可打印字符 (A)":
            case "C风格字符串 (A)":
                strings = `[${printable}]`;
                break;
            case "字母数字+标点 (U)":
                strings = `[${uniAlphanumeric + uniPunctuation}]`;
                break;
            case "所有可打印字符 (U)":
            case "C风格字符串 (U)":
                strings = `[${uniPrintable}]`;
                break;
        }

        // UTF-16 support is hacked in by allowing null bytes on either side of the matched chars
        switch (encoding) {
            case "所有":
                strings = `(\x00?${strings}\x00?)`;
                break;
            case "16位小端序":
                strings = `(${strings}\x00)`;
                break;
            case "16位大端序":
                strings = `(\x00${strings})`;
                break;
            case "单字节":
            default:
                break;
        }

        strings = `${strings}{${minLen},}`;

        if (matchType.includes("C风格字符串")) {
            strings += "\x00";
        }

        const regex = new XRegExp(strings, "ig");
        const results = search(
            input,
            regex,
            null,
            sort ? caseInsensitiveSort : null,
            unique
        );

        if (displayTotal) {
            return `总计： ${results.length}\n\n${results.join("\n")}`;
        } else {
            return results.join("\n");
        }
    }

}

export default Strings;
