
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
import { runHash } from "../../../core/lib/Hash.mjs";

/**
 * MD4 operation
 */
class MD4 extends Operation {
  public getOptDetail(): OptDetail {
    return {
      relatedID: 'md5',
      config: {
        "module": "Crypto",
        "description": "The MD4 (Message-Digest 4) algorithm is a cryptographic hash function developed by Ronald Rivest in 1990. The digest length is 128 bits. The algorithm has influenced later designs, such as the MD5, SHA-1 and RIPEMD algorithms.<br><br>The security of MD4 has been severely compromised.",
        "infoURL": "https://wikipedia.org/wiki/MD4",
        "inputType": "ArrayBuffer",
        "outputType": "string",
        "flowControl": false,
        "manualBake": false,
        "args": []
      },
      nousenouseID: 'md4',
      optName: Dot("md4.text.192d3", "Generate {0} Hash", "MD4"),
      optDescription: Dot(
        "md4.desc.1039",
        "This operation hashes data into an {0} hash.",
        "MD4"
      ),
      infoURL: 'https://en.wikipedia.org/wiki/MD4',
      exampleInput: TEXT_INPUT_EXAMPLE_HELLO_WORLD,
      exampleOutput: "b2a5cc34fc21a764ae2fad94d56fadf6",
    }
  }
  /**
   * MD4 constructor
   */
  constructor() {
    super();

    this.name = "MD4";
    this.module = "Crypto";
    this.inputType = "ArrayBuffer";
    this.outputType = "string";
    this.args = [];

  }

  /**
   * @param {ArrayBuffer} input
   * @param {Object[]} args
   * @returns {string}
   */
  run(input, args) {
    return runHash("md4", input);
  }
}

export default MD4;
