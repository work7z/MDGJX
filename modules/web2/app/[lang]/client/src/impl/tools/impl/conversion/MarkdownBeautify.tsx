// LafTools
// 
// Date: Sun, 14 Jan 2024
// Second Author: Ryan Laf 
// Description: 
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc
import { Dot } from "@/app/[lang]/client/src/utils/cTranslationUtils";
import { TEXT_INPUT_EXAMPLE_HELLO_WORLD } from './_constants.tsx'
import Operation, { OptDetail } from "../../../core/Operation.tsx";
import Utils from "../../../core/Utils.mjs";
import gutils from "@/app/[lang]/client/src/utils//GlobalUtils.tsx";
import { InputOutputEditorLang } from "../../../purejs-types.tsx";
import parserMarkdown from "prettier/esm/parser-markdown.mjs";
import prettier from "prettier/esm/standalone.mjs";


// write a class for MarkdownBeautify like CSSBeautify
export default class MarkdownBeautify extends Operation {
    public getOptDetail(): OptDetail {
        return {
            relatedID: 'text',
            config: {
                "module": "Code",
                "description": "Indents and prettifies Markdown document.",
                "infoURL": null,
                "inputType": "string",
                "outputType": "string",
                "flowControl": false,
                "manualBake": false,
                "args": [
                    // {
                    //     "name": Dot("istqwi", "Indent string"),
                    //     "type": "binaryShortString",
                    //     "value": "\\t"
                    // }
                ]
            },
            nousenouseID: 'mdbeautify',
            optName: Dot("3TMOUekhZl", "Format {0}", "Markdown"),
            optDescription: Dot(
                "md2aO2NaJqITm",
                "Indents and prettifies Markdown document.",
            ),
            infoURL: "https://www.markdownguide.org/",
            exampleInput: "# Hello, world!\n=============\n   ## Subtitle\n",
            exampleOutput: "# Hello, world!\n=============\n## Subtitle\n",
        }
    }

    /**
     * MarkdownBeautify constructor
     */
    constructor() {
        super();

        this.module = "Code";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            // {
            //     "name": Dot("isti", "Indent string"),
            //     "type": "binaryShortString",
            //     "value": "\\t"
            // }
        ];
    }

    run(input, args) {
        return prettier.format(input, {
            parser: "markdown",
            plugins: [parserMarkdown],
        });
    }

    getInputOutputEditorLang(): InputOutputEditorLang | null {
        return {
            inputLang: "markdown",
            outputLang: "markdown"
        }
    }
}

