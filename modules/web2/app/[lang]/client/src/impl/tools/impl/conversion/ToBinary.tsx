
// Date: Sun, 14 Jan 2024
// Second Author: Ryan Laf
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import { Dot } from "../../../../utils/cTranslationUtils";
import Operation, { OptDetail } from "../../../core/Operation";
import Utils from "../../../core/Utils.mjs";
import { toBinary } from "../../../core/lib/Binary.mjs";
import { BIN_DELIM_OPTIONS } from "../../../core/lib/Delim.mjs";

/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */


/**
 * To Binary operation
 */
class ToBinary extends Operation {
  public getOptDetail(): OptDetail {
    return {
      relatedID: "fromto",
      infoURL: "https://wikipedia.org/wiki/Binary_code",
      optName: Dot("x_XQ5afPY", "To Binary"),
      optDescription: Dot("0kAE9UfwP", "Converts input data to binary"),
      exampleInput: "Hi",
      exampleOutput: "01001000 01101001",
      config: {
        flowControl: false,
        manualBake: false,
        module: "Default",
        description: "Displays the input data as a binary string.<br><br>e.g. <code>Hi</code> becomes <code>01001000 01101001</code>",
        infoURL: "https://wikipedia.org/wiki/Binary_code",
        inputType: "ArrayBuffer",
        outputType: "string",
        args: [
          {
            name: "Delimiter",
            type: "option",
            value: BIN_DELIM_OPTIONS,
          },
          {
            name: "Byte Length",
            type: "number",
            value: 8,
          },
        ],
      }
    }
  }
  /**
   * ToBinary constructor
   */
  constructor() {
    super();

    this.name = "To Binary";
    this.module = "Default";
    // this.description =
    //   "Displays the input data as a binary string.<br><br>e.g. <code>Hi</code> becomes <code>01001000 01101001</code>";
    // this.infoURL = "https://wikipedia.org/wiki/Binary_code";
    this.inputType = "ArrayBuffer";
    this.outputType = "string";
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
      },
    ];
  }

  /**
   * @param {ArrayBuffer} input
   * @param {Object[]} args
   * @returns {string}
   */
  run(input, args) {
    input = new Uint8Array(input);
    const padding = args[1] ? args[1] : 8;
    return toBinary(input, args[0], padding);
  }

  /**
   * Highlight To Binary
   *
   * @param {Object[]} pos
   * @param {number} pos[].start
   * @param {number} pos[].end
   * @param {Object[]} args
   * @returns {Object[]} pos
   */
  highlight(pos, args) {
    const delim = Utils.charRep(args[0] || "Space");
    pos[0].start = pos[0].start * (8 + delim.length);
    pos[0].end = pos[0].end * (8 + delim.length) - delim.length;
    return pos;
  }

  /**
   * Highlight To Binary in reverse
   *
   * @param {Object[]} pos
   * @param {number} pos[].start
   * @param {number} pos[].end
   * @param {Object[]} args
   * @returns {Object[]} pos
   */
  highlightReverse(pos, args) {
    const delim = Utils.charRep(args[0] || "Space");
    pos[0].start =
      pos[0].start === 0 ? 0 : Math.floor(pos[0].start / (8 + delim.length));
    pos[0].end =
      pos[0].end === 0 ? 0 : Math.ceil(pos[0].end / (8 + delim.length));
    return pos;
  }
}

export default ToBinary;
