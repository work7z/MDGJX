// LafTools
// 
// Date: Sun, 14 Jan 2024
// Second Author: Ryan Laf 
// Description: 
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

/**
 * @author tcode2k16 [tcode2k16@gmail.com]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 */

import Operation, { OptDetail } from "../../../core/Operation.tsx";
import BigNumber from "bignumber.js";
import Utils from "../../../core/Utils.mjs";
import { toHexFast } from "../../../core/lib/Hex.mjs";
import { Dot } from "@/app/[lang]/client/src/utils/cTranslationUtils";
import { TEXT_INPUT_EXAMPLE_HELLO_WORLD } from './_constants.tsx'

/**
 * To Base62 operation
 */
class ToBase62 extends Operation {
    public getOptDetail(): OptDetail {
        return {
            relatedID: 'base62',
            config: {
                "module": "Default",
                "description": "Base62 is a notation for encoding arbitrary byte data using a restricted set of symbols that can be conveniently used by humans and processed by computers. The high number base results in shorter strings than with the decimal or hexadecimal system.",
                "infoURL": "https://wikipedia.org/wiki/List_of_numeral_systems",
                "inputType": "ArrayBuffer",
                "outputType": "string",
                "flowControl": false,
                "manualBake": false,
                "args": [
                    {
                        "name": Dot("anosdk", "Alphabet"),
                        "type": "string",
                        "value": "0-9A-Za-z"
                    }
                ]
            },
            nousenouseID: 'tobase62',
            optName: Dot("M3ytc", "Encode {0}", "Base62"),
            optDescription: Dot(
                "BGd7dP9",
                "This operation encodes raw data into an ASCII {0} string.",
                "Base62"
            ),
            infoURL: "https://en.wikipedia.org/wiki/Base62",
            exampleInput: TEXT_INPUT_EXAMPLE_HELLO_WORLD,
            exampleOutput: "T8dgcjRGkZ3aysdN",

        }
    }

    /**
     * ToBase62 constructor
     */
    constructor() {
        super();

        this.module = "Default";




        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                name: Dot("skq3i12", "Alphabet"),
                type: "string",
                value: "0-9A-Za-z"
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
        if (input.length < 1) return "";

        const alphabet = Utils.expandAlphRange(args[0]).join("");
        const BN62 = BigNumber.clone({ ALPHABET: alphabet });

        input = toHexFast(input).toUpperCase();

        // Read number in as hex using normal alphabet
        const normalized = new BigNumber(input, 16);
        // Copy to BigNumber clone that uses the specified Base62 alphabet
        const number = new BN62(normalized);

        return number.toString(62);
    }

}

export default ToBase62;
