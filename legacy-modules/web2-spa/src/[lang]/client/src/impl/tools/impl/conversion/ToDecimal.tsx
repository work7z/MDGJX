
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
import Utils from "../../../core/Utils.mjs";
import { DELIM_OPTIONS } from "../../../core/lib/Delim.mjs";

/**
 * To Decimal operation
 */
class ToDecimal extends Operation {
  public getOptDetail(): OptDetail {
    return {
      infoURL: "https://wikipedia.org/wiki/Decimal",
      optName: Dot("3g_qIW2dZ", "To Decimal"),
      optDescription: Dot("oINAgNij0", "Converts the input data to an ordinal integer array.<br><br>e.g. <code>Hello</code> becomes <code>72 101 108 108 111</code>"),
      exampleInput: "Hello",
      exampleOutput: "72 101 108 108 111",
      relatedID: "fromto",
      config: {
        flowControl: false,
        manualBake: false,
        module: "Default",
        description: "Converts the input data to an ordinal integer array.<br><br>e.g. <code>Hello</code> becomes <code>72 101 108 108 111</code>",
        infoURL: "https://wikipedia.org/wiki/Decimal",
        inputType: "ArrayBuffer",
        outputType: "string",
        args: [
          {
            name: "Delimiter",
            type: "option",
            value: DELIM_OPTIONS,
          },
          {
            name: "Support signed values",
            type: "boolean",
          },
        ],
      },
    }
  }
  /**
   * ToDecimal constructor
   */
  constructor() {
    super();

    this.name = "To Decimal";
    this.module = "Default";
    // this.description =
    //   "Converts the input data to an ordinal integer array.<br><br>e.g. <code>Hello</code> becomes <code>72 101 108 108 111</code>";
    this.inputType = "ArrayBuffer";
    this.outputType = "string";
    this.args = [
      {
        name: "Delimiter",
        type: "option",
        value: DELIM_OPTIONS,
      },
      {
        name: "Support signed values",
        type: "boolean",
        value: false,
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
    const delim = Utils.charRep(args[0]),
      signed = args[1];
    if (signed) {
      input = input.map((v) => (v > 0x7f ? v - 0xff - 1 : v));
    }
    return input.join(delim);
  }
}

export default ToDecimal;
