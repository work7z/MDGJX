// LafTools
// 
// Date: Sun, 14 Jan 2024
// Second Author: Ryan Laf 
// Description: 
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

/**
 * @author tlwr [toby@toby.codes]
 * @copyright Crown Copyright 2017
 * @license Apache-2.0
 */

import { Dot } from "@/[lang]/client/src/utils/cTranslationUtils";
import { TEXT_INPUT_EXAMPLE_HELLO_WORLD } from './_constants.tsx'
import Operation, { OptDetail } from "../../../core/Operation.tsx";
import Utils from "../../../core/Utils.mjs";
import OperationError from "../../../core/errors/OperationError.mjs";
import { ALPHABET_OPTIONS } from "../../../core/lib/Base58.mjs";

/**
 * To Base58 operation
 */
class ToBase58 extends Operation {
    public getOptDetail(): OptDetail {
        return {
            relatedID: 'base58',
            config: {
                "module": "Default",
                "description": "Base58 (similar to Base64) is a notation for encoding arbitrary byte data. It differs from Base64 by removing easily misread characters (i.e. l, I, 0 and O) to improve human readability.<br><br>This operation encodes data in an ASCII string (with an alphabet of your choosing, presets included).<br><br>e.g. <code>hello world</code> becomes <code>StV1DL6CwTryKyV</code><br><br>Base58 is commonly used in cryptocurrencies (Bitcoin, Ripple, etc).",
                "infoURL": "https://wikipedia.org/wiki/Base58",
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
                                "name": "Bitcoin",
                                "value": "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
                            },
                            {
                                "name": "Ripple",
                                "value": "rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz"
                            }
                        ]
                    }
                ]
            },
            nousenouseID: 'base58',
            infoURL: 'https://en.wikipedia.org/wiki/Base58',
            optName: Dot("M3qytc", "Encode {0}", "Base58"),
            optDescription: Dot(
                "BGdd7dP9",
                "This operation encodes raw data into an ASCII {0} string.",
                "Base58"
            ),
            exampleInput: TEXT_INPUT_EXAMPLE_HELLO_WORLD,
            exampleOutput: "2NEpo7TZRRrLZSi2U",
        }
    }

    /**
     * ToBase58 constructor
     */
    constructor() {
        super();

        this.module = "Default";


        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                "name": Dot("anosdk", "Alphabet"),
                "type": "editableOption",
                "value": ALPHABET_OPTIONS
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
        let alphabet = args[0] || ALPHABET_OPTIONS[0].value,
            result: any = [0];

        alphabet = Utils.expandAlphRange(alphabet).join("");

        if (alphabet.length !== 58 ||
            ([] as any).unique.call(alphabet).length !== 58) {
            throw new OperationError("Error: alphabet must be of length 58");
        }

        if (input.length === 0) return "";

        let zeroPrefix = 0;
        for (let i = 0; i < input.length && input[i] === 0; i++) {
            zeroPrefix++;
        }

        input.forEach(function (b) {
            let carry = (result[0] << 8) + b;
            result[0] = carry % 58;
            carry = (carry / 58) | 0;

            for (let i = 1; i < result.length; i++) {
                carry += result[i] << 8;
                result[i] = carry % 58;
                carry = (carry / 58) | 0;
            }

            while (carry > 0) {
                result.push(carry % 58);
                carry = (carry / 58) | 0;
            }
        });

        result = result.map(function (b) {
            return alphabet[b];
        }).reverse().join("");

        while (zeroPrefix--) {
            result = alphabet[0] + result;
        }

        return result;
    }

}

export default ToBase58;
