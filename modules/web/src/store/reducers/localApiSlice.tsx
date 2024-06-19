
// Date: Sun, 24 Sep 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
// License: AGPLv3

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

export type ExtModeSt = {
  isDev: boolean;
  repoPath: string;
}

export type MiaodaExtraDevConfig = {
  // post-process
  fuzzySearchStr?: string;
  installed?: boolean;
  hasNewVersion?:boolean;
};
export type MiaodaConfig = MiaodaExtraDevConfig & MiaodaBasicConfig;
export type ExtMetaInfo = {
  totals: number;
  lastUpdated: string;
  allMetaInfo: MiaodaConfig[];
};
export type ExtMetaSearchReq = {
  searchText: string
}

export const localApiSlice = createApi({
  reducerPath: "localApi",
  baseQuery: fetchBaseQuery({
    // Fill in your own server starting URL here
    baseUrl: '/local',
    prepareHeaders(headers, api) {
      let headers_New = getHeaders();
      _.forEach(headers_New, (x, d, n) => {
        if (!_.isNil(x)) {
          headers.set(d, x);
        }
      });
      headers.set(HEADER_X_LAF_TOKEN, AuthUtils.token || '')
      headers.set(HEADER_X_LAF_PAGE_SESSION_ID, PAGE_SESSION_ID || '')
      return headers;
    },
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
    checkExtMode: build.query < AsyncCreateResponse<ExtModeSt>,{}>({
      query: () => {
        return {
          url: "/ext/check-ext-mode",
          method: "GET",
        };
      },
    }),
    getExtListWithSearch: build.query<  
      AsyncCreateResponse<ExtMetaInfo>,
      ExtMetaSearchReq
    >({
      query: (b) => {
        return {
          params:b,
          data: b,
          url: "/ext/get-ext-list",
          method: "GET",
        };
      },
    }),
  })
});



export default localApiSlice;
