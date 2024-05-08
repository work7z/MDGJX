
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

import { Dot } from "../../../../utils/cTranslationUtils.tsx";
import Operation, { OptDetail } from "../../../core/Operation.tsx";
import { runHash } from "../../../core/lib/Hash.mjs";
import { TEXT_INPUT_EXAMPLE_HELLO_WORLD } from "./_constants.tsx";

/**
 * SHA1 operation
 */
class SHA1 extends Operation {
  public getOptDetail(): OptDetail {
    return {
      relatedID: 'sha',

      config: {
        "module": "Crypto",
        "description": "The SHA (Secure Hash Algorithm) hash functions were designed by the NSA. SHA-1 is the most established of the existing SHA hash functions and it is used in a variety of security applications and protocols.<br><br>However, SHA-1's collision resistance has been weakening as new attacks are discovered or improved. The message digest algorithm consists, by default, of 80 rounds.",
        "infoURL": "https://wikipedia.org/wiki/SHA-1",
        "inputType": "ArrayBuffer",
        "outputType": "string",
        "flowControl": false,
        "manualBake": false,
        "args": [
          {
            "name": "Rounds",
            "type": "number",
            "value": 80,
            "min": 16
          }
        ]
      },
      optName: "SHA1",
      nousenouseID: 'sha1',
      exampleInput: TEXT_INPUT_EXAMPLE_HELLO_WORLD,
      exampleOutput: "2ef7bde608ce5404e97d5f042f95f89f1c232871",
      optDescription: Dot("B_ekZSOiu", "The SHA (Secure Hash Algorithm) hash functions were designed by the NSA. SHA-1 is the most established of the existing SHA hash functions and it is used in a variety of security applications and protocols.<br><br>However, SHA-1's collision resistance has been weakening as new attacks are discovered or improved. The message digest algorithm consists, by default, of 80 rounds."),
      infoURL: "https://wikipedia.org/wiki/SHA-1"
    }
  }
  /**
   * SHA1 constructor
   */
  constructor() {
    super();

    this.module = "Crypto";
    this.inputType = "ArrayBuffer";
    this.outputType = "string";
    this.args = [
      {
        name: "Rounds",
        type: "number",
        value: 80,
        min: 16,
      },
    ];
  }

  /**
   * @param {ArrayBuffer} input
   * @param {Object[]} args
   * @returns {string}
   */
  run(input, args) {
    return runHash("sha1", input, { rounds: args[0] });
  }
}

export default SHA1;
