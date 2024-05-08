
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
 * MD5 operation
 */
class MD5 extends Operation {
  public getOptDetail(): OptDetail {
    return {
      relatedID: 'md5',
      config: {
        "module": "Crypto",
        "description": "MD5 (Message-Digest 5) is a widely used hash function. It has been used in a variety of security applications and is also commonly used to check the integrity of files.<br><br>However, MD5 is not collision resistant and it isn't suitable for applications like SSL/TLS certificates or digital signatures that rely on this property.",
        "infoURL": "https://wikipedia.org/wiki/MD5",
        "inputType": "ArrayBuffer",
        "outputType": "string",
        "flowControl": false,
        "manualBake": false,
        "args": []
      },
      infoURL: 'https://en.wikipedia.org/wiki/MD5',
      nousenouseID: 'md5',
      optName: Dot("md5.textiDjMIo", "Generate {0} Hash", "MD5"),
      optDescription: Dot(
        "md5.desc.rxsHq",
        "This operation hashes data into an {0} hash.",
        "MD5"
      ),
      exampleInput: TEXT_INPUT_EXAMPLE_HELLO_WORLD,
      exampleOutput: "ed076287532e86365e841e92bfc50d8c"
    }
  }
  /**
   * MD5 constructor
   */
  constructor() {
    super();

    this.name = "MD5";
    this.module = "Crypto";
    // this.infoURL = "";
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
    return runHash("md5", input);
  }
}

export default MD5;
