
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

import { toHex, TO_HEX_DELIM_OPTIONS } from "../../../core/lib/Hex.mjs";

import Operation, { OptDetail } from "../../../core/Operation.tsx";
import OperationError from "../../../core/errors/OperationError.mjs";
import Utils from "../../../core/Utils.mjs";
import { alphabetName, ALPHABET_OPTIONS } from "../../../core/lib/Base85.mjs";
import { Dot } from "@/[lang]/client/src/utils/cTranslationUtils";
import { TEXT_INPUT_EXAMPLE_HELLO_WORLD } from './_constants.tsx'

/**
 * To Hex operation
 */
class ToHex extends Operation {
  public getOptDetail(): OptDetail {
    return {
      relatedID: 'hex',
      config: {
        "module": "Default",
        "description": "Converts the input string to hexadecimal bytes separated by the specified delimiter.<br><br>e.g. The UTF-8 encoded string <code>Γειά σου</code> becomes <code>ce 93 ce b5 ce b9 ce ac 20 cf 83 ce bf cf 85 0a</code>",
        "infoURL": "https://wikipedia.org/wiki/Hexadecimal",
        "inputType": "ArrayBuffer",
        "outputType": "string",
        "flowControl": false,
        "manualBake": false,
        "args": [
          {
            "name": "Delimiter",
            "type": "option",
            "value": [
              "Space",
              "Percent",
              "Comma",
              "Semi-colon",
              "Colon",
              "Line feed",
              "CRLF",
              "0x",
              "0x with comma",
              "\\x",
              "None"
            ]
          },
          {
            "name": "Bytes per line",
            "type": "number",
            "value": 0
          }
        ]
      },
      optName: Dot("rZL0xuQu2", "To {0}", Dot("0yNpSzyRG", 'Hex')),
      nousenouseID: 'tohex',
      optDescription:
        Dot("ISMDLUbAc", "Converts the input string to hexadecimal bytes separated by the specified delimiter.<br><br>e.g. The UTF-8 encoded string <code>ÎÎµÎ¹Î¬ ÏÎ¿Ï</code> becomes <code>ce 93 ce b5 ce b9 ce ac 20 cf 83 ce bf cf 85 0a</code>"),
      infoURL: "https://wikipedia.org/wiki/Hexadecimal",
      exampleInput: TEXT_INPUT_EXAMPLE_HELLO_WORLD,
      exampleOutput: "ce 93 ce b5 ce b9 ce ac 20 cf 83 ce bf cf 85 0a",
    }
  }
  /**
   * ToHex constructor
   */
  constructor() {
    super();

    this.module = "Default";
    this.inputType = "ArrayBuffer";
    this.outputType = "string";
    this.args = [
      {
        name: "Delimiter",
        type: "option",
        value: TO_HEX_DELIM_OPTIONS,
      },
      {
        name: "Bytes per line",
        type: "number",
        value: 0,
      },
    ];
  }

  /**
   * @param {ArrayBuffer} input
   * @param {Object[]} args
   * @returns {string}
   */
  run(input, args) {
    let delim, comma;
    if (args[0] === "0x with comma") {
      delim = "0x";
      comma = ",";
    } else {
      delim = Utils.charRep(args[0] || "Space");
    }
    const lineSize = args[1];

    return toHex(new Uint8Array(input), delim, 2, comma, lineSize);
  }

  /**
   * Highlight to Hex
   *
   * @param {Object[]} pos
   * @param {number} pos[].start
   * @param {number} pos[].end
   * @param {Object[]} args
   * @returns {Object[]} pos
   */
  highlight(pos, args) {
    let delim,
      commaLen = 0;
    if (args[0] === "0x with comma") {
      delim = "0x";
      commaLen = 1;
    } else {
      delim = Utils.charRep(args[0] || "Space");
    }

    const lineSize: any = args[1],
      len = delim.length + commaLen;

    const countLF = function (p: number) {
      // Count the number of LFs from 0 upto p
      return ((p / lineSize) | 0) - (p as any >= lineSize as any && p % lineSize === 0);
    };

    pos[0].start = pos[0].start * (2 + len) + countLF(pos[0].start);
    pos[0].end = pos[0].end * (2 + len) + countLF(pos[0].end);

    // if the delimiters are not prepended, trim the trailing delimiter
    if (!(delim === "0x" || delim === "\\x")) {
      pos[0].end -= delim.length;
    }
    // if there is comma, trim the trailing comma
    pos[0].end -= commaLen;
    return pos;
  }

  /**
   * Highlight from Hex
   *
   * @param {Object[]} pos
   * @param {number} pos[].start
   * @param {number} pos[].end
   * @param {Object[]} args
   * @returns {Object[]} pos
   */
  highlightReverse(pos, args) {
    let delim,
      commaLen = 0;
    if (args[0] === "0x with comma") {
      delim = "0x";
      commaLen = 1;
    } else {
      delim = Utils.charRep(args[0] || "Space");
    }

    const lineSize = args[1],
      len = delim.length + commaLen,
      width = len + 2;

    const countLF = function (p) {
      // Count the number of LFs from 0 up to p
      const lineLength = width * lineSize;
      return ((p / lineLength) | 0) - (p >= lineLength as any && p % lineLength === 0);
    };

    pos[0].start =
      pos[0].start === 0
        ? 0
        : Math.round((pos[0].start - countLF(pos[0].start)) / width);
    pos[0].end =
      pos[0].end === 0
        ? 0
        : Math.ceil((pos[0].end - countLF(pos[0].end)) / width);
    return pos;
  }
}

export default ToHex;
