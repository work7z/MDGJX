// LafTools
// 
// Date: Sat, 6 Jan 2024
// Author: LafTools Team - FX <work7z@outlook.com>
// Description: 
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import { logutils } from "./LogUtils";
import _ from "lodash";
import TranslationUtils, { Dot } from "./cTranslationUtils";
import QS from "query-string";
import axios, { AxiosError, AxiosResponse } from "axios";
import gutils from "./GlobalUtils";
import devJson from "../static/dev.json";
import TokenUtils from "./TokenUtils";
import exportUtils from "./ExportUtils";
import { useEffect, useMemo } from "react";
import { ifError } from "assert";
import { useHistory } from "react-router";
import { PayloadValueData } from "../types/constants";
import onlineAPISlice from "../reducers/onlineAPISlice";
import { PROTECTED_PATH_LIST, URL_NAV_FORM_SIGN_IN } from "../types/online";
import QueryUtils from "./QueryUtils";

export function getPayloadValue<T>(
  x: PayloadValueData<T> | undefined | null
): T | null {
  if (x == null || x == undefined) {
    return null;
  }
  if (_.isNil(x)) {
    return null;
  }
  return x.payload.value;
}

export default {
  anyError(e): string[] {
    return (
      _.get(e, "data.payload.value.errors") ||
      _.get(e, "error.data.payload.value.errors")
    );
  },
  useUserStatusHook() {
    let userStatus = onlineAPISlice.useGetUserStatusQuery(
      exportUtils.refresh_v1(),
      {
        ...exportUtils.refresh_v2(),
        pollingInterval: 9000,
      }
    );

    let hist = useHistory();

    useEffect(() => {
      if (userStatus.isSuccess) {
        let crtUser = userStatus.data.payload.value;
        if (!crtUser.isLogin) {
          let pathname = hist.location.pathname;
          let pathList = PROTECTED_PATH_LIST;
          _.every(pathList, (x) => {
            if (pathname.toString().startsWith(x)) {
              hist.push(URL_NAV_FORM_SIGN_IN);
              setTimeout(() => {
                window.location.reload();
              }, 3000);
              return false;
            }
            return true;
          });
        } else {
          //
        }
      }
    }, [userStatus.status]);

    return getPayloadValue(userStatus.data);
  },
  useOnlinePlansData() {
    let planRes = onlineAPISlice.useGetPlanInitDataQuery(
      {}
      //   exportUtils.refresh_v1() as any,
      //   exportUtils.refresh_v2()
    );
    let r = QueryUtils.validateResult(planRes, {
      label: Dot("gDjbs", "Historical Data"),
    });

    let a = useMemo(() => {
      let currentMonthlyRMB = 0;
      let currentMonthlyUSD = 0;
      let currentYearlyRMB = 0;
      let currentYearlyUSD = 0;
      if (planRes.isSuccess) {
        let allPlans = planRes.data?.payload.value.allPlans || [];
        // assign value currentMonthlyRMB, currentMonthlyUSD, currentMaxRMBYearly,  currentMaxUSDYearly from the list according to the period label
        // if the period label is "1M", then assign the value to currentMonthlyRMB, currentMonthlyUSD
        // if the period label is "1Y", then assign the value to currentMaxRMBYearly, currentMaxUSDYearly
        _.every(allPlans, (item) => {
          if (item.planCode == "premium_5_devices") {
            _.map(item.v2ProductPricingList, (x) => {
              if (x.pricingPeriod == "1M") {
                currentMonthlyRMB = x.priceRMB;
                currentMonthlyUSD = x.priceUSD;
              } else if (x.pricingPeriod == "1Y") {
                currentYearlyRMB = x.priceRMB;
                currentYearlyUSD = x.priceUSD;
              }
            });
            return false;
          } else {
            return true;
          }
        });
      }
      let ccy = TranslationUtils.IsChinese() ? "￥" : "$";
      return {
        showMonthlyLabel: {
          ccy: ccy,
          value: TranslationUtils.IsChinese()
            ? currentMonthlyRMB
            : currentMonthlyUSD,
        },
        showYearlyLabel: {
          ccy: ccy,
          value: TranslationUtils.IsChinese()
            ? currentYearlyRMB
            : currentYearlyUSD,
        },
        currentYearlyRMB: currentYearlyRMB,
        currentYearlyUSD: currentYearlyUSD,
        currentMonthlyRMB,
        currentMonthlyUSD,
        planRes,
        planRes_r: r,
      };
    }, [r, planRes.status]);
    return a;
  },
};
