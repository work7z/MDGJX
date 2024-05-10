'use server'

import axios, { AxiosResponse } from "axios"
import { APPINFOJSON } from "../nocycle";
import { core_sendAPIRequestInBE, } from "@/app/__CORE__/share/api";
import { getLAFRegion } from "@/app/__CORE__/share/api_constants";


export let webaction_sendAPIRequestInBE = async (partialInfo: {
    lang: string,
    body?: any,
    isPOST?: boolean,
}, url: string): Promise<string> => {
    let { body } = partialInfo
    if (!url.startsWith('/')) {
        url = '/' + url;
    }
    let currentLang = partialInfo.lang
    let region = getLAFRegion(currentLang)
    let res = await core_sendAPIRequestInBE({
        lang: currentLang,
        platform: '', // TODO: unknown for now
        version: APPINFOJSON.version,
        region: region
    }, url, {
        body: body ? JSON.stringify(body) : null,
        method: partialInfo.isPOST || body ? 'POST' : 'GET',
    })
    return await res.text();
}
