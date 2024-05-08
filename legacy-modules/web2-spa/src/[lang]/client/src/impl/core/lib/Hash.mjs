// Date: Sun, 14 Jan 2024
// Second Author: Ryan Laf
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

/**
 * Hashing resources.
 *
 * @author n1474335 [n1474335@gmail.com]
 *
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Utils from "../Utils.mjs";
import CryptoApi from "crypto-api/src/crypto-api.mjs";

/**
 * Generic hash function.
 *
 * @param {string} name
 * @param {ArrayBuffer} input
 * @param {Object} [options={}]
 * @returns {string}
 */
export function runHash(name, input, options = {}) {
  const msg = Utils.arrayBufferToStr(input, false),
    hasher = CryptoApi.getHasher(name, options);
  hasher.update(msg);
  return CryptoApi.encoder.toHex(hasher.finalize());
}
