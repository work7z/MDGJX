
// Date: Sat, 30 Sep 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
// License: AGPLv3

import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { RootState } from "./store";
import appinfoJSON from "../../[category]/info";
import { Dispatch } from "react";
import _ from "lodash";
import { useHistory } from "react-router-dom";

export let getAjaxResPayloadValue = function <A extends { [key: string]: any }>(r): A {
  return r.data?.payload?.value || r.response?.data?.payload?.value;
};

export let getAjaxResPayloadValueAsString = function (r): string {
  if (_.isString(r)) { return r }
  return r.response?.data?.payload?.value;
};
function isObject(item) {
  return typeof item === "object" && !Array.isArray(item) && item !== null;
}

// export function defaultsDeepNoArr(target, defaults) {
//   for (let key in defaults) {
//     if (target[key] === undefined || target[key] === null) {
//       target[key] = defaults[key];
//     } else if (isObject(target[key]) && isObject(defaults[key])) {
//       defaultsDeepNoArr(target[key], defaults[key]);
//     }
//   }
//   return target;
// }
export let copy = function (ctn: string, showMsg?: boolean) {
  if (typeof window !== "undefined") {
    // prevent no document error
    if (typeof document === "undefined") {
      return
    }
    if (!document) {
      return;
    }
    var obj = document.getElementById("uniqueiptele") as any;
    if (obj) {
      obj.value = ctn;
      obj.select();
      document.execCommand("Copy");
      if (showMsg) {
        //
      }
    }
  }
};

export let getErrMsg = function (_e): string {
  let e = _e as Error;
  if (_.isNil(e)) {
    return "Unknown Error";
  }
  return e.message;
};
export * from './server'
let pkey = "txsyl";
export let saveStrIntoCache = function (key: string, value: string) {
  // localStorage.setItem(pkey + key, value);
};
export let getStrIntoCache = function (key: string): string | null {
  return ''
  // return localStorage.getItem(pkey + key);
};

interface NoCycle {
  store?: ToolkitStore<RootState>;
  workspaceId?: string | undefined;
  history?: ReturnType<typeof useHistory>;
  Fn_LastCloseTab?: () => any;
  Fn_LastCloseAllTab?: () => any;
}
let ALL_NOCYCLE: NoCycle = {};

export type RootState2 = RootState;
export const APPINFOJSON = appinfoJSON;

export let delayFN = (fn) => {
  setTimeout(fn, 0);
};

export const FN_GetDispatch = (): Dispatch<any> => {
  return ALL_NOCYCLE.store?.dispatch as Dispatch<any>;
};
export const FN_GetState = (): RootState2 => {
  return ALL_NOCYCLE.store?.getState() as RootState2;
};

export default ALL_NOCYCLE;

export let IsDevMode = (): boolean =>
  // emmm.. hard code not cool, would u refine it?
  location.href.indexOf("127.0.0.1:3000") != -1 ||
  location.href.indexOf("localhost:3000") != -1;

export let getIconPngFile = (): string => {
  return "icon.png";
};
