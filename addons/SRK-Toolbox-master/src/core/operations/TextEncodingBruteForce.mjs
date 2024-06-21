/**
 * @author Cynser
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";
import cptable from "codepage";
import {CHR_ENC_CODE_PAGES} from "../lib/ChrEnc.mjs";

/**
 * Text Encoding Brute Force operation
 */
class TextEncodingBruteForce extends Operation {

    /**
     * TextEncodingBruteForce constructor
     */
    constructor() {
        super();

        this.name = "文本编码暴力破解";
        this.module = "Encodings";
        this.description = [
            "列出所有支持的字符集解码/编码结果，让你可以看出哪个是正确的。",
            "<br><br>",
            "支持的字符集：",
            "<ul>",
            Object.keys(CHR_ENC_CODE_PAGES).map(e => `<li>${e}</li>`).join("\n"),
            "</ul>"
        ].join("\n");
        this.infoURL = "https://wikipedia.org/wiki/Character_encoding";
        this.inputType = "string";
        this.outputType = "json";
        this.presentType = "html";
        this.args = [
            {
                name: "模式",
                type: "option",
                value: ["编码", "解码"]
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {json}
     */
    run(input, args) {
        const output = {},
            charsets = Object.keys(CHR_ENC_CODE_PAGES),
            mode = args[0];

        charsets.forEach(charset => {
            try {
                if (mode === "解码") {
                    output[charset] = cptable.utils.decode(CHR_ENC_CODE_PAGES[charset], input);
                } else {
                    output[charset] = Utils.arrayBufferToStr(cptable.utils.encode(CHR_ENC_CODE_PAGES[charset], input));
                }
            } catch (err) {
                output[charset] = "无法解码";
            }
        });

        return output;
    }

    /**
     * Displays the encodings in an HTML table for web apps.
     *
     * @param {Object[]} encodings
     * @returns {html}
     */
    present(encodings) {
        let table = "<table class='table table-hover table-sm table-bordered table-nonfluid'><tr><th>字符集</th><th>结果</th></tr>";

        for (const enc in encodings) {
            const value = Utils.escapeHtml(Utils.escapeWhitespace(encodings[enc]));
            table += `<tr><td>${enc}</td><td>${value}</td></tr>`;
        }

        table += "<table>";
        return table;
    }

}

export default TextEncodingBruteForce;
