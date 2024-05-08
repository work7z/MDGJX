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

import Operation from "../Operation.tsx";
import { COMPRESSION_TYPE } from "../lib/Zlib.mjs";
var rawdeflate = require("zlibjs/bin/rawdeflate.min.js");

const Zlib = rawdeflate.Zlib;

const RAW_COMPRESSION_TYPE_LOOKUP = {
  "Fixed Huffman Coding": Zlib.RawDeflate.CompressionType.FIXED,
  "Dynamic Huffman Coding": Zlib.RawDeflate.CompressionType.DYNAMIC,
  "None (Store)": Zlib.RawDeflate.CompressionType.NONE,
};

/**
 * Raw Deflate operation
 */
class RawDeflate extends Operation {
  /**
   * RawDeflate constructor
   */
  constructor() {
    super();

    this.name = "Raw Deflate";
    this.module = "Compression";
    this.description =
      "Compresses data using the deflate algorithm with no headers.";
    this.infoURL = "https://wikipedia.org/wiki/DEFLATE";
    this.inputType = "ArrayBuffer";
    this.outputType = "ArrayBuffer";
    this.args = [
      {
        name: "Compression type",
        type: "option",
        value: COMPRESSION_TYPE,
      },
    ];
  }

  /**
   * @param {ArrayBuffer} input
   * @param {Object[]} args
   * @returns {ArrayBuffer}
   */
  run(input, args) {
    const deflate = new Zlib.RawDeflate(new Uint8Array(input), {
      compressionType: RAW_COMPRESSION_TYPE_LOOKUP[args[0]],
    });
    return new Uint8Array(deflate.compress()).buffer;
  }
}

export default RawDeflate;
