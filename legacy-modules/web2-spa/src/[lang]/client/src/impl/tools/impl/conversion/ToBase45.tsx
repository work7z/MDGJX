// LafTools
// 
// Date: Sun, 14 Jan 2024
// Second Author: Ryan Laf 
// Description: 
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

/**
 * @author Thomas Weißschuh [thomas@t-8ch.de]
 * @copyright Crown Copyright 2021
 * @license Apache-2.0
 */

import { Dot } from "@/[lang]/client/src/utils/cTranslationUtils";
import { TEXT_INPUT_EXAMPLE_HELLO_WORLD } from './_constants.tsx'
import { ALPHABET, highlightToBase45, highlightFromBase45 } from "../../../core/lib/Base45.mjs";
import Operation, { OptDetail } from "../../../core/Operation.tsx";
import Utils from "../../../core/Utils.mjs";

/**
 * To Base45 operation
 */
class ToBase45 extends Operation {
    public getOptDetail(): OptDetail {
        return {
            relatedID: 'base45',
            config: {
                "module": "Default",
                "description": "Base45 is a notation for encoding arbitrary byte data using a restricted set of symbols that can be conveniently used by humans and processed by computers. The high number base results in shorter strings than with the decimal or hexadecimal system. Base45 is optimized for usage with QR codes.",
                "infoURL": "https://wikipedia.org/wiki/List_of_numeral_systems",
                "inputType": "ArrayBuffer",
                "outputType": "string",
                "flowControl": false,
                "manualBake": false,
                "args": [
                    {
                        "name": Dot("anosdk", "Alphabet"),
                        "type": "string",
                        "value": "0-9A-Z $%*+\\-./:"
                    }
                ]
            },
            infoURL: 'https://datatracker.ietf.org/doc/draft-faltstrom-base45/',
            nousenouseID: 'base45',
            optName: Dot("M3ytc", "Encode {0}", "Base45"),
            optDescription: Dot(
                "BGd7dP9",
                "This operation encodes raw data into an ASCII {0} string.",
                "Base45"
            ),
            exampleOutput: "%69 VD82EI2B.KESTC",
            exampleInput: TEXT_INPUT_EXAMPLE_HELLO_WORLD,

        }
    }

    /**
     * ToBase45 constructor
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
                value: ALPHABET
            }
        ];

        this.highlight = highlightToBase45;
        this.highlightReverse = highlightFromBase45;
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        if (!input) return "";
        input = new Uint8Array(input);
        const alphabet: any[] = Utils.expandAlphRange(args[0]);

        const res: any[] = [];

        for (const pair of Utils.chunked(input, 2)) {
            let b = 0;
            for (const e of pair) {
                b *= 256;
                b += e;
            }

            let chars = 0;
            do {
                res.push(alphabet[b % 45]);
                chars++;
                b = Math.floor(b / 45);
            } while (b > 0);

            if (chars < 2) {
                res.push("0");
                chars++;
            }
            if (pair.length > 1 && chars < 3) {
                res.push("0");
            }
        }


        return res.join("");

    }

}

export default ToBase45;
