// LafTools
// 
// Date: Sat, 9 Dec 2023
// Author: LafTools Team - FX <work7z@outlook.com>
// Description: 
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
// License: AGPLv3

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import AjaxUtils from "../utils/AjaxUtils";
import _ from "lodash";
import { URL_PREFIX_LOCAL, URL_PREFIX_ONLINE_API } from "../types/constants";
import { PayloadListData, PayloadValueData } from "../types/constants";
import gutils from "../utils/GlobalUtils";
import { UserConfig } from "./userSlice";
import { url } from "inspector";
import { param } from "jquery";
interface OKData {
  ok: boolean;
}
interface FixedPriceList {
  id: string;
  originalOrderId: string;
  priceRMB: number;
  priceUSD: number;
  maxDevices: number;
  pricingPeriod: string;
  pricingCode: string;
}
interface InitWelcomeData {
  fin_image_list: string[];
  ver_prod: {
    ID: number;
    TYPE: string;
    VERSION: string;
    DESCRIPTION: string;
    BLOG_ID: number;
    CREATE_TIME: number;
    DISABLED: number;
    BLOG_CODE: string;
    DESCRIPTION_ZH_CN: string;
    DESCRIPTION_ZH_HK: string;
  };
  ver_prod_str: string;
  ver_test: {
    ID: number;
    TYPE: string;
    VERSION: string;
    DESCRIPTION: string;
    BLOG_ID: number;
    CREATE_TIME: number;
    DISABLED: number;
    BLOG_CODE: string;
    DESCRIPTION_ZH_CN: string;
    DESCRIPTION_ZH_HK: string;
  };
  ver_test_str: string;
  dl_prefix_prod: string;
  dl_prefix_test: string;
}
export type VCodePass = {
  VCODE: string;
};
export interface UserPayload {
  isLogin: boolean;
  isAdmin: boolean;
  id: number;
  username: string;
  email: string;
  isPremium: boolean;
  isExpired: boolean;
  createTime: number;
  emailValidCode: string;
  token: string;
}

interface UserOrderListItem {
  ID: string;
  USER_ID: number;
  ORDER_TYPE: string | null;
  MONEY_CNY: number | null;
  MONEY_USD: number | null;
  IS_PAID: number;
  PAY_DETAIL: string | null;
  PAID_TIME: Date | null;
  CREATE_TIME: Date;
  QRCODE_STR: string | null;
  MAX_DEVICES_SIZE: number;
  REMARK_FROM_USER: string | null;
  PURCHASE_YEAR: number;
  ENABLE_TIME_TYPE: string;
  IS_ADMIN_READ: number;
  PURCHASE_DAYS: number | null;
}

interface IsOKPayload {
  ok: boolean;
  msg: string;
}

