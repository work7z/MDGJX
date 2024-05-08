
// Date: Sun, 14 Jan 2024
// Second Author: Ryan Laf
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import { Dot } from "../../../../utils/cTranslationUtils";
import Operation, { OptDetail } from "../../../core/Operation";
import Utils, { isWorkerEnvironment } from "../../../core/Utils.mjs";
import OperationError from "../../../core/errors/OperationError.mjs";
import { DELIM_OPTIONS } from "../../../core/lib/Delim.mjs";

/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */


/**
 * From Charcode operation
 */
class FromCharcode extends Operation {
  public getOptDetail(): OptDetail {
    return {
      relatedID: "fromto",
      config: {
        flowControl: false,
        manualBake: false,
        "module": "Default",
        "description": "Converts unicode character codes back into text.<br><br>e.g. <code>0393 03b5 03b9 03ac 20 03c3 03bf 03c5</code> becomes <code>Γειά σου</code>",
        "infoURL": "https://wikipedia.org/wiki/Plane_(Unicode)",
        "inputType": "string",
        "outputType": "ArrayBuffer",
        "args": [
          {
            "name": "Delimiter",
            "type": "option",
            "value": [
              "Space",
              "Comma",
              "None"
            ]
          },
          {
            "name": "Base",
            "type": "number",
            "value": 16
          }
        ]
      },
      infoURL: 'https://wikipedia.org/wiki/Plane_(Unicode)',
      nousenouseID: 'fromcharcode',
      optName: Dot("Ec-O2fmpc", "From Charcode"),
      optDescription: Dot("VivVgJcwO", "Converts unicode character codes back into text."),
      exampleInput: '0393 03b5 03b9 03ac 20 03c3 03bf 03c5',
      exampleOutput: 'Γειά σου',
    }
  }
  /**
   * FromCharcode constructor
   */
  constructor() {
    super();

    this.name = "From Charcode";
    this.module = "Default";
    this.inputType = "string";
    this.outputType = "ArrayBuffer";
    this.args = [
      {
        name: "Delimiter",
        type: "option",
        value: DELIM_OPTIONS,
      },
      {
        name: "Base",
        type: "number",
        value: 16,
      },
    ];
  }

  /**
   * @param {string} input
   * @param {Object[]} args
   * @returns {ArrayBuffer}
   *
   * @throws {OperationError} if base out of range
   */
  run(input, args) {
    const delim = Utils.charRep(args[0] || "Space"),
      base = args[1];
    let bites = input.split(delim),
      i = 0;

    if (base < 2 || base > 36) {
      throw new OperationError("Error: Base argument must be between 2 and 36");
    }

    if (input.length === 0) {
      return new ArrayBuffer(0);
    }

    // if (base !== 16 && isWorkerEnvironment())
    //   self.setOption("attemptHighlight", false);

    // Split into groups of 2 if the whole string is concatenated and
    // too long to be a single character
    if (bites.length === 1 && input.length > 17) {
      bites = [];
      for (i = 0; i < input.length; i += 2) {
        bites.push(input.slice(i, i + 2));
      }
    }

    let latin1 = "";
    for (i = 0; i < bites.length; i++) {
      latin1 += Utils.chr(parseInt(bites[i], base));
    }
    return Utils.strToArrayBuffer(latin1);
  }
}

export default FromCharcode;
