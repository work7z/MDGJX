
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

export let withPrefixOpenAPI = (url: string): string => {
  return "/open" + url;
};


const URL_PREFIX_LOCAL = 'https://api.elb3.com'

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // Fill in your own server starting URL here
    baseUrl: URL_PREFIX_LOCAL,
    prepareHeaders(headers, api) {
      let headers_New = getHeaders();
      _.forEach(headers_New, (x, d, n) => {
        if (!_.isNil(x)) {
          headers.set(d, x);
        }
      });
      return headers;
    },
    validateStatus: (response, result) => {
      let errors = _.get(result, "errors");
      if (!_.isEmpty(errors)) {
        return false;
      }
      return response && response.status === 200 && result && !result.isError;
    },
  }),
  endpoints: (build) => ({
    getToolExtDetail: build.query<
      PayloadValueData<any>,
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
  }),
});



export default apiSlice;
