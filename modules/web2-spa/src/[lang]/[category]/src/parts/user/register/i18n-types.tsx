import { get } from "lodash"
import { getI18nDynamically } from "./i18n-action"
import { useEffect, useState } from "react"
import { getLocalePrefix_Client } from "@/__CORE__/utils/cRouteUtils"
import TranslationUtils, { Dot } from "@/__CORE__/utils/cTranslationUtils"
import info from "@/[lang]/[category]/info"

export type ShareClienti18nKeys = {
    smsCode: string,
    other: string,
}

export let loadDOT = (str: string): () => ReturnType<typeof useTTT2> => {
    return () => useTTT2(str);
}

export let useTTT2 = function (ltID: string): (id: string, enText: string, ...args: any[]) => string {
    let crtLabelI18n = getLocalePrefix_Client().langIni18n
    // let [mapData, onMapData] = useState({})
    let [ctn, onCtn] = useState(0)
    useEffect(() => {
        fetch(`/static/lang/extra/${ltID}/${crtLabelI18n}.json?t=${info.version}-${info.timestamp}`).then((v) => v.json()).then((v) => {
            // window['ok2'] = v;
            if (!TranslationUtils.LangMap[crtLabelI18n]) {
                TranslationUtils.LangMap[crtLabelI18n] = {}
            }
            TranslationUtils.LangMap[crtLabelI18n] = {
                ...TranslationUtils.LangMap[crtLabelI18n],
                ...v
            }
            onCtn(ctn + 1)
        })
    }, [])
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