

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import _ from "lodash";
import { PayloadListData, PayloadValueData } from "../../constants";
import { url } from "inspector";
import { getHeaders } from "../request";
import { HEADER_X_LAF_PAGE_SESSION_ID, HEADER_X_LAF_TOKEN, URL_AUTH_GET_FINDPW, URL_AUTH_GET_SIGNIN, URL_AUTH_GET_SIGNOUT, URL_AUTH_GET_SIGNUP } from "../constants/api_constants";
import AlertUtils from "@/utils/AlertUtils";
import { FN_GetDispatch, FN_GetState } from "../nocycle";
import UsersSlice, { DisplayUserInfo } from "./userSlice";
import AuthUtils from "@/utils/AuthUtils";
import { PAGE_SESSION_ID } from "@/utils/PageUtils";
import { AsyncCreateResponse, msg_showNetworkWithDebounce } from "./apiSlice";

import { MiaodaBasicConfig } from '@/m-types-copy/base/m-types-main'
import { getReleaseOrTestBaseOnCurrentURL } from "@/utils/ReleaseOrTestUtils";

export type ExtModeSt = {
    isDev: boolean;
    repoPath: string;
}

export type MiaodaExtraDevConfig = {
    // post-process
    fuzzySearchStr?: string;
    installed?: boolean;
    hasNewVersion?: boolean;
};
export type MiaodaConfig = MiaodaExtraDevConfig & MiaodaBasicConfig;
export type ExtMetaInfo = {
    totals: number;
    lastUpdated: string;
    allMetaInfo: MiaodaConfig[];
};
export type ExtMetaSearchReq = {
    searchText: string
    searchSource: 'cloud-all-ext' | 'local-dev-ext'
}
// these are kind of harmful things, which should not be running in portal mode
type HarmfulExtPostQuery = {
    id: string;
    type: 'get-all' | 'setup' | 'start-service' | 'stop-service';
};
export type ClosableFn = () => void;
export type MiaodaRunStatus = {
    setupStatus: ProcessStatus;
    serviceStatus: ProcessStatus;
    setupProcess?: ClosableFn;
    serviceProcess?: ClosableFn;
};
export const extApiSlice = createApi({
    reducerPath: "extApi",
    baseQuery: fetchBaseQuery({
        // Fill in your own server starting URL here
        baseUrl: '/ext-root',
        validateStatus: (response, result: AsyncCreateResponse<any> | null) => {
            let errorHandler = () => {
                const finalResult: string | null = result && result.message ? result.message : result && result.error ? result.error : null
                if (!finalResult) {
                    // "抱歉，网络不稳定，请稍后重试"
                    msg_showNetworkWithDebounce()
                } else {
                    AlertUtils.alertErr(finalResult)
                }
            }
            if (result) {
                let error = result.error;
                if (error == '401') {
                    const pre_hasSignIn = FN_GetState().users.hasSignIn
                    FN_GetDispatch()(
                        UsersSlice.actions.updateOneOfParamState({
                            hasSignIn: false,
                        })
                    )
                    if (pre_hasSignIn) {
                        AlertUtils.alertErr("登录已过期，请重新登录")
                    }
                    return false;
                }
            }
            let shouldOk = response && response.status === 200
            if (!shouldOk) {
                errorHandler()
            }
            return shouldOk;
        },
    }),
    endpoints: (build) => ({
        getFileFromRemoteExtRoot: build.query<AsyncCreateResponse<any>, {
            subPath: string
        }>({
            query: (p) => {
                return {
                    // https://extstatic.mdgjx.com/ext-root/test-ext-pkg-info/ref.txt
                    url: `/${getReleaseOrTestBaseOnCurrentURL()}` + p.subPath,
                    method: "GET",
                };
            },
        }),
    })
});


export default extApiSlice;