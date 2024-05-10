'use server'

import { Dot } from "@/app/__CORE__/utils/TranslationUtils";
import { ShareClienti18nKeys } from "./i18n-types";

let fullDefinition: ShareClienti18nKeys = {
    smsCode: Dot("9YPgsPid2M", "SMS Code"),
    other: ""
}

export let getI18nDynamically = async (obj: Partial<ShareClienti18nKeys>): Promise<Partial<ShareClienti18nKeys>> => {
    let newObj = {}
    for (let key in obj) {
        let val = obj[key]
        if (val) {
            newObj[key] = fullDefinition[key]
        }
    }
    return newObj
}
