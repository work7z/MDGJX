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
 * Encode text operation
 */
class EncodeText extends Operation {

    /**
     * EncodeText constructor
     */
    constructor() {
        super();

        this.name = "文本编码";
        this.module = "Encodings";
        this.description = [
            "使用选择的字符集对文本进行编码。",
            "<br><br>",
            "支持的字符集：",
            "<ul>",
            Object.keys(CHR_ENC_CODE_PAGES).map(e => `<li>${e}</li>`).join("\n"),
            "</ul>",
        ].join("\n");
        this.infoURL = "https://wikipedia.org/wiki/Character_encoding";
        this.inputType = "string";
        this.outputType = "ArrayBuffer";
        this.args = [
            {
                "name": "字符集",
                "type": "option",
                "value": Object.keys(CHR_ENC_CODE_PAGES)
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {ArrayBuffer}
     */
    run(input, args) {
        const format = CHR_ENC_CODE_PAGES[args[0]];
        const encoded = cptable.utils.encode(format, input);
        return new Uint8Array(encoded).buffer;
    }

}


export default EncodeText;
