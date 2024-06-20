/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import cptable from "codepage";
import {CHR_ENC_CODE_PAGES} from "../lib/ChrEnc.mjs";

/**
 * Decode text operation
 */
class DecodeText extends Operation {

    /**
     * DecodeText constructor
     */
    constructor() {
        super();

        this.name = "文本解码";
        this.module = "Encodings";
        this.description = [
            "使用给定的字符集解码输入文本。",
            "<br><br>",
            "支持的字符集：",
            "<ul>",
            Object.keys(CHR_ENC_CODE_PAGES).map(e => `<li>${e}</li>`).join("\n"),
            "</ul>",
        ].join("\n");
        this.infoURL = "https://wikipedia.org/wiki/Character_encoding";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                "name": "字符集",
                "type": "option",
                "value": Object.keys(CHR_ENC_CODE_PAGES)
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const format = CHR_ENC_CODE_PAGES[args[0]];
        return cptable.utils.decode(format, new Uint8Array(input));
    }

}

export default DecodeText;
