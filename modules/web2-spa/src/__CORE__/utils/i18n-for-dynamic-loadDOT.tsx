// LafTools
// 
// Date: Sat, 24 Feb 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import { get } from "lodash"
import { getI18nDynamically } from "./i18n-action"
import { useEffect, useState } from "react"
import { getLocalePrefix_Client } from "./cRouteUtils"
import TranslationUtils, { Dot } from "./cTranslationUtils"
import info from "@/[lang]/[category]/info"
import exportUtils from "@/[lang]/client/src/utils/ExportUtils"

export type ShareClienti18nKeys = {
    smsCode: string,
    other: string,
}

export let loadDOT = (str: string, enableLang2ClientMode?: boolean): () => ReturnType<typeof useTTT2> => {
    return () => useTTT2(str, enableLang2ClientMode);
}

let sentRequestList = {}

export let useListenMainDot = () => {
}

export let useTTT2 = function (ltID: string, enableLang2ClientMode?: boolean): (id: string, enText: string, ...args: any[]) => string {
    let crtLabelI18n = getLocalePrefix_Client().langIni18n
    let [ctn, onCtn] = useState(0)
    useEffect(() => {
        if (crtLabelI18n === 'en_US') {
            onCtn(ctn + 1)
            return;
        }
        let finalURL = `/static/${enableLang2ClientMode ? 'lang2client' : 'lang'
            }/extra/${ltID}/${crtLabelI18n}.json?t=${info.version}-${info.timestamp}`
        if (sentRequestList[finalURL]) {
            return;
        } else {
            sentRequestList[finalURL] = true
        }
        fetch(finalURL).then((v) => v.json()).then((v) => {
            // window['ok2'] = v;
            if (!TranslationUtils.LangMap[crtLabelI18n]) {
                TranslationUtils.LangMap[crtLabelI18n] = {}
            }
            TranslationUtils.LangMap[crtLabelI18n] = {
                ...TranslationUtils.LangMap[crtLabelI18n],
                ...v
            }
            TranslationUtils.currentUpdateCount++
            onCtn(ctn + 1)
        })
    }, [ltID, crtLabelI18n])
    return Dot
    // return (id: string, text: string, args: string[]) => {
    //     return text;
    // }
}

export let useTTT = function (obj: Partial<ShareClienti18nKeys>): Partial<ShareClienti18nKeys>[] {
    let [val, onVal] = useState<Partial<ShareClienti18nKeys> | null>(obj)
    useEffect(() => {
        (async () => {
            let v = await getI18nDynamically(obj)
            onVal(v as Partial<ShareClienti18nKeys>)
        })()
    }, [])

    return [val as Partial<ShareClienti18nKeys>]
}