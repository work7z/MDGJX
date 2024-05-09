
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
 * SQL Minify operation
 */
class SQLMinify extends Operation {
  public getOptDetail(): OptDetail {
    return {
      relatedID: 'sql',
      config: {
        "module": "Code",
        "description": "Compresses Structured Query Language (SQL) code.",
        "infoURL": null,
        "inputType": "string",
        "outputType": "string",
        "flowControl": false,
        "manualBake": false,
        "args": []
      },
      nousenouseID: "sql-minify",
      optName: Dot("6wdtJ4vmg.name.0912", "Minify {0}", "SQL"),
      optDescription: Dot(
        "LxaEFHbfa",
        "Minifies SQL code, reduce the bundle size of your SQL code.",
      ),
      exampleInput: 'SELECT\n\t*\nFROM\n\ttable\nWHERE\n\tid = 1;',
      exampleOutput: 'SELECT * FROM table WHERE id = 1;',
      infoURL: "https://wiki.postgresql.org/wiki/Minifying_SQL",
    }
  }
  /**
   * SQLMinify constructor
   */
  constructor() {
    super();

    this.name = "SQL Minify";
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
    return vkbeautify.sqlmin(input);
  }


  getInputOutputEditorLang(): InputOutputEditorLang | null {
    return {
      inputLang: 'sql',
      outputLang: 'sql'
    }
  }
}

export default SQLMinify;
