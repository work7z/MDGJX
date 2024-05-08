// Date: Fri, 29 Sep 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
// License: AGPLv3

// SKIP_DOT
import { HEADER_X_LAF_LANG } from '../web2share-copy/server_constants';
import { Request } from 'express';
import path from 'path';
import _ from 'lodash';
import Qs from 'query-string';
import i18nItems from './i18n-copy';
import { existsSync, readFileSync } from 'fs';
import { logger } from '@/utils/logger';
export const LANG_EN_US = 'en_US';
export type LangDefinition = { [key: string]: string };

let VER_FORGE_FORM = '0.0.1';
export const KEY_LANG_PACK_ZH_CN = 'KEY_LANG_PACK_ZH_CN' + VER_FORGE_FORM;
export const KEY_LANG_PACK_ZH_HK = 'KEY_LANG_PACK_ZH_HK' + VER_FORGE_FORM;

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

export const LANG_INIT_BEFORE_MAP: { [key: string]: boolean } = {};

function formatResultWithReplacer(val = '', ...args) {
  if (_.isNil(args)) {
    args = [];
  }
  for (let index in args) {
    let tval = args[index];
    while (true) {
      let p = '{' + index + '}';
      val = (val + '').replace(p, tval);
      if (val.indexOf(p) == -1) {
        break;
      }
    }
  }
  return val;
}
export type DotType = (id: string, enText: string, ...args: any[]) => string;
export let DotFnDefault = () => {
  return (id: string, enText: string, ...args: any[]): string => {
    return formatResultWithReplacer(enText, ...args);
  };
};
export let DotFn = (req: Request): DotType => {
  let xLafLang = req.headers[HEADER_X_LAF_LANG];
  let currentLang = LANG_EN_US;
  i18nItems.find(eachI18nItem => {
    if (eachI18nItem.Value == xLafLang) {
      currentLang = eachI18nItem.Value;
      return true;
    }
  });
  logger.info('xLafLang: ' + xLafLang);
  logger.info('currentLang: ' + currentLang);
  return (id: string, enText: string, ...args: any[]): string => {
    let language = currentLang;
    if (language != 'en_US') {
      let jsonFilePath = path.join(__dirname, '/lang/' + language + '.json');
      if (!LANG_INIT_BEFORE_MAP[language]) {
        LANG_INIT_BEFORE_MAP[language] = true;
        if (existsSync(jsonFilePath)) {
          let jsonFile = readFileSync(jsonFilePath, 'utf8');
          let pmap = JSON.parse(jsonFile);
          TranslationUtils.LangMap[language] = {
            ...pmap,
          };
        }
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
  };
};

const TranslationUtils = {
  // ForcbilyLanguage: "",
  // IsChinese() {
  //   return (
  //     getCurrentLang() == "zh_CN"
  //   );
  // },
  LangMap: crtNewLangMap,
  RealtimeObj: {},
  disableLanguageCheck: false,
  DotFn: DotFn,
};

export default TranslationUtils;
// export const Dot = TranslationUtils.Dot;
