
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
 * CSS Minify operation
 */
class CSSMinify extends Operation {
  public getOptDetail(): OptDetail {
    return {
      relatedID: 'css',
      config: {
        "module": "Code",
        "description": "Compresses Cascading Style Sheets (CSS) code.",
        "infoURL": null,
        "inputType": "string",
        "outputType": "string",
        "flowControl": false,
        "manualBake": false,
        "args": [
          {
            "name": Dot("8uf3FVuZn", "Preserve comments"),
            "type": "boolean",
            "value": false
          }
        ]
      },
      infoURL: "https://www.w3.org/Style/CSS/",
      nousenouseID: 'cssminify',
      optName: Dot("-nL_B5PoN", "Compresses {0}", "CSS"),
      optDescription: Dot(
        "Y__Zb1_4Q",
        "Minifies Cascading Style Sheets (CSS) code, removing all unnecessary characters."
      ),
      exampleOutput: "body{color:#fff;}",
      exampleInput: "body {\n\tcolor: #fff;\n}",
    }
  }
  /**
   * CSSMinify constructor
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
    return vkbeautify.cssmin(input, preserveComments);
  }
}

export default CSSMinify;
