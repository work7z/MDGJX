
// Date: Sun, 24 Sep 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
// License: AGPLv3

import _ from "lodash";
import { Dot } from "./cTranslationUtils";
import ALL_NOCYCLE, { IsDevMode, copy, getErrMsg } from "../nocycle";
import { fn } from "jquery";
import { GetUserActualClientLang } from "../i18n";

const STR_DEV_MODE = "DEV_MODE";

export let getTextStrFromHTML = (html: string): string => {
  var doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

function uuid(str = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"): string {
  return str
    .replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    })
    .replace(/-/gi, "");
}

const gutils = {
  defer: (fn: any) => setTimeout(fn, 0),
  copy: copy,
  convertASCIICodeInStr(indentStr: string): string {
    // indentStr = indentStr.replace(/\\t/g, "\t").replace(/\\n/g, "\n").replace(/\\r/g, "\r").replace(/\\f/g, "\f").replace(/\\v/g, "\v").replace(/\\b/g, "\b").replace(/\\0/g, "\0");
    return indentStr;
  },
  ConvertStrToNumberOrZero(val: string | null): number {
    if (_.isNil(val)) {
      return 0;
    }
    if (val == null) {
      return 0
    }
    let r = parseInt(val);
    if (_.isNaN(r)) {
      return 0;
    }
    return r;
  },
  shortUuid() {
    return uuid().substring(0, 8);
  },
  stopE(e: any) {
    if (_.isNil(e)) return;
    e.preventDefault();
    e.stopPropagation();
  },
  uuid,
  emptyArr(val) {
    return _.isEmpty(val);
  },
  empty(val: string | null, ...anyOtherValues: string[]): boolean {
    if (_.isNil(anyOtherValues)) {
      anyOtherValues = [];
    }
    for (let a of anyOtherValues) {
      if (a == val) {
        return true;
      }
    }
    if (_.isNil(val) || val == "") {
      return true;
    }
    return false;
  },
  getStaticPath(subPath: string): string {
    return `/static/${subPath}`;
  },
  ExposureIt(key: string, value: any, devVisibleOnly?: boolean) {
    if (devVisibleOnly === true && !gutils.IsDevMode) {
      return;
    }
    if (typeof window !== 'undefined') {
      _.set(window, key, value);
    }
  },
  GetUserActualClientLang: GetUserActualClientLang,
  // GetUserActualClientLang(): string {
  //   let finalLang = "en_US";
  //   if (!navigator || !navigator.languages) {
  //     return finalLang
  //   }
  //   navigator.languages.forEach(locale_str => {
  //     if (locale_str == "zh-CN") {
  //       finalLang = "zh_CN";
  //     } else if (locale_str == "zh-TW" || locale_str == "zh-HK") {
  //       finalLang = "zh_HK";
  //     }
  //   })
  //   return finalLang
  // },
  safeparse(str: string | null) {
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
  },
  sleep(val: number): Promise<any> {
    return new Promise((e: any) => {
      setTimeout(() => {
        e();
      }, val);
    });
  },
  getWebErrMsg(e: any): string {
    if (e && e.data && e.data.errors) {
      return _.join(e.data.errors, ",");
    }
    if (_.isString(e)) {
      return e;
    }
    let st = _.get(e, "originalStatus");
    let data = _.get(e, "data");
    return `${st} -> ${data}`;
  },
  getErrAxiosMsg(e: any): string {
    if (_.isArray(e)) {
      return _.join(e, ",");
    }
    let errors = _.get(e.response?.data, "errors");
    let finMsg = !_.isNil(errors)
      ? _.join(errors, ",")
      : gutils.getErrMsg(e as Error);
    let r = `[${e.response?.status}] ${finMsg}`;
    return r;
  },
  getErrMsg: getErrMsg,
  IsPortalMode(): boolean {
    return false;
  },
  // it's just a simple way to check if it's dev mode, do you have other ideas?
  IsDevMode: IsDevMode,
};

export default gutils;
