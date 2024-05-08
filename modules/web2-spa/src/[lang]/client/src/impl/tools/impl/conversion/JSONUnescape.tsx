
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

import { Dot } from "@/[lang]/client/src/utils/cTranslationUtils";
import { TEXT_INPUT_EXAMPLE_HELLO_WORLD } from './_constants.tsx'
import Operation, { OptDetail } from "../../../core/Operation.tsx";

export default class JSONUnescape extends Operation {
  public getOptDetail(): OptDetail {
    return {
      relatedID: 'json',
      config: {
        "module": "Code",
        "description": "Unescapes special characters in JSON code.",
        "infoURL": null,
        "inputType": "string",
        "outputType": "string",
        "flowControl": false,
        "manualBake": false,
        "args": []
      },
      infoURL: 'https://www.json.org/',
      nousenouseID: 'json-unescape',
      optName: Dot("sd.texdqw", "Unescape {0}", "JSON"),
      optDescription: Dot(
        "EOdsCA",
        "Unescapes special characters in JSON code."
      ),
      exampleInput: "{ \"key\": \"value\" }",
      exampleOutput: '{ "key": "value" }',
    }
  }
  /**
   * JSONMinify constructor
   */
  constructor() {
    super();

    this.name = Dot("N_9_dM4KgI", "JSON Escape");
    this.module = "Code";
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
    if (!input) return "";
    // write a function to unescape JSON str
    return input.replace(/\\./g, function (m) {
      switch (m[1]) {
        case '"':
        case "'":
        case "\\":
          return m[1];
        case "b":
          return "\b";
        case "f":
          return "\f";
        case "n":
          return "\n";
        case "r":
          return "\r";
        case "t":
          return "\t";
        case "u":
          return String.fromCharCode(parseInt(m.substr(2, 4), 16));
        default:
          return m;
      }
    });
  }
}

;
