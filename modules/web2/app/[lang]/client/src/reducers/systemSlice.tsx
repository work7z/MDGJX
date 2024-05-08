
// Date: Mon, 25 Sep 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
// License: AGPLv3

import localforage from "localforage";
import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { startListening } from "../listenerMiddleware";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Dispatch } from "react";
import TranslationUtils, {
  Dot,
  KEY_LANG_PACK_ZH_CN,
  KEY_LANG_PACK_ZH_HK,
  LANG_INIT_BEFORE_MAP,
  newLangMap,
  sysLocale,
} from "../utils/cTranslationUtils";
import {
  IsLoadingType,
  IsOKType,
  LANG_EN_US,
  LANG_ZH_CN,
  LANG_ZH_HK,
  LangDefinition,
  PromiseAction,
  SendErrorAction,
  TextValueAction,
} from "../types/constants";
import gutils from "../utils/GlobalUtils";
import AjaxUtils from "../utils/AjaxUtils";
// import { store } from "../store";
import forgeSlice from "./forgeSlice";
import AlertUtils from "../utils/AlertUtils";
import { logutils } from "../utils/LogUtils";
import ALL_NOCYCLE, { FN_GetDispatch, IsDevMode } from "../nocycle";
import _ from "lodash";
import ConcurrencyUtils from "../utils/ConcurrencyUtils";
import { KEY_CONCURRENCY_SYSTEM_INIT } from "../types/constants";
import { Intent } from "@blueprintjs/core";
import SyncStateUtils from "../utils/SyncStateUtils";
import { GetUserActualClientLang } from "../i18n";
import { sleep } from "../utils/SyncUtils";
import info from "@/app/[lang]/[category]/info";

export type MessagePackItem = {
  Title: string;
  Description: string;
  CreateTime?: number;
  Id?: string;
  HasReadThisMsg?: boolean;
  Intent?: Intent;
};

interface InitStatus {
  HasError?: boolean;
  ProgressText: string;
  ProgressError?: string;
  IsLangPacksOK?: boolean;
  ProgressBarValue?: number;
  IsSystemPrefOK?: boolean;
  IsSystemUpdatesOK?: boolean;
}

export type PageDataInitedMap = {
  [key: string]: () => Promise<any>;
};

interface SystemState {
  LoadingForPageData?: boolean;
  PageDataInitedMap: PageDataInitedMap;
  LoadSystemData: boolean;
  RefreshID: number;
  checkLoginStatusCount: number;
  SysInitStatus: InitStatus;
  LangIncrement: string;
  LoadDotCount: number;
  MessageObjectKVMap: {};
  ClientWidth: number;
  ClientHeight: number;
  IsWorkBenchPageAvailable: boolean;
  // LanguageInPath:string
}

let newSysInitStatus = (): InitStatus => {
  return {
    ProgressText: Dot("Ewvgo", "Not yet started."),
  };
};

let LangRefreshCount = 0;

const initialState: SystemState = {
  RefreshID: 0,
  LoadDotCount: 0,
  checkLoginStatusCount: 0,
  PageDataInitedMap: {},
  LoadingForPageData: false,
  LoadSystemData: false,
  SysInitStatus: newSysInitStatus(),
  LangIncrement: "d",
  MessageObjectKVMap: {},
  ClientWidth: -1,
  ClientHeight: -1,
  IsWorkBenchPageAvailable: false,
  // LanguageInPath: GetUserActualClientLang()
};

