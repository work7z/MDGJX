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
import parserTypescript from "prettier/esm/parser-typescript.mjs";
import prettier from "prettier/esm/standalone.mjs";


export default class TypeScriptBeautify extends Operation {
    public getOptDetail(): OptDetail {
        return {
            relatedID: 'javascript',
            config: {
                "module": "Code",
                "description": Dot("397ncs757", "Indents and prettifies TypeScript code."),
                "infoURL": null,
                "inputType": "string",
                "outputType": "string",
                "flowControl": false,
                "manualBake": false,
                "args": [
                    // {    
                    //     "name": Dot("isti", "Indent string"),
                    //     "type": "binaryShortString",
                    //     "value": "\\t"
                    // }
                ]
            },
            nousenouseID: 'typescript-beautify',
            optName: Dot("typescript.format.btn", "Format {0}", 'TypeScript'),
            optDescription: Dot(
                "typescript.format.desc",
                "Indents and prettifies TypeScript code.",
            ),
            infoURL: "https://www.typescriptlang.org/",
            exampleInput: "function hello(name: string) {\n    console.log(   `Hello, ${name}!`);\n}",
            exampleOutput: "function hello(name: string) {\n    console.log(`Hello, ${name}!`);\n}",
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
        ];
    }

    run(input, args) {
        return prettier.format(input, {
            parser: "typescript",
            plugins: [parserTypescript],
        });
    }

    getInputOutputEditorLang(): InputOutputEditorLang | null {
        return {
            inputLang: "typescript",
            outputLang: "typescript"
        }
    }
}

