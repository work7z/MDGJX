// LafTools
// 
// Date: Sat, 2 Mar 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

'use server'

// const { translate } = require('bing-translate-api');
import { translate } from 'bing-translate-api'
import { Dot } from '../utils/TranslationUtils'
import _ from 'lodash'
let formatLang = (to: string) => {
    if (to == 'en_US') {
        to = 'en'
    }
    if (to == 'zh_CN') {
        to = 'zh-hans'
    }
    if (to == 'zh_HK') {
        to = 'zh-hant'
    }
    if (to == 'no') {
        to = 'nb'
    }
    return to
}
export let translateText = async (text, from: string, to,): Promise<string> => {
    if (_.trim(text) == '') {
        return ''
    }
    try {
        from = formatLang(from)
        to = formatLang(to)
        let res = await translate(text, from, to)
        if (!res) {
            // ${ Dot("cOYuMrncv", "Unknown Translation failure") }
            return `<Unknown Translation Errors>`
        }
        if (!res.translation) {
            console.log('test')
        }
        console.log(res.translation);
        return res.translation
    } catch (err) {
        return `<Error: ${err}>`

    }
}