
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
import OperationError from "../../../core/errors/OperationError.mjs";
import NodeMD6 from "node-md6";

/**
 * MD6 operation
 */
class MD6 extends Operation {
  public getOptDetail(): OptDetail {
    return {
      relatedID: 'md5',
      config: {
        "module": "Crypto",
        "description": "The MD6 (Message-Digest 6) algorithm is a cryptographic hash function. It uses a Merkle tree-like structure to allow for immense parallel computation of hashes for very long inputs.",
        "infoURL": "https://wikipedia.org/wiki/MD6",
        "inputType": "string",
        "outputType": "string",
        "flowControl": false,
        "manualBake": false,
        "args": [
          {
            "name": "Size",
            "type": "number",
            "value": 256
          },
          {
            "name": "Levels",
            "type": "number",
            "value": 64
          },
          {
            "name": "Key",
            "type": "string",
            "value": ""
          }
        ]
      },
      infoURL: 'https://en.wikipedia.org/wiki/MD6',
      nousenouseID: 'md6',
      optName: Dot("md6.text.192d3", "Generate {0} Hash", "MD6"),
      optDescription: Dot(
        "md6.desc.1039",
        "This operation hashes data into an {0} hash.",
        "MD6"
      ),
      exampleInput: TEXT_INPUT_EXAMPLE_HELLO_WORLD,
      exampleOutput: "6270a6d976267aa1224ac8d905dec46a96f6b62f6b6e9bb8085c2e946c1eb576",
    }
  }
  /**
   * MD6 constructor
   */
  constructor() {
    super();

    this.name = "MD6";
    this.module = "Crypto";
    this.inputType = "string";
    this.outputType = "string";
    this.args = [
      {
        name: "Size",
        type: "number",
        value: 256,
      },
      {
        name: "Levels",
        type: "number",
        value: 64,
      },
      {
        name: "Key",
        type: "string",
        value: "",
      },
    ];
  }

  /**
   * @param {string} input
   * @param {Object[]} args
   * @returns {string}
   */
  run(input, args) {

    const [size, levels, key] = args;

    if (size < 0 || size > 512)
      throw new OperationError(Dot("CFg8B", "Size must be between 0 and 512"));
    if (levels < 0) throw new OperationError(Dot("DqFI5", "Levels must be greater than 0"));

    return NodeMD6.getHashOfText(input, size, key, levels);
  }
}

export default MD6;
