
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

import { Dot } from "../../../../utils/cTranslationUtils.tsx";
import Operation, { OptDetail } from "../../../core/Operation.tsx";

/**
 * Remove line numbers operation
 */
class RemoveLineNumbers extends Operation {
  public getOptDetail(): OptDetail {
    return {
      relatedID: 'text',
      config: {
        "module": "Default",
        "description": "Removes line numbers from the output if they can be trivially detected.",
        "infoURL": null,
        "inputType": "string",
        "outputType": "string",
        "flowControl": false,
        "manualBake": false,
        "args": []
      },
      nousenouseID: 'removelinenumbers',
      optName: Dot("OrCD8PqwH", "Remove line numbers"),
      infoURL: "https://en.wikipedia.org/wiki/Line_number",
      optDescription: Dot("Vc40-vfod", "Removes line numbers from the output if they can be trivially detected."),
      exampleInput: "1. Hello\n2. World",
      exampleOutput: "Hello\nWorld",
    }
  }
  /**
   * RemoveLineNumbers constructor
   */
  constructor() {
    super();

    this.module = "Default";
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
    return input.replace(/^[ \t]{0,5}\d+[\s:|\-,.)\]]/gm, "");
  }
}

export default RemoveLineNumbers;
