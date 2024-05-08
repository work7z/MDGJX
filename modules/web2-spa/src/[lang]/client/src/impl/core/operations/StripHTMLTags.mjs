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

/**
 * Strip HTML tags operation
 */
class StripHTMLTags extends Operation {
  /**
   * StripHTMLTags constructor
   */
  constructor() {
    super();

    this.name = "Strip HTML tags";
    this.module = "Default";
    this.description = "Removes all HTML tags from the input.";
    this.inputType = "string";
    this.outputType = "string";
    this.args = [
      {
        name: "Remove indentation",
        type: "boolean",
        value: true,
      },
      {
        name: "Remove excess line breaks",
        type: "boolean",
        value: true,
      },
    ];
    this.checks = [
      {
        pattern: "(</html>|</div>|</body>)",
        flags: "i",
        args: [true, true],
      },
    ];
  }

  /**
   * @param {string} input
   * @param {Object[]} args
   * @returns {string}
   */
  run(input, args) {
    const [removeIndentation, removeLineBreaks] = args;

    input = Utils.stripHtmlTags(input);

    if (removeIndentation) {
      input = input.replace(/\n[ \f\t]+/g, "\n");
    }

    if (removeLineBreaks) {
      input = input
        .replace(/^\s*\n/, "") // first line
        .replace(/(\n\s*){2,}/g, "\n"); // all others
    }

    return input;
  }
}

export default StripHTMLTags;
