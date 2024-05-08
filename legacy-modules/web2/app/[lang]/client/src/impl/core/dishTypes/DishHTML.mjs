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

import DishString from "./DishString.mjs";
import Utils from "../Utils.mjs";

/**
 * Translation methods for HTML Dishes
 */
class DishHTML extends DishString {
  /**
   * convert the given value to a ArrayBuffer
   * @param {String} value
   */
  static toArrayBuffer() {
    DishHTML.checkForValue(this.value);
    this.value = this.value
      ? Utils.strToArrayBuffer(
          Utils.unescapeHtml(Utils.stripHtmlTags(this.value, true)),
        )
      : new ArrayBuffer();
  }
}

export default DishHTML;
