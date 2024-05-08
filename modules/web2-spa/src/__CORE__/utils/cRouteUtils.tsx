// LafTools
// 
// Date: Thu, 22 Feb 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc


// let xlocale = getXLocaleStrInRSC()

import { LocaleType } from "@/middleware"
import { getXLocaleStrInRSC } from "./TranslationUtils"
import { sysLocale } from "./cTranslationUtils"
import _ from "lodash"


export let getLocalePrefix_Client = (): LocaleType => {
    return sysLocale
}

export let fmtURL_Client = (str: string[]): string => {
    let localePrefix = getLocalePrefix_Client().langInURL
    // return "/" + localePrefix + str
    return '/' + ([localePrefix, ...str].filter(x => x != '' && !_.isNil(x)).join('/'))
}