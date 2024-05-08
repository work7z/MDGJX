
// Date: Sun, 14 Jan 2024
// Second Author: Ryan Laf
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

/**
 * @author Matt C [matt@artemisbot.uk]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 */

import { Dot } from "../../../../utils/cTranslationUtils.tsx";
import Operation, { OptDetail } from "../../../core/Operation.tsx";
import OperationError from "../../../core/errors/OperationError.mjs";
import notepack from "notepack.io";

/**
 * From MessagePack operation
 */
class FromMessagePack extends Operation {
  public getOptDetail(): OptDetail {
    return {
      infoURL: "https://wikipedia.org/wiki/MessagePack",
      optName: Dot("8_jx_2zEw", "From {0}", Dot("j5KxYotVC", 'MessagePack')),
      optDescription: Dot("8mxv4e6pz", "Converts MessagePack encoded data to JSON. MessagePack is a computer data interchange format. It is a binary form for representing simple data structures like arrays and associative arrays."),
      exampleInput: "8b2a",
      exampleOutput: "{\n  \"a\": 42\n}",
      relatedID: "fromto",
      config: {
        flowControl: false,
        manualBake: false,
        module: "Code",
        description: "Converts MessagePack encoded data to JSON. MessagePack is a computer data interchange format. It is a binary form for representing simple data structures like arrays and associative arrays.",
        infoURL: "https://wikipedia.org/wiki/MessagePack",
        inputType: "ArrayBuffer",
        outputType: "JSON",
        args: [],
      },
    }
  }
  /**
   * FromMessagePack constructor
   */
  constructor() {
    super();

    this.name = "From MessagePack";
    this.module = "Code";
    // this.description =
    //   "Converts MessagePack encoded data to JSON. MessagePack is a computer data interchange format. It is a binary form for representing simple data structures like arrays and associative arrays.";
    // this.infoURL = "https://wikipedia.org/wiki/MessagePack";
    this.inputType = "ArrayBuffer";
    this.outputType = "JSON";
    this.args = [];
  }

  /**
   * @param {ArrayBuffer} input
   * @param {Object[]} args
   * @returns {JSON}
   */
  run(input, args) {
    try {
      const buf = Buffer.from(new Uint8Array(input));
      return notepack.decode(buf);
    } catch (err) {
      throw new OperationError(`Could not decode MessagePack to JSON: ${err}`);
    }
  }
}

export default FromMessagePack;
