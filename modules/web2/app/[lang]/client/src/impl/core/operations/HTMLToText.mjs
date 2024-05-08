// Date: Sun, 14 Jan 2024
// Second Author: Ryan Laf
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

/**
 * @author tlwr [toby@toby.codes]
 * @author Matt C [me@mitt.dev]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 */

import Operation from "../Operation.tsx";

/**
 * HTML To Text operation
 */
class HTMLToText extends Operation {
  /**
   * HTMLToText constructor
   */
  constructor() {
    super();

    this.name = "HTML To Text";
    this.module = "Default";
    this.description =
      "Converts an HTML output from an operation to a readable string instead of being rendered in the DOM.";
    this.infoURL = "";
    this.inputType = "html";
    this.outputType = "string";
    this.args = [];
  }

  /**
   * @param {html} input
   * @param {Object[]} args
   * @returns {string}
   */
  run(input, args) {
    return input;
  }
}

export default HTMLToText;
