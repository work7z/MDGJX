
// Date: Fri, 29 Sep 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
// License: AGPLv3

// SKIP_DOT
import { cookies, headers } from 'next/headers';
import _ from "lodash";
import Qs from 'query-string'
import { LANG_EN_US, LangDefinition } from "../meta/constants";
import { LocaleType, all_locales as all_locales, zhCNLocale } from '@/middleware';
import { isDevEnv } from '../share/env';

let VER_FORGE_FORM = '0.0.1'
export const KEY_LANG_PACK_ZH_CN = "KEY_LANG_PACK_ZH_CN" + VER_FORGE_FORM;
export const KEY_LANG_PACK_ZH_HK = "KEY_LANG_PACK_ZH_HK" + VER_FORGE_FORM;

interface LangMap {
  zh_CN: LangDefinition;
  zh_HK: LangDefinition;
}
let newLangMap2 = (): LangMap => {
  return {
    zh_CN: {},
    zh_HK: {},
  };
};
export const newLangMap = newLangMap2;
let crtNewLangMap = newLangMap();
const key_global_lang_cached = "N91OLG8g"
let global_lang_cached_map = {}
if (global[key_global_lang_cached]) {
  global_lang_cached_map = global[key_global_lang_cached]
}
global[key_global_lang_cached] = global_lang_cached_map

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


export let getXLocaleStrInRSC = (): LocaleType => {
  const headersList = headers();
  const val = headersList.get('x-locale') || "";
  let item = all_locales.find(x => x.langInHttp == val)
  return item || zhCNLocale
}

export let isChineseByXLocal = (): boolean => {
  let xlocale = getXLocaleStrInRSC()
  return xlocale.langIni18n == 'zh_CN'
}

export let getXHostname = (): string => {
  const headersList = headers();
  const val = headersList.get('x-hostname') || "";
  return val;
}
export let getHStr = (): string => {
  const headersList = headers();
  const val = headersList.get('x-hstr') || "";
  return val;
}
export let getXSearchParams = (): { [key: string]: any } => {
  const headersList = headers();
  const val = headersList.get('x-search') || "";
  return Qs.parse(val);
}
export let getXNonCNUsers = (): boolean => {
  const headersList = headers();
  const val = headersList.get('x-noncn') || "";
  return val == 'true';
}
export let getXSubPath = (): string => {
  const headersList = headers();
  const val = headersList.get('x-path') || "";
  return val;
}


export let getWebsiteLocale = () => {
  let xlocale = getXLocaleStrInRSC()
  return xlocale.langInHttp
}
export let getCurrentLang = () => {
  let xlocale = getXLocaleStrInRSC()
  return xlocale.langIni18n
}

const TranslationUtils = {
  ForcbilyLanguage: "",
  IsChinese() {
    return (
      getCurrentLang() == "zh_CN"
    );
  },
  LangMap: crtNewLangMap,
  RealtimeObj: {},
  disableLanguageCheck: false,
  Dot(id: string, enText: string, ...args: any[]): string {
    let language = TranslationUtils.disableLanguageCheck ? "en_US" : getCurrentLang()

    if (language != 'en_US') {
      if (global_lang_cached_map[language] && !isDevEnv()) {
        TranslationUtils.LangMap[language] = global_lang_cached_map[language]
      } else {
        let pmap = require("../../../public/static/lang/" + language + ".json")
        let pmap2 = require("../../../public/static/lang2client/" + language + ".json")
        TranslationUtils.LangMap[language] = global_lang_cached_map[language] = { ...pmap, ...pmap2 }
      }
    }
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

export default TranslationUtils;
export const Dot = TranslationUtils.Dot;
