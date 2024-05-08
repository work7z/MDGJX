
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
import { Dot } from "@/app/[lang]/client/src/utils/cTranslationUtils";
import { TEXT_INPUT_EXAMPLE_HELLO_WORLD } from './_constants.tsx'
import Operation, { OptDetail } from "../../../core/Operation.tsx";
import Utils from "../../../core/Utils.mjs";
import gutils from "@/app/[lang]/client/src/utils//GlobalUtils.tsx";
import { InputOutputEditorLang } from "../../../purejs-types.tsx";

/**
 * JSON Minify operation
 */
class JSONMinify extends Operation {
  public getOptDetail(): OptDetail {
    return {
      relatedID: 'json',
      config: {
        "module": "Code",
        "description": "Compresses JavaScript Object Notation (JSON) code.",
        "infoURL": null,
        "inputType": "string",
        "outputType": "string",
        "flowControl": false,
        "manualBake": false,
        "args": []
      },
      infoURL: 'https://www.json.org/',
      nousenouseID: 'json-minify',
      optName: Dot("meeMC1Uk7.text.93kq", "Minify {0}", "JSON"),
      optDescription: Dot(
        "EO6Qv5dCA",
        "Minifies JSON code, reduce the bundle size of your JSON code."
      ),

      exampleOutput: '{"data":[{"key1":"value1"},{"key2":123}]}',
      exampleInput: '{\n  "data": [\n    {\n      "key1": "value1"\n    },\n    {\n      "key2": 123\n    }\n  ]\n}'
    }
  }
  /**
   * JSONMinify constructor
   */
  constructor() {
    super();

    this.name = "JSON Minify";
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
    return vkbeautify.jsonmin(input);
  }
}

export default JSONMinify;
