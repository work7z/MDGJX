
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

import { Dot } from "@/[lang]/client/src/utils/cTranslationUtils.tsx";
import OperationError from "../../../core/errors/OperationError.mjs";
import {
  ENCODING_SCHEME,
  ENCODING_LOOKUP,
  FORMAT,
} from "../../../core/lib/BCD.mjs";
import BigNumber from "bignumber.js";
import Operation, { OptDetail } from "../../../core/Operation";
import { fromBinary } from "../../../core/lib/Binary.mjs";
import Utils from "../../../core/Utils.mjs";
import { BIN_DELIM_OPTIONS } from "../../../core/lib/Delim.mjs";


/**
 * From Binary operation
 */
class FromBinary extends Operation {
  public getOptDetail(): OptDetail {
    return {
      relatedID: "fromto",
      config: {
        flowControl: false,
        manualBake: false,
        "module": "Default",
        "description": "Converts a binary string back into its raw form.<br><br>e.g. <code>01001000 01101001</code> becomes <code>Hi</code>",
        "infoURL": "https://wikipedia.org/wiki/Binary_code",
        "inputType": "string",
        "outputType": "byteArray",
        "args": [
          {
            "name": "Delimiter",
            "type": "option",
            "value": [
              "None",
              "Space",
              "Comma",
              "Semi-colon",
              "Colon",
              "Line feed",
              "CRLF"
            ]
          },
          {
            "name": "Byte Length",
            "type": "number",
            "value": 8,
            "min": 1
          }
        ]
      },
      infoURL: "https://en.wikipedia.org/wiki/Binary_code",
      nousenouseID: "fromBinary",
      optName: Dot("fromBinarKezpBENwt3", "From {0}", Dot("QB9HtMaFb", 'Binary')),
      optDescription: Dot("fromBinary.text.1b6c3", "Converts a binary string back into its raw form."),
      exampleInput: "01001000 01101001",
      exampleOutput: "Hi",
    }
  }
  /**
   * FromBinary constructor
   */
  constructor() {
    super();

    this.name = "From Binary";
    this.module = "Default";
    this.inputType = "string";
    this.outputType = "byteArray";
    this.args = [
      {
        name: "Delimiter",
        type: "option",
        value: BIN_DELIM_OPTIONS,
      },
      {
        name: "Byte Length",
        type: "number",
        value: 8,
        min: 1,
      },
    ];
    this.checks = [
      {
        pattern: "^(?:[01]{8})+$",
        flags: "",
        args: ["None"],
      },
      {
        pattern: "^(?:[01]{8})(?: [01]{8})*$",
        flags: "",
        args: ["Space"],
      },
      {
        pattern: "^(?:[01]{8})(?:,[01]{8})*$",
        flags: "",
        args: ["Comma"],
      },
      {
        pattern: "^(?:[01]{8})(?:;[01]{8})*$",
        flags: "",
        args: ["Semi-colon"],
      },
      {
        pattern: "^(?:[01]{8})(?::[01]{8})*$",
        flags: "",
        args: ["Colon"],
      },
      {
        pattern: "^(?:[01]{8})(?:\\n[01]{8})*$",
        flags: "",
        args: ["Line feed"],
      },
      {
        pattern: "^(?:[01]{8})(?:\\r\\n[01]{8})*$",
        flags: "",
        args: ["CRLF"],
      },
    ];
  }

  /**
   * @param {string} input
   * @param {Object[]} args
   * @returns {byteArray}
   */
  run(input, args) {
    const byteLen = args[1] ? args[1] : 8;
    return fromBinary(input, args[0], byteLen);
  }

  /**
   * Highlight From Binary
   *
   * @param {Object[]} pos
   * @param {number} pos[].start
   * @param {number} pos[].end
   * @param {Object[]} args
   * @returns {Object[]} pos
   */
  highlight(pos, args) {
    const delim = Utils.charRep(args[0] || "Space");
    pos[0].start =
      pos[0].start === 0 ? 0 : Math.floor(pos[0].start / (8 + delim.length));
    pos[0].end =
      pos[0].end === 0 ? 0 : Math.ceil(pos[0].end / (8 + delim.length));
    return pos;
  }

  /**
   * Highlight From Binary in reverse
   *
   * @param {Object[]} pos
   * @param {number} pos[].start
   * @param {number} pos[].end
   * @param {Object[]} args
   * @returns {Object[]} pos
   */
  highlightReverse(pos, args) {
    const delim = Utils.charRep(args[0] || "Space");
    pos[0].start = pos[0].start * (8 + delim.length);
    pos[0].end = pos[0].end * (8 + delim.length) - delim.length;
    return pos;
  }
}

export default FromBinary;
