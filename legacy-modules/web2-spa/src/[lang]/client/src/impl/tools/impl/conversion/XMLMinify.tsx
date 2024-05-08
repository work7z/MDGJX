
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

import vkbeautify from "vkbeautify";
import { Dot } from "@/[lang]/client/src/utils/cTranslationUtils";
import { TEXT_INPUT_EXAMPLE_HELLO_WORLD } from './_constants.tsx'
import Operation, { OptDetail } from "../../../core/Operation.tsx";
import Utils from "../../../core/Utils.mjs";
import gutils from "@/[lang]/client/src/utils//GlobalUtils.tsx";
import { InputOutputEditorLang } from "../../../purejs-types.tsx";

/**
 * XML Minify operation
 */
class XMLMinify extends Operation {
  public getOptDetail(): OptDetail {
    return {
      relatedID: 'xml',
      config: {
        "module": "Code",
        "description": "Compresses eXtensible Markup Language (XML) code.",
        "infoURL": null,
        "inputType": "string",
        "outputType": "string",
        "flowControl": false,
        "manualBake": false,
        "args": [
          {
            "name": "Preserve comments",
            "type": "boolean",
            "value": false
          }
        ]
      },
      nousenouseID: 'xml-minify',
      optName: Dot("yd-GEgf", "Minify {0}", 'XML'),
      infoURL: 'https://en.wikipedia.org/wiki/XML',
      optDescription: Dot(
        "xml-bdeautify.desc.2a5f9",
        "Minify XML Code"
      ),
      exampleOutput: `<unformatted>    <data>        <item1>value1</item1><item2>value2</item2>    </data></unformatted>`,
      exampleInput: `<?xml version:"1.0" encoding:"UTF-8"?>
<unformatted>
    <data>
        <item1>value1</item1>
        <item2>value2</item2>
    </data>
</unformatted>`,
    }
  }
  /**
   * XMLMinify constructor
   */
  constructor() {
    super();

    this.module = "Code";
    this.inputType = "string";
    this.outputType = "string";
    this.args = [
      {
        name: "Preserve comments",
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
    const preserveComments = args[0];
    return vkbeautify.xmlmin(input, preserveComments);
  }

  getInputOutputEditorLang(): InputOutputEditorLang | null {
    return {
      inputLang: 'xml',
      outputLang: 'xml'
    }
  }
}

export default XMLMinify;
