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

import Operation from "../Operation.tsx";
import Utils from "../Utils.mjs";
import { bitOp, or, BITWISE_OP_DELIMS } from "../lib/BitwiseOp.mjs";

/**
 * OR operation
 */
class OR extends Operation {
  /**
   * OR constructor
   */
  constructor() {
    super();

    this.name = "OR";
    this.module = "Default";
    this.description =
      "OR the input with the given key.<br>e.g. <code>fe023da5</code>";
    this.infoURL = "https://wikipedia.org/wiki/Bitwise_operation#OR";
    this.inputType = "ArrayBuffer";
    this.outputType = "byteArray";
    this.args = [
      {
        name: "Key",
        type: "toggleString",
        value: "",
        toggleValues: BITWISE_OP_DELIMS,
      },
    ];
  }

  /**
   * @param {ArrayBuffer} input
   * @param {Object[]} args
   * @returns {byteArray}
   */
  run(input, args) {
    const key = Utils.convertToByteArray(args[0].string || "", args[0].option);
    input = new Uint8Array(input);

    return bitOp(input, key, or);
  }

  /**
   * Highlight OR
   *
   * @param {Object[]} pos
   * @param {number} pos[].start
   * @param {number} pos[].end
   * @param {Object[]} args
   * @returns {Object[]} pos
   */
  highlight(pos, args) {
    return pos;
  }

  /**
   * Highlight OR in reverse
   *
   * @param {Object[]} pos
   * @param {number} pos[].start
   * @param {number} pos[].end
   * @param {Object[]} args
   * @returns {Object[]} pos
   */
  highlightReverse(pos, args) {
    return pos;
  }
}

export default OR;
