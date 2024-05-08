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

import r from "jsrsasign";
import Operation from "../Operation.tsx";

/**
 * Object Identifier to Hex operation
 */
class ObjectIdentifierToHex extends Operation {
  /**
   * ObjectIdentifierToHex constructor
   */
  constructor() {
    super();

    this.name = "Object Identifier to Hex";
    this.module = "PublicKey";
    this.description =
      "Converts an object identifier (OID) into a hexadecimal string.";
    this.infoURL = "https://wikipedia.org/wiki/Object_identifier";
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
    return r.KJUR.asn1.ASN1Util.oidIntToHex(input);
  }
}

export default ObjectIdentifierToHex;
