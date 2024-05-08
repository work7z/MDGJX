
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
 * Remove whitespace operation
 */
class RemoveWhitespace extends Operation {
  public getOptDetail(): OptDetail {
    return {
      relatedID: 'text',
      config: {
        "module": "Default",
        "description": "Optionally removes all spaces, carriage returns, line feeds, tabs and form feeds from the input data.<br><br>This operation also supports the removal of full stops which are sometimes used to represent non-printable bytes in ASCII output.",
        "infoURL": null,
        "inputType": "string",
        "outputType": "string",
        "flowControl": false,
        "manualBake": false,
        "args": [
          {
            "name": "Spaces",
            "type": "boolean",
            "value": true
          },
          {
            "name": Dot('BS4lDEO5A', 'Carriage returns') + " (\\r)",
            "type": "boolean",
            "value": true
          },
          {
            "name": Dot('DZecxBbgk', 'Line feeds') + " (\\n)",
            "type": "boolean",
            "value": true
          },
          {
            "name": "Tabs",
            "type": "boolean",
            "value": true
          },
          {
            "name": Dot('WBGdJVL93', 'Form feeds') + " (\\f)",
            "type": "boolean",
            "value": true
          },
          {
            "name": "Full stops",
            "type": "boolean",
            "value": false
          }
        ]
      },
      nousenouseID: 'removewhitespace',
      optName: Dot("U-SKci0LP", "Remove whitespace"),
      infoURL: "https://en.wikipedia.org/wiki/Whitespace_character",
      optDescription: Dot("8hlgTVznY", "Optionally removes all spaces, carriage returns, line feeds, tabs and form feeds from the input data.<br><br>This operation also supports the removal of full stops which are sometimes used to represent non-printable bytes in ASCII output."),
      exampleInput: "Hello,     world!",
      exampleOutput: "Hello,world!",
    }
  }
  /**
   * RemoveWhitespace constructor
   */
  constructor() {
    super();

    this.module = "Default";
    this.inputType = "string";
    this.outputType = "string";
    this.args = [
      {
        name: "Spaces",
        type: "boolean",
        value: true,
      },
      {
        name: "Carriage returns (\\r)",
        type: "boolean",
        value: true,
      },
      {
        name: "Line feeds (\\n)",
        type: "boolean",
        value: true,
      },
      {
        name: "Tabs",
        type: "boolean",
        value: true,
      },
      {
        name: "Form feeds (\\f)",
        type: "boolean",
        value: true,
      },
      {
        name: "Full stops",
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
    const [
      removeSpaces,
      removeCarriageReturns,
      removeLineFeeds,
      removeTabs,
      removeFormFeeds,
      removeFullStops,
    ] = args;
    let data = input;

    if (removeSpaces) data = data.replace(/ /g, "");
    if (removeCarriageReturns) data = data.replace(/\r/g, "");
    if (removeLineFeeds) data = data.replace(/\n/g, "");
    if (removeTabs) data = data.replace(/\t/g, "");
    if (removeFormFeeds) data = data.replace(/\f/g, "");
    if (removeFullStops) data = data.replace(/\./g, "");
    return data;
  }
}

export default RemoveWhitespace;
