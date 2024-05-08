
// Date: Sun, 14 Jan 2024
// Second Author: Ryan Laf
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 */

import Operation, { OptDetail } from "../../../core/Operation.tsx";
import OperationError from "../../../core/errors/OperationError.mjs";
import Utils from "../../../core/Utils.mjs";
import { Dot } from "@/app/[lang]/client/src/utils/cTranslationUtils";


/**
 * CSV to JSON operation
 */
class CSVToJSON extends Operation {
  public getOptDetail(): OptDetail {

    return {
      relatedID: 'json',
      config: {
        "module": "Default",
        "description": "Converts a CSV file to JSON format.",
        "infoURL": "https://wikipedia.org/wiki/Comma-separated_values",
        "inputType": "string",
        "outputType": "JSON",
        "flowControl": false,
        "manualBake": false,
        "args": [
          {
            "name": Dot("5IGyvG7nO", "Cell delimiters"),
            "type": "binaryShortString",
            "value": ","
          },
          {
            "name": Dot("EbmQAicDD", "Row delimiters"),
            "type": "binaryShortString",
            "value": "\\r\\n"
          },
          {
            "name": Dot("j7Ja3E8kT", "Format"),
            "type": "option",
            "value": [
              "Array of dictionaries",
              "Array of arrays"
            ]
          }
        ]
      },
      nousenouseID: "CSVToJSON",
      optName: Dot("tZINaUR4b", "CSV to JSON"),
      optDescription: Dot("raTAuBwBz", "Converts a CSV file to JSON format."),
      infoURL: "https://wikipedia.org/wiki/Comma-separated_values",
      exampleInput: `name,age,remark\nlibai,30,remark`,
      exampleOutput: `[
    {
        "name": "libai",
        "age": "30",
        "remark": "remark"
    }
]`,
    }
  }
  /**
   * CSVToJSON constructor
   */
  constructor() {
    super();
    this.outputType = "JSON";
    this.inputType = "string";
    this.args = [
      {
        name: "Cell delimiters",
        type: "binaryShortString",
        value: ",",
      },
      {
        name: "Row delimiters",
        type: "binaryShortString",
        value: "\\r\\n",
      },
      {
        name: "Format",
        type: "option",
        value: ["Array of dictionaries", "Array of arrays"],
      },
    ];

  }

  /**
   * @param {string} input
   * @param {Object[]} args
   * @returns {JSON}
   */
  run(input, args) {
    const [cellDelims, rowDelims, format] = args;
    let json, header;

    try {
      json = Utils.parseCSV(input, cellDelims.split(""), rowDelims.split(""));
    } catch (err) {
      throw new OperationError("Unable to parse CSV: " + err);
    }

    switch (format) {
      case "Array of dictionaries":
        header = json[0];
        return json.slice(1).map((row) => {
          const obj = {};
          header.forEach((h, i) => {
            obj[h] = row[i];
          });
          return obj;
        });
      case "Array of arrays":
      default:
        return json;
    }
  }
}

export default CSVToJSON;
