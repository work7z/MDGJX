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
import { Dot } from "@/[lang]/client/src/utils/cTranslationUtils";
import { TEXT_INPUT_EXAMPLE_HELLO_WORLD } from './_constants.tsx'
import Operation, { OptDetail } from "../../../core/Operation.tsx";
import Utils from "../../../core/Utils.mjs";
import gutils from "@/[lang]/client/src/utils//GlobalUtils.tsx";
import escodegen from "escodegen";
import * as esprima from "esprima";
import OperationError from "../../../core/errors/OperationError.mjs";
import { InputOutputEditorLang } from "../../../purejs-types.tsx";

/**
 * JavaScript Beautify operation
 */
class JavaScriptBeautify extends Operation {
    public getOptDetail(): OptDetail {
        return {
            relatedID: 'javascript',
            config: {
                "module": "Code",
                "description": "Parses and pretty prints valid JavaScript code. Also works with JavaScript Object Notation (JSON).",
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
                    },
                    {
                        "name": "Quotes",
                        "type": "option",
                        "value": [
                            "Auto",
                            "Single",
                            "Double"
                        ]
                    },
                    {
                        "name": "Semicolons before closing braces",
                        "type": "boolean",
                        "value": true
                    },
                    {
                        "name": "Include comments",
                        "type": "boolean",
                        "value": true
                    }
                ]
            },
            nousenouseID: 'jsbeautify',
            infoURL: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
            optName: Dot("6UICxHdzVR.name", "Format {0}", "JavaScript"),
            optDescription: Dot(
                "WFUWzv_px",
                "Parses and pretty prints valid JavaScript code. Also works with JavaScript Object Notation (JSON).",
            ),
            exampleInput: "let a = 'test'; // just for fun\n let obj = {a: 1, b: 2};",
            exampleOutput: "let a = 'test';\n// just for fun//\nlet obj = {\n    a: 1,\n    b: 2\n};\n",
        }
    }

    /**
     * JavaScriptBeautify constructor
     */
    constructor() {
        super();

        this.name = "JavaScript Beautify";
        this.module = "Code";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": Dot("isti", "Indent string"),
                "type": "binaryShortString",
                "value": "\\t"
            },
            {
                "name": "Quotes",
                "type": "option",
                "value": ["Auto", "Single", "Double"]
            },
            {
                "name": "Semicolons before closing braces",
                "type": "boolean",
                "value": true
            },
            {
                "name": "Include comments",
                "type": "boolean",
                "value": true
            }
        ];


    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        console.log('args', args)
        const beautifyIndent = args[0] || "\\t",
            quotes = args[1].toLowerCase(),
            [, , beautifySemicolons, beautifyComment] = args;
        let result = "",
            AST;

        try {
            AST = esprima.parseScript(input, {
                range: true,
                tokens: true,
                comment: true
            });

            const options = {
                format: {
                    indent: {
                        style: beautifyIndent
                    },
                    quotes: quotes,
                    semicolons: beautifySemicolons,
                },
                comment: beautifyComment
            };

            if (options.comment)
                AST = escodegen.attachComments(AST, AST.comments, AST.tokens);

            result = escodegen.generate(AST, options);
        } catch (e: any) {
            // Leave original error so the user can see the detail
            throw new OperationError("Unable to parse JavaScript.<br>" + e.message);
        }
        return result;
    }

    getInputOutputEditorLang(): InputOutputEditorLang | null {
        return {
            inputLang: "javascript",
            outputLang: "javascript",
        }
    }
}

export default JavaScriptBeautify;
