
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

/**
 * To Lower case operation
 */
class ToLowerCase extends Operation {
  public getOptDetail(): OptDetail {
    return {
      infoURL: "https://wikipedia.org/wiki/Lowercase",
      optName: Dot("r0aK8uIdB", "To Lower case"),
      optDescription: Dot("bCBpnCWr4", "Converts every character in the input to lower case."),
      exampleInput: "Hello, World!",
      exampleOutput: "hello, world!",
      relatedID: "fromto",
      config: {
        flowControl: false,
        manualBake: false,
        module: "Default",
        description: "Converts every character in the input to lower case.",
        infoURL: "https://wikipedia.org/wiki/Lowercase",
        inputType: "string",
        outputType: "string",
        args: [],
      },

    }
  }
  /**
   * ToLowerCase constructor
   */
  constructor() {
    super();

    this.name = "To Lower case";
    this.module = "Default";
    // this.description = "Converts every character in the input to lower case.";
    this.inputType = "string";
    this.outputType = "string";
    this.args = [];
  }

  /**
   * @param {string} input
   * @param {Object[]} args
   * @returns {string}
   */
  run(input, args) {
    return input.toLowerCase();
  }

  /**
   * Highlight To Lower case
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
   * Highlight To Lower case in reverse
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

export default ToLowerCase;
