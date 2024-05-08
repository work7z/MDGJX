
// Date: Thu, 19 Oct 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
// License: AGPLv3

import _ from "lodash";
import gutils from "./GlobalUtils";
let prefixRemark = "C4Vvc";
let mem = {};
export const RemarkUtils = {
  KEY_GET_FORGE_BEFORE: "C0A7J",
  checkKeyExistsInLS: (key: string): boolean => {
    return localStorage.getItem(prefixRemark + key) !== null;
  },
  // save key
  saveKeyInLS: (key: string) => {
    localStorage.setItem(prefixRemark + key, "1");
  },
  KEY_MUTE_FORGE_SET_ONCE: "u7FLz",
  checkKeyExistsInMem: (key: string): boolean => {
    return !_.isNil(mem[prefixRemark + key]);
  },
  // save key
  saveKeyInMem: (key: string) => {
    mem[prefixRemark + key] = "1";
  },
  cleanKeyInMem: (key: string) => {
    delete mem[prefixRemark + key];
  },
  readAndDelInMem: (key: string): boolean => {
    let has = RemarkUtils.checkKeyExistsInMem(key);
    RemarkUtils.cleanKeyInMem(key);
    return has;
  },
};
gutils.ExposureIt("RemarkUtils", RemarkUtils, true);
