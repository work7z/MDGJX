
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

import { Dot } from "@/__CORE__/utils/cTranslationUtils.tsx";
import Operation, { OptDetail } from "../../../core/Operation.tsx";
import { runHash } from "../../../core/lib/Hash.mjs";
import { TEXT_INPUT_EXAMPLE_HELLO_WORLD } from "./_constants.tsx";

/**
 * SHA0 operation
 */
class SHA0 extends Operation {
  public getOptDetail(): OptDetail {
    return {
      relatedID: 'sha',
      config: {
        "module": "Crypto",
        "description": "SHA-0 is a retronym applied to the original version of the 160-bit hash function published in 1993 under the name 'SHA'. It was withdrawn shortly after publication due to an undisclosed 'significant flaw' and replaced by the slightly revised version SHA-1. The message digest algorithm consists, by default, of 80 rounds.",
        "infoURL": "https://wikipedia.org/wiki/SHA-1#SHA-0",
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
      optName: "SHA0",
      nousenouseID: 'sha0',
      optDescription: Dot("LgJAz6Xwr", "SHA-0 is a retronym applied to the original version of the 160-bit hash function published in 1993 under the name 'SHA'. It was withdrawn shortly after publication due to an undisclosed 'significant flaw' and replaced by the slightly revised version SHA-1. The message digest algorithm consists, by default, of 80 rounds."),
      infoURL: "https://wikipedia.org/wiki/SHA-1#SHA-0",
      exampleInput: TEXT_INPUT_EXAMPLE_HELLO_WORLD,
      exampleOutput: "2ef7bde608ce5404e97d5f042f95f89f1c232871"
    }
  }
  /**
   * SHA0 constructor
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
    return runHash("sha0", input, { rounds: args[0] });
  }
}

export default SHA0;
