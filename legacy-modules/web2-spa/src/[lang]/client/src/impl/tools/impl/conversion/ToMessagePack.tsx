
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

import Operation, { OptDetail } from "../../../core/Operation.tsx";
import OperationError from "../../../core/errors/OperationError.mjs";
import notepack from "notepack.io";
import { isWorkerEnvironment } from "../../../core/Utils.mjs";
import { Dot } from "@/__CORE__/utils/cTranslationUtils.tsx";

/**
 * To MessagePack operation
 */
class ToMessagePack extends Operation {
  public getOptDetail(): OptDetail {
    return {
      infoURL: "https://wikipedia.org/wiki/MessagePack",
      optName: Dot("XAJIZiKtp", "To {0}", Dot("uIuU_n418", 'MessagePack')),
      optDescription: Dot("FsrRIxrjL", "Converts JSON to MessagePack encoded byte buffer. MessagePack is a computer data interchange format. It is a binary form for representing simple data structures like arrays and associative arrays."),
      exampleInput: "{\n  \"a\": 42\n}",
      exampleOutput: "8b2a",
      relatedID: "fromto",
      config: {
        flowControl: false,
        manualBake: false,
        module: "Code",
        description: "Converts JSON to MessagePack encoded byte buffer. MessagePack is a computer data interchange format. It is a binary form for representing simple data structures like arrays and associative arrays.",
        infoURL: "https://wikipedia.org/wiki/MessagePack",
        inputType: "JSON",
        outputType: "ArrayBuffer",
        args: [],
      },
    }
  }
  /**
   * ToMessagePack constructor
   */
  constructor() {
    super();

    this.name = "To MessagePack";
    this.module = "Code";
    // this.description =
    //   "Converts JSON to MessagePack encoded byte buffer. MessagePack is a computer data interchange format. It is a binary form for representing simple data structures like arrays and associative arrays.";
    // this.infoURL = "https://wikipedia.org/wiki/MessagePack";
    this.inputType = "JSON";
    this.outputType = "ArrayBuffer";
    this.args = [];
  }

  /**
   * @param {JSON} input
   * @param {Object[]} args
   * @returns {ArrayBuffer}
   */
  run(input, args) {
    try {
      if (isWorkerEnvironment()) {
        return notepack.encode(input);
      } else {
        const res = notepack.encode(input);
        // Safely convert from Node Buffer to ArrayBuffer using the correct view of the data
        return new Uint8Array(res).buffer;
      }
    } catch (err) {
      throw new OperationError(`Could not encode JSON to MessagePack: ${err}`);
    }
  }
}

export default ToMessagePack;
