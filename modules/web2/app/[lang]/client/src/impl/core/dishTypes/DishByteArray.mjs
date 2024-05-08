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

import DishType from "./DishType.mjs";

/**
 * Translation methods for ArrayBuffer Dishes
 */
class DishByteArray extends DishType {
  /**
   * convert the given value to a ArrayBuffer
   */
  static toArrayBuffer() {
    DishByteArray.checkForValue(this.value);
    this.value = new Uint8Array(this.value).buffer;
  }

  /**
   * convert the given value from a ArrayBuffer
   */
  static fromArrayBuffer() {
    DishByteArray.checkForValue(this.value);
    this.value = Array.prototype.slice.call(new Uint8Array(this.value));
  }
}

export default DishByteArray;