const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    // update IsWorkBenchPageAvailable
    updateIsWorkBenchPageAvailable: (state, action: PayloadAction<boolean>) => {
      state.IsWorkBenchPageAvailable = action.payload;
    },
    updateClientWidthHeight: (
      state,
      action: PayloadAction<{
        ClientWidth?: number;
        ClientHeight?: number;
      }>
    ) => {
      if (!_.isNil(action.payload.ClientWidth)) {
        state.ClientWidth = action.payload.ClientWidth || 0;
      }
      if (!_.isNil(action.payload.ClientHeight)) {
        state.ClientHeight = action.payload.ClientHeight || 0;
      }
    },
    addNewMessageItem: (
      state,
      action: PayloadAction<{ msgId: string; msgItem: MessagePackItem }>
    ) => {
      action.payload.msgItem.Id = action.payload.msgId;
      action.payload.msgItem.CreateTime = new Date().getTime();
      state.MessageObjectKVMap[action.payload.msgId] = action.payload.msgItem;
    },
    updateRefreshID: (state, action) => {
      state.RefreshID++;
    },
    putRefreshDataInitFn: (state, action: PromiseAction) => {
      state.PageDataInitedMap[action.payload.id] = action.payload.fn;
    },
    resetToInitStatus: (state, action: PayloadAction) => {
      state.SysInitStatus = newSysInitStatus();
    },
    markAllAsCompleted: (state, action) => {
      state.LoadSystemData = true;
    },
    // increment for checkLoginStatusCount
    upsertCheckLoginStatusCount: (state, action) => {
      state.checkLoginStatusCount++
    },
    markIfRefreshing: (state, action: IsLoadingType) => {
      state.LoadingForPageData = action.payload.isLoading;
    },
    markLangStatus: (state, action: IsOKType) => {
      state.SysInitStatus.IsLangPacksOK = action.payload.isOK;
    },
    markSystemPrefStatus: (state, action: IsOKType) => {
      state.SysInitStatus.IsSystemPrefOK = action.payload.isOK;
    },
    markProgressValue(state, action: PayloadAction<number>) {
      state.SysInitStatus.ProgressBarValue = action.payload
    },
    markSystemUpdateStatus: (state, action: IsOKType) => {
      state.SysInitStatus.IsSystemUpdatesOK = action.payload.isOK;
    },
    UpdateError: (state, action: SendErrorAction) => {
      state.SysInitStatus.HasError = true;
      state.SysInitStatus.ProgressError = gutils.getErrMsg(action.payload.e);
    },
    UpdateProcessText: (state, action: TextValueAction) => {
      state.SysInitStatus.ProgressText = action.payload.value;
    },
    updateLanguageValue: (
      state,
      action: PayloadAction<{ scopeId?: string, lang: string; initKey: string, value: LangDefinition }>
    ) => {
      let var_newLangMap = newLangMap();
      let nextValue = action.payload.value;
      let prevValue = TranslationUtils.LangMap[action.payload.lang];
      var_newLangMap[action.payload.lang] = !_.isEmpty(prevValue) ? _.merge(prevValue, nextValue) : nextValue;
      TranslationUtils.LangMap = var_newLangMap;
      // state.LangIncrement = `${Date.now()}`
      if (action.payload.scopeId) {
        // if it's scope id, then only reload those who subscribe to this scope id
        state.LoadDotCount++
      } else {
        // if it's not a scope id request, then we can reload lang data globally
        state.LangIncrement = `${action.payload.initKey}${Date.now()}${action.payload.lang}${_.size((nextValue))}${LangRefreshCount}`;
        localStorage.setItem(action.payload.lang, JSON.stringify(nextValue));
      }

      LANG_INIT_BEFORE_MAP[action.payload.initKey] = true;
    },
  },
});
export const ACTION_callRefreshAll = (showMsg: boolean): any => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(systemSlice.actions.markIfRefreshing({ isLoading: true }));
    try {
      dispatch(systemSlice.actions.updateRefreshID({}));
      for (let each of _.values(
        ALL_NOCYCLE.store?.getState().system.PageDataInitedMap
      )) {
        await each();
      }
      if (showMsg) {
        AlertUtils.popMsg("success", {
          message: Dot("gnKMZ", "Refreshed."),
        });
      }
    } catch (e) {
      AlertUtils.popError(e as Error, Dot("cj1pd", "Refresh Operation"));
    } finally {
      dispatch(systemSlice.actions.markIfRefreshing({ isLoading: false }));
    }
  };
};

export const ACTION_getExample = (): any => {
  return async (dispatch: Dispatch<AnyAction>) => {
    //
  };
};

/**
 * We dynamically load ts files, to reduce the bundleF size of i18n files, we separately load them.
 * 
 * @param scopeID 
 */
export const loadDOT = async (scopeID: string): Promise<any> => {
  if (typeof window === 'undefined') return;
  // load lang data dynamically
  FN_GetDispatch()(
    ACTION_getLangData(scopeID)
  )
}

