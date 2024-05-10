
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

import Operation, { OptDetail } from "../../../core/Operation.tsx";
import { DELIM_OPTIONS } from "../../../core/lib/Delim.mjs";
import { fromDecimal } from "../../../core/lib/Decimal.mjs";
import { Dot } from "../../../../utils/cTranslationUtils.tsx";

/**
 * From Decimal operation
 */
class FromDecimal extends Operation {
  public getOptDetail(): OptDetail {
    return {
      infoURL: "https://wikipedia.org/wiki/Decimal",
      optName: Dot("yEZk8Ll0k", "From Decimal"),
      optDescription: Dot("K0ATr9EhO", "Converts the data from an ordinal integer array back into its raw form.<br><br>e.g. <code>72 101 108 108 111</code> becomes <code>Hello</code>"),
      exampleInput: "72 101 108 108 111",
      exampleOutput: "Hello",
      relatedID: "fromto",
      config: {
        flowControl: false,
        manualBake: false,
        "module": "Default",
        "description": "Converts the data from an ordinal integer array back into its raw form.<br><br>e.g. <code>72 101 108 108 111</code> becomes <code>Hello</code>",
        "infoURL": "https://wikipedia.org/wiki/Plane_(Unicode)",
        "inputType": "string",
        "outputType": "byteArray",
        "args": [
          {
            "name": "Delimiter",
            "type": "option",
            "value": DELIM_OPTIONS,
          },
          {
            "name": "Support signed values",
            "type": "boolean",
            "value": false,
          },
        ],
        "checks": [
          {
            pattern:
              "^(?:\\d{1,2}|1\\d{2}|2[0-4]\\d|25[0-5])(?: (?:\\d{1,2}|1\\d{2}|2[0-4]\\d|25[0-5]))*$",
            flags: "",
            args: ["Space", false],
          },
          {
            pattern:
              "^(?:\\d{1,2}|1\\d{2}|2[0-4]\\d|25[0-5])(?:,(?:\\d{1,2}|1\\d{2}|2[0-4]\\d|25[0-5]))*$",
            flags: "",
            args: ["Comma", false],
          },
          {
            pattern:
              "^(?:\\d{1,2}|1\\d{2}|2[0-4]\\d|25[0-5])(?:;(?:\\d{1,2}|1\\d{2}|2[0-4]\\d|25[0-5]))*$",
            flags: "",
            args: ["Semi-colon", false],
          },
          {
            pattern:
              "^(?:\\d{1,2}|1\\d{2}|2[0-4]\\d|25[0-5])(?::(?:\\d{1,2}|1\\d{2}|2[0-4]\\d|25[0-5]))*$",
            flags: "",
            args: ["Colon", false],
          },
          {
            pattern:
              "^(?:\\d{1,2}|1\\d{2}|2[0-4]\\d|25[0-5])(?:\\n(?:\\d{1,2}|1\\d{2}|2[0-4]\\d|25[0-5]))*$",
            flags: "",
            args: ["Line feed", false],
          },
          {
            pattern:
              "^(?:\\d{1,2}|1\\d{2}|2[0-4]\\d|25[0-5])(?:\\r\\n(?:\\d{1,2}|1\\d{2}|2[0-4]\\d|25[0-5]))*$",
            flags: "",
            args: ["CRLF", false],
          },
        ]
      }
    }
  }
  /**
   * FromDecimal constructor
   */
  constructor() {
    super();

    this.name = "From Decimal";
    this.module = "Default";
    // this.description =
    //   "Converts the data from an ordinal integer array back into its raw form.<br><br>e.g. <code>72 101 108 108 111</code> becomes <code>Hello</code>";
    this.inputType = "string";
    this.outputType = "byteArray";
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
    this.checks = [
      {
        pattern:
          "^(?:\\d{1,2}|1\\d{2}|2[0-4]\\d|25[0-5])(?: (?:\\d{1,2}|1\\d{2}|2[0-4]\\d|25[0-5]))*$",
        flags: "",
        args: ["Space", false],
      },
      {
        pattern:
          "^(?:\\d{1,2}|1\\d{2}|2[0-4]\\d|25[0-5])(?:,(?:\\d{1,2}|1\\d{2}|2[0-4]\\d|25[0-5]))*$",
        flags: "",
        args: ["Comma", false],
      },
      {
        pattern:
          "^(?:\\d{1,2}|1\\d{2}|2[0-4]\\d|25[0-5])(?:;(?:\\d{1,2}|1\\d{2}|2[0-4]\\d|25[0-5]))*$",
        flags: "",
        args: ["Semi-colon", false],
      },
      {
        pattern:
          "^(?:\\d{1,2}|1\\d{2}|2[0-4]\\d|25[0-5])(?::(?:\\d{1,2}|1\\d{2}|2[0-4]\\d|25[0-5]))*$",
        flags: "",
        args: ["Colon", false],
      },
      {
        pattern:
          "^(?:\\d{1,2}|1\\d{2}|2[0-4]\\d|25[0-5])(?:\\n(?:\\d{1,2}|1\\d{2}|2[0-4]\\d|25[0-5]))*$",
        flags: "",
        args: ["Line feed", false],
      },
      {
        pattern:
          "^(?:\\d{1,2}|1\\d{2}|2[0-4]\\d|25[0-5])(?:\\r\\n(?:\\d{1,2}|1\\d{2}|2[0-4]\\d|25[0-5]))*$",
        flags: "",
        args: ["CRLF", false],
      },
    ];
  }

  /**
   * @param {string} input
   * @param {Object[]} args
   * @returns {byteArray}
   */
  run(input, args) {
    let data = fromDecimal(input, args[0]);
    if (args[1]) {
      // Convert negatives
      data = data.map((v) => (v < 0 ? 0xff + v + 1 : v));
    }
    return data;
  }
}

export default FromDecimal;
