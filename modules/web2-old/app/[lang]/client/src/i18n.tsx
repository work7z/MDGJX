// LafTools
// 
// Date: Sun, 7 Jan 2024
// Author: Ryan Laf <work7z@outlook.com>
// Description: 
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import _ from 'lodash'
import TranslationUtils, { Dot } from './utils/cTranslationUtils'
import { I18nItem } from '@/app/__CORE__/config/i18n'
import { DotType } from './impl/tools/common_ref'
import { fn_Geti18n } from './i18n-pure'

export let getFormattedLang = function (crtLang: string) {
  if (crtLang == 'zh_CN') {
    return 'cn'
  }
  if (crtLang == 'zh_HK') {
    // return 'zh-hant'
    return 'hk'
  }
  if (crtLang == 'en_US') {
    return 'en'
  }
  return crtLang;
}
export * from './i18n-pure'

let prevLangValue: string | null = null

export let GetUserActualClientLang = function (): string {
  if (TranslationUtils.ForcbilyLanguage) {
    return TranslationUtils.ForcbilyLanguage
  }
  if (prevLangValue) return prevLangValue
  // if url is specified, then forcebly use this once
  if ((typeof location === 'undefined')) {
    return TranslationUtils.getCurrentLang();
  }
  let appi18nJSON = fn_Geti18n(Dot);
  let matchResult = location.href.match(/\/app\/([^\/]+)/)
  if (matchResult) {
    let prevValue = matchResult[1]
    if (prevValue == 'zh-hans' || prevValue == 'zh-cn' || prevValue == 'zh') {
      prevValue = 'zh_CN'
    }
    if (prevValue == 'zh-hant' || prevValue == 'zh-tw' || prevValue == 'hk') {
      prevValue = 'zh_HK'
    }
    if (prevValue == 'en') {
      prevValue = 'en_US'
    }
    let findIdx = _.findIndex(appi18nJSON, x => x.Value == prevValue)
    if (findIdx != -1) {
      prevLangValue = prevValue
      return prevValue;
    }
  }



  let finalLang = "en_US";
  if (!navigator || !navigator.languages) {
    return finalLang
  }
  let found = false;
  navigator.languages.forEach(locale_str => {
    if (found) return;
    if (locale_str == "zh-CN") {
      found = true;
      finalLang = "zh_CN";
    } else if (locale_str == "zh-TW" || locale_str == "zh-HK") {
      found = true;
      finalLang = "zh_HK";
    }
  })
  return finalLang
}
