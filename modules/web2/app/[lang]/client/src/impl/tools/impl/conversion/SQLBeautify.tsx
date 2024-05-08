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
import { Dot } from "@/app/[lang]/client/src/utils/cTranslationUtils";
import { TEXT_INPUT_EXAMPLE_HELLO_WORLD } from './_constants.tsx'
import Operation, { OptDetail } from "../../../core/Operation.tsx";
import Utils from "../../../core/Utils.mjs";
import gutils from "@/app/[lang]/client/src/utils//GlobalUtils.tsx";
import { InputOutputEditorLang } from "../../../purejs-types.tsx";

/**
 * SQL Beautify operation
 */
class SQLBeautify extends Operation {
    public getOptDetail(): OptDetail {
        return {
            relatedID: 'sql',
            config: {

                "module": "Code",
                "description": "Indents and prettifies Structured Query Language (SQL) code.",
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
            infoURL: "https://en.wikipedia.org/wiki/SQL",
            nousenouseID: "sql-beautify",
            optName: Dot("json-beautify.name.0912", "Format {0}", 'SQL'),
            optDescription: Dot(
                "rE6fUsSGl",
                "Indents and prettifies Structured Query Language (SQL) code."
            ),
            exampleInput: 'SELECT * FROM table WHERE id = 1',
            exampleOutput: 'SELECT\n\t*\nFROM\n\ttable\nWHERE\n\tid = 1',
        }
    }

    /**
     * SQLBeautify constructor
     */
    constructor() {
        super();

        this.module = "Code";
        // this.description =;
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
        const indentStr = args[0];
        return vkbeautify.sql(input, indentStr);
    }

    getInputOutputEditorLang(): InputOutputEditorLang | null {
        return {
            inputLang: 'mysql',
            outputLang: 'mysql'
        }
    }
}

export default SQLBeautify;
