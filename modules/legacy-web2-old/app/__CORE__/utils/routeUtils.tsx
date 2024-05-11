// LafTools
// 
// Date: Thu, 22 Feb 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc


// let xlocale = getXLocaleStrInRSC()

import { LocaleType } from "@/middleware"
import { getXLocaleStrInRSC } from "./TranslationUtils"
import _ from 'lodash'

export let getLocalePrefix_Server = (): LocaleType => {
    return getXLocaleStrInRSC()
}
export let fmtURL_Server = (str: string[]): string => {
    let localePrefix = getLocalePrefix_Server().langInURL
    return '/' + ([localePrefix, ...str].filter(x => x != '' && !_.isNil(x)).join('/'))
}