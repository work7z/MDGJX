
// Date: Sun, 1 Oct 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
// License: AGPLv3

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { startListening } from "../listenerMiddleware";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { TextValueAction } from "../types/constants";
import { Intent } from "@blueprintjs/core";

export type ProcessLoadType = {
  loading?: boolean;
  loadingTitle?: string;
  loadingDesc?: string | null;
  error?: boolean;
  errorTitle?: string;
  errorDesc?: string;
  timestamp?: number;
};
export function fn_new_ProcessLoadType(): ProcessLoadType {
  return {
    loading: false,
    loadingTitle: "",
    loadingDesc: "",
    error: false,
    errorTitle: "",
    errorDesc: "",
  };
}
type BasicMsg = {
  id: string;
  intent?: Intent;
  msg: string | JSX.Element;
  fn?: (
    yesOrNo: boolean,
    obj?: {
      iptIfHave: string | null;
    }
  ) => any;
};
export type ConfirmType = BasicMsg & {};
export type AlertType = BasicMsg & {};
export type PrompType = BasicMsg & {
  textProps?: any;
  noCancel?: number;
  textFieldDefaultValue?: string;
};
type StatusState = {
  nav: {
    currentPlateId: string;
  };
  whetherShow: {
    signIn: boolean;
  },
  ProcessLoadTypeKVMap: { [key: string]: ProcessLoadType | null };
  msg: {
    confirmList: ConfirmType[];
    promptList: PrompType[];
    alertList: AlertType[];
  };
};

const initialState: StatusState = {
  nav: {
    currentPlateId: "tools",
  },
  // checkLoginStatusCount: 0,
  whetherShow: {
    signIn: false,
  },
  ProcessLoadTypeKVMap: {},
  msg: {
    confirmList: [],
    promptList: [],
    alertList: [],
  },
};

const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    // set the field value in whetherShow, note that the field type should be set clearly
    setWhetherShow(state: StatusState, action: PayloadAction<{
      fieldName: Partial<keyof StatusState["whetherShow"]>;
      fieldValue: StatusState["whetherShow"][keyof StatusState["whetherShow"]];
    }>) {
      state.whetherShow[action.payload.fieldName] = action.payload.fieldValue;
    },
    // write slice to update confirmList, promptList, alertList separtely
    // update confirmList
    updateConfirmList(state: StatusState, action: PayloadAction<ConfirmType>) {
      state.msg.confirmList.push(action.payload);
    },
    // update promptList
    updatePromptList(state: StatusState, action: PayloadAction<PrompType>) {
      state.msg.promptList.push(action.payload);
    },
    // update alertList
    updateAlertList(state: StatusState, action: PayloadAction<AlertType>) {
      state.msg.alertList.push(action.payload);
    },
    // and delete one of them by is, separtately
    // delete confirmList
    deleteConfirmList(state: StatusState, action: PayloadAction<string>) {
      state.msg.confirmList = state.msg.confirmList.filter(
        (item) => item.id !== action.payload
      );
    },
    // delete promptList
    deletePromptList(state: StatusState, action: PayloadAction<string>) {
      state.msg.promptList = state.msg.promptList.filter(
        (item) => item.id !== action.payload
      );
    },
    // delete alertList
    deleteAlertList(state: StatusState, action: PayloadAction<string>) {
      state.msg.alertList = state.msg.alertList.filter(
        (item) => item.id !== action.payload
      );
    },
    updatePlateId(state: StatusState, action: TextValueAction) {
      state.nav.currentPlateId = action.payload.value;
    },
    // update ProcessLoadTypeKVMap by key and value
    updateProcessLoadType(
      state,
      action: PayloadAction<{ key: string; value: ProcessLoadType | null }>
    ) {
      if (action.payload.value) {
        state.ProcessLoadTypeKVMap[action.payload.key] = {
          ...action.payload.value,
          timestamp: new Date().getTime(),
        };
      } else {
        state.ProcessLoadTypeKVMap[action.payload.key] = null;
      }
    },
  },
});

export default statusSlice;
