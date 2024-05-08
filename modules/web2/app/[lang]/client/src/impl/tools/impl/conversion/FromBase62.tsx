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
import { Dot } from "@/app/[lang]/client/src/utils/cTranslationUtils";
import { TEXT_INPUT_EXAMPLE_HELLO_WORLD } from './_constants.tsx'


/**
 * From Base62 operation
 */
class FromBase62 extends Operation {
    public getOptDetail(): OptDetail {
        return {
            relatedID: 'base62',
            config: {
                "module": "Default",
                "description": "Base62 is a notation for encoding arbitrary byte data using a restricted set of symbols that can be conveniently used by humans and processed by computers. The high number base results in shorter strings than with the decimal or hexadecimal system.",
                "infoURL": "https://wikipedia.org/wiki/List_of_numeral_systems",
                "inputType": "string",
                "outputType": "byteArray",
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
            infoURL: "https://en.wikipedia.org/wiki/Base62",

            nousenouseID: 'frombase58',
            optName: Dot("L9bQku", "Decode {0}", "Base62"),
            optDescription: Dot(
                "JdqiUE8",
                "This operation decodes data from an ASCII string (with an alphabet of your choosing, presets included) back into its raw form.",
            ),
            // example for from base62

            exampleOutput: TEXT_INPUT_EXAMPLE_HELLO_WORLD,
            exampleInput: "T8dgcjRGkZ3aysdN",





        }
    }

    /**
     * FromBase62 constructor
     */
    constructor() {
        super();

        this.name = "From Base62";
        this.module = "Default";
        // this.description = "";
        // this.infoURL = "https://wikipedia.org/wiki/List_of_numeral_systems";
        this.inputType = "string";
        this.outputType = "byteArray";
        this.args = [
            {
                name: Dot("skq3i12", "Alphabet"),
                type: "string",
                value: "0-9A-Za-z"
            }
        ];




    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {byteArray}
     */
    run(input, args) {
        if (input.length < 1) return [];
        const alphabet = Utils.expandAlphRange(args[0]).join("");
        const BN62 = BigNumber.clone({ ALPHABET: alphabet });

        const re = new RegExp("[^" + alphabet.replace(/[[\]\\\-^$]/g, "\\$&") + "]", "g");
        input = input.replace(re, "");

        // Read number in using Base62 alphabet
        const number = new BN62(input, 62);
        // Copy to new BigNumber object that uses the default alphabet
        const normalized = new BigNumber(number);

        // Convert to hex and add leading 0 if required
        let hex = normalized.toString(16);
        if (hex.length % 2 !== 0) hex = "0" + hex;

        return Utils.convertToByteArray(hex, "Hex");
    }

}

export default FromBase62;
