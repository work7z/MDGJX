// Date: Sun, 14 Jan 2024
// Second Author: Ryan Laf
// Description: The AND class is a bitwise AND operation implementation that can be used to perform AND operation on byte arrays with a given key.
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import { Dot } from "../../../../utils/cTranslationUtils.tsx";
import Operation, { OptDetail } from "../../../core/Operation.tsx";
import Utils from "../../../core/Utils.mjs";
import { bitOp, and, BITWISE_OP_DELIMS } from "../../../core/lib/BitwiseOp.mjs";

/**
* AND operation
*/
class AND extends Operation {
  /**
  * AND constructor
  */
  constructor() {
    super();

    this.name = Dot("and.name", "AND");
    this.module = "Default";
    this.description = Dot("and.desc", "AND the input with the given key. e.g. fe023da5");
    this.infoURL = "https://wikipedia.org/wiki/Bitwise_operation#AND";
    this.inputType = "byteArray";
    this.outputType = "byteArray";
    this.args = [
      {
        name: Dot("and.arg.key", "Key"),
        type: "toggleString",
        value: "",
        toggleValues: BITWISE_OP_DELIMS,
      },
    ];
  }

  /**
  * Get operation details
  */
  public getOptDetail(): OptDetail {
    return {
      relatedID: 'nothing',
      config: {
        "module": "Default",
        "description": this.description,
        "infoURL": this.infoURL,
        "inputType": this.inputType,
        "outputType": this.outputType,
        "flowControl": false,
        "manualBake": false,
        "args": this.args,
      },
      infoURL: this.infoURL,
      nousenouseID: 'and',
      optName: Dot("and.textiDjMIo", "Generate {0} Hash", "AND"),
      optDescription: Dot(
        "and.desc.rxsHq",
        "This operation performs a bitwise {0} on data.",
        "AND"
      ),
      // exampleInput and exampleOutput are placeholders, actual values should be provided
      exampleInput: "",
      exampleOutput: ""
    };
  }

  /**
  * @param {Uint8Array} input
  * @param {Object[]} args
  * @returns {Uint8Array}
  */
  run(input: Uint8Array, args: any[]): Uint8Array {
    const key = Utils.convertToByteArray(args[0].string || "", args[0].option);

    return bitOp(input, key, and);
  }

  /**
  * Highlight AND
  *
  * @param {Object[]} pos
  * @param {number} pos[].start
  * @param {number} pos[].end
  * @param {Object[]} args
  * @returns {Object[]} pos
  */
  highlight(pos: { start: number; end: number }[], args: any[]): { start: number; end: number }[] {
    return pos;
  }

  /**
  * Highlight AND in reverse
  *
  * @param {Object[]} pos
  * @param {number} pos[].start
  * @param {number} pos[].end
  * @param {Object[]} args
  * @returns {Object[]} pos
  */
  highlightReverse(pos: { start: number; end: number }[], args: any[]): { start: number; end: number }[] {
    return pos;
  }
}

export default AND;