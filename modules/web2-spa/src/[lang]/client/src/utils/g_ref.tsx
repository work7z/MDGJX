
// Date: Thu, 2 Nov 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
// License: AGPLv3

import _ from "lodash";

export function uuid(str = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx") {
  return str
    .replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    })
    .replace(/-/gi, "");
}

export let safeparse = (str: string | null) => {
  if (_.isNil(str)) {
    return null;
  }
  if (str == null) {
    return null;
  }
  try {
    return JSON.parse(str);
  } catch (err) {
    return null;
  }
};
