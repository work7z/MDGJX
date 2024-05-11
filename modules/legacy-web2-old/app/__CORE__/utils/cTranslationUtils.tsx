'use client'

// Date: Fri, 29 Sep 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
// License: AGPLv3

// SKIP_DOT
import { headers } from 'next/headers';
import _ from "lodash";
import { LANG_EN_US, LangDefinition } from "../meta/constants";
import { usePathname } from 'next/navigation'
import { all_locales, zhCNLocale } from '@/middleware';
import { fmtURL_Client } from './cRouteUtils';

let VER_FORGE_FORM = '0.0.1'
export const KEY_LANG_PACK_ZH_CN = "KEY_LANG_PACK_ZH_CN" + VER_FORGE_FORM;
export const KEY_LANG_PACK_ZH_HK = "KEY_LANG_PACK_ZH_HK" + VER_FORGE_FORM;

let document = null;
export let sysLocale = zhCNLocale
if (typeof window !== "undefined") {
  let sysLang = window['document'].body.parentElement?.getAttribute("lang")
  sysLocale = all_locales.find(x => x.langInHttp == sysLang) || sysLocale
}


interface LangMap {
  zh_CN: LangDefinition;
  zh_HK: LangDefinition;
}

export let getCurrentLang = () => {
  return sysLocale.langIni18n
}

let newLangMap2 = (): LangMap => {
  let locale = getCurrentLang()
  if (typeof window == "undefined") {
    return {
      zh_CN: {},
      zh_HK: {},
      [locale]: {}
    }
  }
  let langJSONStr = localStorage.getItem("lang-" + locale)
  if (langJSONStr) {
    return {
      zh_CN: {},
      zh_HK: {},
      [locale]: JSON.parse(langJSONStr),
    } as any
  }
  // if (window['__LANG2CLIENT__']) {
  //   let preLangMap = JSON.parse(window['__LANG2CLIENT__'])
  //   let f = {
  //     [getCurrentLang()]: preLangMap
  //   }
  //   return f as any
  // }
  return {
    zh_CN: {},
    zh_HK: {},
  };
};
export const newLangMap = newLangMap2;
let crtNewLangMap = newLangMap();

export const LANG_INIT_BEFORE_MAP: { [key: string]: boolean } = {};

function formatResultWithReplacer(val = "", ...args) {
  if (_.isNil(args)) {
    args = [];
  }
  for (let index in args) {
    let tval = args[index];
    while (true) {
      let p = "{" + index + "}";
      val = (val + "").replace(p, tval);
      if (val.indexOf(p) == -1) {
        break;
      }
    }
  }
  return val;
}


if (typeof window !== "undefined") {
  window['sysLocale'] = sysLocale
}
// export let getCurrentLang = () => {
//   return sysLocale.langIni18n
// }

const TranslationUtils = {
  ForcbilyLanguage: "",
  CurrentLanguage: getCurrentLang(),
  getCurrentLang,
  IsChinese() {
    return (
      getCurrentLang() == "zh_CN"
    );
  },
  LangMap: crtNewLangMap,
  currentUpdateCount: 0,
  ExtraMap: {},
  RealtimeObj: {},
  Dot(id: string, enText: string, ...args: any[]): string {
    let language = '';
    language = getCurrentLang()
    if (!TranslationUtils.LangMap[language]) {
      TranslationUtils.LangMap[language] = {}
    }
    // if (language != 'en_US') {
    //   let pmap = {} // require("../../../public/static/lang/" + language + ".json")
    //   TranslationUtils.LangMap[language] = pmap
    // }
    if (language == LANG_EN_US) {
      // do nothing
    } else {
      let langmap = TranslationUtils.LangMap;
      let o = langmap[language] as LangDefinition;
      if (_.isNil(o)) {
        return enText;
      }
      let preText = o[id];
      if (!_.isNil(preText)) {
        enText = preText;
      }
    }
    let finResult = formatResultWithReplacer(enText, ...args);
    return finResult;
  },
};

if (typeof window !== "undefined") {
  window['c1_TranslationUtils'] = TranslationUtils
}

export default TranslationUtils;
export const Dot = TranslationUtils.Dot;
