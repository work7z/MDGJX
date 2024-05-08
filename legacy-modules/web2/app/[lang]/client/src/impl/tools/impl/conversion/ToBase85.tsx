// LafTools
// 
// Date: Sun, 14 Jan 2024
// Second Author: Ryan Laf 
// Description: 
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

/**
 * @author PenguinGeorge [george@penguingeorge.com]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 */

import Operation, { OptDetail } from "../../../core/Operation.tsx";
import OperationError from "../../../core/errors/OperationError.mjs";
import Utils from "../../../core/Utils.mjs";
import { alphabetName, ALPHABET_OPTIONS } from "../../../core/lib/Base85.mjs";
import { Dot } from "@/app/[lang]/client/src/utils/cTranslationUtils";
import { TEXT_INPUT_EXAMPLE_HELLO_WORLD } from './_constants.tsx'

/**
 * To Base85 operation
 */
class ToBase85 extends Operation {
    public getOptDetail(): OptDetail {
        return {
            relatedID: 'base85',
            config: {
                "module": "Default",
                "description": "Base85 (also called Ascii85) is a notation for encoding arbitrary byte data. It is usually more efficient that Base64.<br><br>This operation encodes data in an ASCII string (with an alphabet of your choosing, presets included).<br><br>e.g. <code>hello world</code> becomes <code>BOu!rD]j7BEbo7</code><br><br>Base85 is commonly used in Adobe's PostScript and PDF file formats.<br><br><strong>Options</strong><br><u>Alphabet</u><ul><li>Standard - The standard alphabet, referred to as Ascii85</li><li>Z85 (ZeroMQ) - A string-safe variant of Base85, which avoids quote marks and backslash characters</li><li>IPv6 - A variant of Base85 suitable for encoding IPv6 addresses (RFC 1924)</li></ul><u>Include delimiter</u><br>Adds a '<~' and '~>' delimiter to the start and end of the data. This is standard for Adobe's implementation of Base85.",
                "infoURL": "https://wikipedia.org/wiki/Ascii85",
                "inputType": "ArrayBuffer",
                "outputType": "string",
                "flowControl": false,
                "manualBake": false,
                "args": [
                    {
                        "name": Dot("anosdk", "Alphabet"),
                        "type": "editableOption",
                        "value": [
                            {
                                "name": "Standard",
                                "value": "!-u"
                            },
                            {
                                "name": "Z85 (ZeroMQ)",
                                "value": "0-9a-zA-Z.\\-:+=^!/*?&<>()[]{}@%$#"
                            },
                            {
                                "name": "IPv6",
                                "value": "0-9A-Za-z!#$%&()*+\\-;<=>?@^_`{|}~"
                            }
                        ]
                    },
                    {
                        "name": "Include delimeter",
                        "type": "boolean",
                        "value": false
                    }
                ]
            },
            nousenouseID: 'tobase85',
            infoURL: 'https://en.wikipedia.org/wiki/Ascii85',
            optName: Dot("M3ytc", "Encode {0}", "Base85"),
            optDescription: Dot(
                "nodBw",
                "This operation encodes raw data into an ASCII {0} string.",
                "Base85"
            ),
            exampleInput: TEXT_INPUT_EXAMPLE_HELLO_WORLD,
            exampleOutput: "87cURD]i,\"Ebo80",
        }
    }

    /**
     * To Base85 constructor
     */
    constructor() {
        super();

        this.module = "Default";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                name: Dot("skq3i12", "Alphabet"),
                type: "editableOption",
                value: ALPHABET_OPTIONS
            },
            {
                name: "Include delimeter",
                type: "boolean",
                value: false
            }
        ];


    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
    */
    run(input, args) {
        input = new Uint8Array(input);
        const alphabet = Utils.expandAlphRange(args[0]).join(""),
            encoding = alphabetName(alphabet),
            includeDelim = args[1];
        let result = "";

        if (alphabet.length !== 85 ||
            ([] as any).unique.call(alphabet).length !== 85) {
            throw new OperationError("Error: Alphabet must be of length 85");
        }

        if (input.length === 0) return "";

        let block: number;
        for (let i = 0; i < input.length; i += 4) {
            block = (
                ((input[i]) << 24) +
                ((input[i + 1] || 0) << 16) +
                ((input[i + 2] || 0) << 8) +
                ((input[i + 3] || 0))
            ) >>> 0;

            if (encoding !== "Standard" || block > 0) {
                let digits: any = [];
                for (let j = 0; j < 5; j++) {
                    digits.push((block as any) % 85);
                    block = Math.floor(block / 85);
                }

                digits = digits.reverse();

                if (input.length < i + 4) {
                    digits.splice(input.length - (i + 4), 4);
                }

                result += digits.map(digit => alphabet[digit]).join("");
            } else {
                result += (encoding === "Standard") ? "z" : null;
            }
        }

        return includeDelim ? `<~${result}~>` : result;
    }
}

export default ToBase85;
