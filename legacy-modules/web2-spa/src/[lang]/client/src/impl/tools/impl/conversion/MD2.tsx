
// Date: Sun, 14 Jan 2024
// Author: LafTools Team - FX <work7z@outlook.com>
// Ryan Laf <work7z@outlook.com>
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
import { runHash } from "../../../core/lib/Hash.mjs";

/**
 * MD2 operation
 */
class MD2 extends Operation {
  public getOptDetail(): OptDetail {
    return {
      relatedID: 'md5',
      config: {
        "module": "Crypto",
        "description": "The MD2 (Message-Digest 2) algorithm is a cryptographic hash function developed by Ronald Rivest in 1989. The algorithm is optimized for 8-bit computers.<br><br>Although MD2 is no longer considered secure, even as of 2014, it remains in use in public key infrastructures as part of certificates generated with MD2 and RSA. The message digest algorithm consists, by default, of 18 rounds.",
        "infoURL": "https://wikipedia.org/wiki/MD2_(cryptography)",
        "inputType": "ArrayBuffer",
        "outputType": "string",
        "flowControl": false,
        "manualBake": false,
        "args": [
          {
            "name": "Rounds",
            "type": "number",
            "value": 18,
            "min": 0
          }
        ]
      },
      infoURL: 'https://en.wikipedia.org/wiki/MD2_(cryptography)',
      nousenouseID: 'md2',
      optName: Dot("md2.text.192d3", "Generate {0} Hash", "MD2"),
      optDescription: Dot(
        "md2.desc.1039",
        "This operation hashes data into an {0} hash.",
        "MD2"
      ),
      exampleInput: TEXT_INPUT_EXAMPLE_HELLO_WORLD,
      exampleOutput: "315f7c67223f01fb7cab4b95100e872e",
    }
  }
  /**
   * MD2 constructor
   */
  constructor() {
    super();

    this.name = "MD2";
    this.module = "Crypto";
    this.inputType = "ArrayBuffer";
    this.outputType = "string";
    this.args = [
      {
        name: "Rounds",
        type: "number",
        value: 18,
        min: 0,
      },
    ];


  }

  /**
   * @param {ArrayBuffer} input
   * @param {Object[]} args
   * @returns {string}
   */
  run(input, args) {
    return runHash("md2", input, { rounds: args[0] });
  }
}

export default MD2;
