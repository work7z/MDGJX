// LafTools
// 
// Date: Thu, 22 Feb 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc



import { LocaleType } from "@/middleware"
import { getXLocaleStrInRSC } from "./TranslationUtils"
import _ from 'lodash'
import { sysLocale } from "./cTranslationUtils"

export let fmtURL_Server = (str: string[]): string => {
    let localePrefix = sysLocale.langInURL
    return '/' + ([localePrefix, ...str].filter(x => x != '' && !_.isNil(x)).join('/'))
}