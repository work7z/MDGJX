
// Date: Sun, 14 Jan 2024
// Second Author: Ryan Laf
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

/**
 * @author Matt C [matt@artemisbot.uk]
 * @copyright Crown Copyright 2017
 * @license Apache-2.0
 */

import { Dot } from "@/__CORE__/utils/cTranslationUtils.tsx";
import Operation, { OptDetail } from "../../../core/Operation.tsx";
import Utils from "../../../core/Utils.mjs";
import { DELIM_OPTIONS } from "../../../core/lib/Delim.mjs";

/**
 * To Octal operation
 */
class ToOctal extends Operation {
  public getOptDetail(): OptDetail {
    return {
      infoURL: "https://wikipedia.org/wiki/Octal",
      optName: Dot("-AaO4jF3Q", "To {0}", Dot("hAK6Q4uV0", 'Octal')),
      optDescription: Dot("GqolnOrbq", "Converts the input string to octal bytes separated by the specified delimiter.<br><br>e.g. The UTF-8 encoded string <code>Γειά σου</code> becomes <code>316 223 316 265 316 271 316 254 40 317 203 316 277 317 205</code>"),
      exampleInput: "Γειά σου",
      exampleOutput: "316 223 316 265 316 271 316 254 40 317 203 316 277 317 205",
      relatedID: "fromto",
      config: {
        flowControl: false,
        manualBake: false,
        module: "Default",
        description: "Converts the input string to octal bytes separated by the specified delimiter.<br><br>e.g. The UTF-8 encoded string <code>Γειά σου</code> becomes <code>316 223 316 265 316 271 316 254 40 317 203 316 277 317 205</code>",
        infoURL: "https://wikipedia.org/wiki/Octal",
        inputType: "byteArray",
        outputType: "string",
        args: [
          {
            name: "Delimiter",
            type: "option",
            value: DELIM_OPTIONS,
          },
        ],
      },
    }
  }
  /**
   * ToOctal constructor
   */
  constructor() {
    super();

    this.name = "To Octal";
    this.module = "Default";
    // this.description =
    //   "Converts the input string to octal bytes separated by the specified delimiter.<br><br>e.g. The UTF-8 encoded string <code>Γειά σου</code> becomes <code>316 223 316 265 316 271 316 254 40 317 203 316 277 317 205</code>";
    // this.infoURL = "https://wikipedia.org/wiki/Octal";
    this.inputType = "byteArray";
    this.outputType = "string";
    this.args = [
      {
        name: "Delimiter",
        type: "option",
        value: DELIM_OPTIONS,
      },
    ];
  }

  /**
   * @param {byteArray} input
   * @param {Object[]} args
   * @returns {string}
   */
  run(input, args) {
    const delim = Utils.charRep(args[0] || "Space");
    return input.map((val) => val.toString(8)).join(delim);
  }
}

export default ToOctal;
