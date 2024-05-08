
// Date: Fri, 20 Oct 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
// License: AGPLv3

import gutils from "./GlobalUtils";
import _ from "lodash";

let cacheID = "cacheID_";
export default {
  getFromCache: (sliceName, dftValue): any => {
    try {
      let r = localStorage.getItem(cacheID + sliceName);
      if (gutils.empty(r) || r == null) {
        return dftValue;
      } else {
        let m1 = JSON.parse(r as string);
        if (_.isNil(m1) || !_.isObjectLike(m1)) {
          m1 = {};
        }
        _.defaultsDeep(m1, dftValue);
        return m1;
      }
    } catch (e) {
      return dftValue;
    }
  },
  saveIntoCache: (sliceName, state) => {
    // TODO: make those localStorage sharing with other clients
    try {
      localStorage.setItem(cacheID + sliceName, JSON.stringify(state));
    } catch (e) {
      //
    }
  },
};