let __load_language_map: { [key: string]: boolean } = {};
export const ACTION_getLangData = (scopeIdIfHave?: string): any => {
  return async (dispatch: Dispatch<AnyAction>) => {
    let currentLanguage = sysLocale.langIni18n; //ALL_NOCYCLE.store?.getState().forge.Language;
    // TranslationUtils.CurrentLanguage

    if (
      !currentLanguage
    ) {
      AlertUtils.popMsg("danger", {
        message: Dot(
          "YNwKz",
          "Unsupported language: {0}, will use English by default.",
          currentLanguage
        ),
      });
      currentLanguage = LANG_EN_US;
      dispatch(forgeSlice.actions.updateLanguage({ lang: currentLanguage }));
    }
    let initKey = (scopeIdIfHave || '') + currentLanguage
    if (currentLanguage != LANG_EN_US) {
      if (LANG_INIT_BEFORE_MAP && !_.isEmpty(LANG_INIT_BEFORE_MAP[initKey]) && !IsDevMode()) {
        // do nothing
      } else {
        let e = await AjaxUtils.DoStaticRequest({
          url: "/lang2client" + (scopeIdIfHave ? `/extra/${scopeIdIfHave}/` : "/") + currentLanguage + ".json?t=" + (
            `${info.version}-${info.timestamp}`
          ),
        });
        logutils.debug("e.data", e.data);
        localStorage.setItem("lang-" + currentLanguage, JSON.stringify(e.data))
        dispatch(
          systemSlice.actions.updateLanguageValue({
            scopeId: scopeIdIfHave,
            initKey: initKey,
            lang: currentLanguage,
            value: e.data,
          })
        );
      }
    }
    dispatch(systemSlice.actions.markLangStatus({ isOK: true }));
    __load_language_map[currentLanguage] = true;
  };
};
export const ACTION_getSystemPreferences = (): any => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(systemSlice.actions.markSystemPrefStatus({ isOK: true }));
  };
};
export const ACTION_getLatestSystemResources = (): any => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(systemSlice.actions.markSystemUpdateStatus({ isOK: true }));
  };
};
export const ACTION_callInitAllDataAtOnceFromInitSystemEnv = (): any => {
  return ACTION_initAllDataAtOnce();
};
export const ACTION_initAllDataAtOnce = (): any => {
  return async (dispatch: Dispatch<AnyAction>) => {
    if (ALL_NOCYCLE.store?.getState().system.LoadSystemData) {
      logutils.debug("LoadSystemData already there");
      return;
    }

    try {
      dispatch(
        systemSlice.actions.UpdateProcessText({
          value: Dot("DTTPW", "Reset status"),
        })
      );
      dispatch(systemSlice.actions.resetToInitStatus());
      dispatch(
        systemSlice.actions.UpdateProcessText({
          value: Dot("4cGA_", "Retrieving data for system preferences..."),
        })
      );
      await ACTION_getSystemPreferences()(dispatch);
      dispatch(systemSlice.actions.markProgressValue(19.98))
      await SyncStateUtils.retrieveAllIDsFromServer((item) => {
        return item.RunOnInit === true;
      });
      dispatch(
        systemSlice.actions.UpdateProcessText({
          value: Dot("PUxuU", "Retrieving data for language packs..."),
        })
      );
      await ACTION_getLangData()(dispatch);
      dispatch(systemSlice.actions.markProgressValue(61.8))
      dispatch(
        systemSlice.actions.UpdateProcessText({
          value: Dot("_trqL", "Retrieving data for system resources..."),
        })
      );
      await ACTION_getLatestSystemResources()(dispatch);
      // await sleep(30000);
      dispatch(systemSlice.actions.markProgressValue(90.98))
      dispatch(
        systemSlice.actions.UpdateProcessText({
          value: Dot("HIc3c", "Completed"),
        })
      );
      dispatch(systemSlice.actions.markAllAsCompleted({}));
      dispatch(systemSlice.actions.markProgressValue(100))
    } catch (e: any) {
      ConcurrencyUtils.removeInitStatus(KEY_CONCURRENCY_SYSTEM_INIT);
      logutils.debug("err", e);
      dispatch(systemSlice.actions.UpdateError({ e: e }));
    }
  };
};

export default systemSlice;
