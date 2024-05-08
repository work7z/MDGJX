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
import Utils, { isNodeEnvironment } from "../Utils.mjs";

/**
 * Translation methods for file Dishes
 */
class DishFile extends DishType {
  /**
   * convert the given value to an ArrayBuffer
   * @param {File} value
   */
  static toArrayBuffer() {
    DishFile.checkForValue(this.value);
    if (isNodeEnvironment()) {
      this.value = Utils.readFileSync(this.value);
    } else {
      return new Promise((resolve, reject) => {
        Utils.readFile(this.value)
          .then((v) => (this.value = v.buffer))
          .then(resolve)
          .catch(reject);
      });
    }
  }

  /**
   * convert the given value from an ArrayBuffer
   */
  static fromArrayBuffer() {
    DishFile.checkForValue(this.value);
    this.value = new File(this.value, "unknown");
  }
}

export default DishFile;
