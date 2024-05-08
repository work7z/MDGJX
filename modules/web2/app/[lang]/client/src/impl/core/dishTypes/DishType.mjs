// Date: Sun, 14 Jan 2024
// Second Author: Ryan Laf
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

/**
 * @author d98762625 [d98762625@gmail.com]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 */

/**
 * Abstract class for dish translation methods
 */
class DishType {
  /**
   * Warn translations dont work without value from bind
   */
  static checkForValue(value) {
    if (value === undefined) {
      throw new Error("only use translation methods with .bind");
    }
  }

  /**
   * convert the given value to a ArrayBuffer
   * @param {*} value
   */
  static toArrayBuffer() {
    throw new Error("toArrayBuffer has not been implemented");
  }

  /**
   * convert the given value from a ArrayBuffer
   */
  static fromArrayBuffer() {
    throw new Error("fromArrayBuffer has not been implemented");
  }
}

export default DishType;
