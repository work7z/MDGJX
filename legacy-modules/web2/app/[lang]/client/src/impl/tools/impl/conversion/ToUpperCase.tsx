
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
import OperationError from "../../../core/errors/OperationError.mjs";

/**
 * To Upper case operation
 */
class ToUpperCase extends Operation {
  public getOptDetail(): OptDetail {
    return {
      relatedID: "fromto",
      config: {
        module: "Default",
        description:
          "Converts the input string to upper case, optionally limiting scope to only the first character in each word, sentence or paragraph.",
        infoURL: "https://en.wikipedia.org/wiki/Letter_case#Case_styles",
        inputType: "string",
        outputType: "string",
        args: [
          {
            name: "Scope",
            type: "option",
            value: ["All", "Word", "Sentence", "Paragraph"],
          },
        ],
        flowControl: false,
        manualBake: false,
      },
      optName: Dot("qMhNfAmTL", "To Upper case"),
      optDescription:
        Dot("H1ARNsz-l", "Converts the input string to upper case, optionally limiting scope to only the first character in each word, sentence or paragraph."),
      exampleInput: "hello world",
      exampleOutput: "HELLO WORLD",
      infoURL: "https://en.wikipedia.org/wiki/Letter_case#Case_styles",
    };
  }
  /**
   * ToUpperCase constructor
   */
  constructor() {
    super();

    this.name = "To Upper case";
    this.module = "Default";
    // this.description =
    //   "Converts the input string to upper case, optionally limiting scope to only the first character in each word, sentence or paragraph.";
    this.inputType = "string";
    this.outputType = "string";
    this.args = [
      {
        name: "Scope",
        type: "option",
        value: ["All", "Word", "Sentence", "Paragraph"],
      },
    ];
  }

  /**
   * @param {string} input
   * @param {Object[]} args
   * @returns {string}
   */
  run(input, args) {
    if (!args || args.length === 0) {
      throw new OperationError("No capitalization scope was provided.");
    }

    const scope = args[0];

    if (scope === "All") {
      return input.toUpperCase();
    }

    const scopeRegex = {
      Word: /(\b\w)/gi,
      Sentence: /(?:\.|^)\s*(\b\w)/gi,
      Paragraph: /(?:\n|^)\s*(\b\w)/gi,
    }[scope];

    if (scopeRegex === undefined) {
      throw new OperationError("Unrecognized capitalization scope");
    }

    // Use the regex to capitalize the input
    return input.replace(scopeRegex, function (m) {
      return m.toUpperCase();
    });
  }

  /**
   * Highlight To Upper case
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
   * Highlight To Upper case in reverse
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

export default ToUpperCase;
