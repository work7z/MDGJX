'use server'
import { isDevEnv, isTestEnv } from "./env";
import { HEADER_X_LAF_LANG, HEADER_X_LAF_PLATFORM, HEADER_X_LAF_REGION, HEADER_X_LAF_VERSION } from "./server_constants";

let isDev = process.env.NODE_ENV === "development";
// for test env, it's still using the local server
export const API_SERVER_URL = isTestEnv() ? "https://api.laftools.cn" : isDevEnv() ? "http://127.0.0.1:2016" : "https://api.laftools.cn";

export type APITypeInfo = {
    lang: string,
    platform: string,
    version: string,
    region: string
}
export let getLAFRegion = (currentLang: string) => {
    const LAFREGION = process.env.LAFREGION
    let region = currentLang == 'zh_CN' ? "CN" : 'US'
    if (LAFREGION) { // if the region is set in the env, use it
        region = LAFREGION
    }
    return region
}

export let core_sendAPIRequestInBE = async (info: APITypeInfo, url: string, request: Partial<Request>): Promise<Response> => {
    if (!url.startsWith('/')) {
        url = '/' + url;
    }
    const finURL = API_SERVER_URL + '/v3' + url
    console.log('core_sendAPIRequestInBE: ', finURL)
    let res = await fetch(finURL, {
        headers: {
            [HEADER_X_LAF_REGION]: info.region,
            [HEADER_X_LAF_LANG]: info.lang,
            [HEADER_X_LAF_PLATFORM]: info.platform,
            [HEADER_X_LAF_VERSION]: info.version
        },
        ...request,
    })
    return res;
}

