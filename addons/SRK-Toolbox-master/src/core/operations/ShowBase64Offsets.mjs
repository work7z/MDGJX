/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";
import {fromBase64, toBase64} from "../lib/Base64.mjs";
import OperationError from "../errors/OperationError.mjs";

/**
 * Show Base64 offsets operation
 */
class ShowBase64Offsets extends Operation {

    /**
     * ShowBase64Offsets constructor
     */
    constructor() {
        super();

        this.name = "显示Base64偏移形式";
        this.module = "Default";
        this.description = "当一个字符串被包含在其他数据中间一起被Base64编码的时候，根据字符串所在的位置，可能有三种不同的编码结果。<br><br>此操作会显示三种不同结果，用于后期匹配。";
        this.infoURL = "https://wikipedia.org/wiki/Base64#Output_padding";
        this.inputType = "byteArray";
        this.outputType = "html";
        this.args = [
            {
                name: "可用字符",
                type: "binaryString",
                value: "A-Za-z0-9+/="
            },
            {
                name: "显示可变字符与填充位",
                type: "boolean",
                value: true
            },
            {
                name: "输入格式",
                type: "option",
                value: ["原始字符串", "Base64"]
            }
        ];
    }

    /**
     * @param {byteArray} input
     * @param {Object[]} args
     * @returns {html}
     */
    run(input, args) {
        const [alphabet, showVariable, format] = args;

        if (format === "Base64") {
            input = fromBase64(Utils.byteArrayToUtf8(input), null, "byteArray");
        }

        let offset0 = toBase64(input, alphabet),
            offset1 = toBase64([0].concat(input), alphabet),
            offset2 = toBase64([0, 0].concat(input), alphabet),
            staticSection = "",
            padding = "";

        const len0 = offset0.indexOf("="),
            len1 = offset1.indexOf("="),
            len2 = offset2.indexOf("="),
            script = "<script type='application/javascript'>$('[data-toggle=\"tooltip\"]').tooltip()</script>";

        if (input.length < 1) {
            throw new OperationError("请输入字符串");
        }

        // Highlight offset 0
        if (len0 % 4 === 2) {
            staticSection = offset0.slice(0, -3);
            offset0 = "<span data-toggle='tooltip' data-placement='top' title='" +
                Utils.escapeHtml(fromBase64(staticSection, alphabet).slice(0, -2)) + "'>" +
                staticSection + "</span>" +
                "<span class='hl5'>" + offset0.substr(offset0.length - 3, 1) + "</span>" +
                "<span class='hl3'>" + offset0.substr(offset0.length - 2) + "</span>";
        } else if (len0 % 4 === 3) {
            staticSection = offset0.slice(0, -2);
            offset0 = "<span data-toggle='tooltip' data-placement='top' title='" +
                Utils.escapeHtml(fromBase64(staticSection, alphabet).slice(0, -1)) + "'>" +
                staticSection + "</span>" +
                "<span class='hl5'>" + offset0.substr(offset0.length - 2, 1) + "</span>" +
                "<span class='hl3'>" + offset0.substr(offset0.length - 1) + "</span>";
        } else {
            staticSection = offset0;
            offset0 = "<span data-toggle='tooltip' data-placement='top' title='" +
                Utils.escapeHtml(fromBase64(staticSection, alphabet)) + "'>" +
                staticSection + "</span>";
        }

        if (!showVariable) {
            offset0 = staticSection;
        }


        // Highlight offset 1
        padding = "<span class='hl3'>" + offset1.substr(0, 1) + "</span>" +
            "<span class='hl5'>" + offset1.substr(1, 1) + "</span>";
        offset1 = offset1.substr(2);
        if (len1 % 4 === 2) {
            staticSection = offset1.slice(0, -3);
            offset1 = padding + "<span data-toggle='tooltip' data-placement='top' title='" +
                Utils.escapeHtml(fromBase64("AA" + staticSection, alphabet).slice(1, -2)) + "'>" +
                staticSection + "</span>" +
                "<span class='hl5'>" + offset1.substr(offset1.length - 3, 1) + "</span>" +
                "<span class='hl3'>" + offset1.substr(offset1.length - 2) + "</span>";
        } else if (len1 % 4 === 3) {
            staticSection = offset1.slice(0, -2);
            offset1 = padding + "<span data-toggle='tooltip' data-placement='top' title='" +
                Utils.escapeHtml(fromBase64("AA" + staticSection, alphabet).slice(1, -1)) + "'>" +
                staticSection + "</span>" +
                "<span class='hl5'>" + offset1.substr(offset1.length - 2, 1) + "</span>" +
                "<span class='hl3'>" + offset1.substr(offset1.length - 1) + "</span>";
        } else {
            staticSection = offset1;
            offset1 = padding +  "<span data-toggle='tooltip' data-placement='top' title='" +
                Utils.escapeHtml(fromBase64("AA" + staticSection, alphabet).slice(1)) + "'>" +
                staticSection + "</span>";
        }

        if (!showVariable) {
            offset1 = staticSection;
        }

        // Highlight offset 2
        padding = "<span class='hl3'>" + offset2.substr(0, 2) + "</span>" +
            "<span class='hl5'>" + offset2.substr(2, 1) + "</span>";
        offset2 = offset2.substr(3);
        if (len2 % 4 === 2) {
            staticSection = offset2.slice(0, -3);
            offset2 = padding + "<span data-toggle='tooltip' data-placement='top' title='" +
                Utils.escapeHtml(fromBase64("AAA" + staticSection, alphabet).slice(2, -2)) + "'>" +
                staticSection + "</span>" +
                "<span class='hl5'>" + offset2.substr(offset2.length - 3, 1) + "</span>" +
                "<span class='hl3'>" + offset2.substr(offset2.length - 2) + "</span>";
        } else if (len2 % 4 === 3) {
            staticSection = offset2.slice(0, -2);
            offset2 = padding + "<span data-toggle='tooltip' data-placement='top' title='" +
                Utils.escapeHtml(fromBase64("AAA" + staticSection, alphabet).slice(2, -2)) + "'>" +
                staticSection + "</span>" +
                "<span class='hl5'>" + offset2.substr(offset2.length - 2, 1) + "</span>" +
                "<span class='hl3'>" + offset2.substr(offset2.length - 1) + "</span>";
        } else {
            staticSection = offset2;
            offset2 = padding +  "<span data-toggle='tooltip' data-placement='top' title='" +
                Utils.escapeHtml(fromBase64("AAA" + staticSection, alphabet).slice(2)) + "'>" +
                staticSection + "</span>";
        }

        if (!showVariable) {
            offset2 = staticSection;
        }

        return (showVariable ? "<span class='hl5'>绿色</span>字符表示它根据前后数据的不同可能会发生变化。" +
            "\n<span class='hl3'>红色</span>字符只是用于填充占位。" +
            "\n无背景色的字符表示<span data-toggle='tooltip' data-placement='top' title='不会根据前后数据发生变化'>固定内容</span>。" +
            "\n鼠标放到固定内容部分查看此部分会解码成什么内容。\n" +
            "\n偏移量0: " + offset0 +
            "\n偏移量1: " + offset1 +
            "\n偏移量2: " + offset2 +
            script :
            offset0 + "\n" + offset1 + "\n" + offset2);
    }

}

export default ShowBase64Offsets;
