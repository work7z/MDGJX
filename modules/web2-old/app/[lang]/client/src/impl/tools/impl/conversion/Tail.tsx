
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
import Utils from "../../../core/Utils.mjs";
import { INPUT_DELIM_OPTIONS } from "../../../core/lib/Delim.mjs";

/**
 * Tail operation
 */
class Tail extends Operation {
  public getOptDetail(): OptDetail {
    return {
      relatedID: 'text',
      config: {
        "module": "Default",
        "description": "Like the UNIX tail utility.<br>Gets the last n lines.<br>Optionally you can select all lines after line n by entering a negative value for n.<br>The delimiter can be changed so that instead of lines, fields (i.e. commas) are selected instead.",
        "infoURL": "https://wikipedia.org/wiki/Tail_(Unix)",
        "inputType": "string",
        "outputType": "string",
        "flowControl": false,
        "manualBake": false,
        "args": [
          {
            "name": "Delimiter",
            "type": "option",
            "value": [
              "Line feed",
              "CRLF",
              "Space",
              "Comma",
              "Semi-colon",
              "Colon",
              "Nothing (separate chars)"
            ]
          },
          {
            "name": "Number",
            "type": "number",
            "value": 10
          }
        ]
      },
      optDescription: Dot("2Va7Txc-V", "Like the UNIX tail utility.<br>Gets the last n lines.<br>Optionally you can select all lines after line n by entering a negative value for n.<br>The delimiter can be changed so that instead of lines, fields (i.e. commas) are selected instead."),
      infoURL: "https://wikipedia.org/wiki/Tail_(Unix)",
      nousenouseID: 'tail',
      optName: Dot("y46w7Q9TH", "Tail"),
      exampleInput: "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12",
      exampleOutput: "3\n4\n5\n6\n7\n8\n9\n10\n11\n12",
    }
  }
  /**
   * Tail constructor
   */
  constructor() {
    super();

    this.name = "Tail";
    this.module = "Default";
    this.inputType = "string";
    this.outputType = "string";
    this.args = [
      {
        name: "Delimiter",
        type: "option",
        value: INPUT_DELIM_OPTIONS,
      },
      {
        name: "Number",
        type: "number",
        value: 10,
      },
    ];
  }

  /**
   * @param {string} input
   * @param {Object[]} args
   * @returns {string}
   */
  run(input, args) {
    let delimiter = args[0];
    const number = args[1];

    delimiter = Utils.charRep(delimiter);
    const splitInput = input.split(delimiter);

    return splitInput
      .filter((line, lineIndex) => {
        lineIndex += 1;

        if (number < 0) {
          return lineIndex > -number;
        } else {
          return lineIndex > splitInput.length - number;
        }
      })
      .join(delimiter);
  }
}

export default Tail;
