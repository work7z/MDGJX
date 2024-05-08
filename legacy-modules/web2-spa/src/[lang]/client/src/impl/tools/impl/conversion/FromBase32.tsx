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

/**
 * From Base32 operation
 */
class FromBase32 extends Operation {
    public getOptDetail(): OptDetail {
        return {
            relatedID: 'base32',
            config: {
                "module": "Default",
                "description": "Base32 is a notation for encoding arbitrary byte data using a restricted set of symbols that can be conveniently used by humans and processed by computers. It uses a smaller set of characters than Base64, usually the uppercase alphabet and the numbers 2 to 7.",
                "infoURL": "https://wikipedia.org/wiki/Base32",
                "inputType": "string",
                "outputType": "byteArray",
                "flowControl": false,
                "manualBake": false,
                "args": [
                    {
                        "name": Dot("anosdk", "Alphabet"),
                        "type": "binaryString",
                        "value": "A-Z2-7="
                    },
                    {
                        "name": Dot("nskqw", "Remove non-alphabet chars"),
                        "type": "boolean",
                        "value": true
                    }
                ],
                "checks": [
                    {
                        "pattern": "^(?:[A-Z2-7]{8})+(?:[A-Z2-7]{2}={6}|[A-Z2-7]{4}={4}|[A-Z2-7]{5}={3}|[A-Z2-7]{7}={1})?$",
                        "flags": "",
                        "args": [
                            "A-Z2-7=",
                            false
                        ]
                    }
                ]
            },
            infoURL: "https://en.wikipedia.org/wiki/Base32",

            nousenouseID: 'frombase32',
            optName: Dot("rVdu", "Decode {0}", "Base32"),
            optDescription: Dot(
                "JiUE8",
                "This operation decodes data from an ASCII {0} string back into its raw format.",
                "Base32"
            ),
            // example for base32
            exampleInput: "JBSWY3DPEBLW64TMMQQQ::::",
            exampleOutput: TEXT_INPUT_EXAMPLE_HELLO_WORLD,


        }
    }

    /**
     * FromBase32 constructor
     */
    constructor() {
        super();

        this.name = "From Base32";
        this.module = "Default";
        this.inputType = "string";
        this.outputType = "byteArray";


        this.args = [
            {
                name: Dot("skq3i12", "Alphabet"),
                type: "binaryString",
                value: "A-Z2-7="
            },
            {
                name: Dot("nskqw", "Remove non-alphabet chars"),
                type: "boolean",
                value: true
            }
        ];
        this.checks = [
            {
                pattern: "^(?:[A-Z2-7]{8})+(?:[A-Z2-7]{2}={6}|[A-Z2-7]{4}={4}|[A-Z2-7]{5}={3}|[A-Z2-7]{7}={1})?$",
                flags: "",
                args: ["A-Z2-7=", false]
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {byteArray}
     */
    run(input, args) {
        if (!input) return [];

        const alphabet = args[0] ?
            Utils.expandAlphRange(args[0]).join("") : "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
            removeNonAlphChars = args[1],
            output: any[] = [];

        let chr1, chr2, chr3, chr4, chr5,
            enc1, enc2, enc3, enc4, enc5, enc6, enc7, enc8,
            i = 0;

        if (removeNonAlphChars) {
            const re = new RegExp("[^" + alphabet.replace(/[\]\\\-^]/g, "\\$&") + "]", "g");
            input = input.replace(re, "");
        }

        while (i < input.length) {
            enc1 = alphabet.indexOf(input.charAt(i++));
            enc2 = alphabet.indexOf(input.charAt(i++) || "=");
            enc3 = alphabet.indexOf(input.charAt(i++) || "=");
            enc4 = alphabet.indexOf(input.charAt(i++) || "=");
            enc5 = alphabet.indexOf(input.charAt(i++) || "=");
            enc6 = alphabet.indexOf(input.charAt(i++) || "=");
            enc7 = alphabet.indexOf(input.charAt(i++) || "=");
            enc8 = alphabet.indexOf(input.charAt(i++) || "=");

            chr1 = (enc1 << 3) | (enc2 >> 2);
            chr2 = ((enc2 & 3) << 6) | (enc3 << 1) | (enc4 >> 4);
            chr3 = ((enc4 & 15) << 4) | (enc5 >> 1);
            chr4 = ((enc5 & 1) << 7) | (enc6 << 2) | (enc7 >> 3);
            chr5 = ((enc7 & 7) << 5) | enc8;

            output.push(chr1);
            if ((enc2 & 3) !== 0 || enc3 !== 32) output.push(chr2);
            if ((enc4 & 15) !== 0 || enc5 !== 32) output.push(chr3);
            if ((enc5 & 1) !== 0 || enc6 !== 32) output.push(chr4);
            if ((enc7 & 7) !== 0 || enc8 !== 32) output.push(chr5);
        }

        return output;
    }

}

export default FromBase32;
