
// Date: Sun, 24 Sep 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
// License: AGPLv3

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import AjaxUtils from "../utils/AjaxUtils";
import _ from "lodash";
import { URL_PREFIX_LOCAL } from "../types/constants";
import { PayloadListData, PayloadValueData } from "../types/constants";
import gutils from "../utils/GlobalUtils";
import { UserConfig } from "./userSlice";
import { url } from "inspector";
import { param } from "jquery";
import {
  EachWorkSpace,
  FnPureToolDefinition,
  WorkSpaceStruct,
} from "../types/workbench-types";
import { EachLang, ExtensionInfoFormatted as ExtensionInfo, ExtensionVM } from "../types/purejs-types-READ_ONLY";
import { withPrefixOpenAPI } from "./func";

let createNotProhibitedResources = (build, resName) => {
  return build.query({
    query: () => withPrefixOpenAPI(`/res/public/${resName}`),
  });
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // Fill in your own server starting URL here
    baseUrl: URL_PREFIX_LOCAL,
    prepareHeaders(headers, api) {
      let headers_New = AjaxUtils.getHeaders();
      _.forEach(headers_New, (x, d, n) => {
        if (!_.isNil(x)) {
          headers.set(d, x);
        }
      });
      return headers;
    },
    validateStatus: (response, result) => {
      gutils.ExposureIt("response_res", { response, result }, true);
      let errors = _.get(result, "errors");
      if (!_.isEmpty(errors)) {
        return false;
      }
      return response && response.status === 200 && result && !result.isError;
    },
  }),
  endpoints: (build) => ({
    // workspace
    // getWorkspaceOneByIdAndUserId: build.query<
    //   PayloadValueData<EachWorkSpace>,
    //   { Id: string }
    // >({
    //   query: (obj) => {
    //     return {
    //       url: "/workspace/users/one",
    //       params: obj,
    //     };
    //   },
    // }),
    // GetWorkspaceListByUserId: build.query<
    //   PayloadValueData<WorkSpaceStruct>,
    //   any
    // >({
    //   query: () => "/workspace/users/list",
    // }),
    // addWorkspaceForEachUser: build.mutation<
    //   PayloadValueData<any>,
    //   EachWorkSpace
    // >({
    //   query: (arg) => {
    //     return {
    //       method: "POST",
    //       url: "/workspace/users/add",
    //       body: arg,
    //     };
    //   },
    // }),
    // deleteTheWorkspaceForEachUser: build.mutation<
    //   PayloadValueData<any>,
    //   EachWorkSpace
    // >({
    //   query: (arg) => {
    //     return {
    //       method: "POST",
    //       url: "/workspace/users/delete",
    //       body: arg,
    //     };
    //   },
    // }),
    // openDirOnLocal: build.mutation<PayloadValueData<any>, { dir: string }>({
    //   query: (arg) => {
    //     return {
    //       method: "POST",
    //       url: "/os/opendir",
    //       body: arg,
    //     };
    //   },
    // }),

    // static
    getToolCategory: build.query<PayloadListData<FnPureToolDefinition>, any>({
      query: () => "/tool/exts/listCategory",
    }),
    // apis
    // getPing1: build.query({
    //   query: () => "/ping",
    // }),
    // getPing2: build.query({
    //   query: () => "/ping2",
    // }),
    // visit
    // getGuiSystemInfo: build.query<
    //   PayloadValueData<{
    //     UserConfigFile: string;
    //     UserConfigDir: string;
    //     UserPWDir: string;
    //   }>,
    //   any
    // >({
    //   query: () => withPrefixOpenAPI("/system/init/info"),
    // }),
    // geti18nConfig: build.query<PayloadValueData<EachLang[]>, any>({
    //   query: () => withPrefixOpenAPI("/i18n/get"),
    // }),
    // visit
    // getVisitAdminInitInfo: build.query<
    //   PayloadValueData<{ HasAdminInit: boolean; LastUpdatedTime: string }>,
    //   any
    // >({
    //   query: () => withPrefixOpenAPI("/admin/init/info"),
    // }),
    // postLocalPwCalc: build.mutation<
    //   PayloadValueData<{ CalcPW: string }>,
    //   { pw: string }
    // >({
    //   query: (arg) => {
    //     gutils.ExposureIt("MFmSE", arg, true);
    //     let formData = arg;
    //     return {
    //       method: "POST",
    //       url: withPrefixOpenAPI("/user/local/pw/calc"),
    //       body: formData,
    //     };
    //   },
    // }),
    // system
    // systemStats: build.query({
    //   query: () => "/system/stats",
    // }),
    // getOneMotto: build.query<PayloadValueData<string>, any>({
    //   query: () => "/system/getOneMotto",
    // }),
    // getUserObjByToken: build.query<
    //   PayloadValueData<{ Found: boolean; Obj: UserConfig }>,
    //   { userToken: string; refreshTokenStatus: number }
    // >({
    //   query: (obj) => {
    //     return {
    //       method: "GET",
    //       url: withPrefixOpenAPI("/user/one/getByToken"),
    //       params: obj,
    //     };
    //   },
    //   extraOptions: {},
    // }),
    // listUserNames: build.query<PayloadValueData<{ Usernames: string[] }>, {}>({
    //   query: (obj) => {
    //     return {
    //       method: "GET",
    //       url: withPrefixOpenAPI("/user/all/getUserNameList"),
    //       params: obj,
    //     };
    //   },
    //   extraOptions: {},
    // }),

    // send GET request /tool/exts/getExtDetail with parameter extId, and get the extension detail, the response is ExtensionVM
    getToolExtDetail: build.query<
      PayloadValueData<ExtensionVM>,
      { extId: string; val_extensionIdRefreshMap_id: number }
    >({
      query: (obj) => {
        return {
          method: "GET",
          url: "/tool/exts/getExtDetail",
          params: obj,
        };
      },
    }),
    // send GET request /tool/category/exts/list with parameter categoryId
    // getToolCategoryExtsList: build.query<
    //   PayloadListData<ListExtForTheCategoryRes>,
    //   { categoryId: string }
    // >({
    //   query: (obj) => {
    //     return {
    //       method: "GET",
    //       url: "/tool/exts/listSubCategory",
    //       params: obj,
    //     };
    //   },
    // }),
  }),
});



export type ListExtForTheCategoryRes = {
  CategoryId: string;
  Id: string;
  Label: string;
  Icon: string;
  ChildrenAsInfo: ExtensionInfo[];
  // ChildrenIdSet: string[]
};

export default apiSlice;
