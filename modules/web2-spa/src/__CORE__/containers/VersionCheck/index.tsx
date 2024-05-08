'use client'

import { webaction_sendAPIRequestInBE, } from "@/[lang]/client/src/api/ApiUtils"
import _ from "lodash"
import { useCallback, useEffect } from "react"
import { Dot, getCurrentLang } from "../../utils/cTranslationUtils"
import { IsCurrentServerMode, IsCurrentServerModeWithPromise } from "../../utils/systemUtils"
import { URL_RELEASE_GET_LATEST, URL_RELEASE_GET_STATUS } from "../../share-spa/server_urls"
import { ReleaseStatusResponse, SysResponse } from "../../share-spa/server_constants"
import { FN_GetState } from "@/[lang]/client/src/nocycle"
import info from "@/[lang]/[category]/info"
import AlertUtils from "@/[lang]/client/src/utils/AlertUtils"
import { loadDOT } from "../../utils/i18n-for-dynamic-loadDOT"
import { hocClientWrapper } from "@/[lang]/[category]/src/common/hocClientWrapper"

let a = loadDOT("c6r8WcoMg")

export default hocClientWrapper(() => {
    a()
    let fn = useCallback(_.once(async () => {
        try {
            let serverMode = await IsCurrentServerModeWithPromise()
            if (serverMode) {
                return
            };
            let r: string = await webaction_sendAPIRequestInBE({
                lang: getCurrentLang()
            }, URL_RELEASE_GET_STATUS)
            let rJSON = JSON.parse(r) as SysResponse<ReleaseStatusResponse>
            let minimalSupportedVersion = rJSON.content?.minimalSupportedVersion
            let ackedOutdatedVersion = FN_GetState().localState.ackedOutdatedVersion
            if (minimalSupportedVersion == ackedOutdatedVersion) {
                return;
            } else {
                if (minimalSupportedVersion && minimalSupportedVersion >= info.version) {
                    AlertUtils.popMsg("warning", {
                        message: Dot("-Btme9EsEB", "Sorry, your version is outdated, which will not be able to upgraded without an entire installation, please re-install the latest version to continue using the app."),
                    })
                }
            }
        } catch (e) {
            console.log('VersionCheck: ' + e);
            throw e;
        }
    }), [])
    useEffect(() => {
        fn()
    }, [])
    return ''
})