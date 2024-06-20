/**
 * @author Matthieu [m@tthieu.xyz]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import {UNICODE_NORMALISATION_FORMS} from "../lib/ChrEnc.mjs";
import unorm from "unorm";

/**
 * Normalise Unicode operation
 */
class NormaliseUnicode extends Operation {

    /**
     * NormaliseUnicode constructor
     */
    constructor() {
        super();

        this.name = "Unicode正规化";
        this.module = "Encodings";
        this.description = "按照选定的正规形式对Unicode字符执行正规化操作。";
        this.infoURL = "https://wikipedia.org/wiki/Unicode_equivalence#Normal_forms";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                name: "正规形式",
                type: "option",
                value: UNICODE_NORMALISATION_FORMS
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [normalForm] = args;

        switch (normalForm) {
            case "NFD":
                return unorm.nfd(input);
            case "NFC":
                return unorm.nfc(input);
            case "NFKD":
                return unorm.nfkd(input);
            case "NFKC":
                return unorm.nfkc(input);
            default:
                throw new OperationError("未知的正规形式");
        }
    }

}

export default NormaliseUnicode;
