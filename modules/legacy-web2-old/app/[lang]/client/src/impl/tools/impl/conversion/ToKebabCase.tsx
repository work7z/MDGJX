
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

import kebabCase from "lodash/kebabCase.js";
import Operation, { OptDetail } from "../../../core/Operation.tsx";
import { replaceVariableNames } from "../../../core/lib/Code.mjs";
import { Dot } from "../../../../utils/cTranslationUtils.tsx";

/**
 * To Kebab case operation
 */
class ToKebabCase extends Operation {
  public getOptDetail(): OptDetail {
    return {
      infoURL: "https://wikipedia.org/wiki/Kebab_case",
      optName: Dot("siDRGnz0u", "To Kebab case"),
      optDescription: Dot("Qar4RR29k", "Converts the input string to kebab case.\n<br><br>\nKebab case is all lower case with dashes as word boundaries.\n<br><br>\ne.g. this-is-kebab-case\n<br><br>\n'Attempt to be context aware' will make the operation attempt to nicely transform variable and function names."),
      exampleInput: "this is kebab case",
      exampleOutput: "this-is-kebab-case",
      relatedID: "fromto",
      config: {
        flowControl: false,
        manualBake: false,
        module: "Code",
        description: "Converts the input string to kebab case.\n<br><br>\nKebab case is all lower case with dashes as word boundaries.\n<br><br>\ne.g. this-is-kebab-case\n<br><br>\n'Attempt to be context aware' will make the operation attempt to nicely transform variable and function names.",
        infoURL: "https://wikipedia.org/wiki/Kebab_case",
        inputType: "string",
        outputType: "string",
        args: [
          {
            name: Dot("a6Q7ONGCB", "Attempt to be context aware"),
            type: "boolean",
            value: false,
          },
        ],
      },
    }
  }
  /**
   * ToKebabCase constructor
   */
  constructor() {
    super();

    this.name = "To Kebab case";
    this.module = "Code";
    // this.description =
    //   "Converts the input string to kebab case.\n<br><br>\nKebab case is all lower case with dashes as word boundaries.\n<br><br>\ne.g. this-is-kebab-case\n<br><br>\n'Attempt to be context aware' will make the operation attempt to nicely transform variable and function names.";
    // this.infoURL = "https://wikipedia.org/wiki/Kebab_case";
    this.inputType = "string";
    this.outputType = "string";
    this.args = [
      {
        name: Dot("GSgmYW7Qv", "Attempt to be context aware"),
        type: "boolean",
        value: false,
      },
    ];
  }

  /**
   * @param {string} input
   * @param {Object[]} args
   * @returns {string}
   */
  run(input, args) {
    const smart = args[0];

    if (smart) {
      return replaceVariableNames(input, kebabCase);
    } else {
      return kebabCase(input);
    }
  }
}

export default ToKebabCase;
