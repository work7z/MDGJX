// LafTools
// 
// Date: Sun, 14 Jan 2024
// Second Author: Ryan Laf 
// Description: 
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import vkbeautify from "vkbeautify";
import { Dot } from "@/[lang]/client/src/utils/cTranslationUtils";
import { TEXT_INPUT_EXAMPLE_HELLO_WORLD } from './_constants.tsx'
import Operation, { OptDetail } from "../../../core/Operation.tsx";
import Utils from "../../../core/Utils.mjs";
import gutils from "@/[lang]/client/src/utils//GlobalUtils.tsx";
import { InputOutputEditorLang } from "../../../purejs-types.tsx";

/**
 * CSS Beautify operation
 */
class CSSBeautify extends Operation {
    public getOptDetail(): OptDetail {
        return {
            relatedID: 'css',
            config: {
                "module": "Code",
                "description": "Indents and prettifies Cascading Style Sheets (CSS) code.",
                "infoURL": null,
                "inputType": "string",
                "outputType": "string",
                "flowControl": false,
                "manualBake": false,
                "args": [
                    {
                        "name": Dot("isti", "Indent string"),
                        "type": "binaryShortString",
                        "value": "\\t"
                    }
                ]
            },
            nousenouseID: 'cssbeautify',
            optName: Dot("3TMOUkhZl", "Format {0}", "CSS"),
            optDescription: Dot(
                "md2aO2NaJITm",
                "Indents and prettifies Cascading Style Sheets (CSS) code, making it easier to read and understand.",
            ),
            infoURL: "https://www.w3.org/Style/CSS/",
            exampleInput: "body{color:#fff;}",
            exampleOutput: "body {\n\tcolor: #fff;\n}"
        }
    }

    /**
     * CSSBeautify constructor
     */
    constructor() {
        super();

        this.module = "Code";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": Dot("isti", "Indent string"),
                "type": "binaryShortString",
                "value": "\\t"
            }
        ];

    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        let indentStr = gutils.convertASCIICodeInStr(args[0]);
        return vkbeautify.css(input, indentStr);
    }

    getInputOutputEditorLang(): InputOutputEditorLang | null {
        return {
            inputLang: "css",
            outputLang: "css",
        }
    }

}

export default CSSBeautify;