export const onlineAPISlice = createApi({
  reducerPath: "online",
  baseQuery: fetchBaseQuery({
    // Fill in your own server starting URL here
    baseUrl: URL_PREFIX_ONLINE_API,
    prepareHeaders(headers, api) {
      let headers_New = AjaxUtils.getCloudAPIHeaders();
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
    payCreateOrder: build.query<
      PayloadValueData<{
        orderId: string;
      }>,
      {
        paymentMethod: string;
        pricingCode: string;
        purchaseQuantity: number;
      }
    >({
      query: (obj) => {
        return {
          method: "GET",
          url: "/pay/createOrder",
          params: obj,
        };
      },
      extraOptions: {},
    }),

    payCreateFixedOrder: build.query<
      PayloadValueData<{
        orderId: string;
      }>,
      {
        fixedID: string;
        purchaseQuantity: number;
      }
    >({
      query: (obj) => {
        return {
          method: "GET",
          url: "/pay/renewalOrder",
          params: obj,
        };
      },
      extraOptions: {},
    }),

    userOrderList: build.query<
      PayloadValueData<{
        list: UserOrderListItem[];
      }>,
      any
    >({
      query: (obj) => {
        return {
          method: "POST",
          url: "/pay/listOrder",
          params: obj,
        };
      },
      extraOptions: {},
    }),

    UserDeviceActivateOffline: build.query<
      PayloadValueData<{
        result_private_key: string;
        local_serial_key: string;
      }>,
      { local_serial_key: string; license_id: string | null }
    >({
      query: (obj) => {
        return {
          method: "GET",
          url: "/device/offlineActivate",
          params: obj,
        };
      },
      extraOptions: {},
    }),
    UserDeviceDelete: build.query<PayloadValueData<any>, { id: string }>({
      query: (obj) => {
        return {
          method: "GET",
          url: "/device/deactivate",
          params: obj,
        };
      },
      extraOptions: {},
    }),

    UserDeviceList: build.query<PayloadValueData<{ list: any[] }>, {}>({
      query: (obj) => {
        return {
          method: "GET",
          url: "/device/listAllDevices",
          params: obj,
        };
      },
      extraOptions: {},
    }),

    useGiftCard: build.query<PayloadValueData<any>, { gift_code: string }>({
      query: (obj) => {
        return {
          method: "POST",
          url: "/giftcard/useGiftCard",
          params: obj,
        };
      },
      extraOptions: {},
    }),

    payRefreshQRCode: build.query<PayloadValueData<any>, { orderId: string }>({
      query: (obj) => {
        return {
          method: "POST",
          url: "/pay/refreshQRCode",
          params: obj,
        };
      },
      extraOptions: {},
    }),

    licenseList: build.query<
      PayloadValueData<{
        license_lists: any[];
        total_max_devices_size: number;
        license_lists_len: number;
      }>,
      {}
    >({
      query: (obj) => {
        return {
          method: "POST",
          url: "/premium/listLicense",
          params: obj,
        };
      },
      extraOptions: {},
    }),

    userOrderView: build.query<
      PayloadValueData<UserOrderListItem>,
      { orderId: string }
    >({
      query: (obj) => {
        return {
          method: "POST",
          url: "/pay/viewOrder",
          params: obj,
        };
      },
      extraOptions: {},
    }),

    userSecureKeyList: build.query<
      PayloadValueData<{
        keyList: { CREATE_TIME: number; SECURE_KEY: string }[];
      }>,
      any
    >({
      query: (obj) => {
        return {
          method: "GET",
          url: "/user/securekey/list",
          params: obj,
        };
      },
      extraOptions: {},
    }),
    userSecureKeyNew: build.query<PayloadValueData<{ secureKey: string }>, any>(
      {
        query: (obj) => {
          return {
            method: "POST",
            url: "/user/securekey/new",
            params: obj,
          };
        },
        extraOptions: {},
      }
    ),
    userSecureKeyDelete: build.query<
      PayloadValueData<{ secureKey: string }>,
      { key: string }
    >({
      query: (obj) => {
        return {
          method: "POST",
          url: "/user/securekey/delete",
          params: obj,
        };
      },
      extraOptions: {},
    }),
    userForFindingPassword: build.query<PayloadValueData<any>, any>({
      query: (obj) => {
        return {
          method: "GET",
          url: "/user/finding-password",
          params: obj,
        };
      },
      extraOptions: {},
    }),
    userForSignout: build.query<PayloadValueData<any>, {}>({
      query: (obj) => {
        return {
          method: "GET",
          url: "/user/sign-out",
          params: obj,
        };
      },
      extraOptions: {},
    }),
    userForSignIn: build.query<
      PayloadValueData<IsOKPayload>,
      { username: string; password: string; verifyCode: string }
    >({
      query: (obj) => {
        return {
          method: "POST",
          url: "/user/sign-in",
          params: obj,
        };
      },
      extraOptions: {},
    }),
    userForSignUp: build.query<
      PayloadValueData<IsOKPayload>,
      {
        username: string;
        password: string;
        confirmPassword: string;
        verificationCode: string;
        email: string;
      }
    >({
      query: (obj) => {
        return {
          method: "POST",
          url: "/user/sign-up",
          params: obj,
        };
      },
      extraOptions: {},
    }),
    getUserStatus: build.query<PayloadValueData<UserPayload>, any>({
      query: (obj) => {
        return {
          method: "GET",
          url: "/user/status",
          params: obj,
        };
      },
      extraOptions: {},
    }),
    getDownloadLinkByVCode: build.query<
      PayloadValueData<OKData & { link: string }>,
      any
    >({
      query: (obj) => {
        return {
          method: "POST",
          url: "/visit/download/getDownloadLinkByVCode",
          params: obj,
        };
      },
      extraOptions: {},
    }),

    // init data
    getInitDataInWelcomePage: build.query<
      PayloadValueData<InitWelcomeData>,
      { refreshTokenStatus?: number }
    >({
      query: (obj) => {
        return {
          method: "GET",
          url: "/visit/init/getIndexData",
          params: obj,
        };
      },
      extraOptions: {},
    }),
    getPlanInitData: build.query<
      PayloadValueData<{
        increasePriceList: {
          date_str: string;
          rmbctn: number;
          usdctn: number;
        }[];
        fixedPriceIfHave: FixedPriceList[];
        allPlans: V2Planning[];
        premiumChangingList: V2PermiumChanging[];
      }>,
      { refreshTokenStatus?: number }
    >({
      query: (obj) => {
        return {
          method: "GET",
          url: "/visit/init/getAllPlans",
          params: obj,
        };
      },
      extraOptions: {},
    }),
  }),
});

export default onlineAPISlice;

interface V2ProductPricing {
  planCode: string;
  pricingCode: string;
  pricingPeriod: string;
  pricingActualDays: number;
  priceRMB: number;
  fixedPrice: boolean;
  priceUSD: number;
  discountPercentage: number;
  status: number;
}

interface V2Planning {
  planType: string;
  planCode: string;
  status: number;
  extraMap: {
    max_devices?: number;
  };
  v2ProductPricingList: V2ProductPricing[];
}

interface V2PermiumChanging {
  versionStr: string;
  dateStr: string;
  pricingRMB: number;
  pricingUSD: number;
}
