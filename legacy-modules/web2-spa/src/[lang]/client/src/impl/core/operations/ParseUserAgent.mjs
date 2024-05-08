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
import UAParser from "ua-parser-js";

/**
 * Parse User Agent operation
 */
class ParseUserAgent extends Operation {
  /**
   * ParseUserAgent constructor
   */
  constructor() {
    super();

    this.name = "Parse User Agent";
    this.module = "UserAgent";
    this.description =
      "Attempts to identify and categorise information contained in a user-agent string.";
    this.infoURL = "https://wikipedia.org/wiki/User_agent";
    this.inputType = "string";
    this.outputType = "string";
    this.args = [];
    this.checks = [
      {
        pattern: "^(User-Agent:|Mozilla\\/)[^\\n\\r]+\\s*$",
        flags: "i",
        args: [],
      },
    ];
  }

  /**
   * @param {string} input
   * @param {Object[]} args
   * @returns {string}
   */
  run(input, args) {
    const ua = UAParser(input);
    return `Browser
    Name: ${ua.browser.name || "unknown"}
    Version: ${ua.browser.version || "unknown"}
Device
    Model: ${ua.device.model || "unknown"}
    Type: ${ua.device.type || "unknown"}
    Vendor: ${ua.device.vendor || "unknown"}
Engine
    Name: ${ua.engine.name || "unknown"}
    Version: ${ua.engine.version || "unknown"}
OS
    Name: ${ua.os.name || "unknown"}
    Version: ${ua.os.version || "unknown"}
CPU
    Architecture: ${ua.cpu.architecture || "unknown"}`;
  }
}

export default ParseUserAgent;
