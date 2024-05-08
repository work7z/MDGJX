
// Date: Sun, 10 Dec 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
// License: AGPLv3

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { startListening } from "../listenerMiddleware";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import SyncStateUtils from "../utils/SyncStateUtils";
import { ToolDefaultOutputType, Val_ToolTabIndex } from "../types/purejs-types-READ_ONLY";
import _ from "lodash";
import { Dot } from "../utils/cTranslationUtils";
import { ProcessReturnType } from "../impl/tools/r_process";

type RuntimeStatusState = {
  toolOutputStatusMap: {
    [key: string]: ToolDefaultOutputType;
  };
};
const initialState: RuntimeStatusState = {
  toolOutputStatusMap: {},
};

const RuntimeStatusSlice = createSlice({
  name: "runtimeStatus",
  initialState,
  reducers: {
    ...SyncStateUtils.getSyncStateReducers("runtimeStatus", {
      RunOnInit: true,
      RequireUserId: true,
      RequireWorkspaceId: true,
      SyncLocationOnParameter: 'runtime', // /app?rts=xxx
    }),
    initAtOnceBySessionIdAndValue: (
      state,
      action: PayloadAction<{ sessionId: string; value: ToolDefaultOutputType }>
    ) => {
      let { sessionId, value } = action.payload;
      if (!state.toolOutputStatusMap[sessionId]) {
        state.toolOutputStatusMap[sessionId] = value;
      } else {
        _.defaultsDeep(
          state.toolOutputStatusMap[sessionId], value
        )
      }
    },
    // select the latest view panel
    selectLatestViewPanel: (
      state,
      action: PayloadAction<{ sessionId: string; panelId: string }>
    ) => {
      let { sessionId, panelId } = action.payload;
      if (!state.toolOutputStatusMap[sessionId]) {
        return;
      }
      state.toolOutputStatusMap[sessionId].latestViewPanelId = panelId;
    },
    setToolTabIndex: (
      state,
      action: PayloadAction<{ sessionId: string; tabIndex: Val_ToolTabIndex }>
    ) => {
      let { sessionId, tabIndex } = action.payload;
      if (!state.toolOutputStatusMap[sessionId]) {
        return
      }
      state.toolOutputStatusMap[sessionId].toolTabIndex = tabIndex;
    },
    updateValueInStatusMap: (
      state,
      action: PayloadAction<{ sessionId: string; obj: Partial<{ [K in keyof ToolDefaultOutputType]: any }> }>
    ) => {
      let { sessionId, obj } = action.payload;
      if (!state.toolOutputStatusMap[sessionId]) {
        return
      }
      _.forEach(obj, (x, d, n) => {
        state.toolOutputStatusMap[sessionId][d] = x;
      })
    },
    cleanProcessText: (
      state,
      action: PayloadAction<{
        sessionId: string,
      }>
    ) => {
      let { sessionId } = action.payload;
      if (!state.toolOutputStatusMap[sessionId]) {
        return
      }
      let obj = state.toolOutputStatusMap[sessionId]
      obj.processText = undefined
      obj.processOK = false;
    },
    updateProcessValue: (
      state,
      action: PayloadAction<{
        value: ProcessReturnType,
        sessionId: string,
        elapsedTime: string
      }>
    ) => {
      let { sessionId } = action.payload;
      if (!state.toolOutputStatusMap[sessionId]) {
        return
      }
      let obj = state.toolOutputStatusMap[sessionId]
      obj.collapseOutput = false;
      obj.collapseConfig = false;
      obj.toolTabIndex = "output"
      obj.processError = action.payload.value.error
      // obj.processText = Dot("azpNX", "Completed.", action.payload.elapsedTime)
      obj.processText = Dot("-DqwwR", "Operation Completed.", action.payload.elapsedTime)
      obj.processing = false;
      obj.processOK = true;
    },
    moveTabToToolsPart: (state,
      action: PayloadAction<{
        sessionId: string
      }>
    ) => {
      let { sessionId } = action.payload;
      if (!state.toolOutputStatusMap[sessionId]) {
        return
      }
      let obj = state.toolOutputStatusMap[sessionId]
      obj.toolTabIndex = "tools"
    },
    resetProcessValueBeforeProcess: (
      state,
      action: PayloadAction<{
        sessionId: string
      }>
    ) => {
      // TODO: move collapseOutput to other variable name
      let { sessionId } = action.payload;
      if (!state.toolOutputStatusMap[sessionId]) {
        return
      }
      let obj = state.toolOutputStatusMap[sessionId]
      obj.collapseOutput = false;
      obj.collapseConfig = false;
      obj.processError = undefined
      obj.processText = Dot("zqiIoqXw", "Running computations...")
      obj.processing = true;
      obj.processOK = false;
    },
    //
    setCollapseOutput: (
      state,
      action: PayloadAction<{ sessionId: string; collapseOutput: boolean }>
    ) => {
      let { sessionId, collapseOutput } = action.payload;
      if (!state.toolOutputStatusMap[sessionId]) {
        return
      }
      state.toolOutputStatusMap[sessionId].latestViewPanelId = 'output'
      state.toolOutputStatusMap[sessionId].collapseOutput = collapseOutput;
    },
    setCollapseConfig: (
      state,
      action: PayloadAction<{ sessionId: string; collapseConfig: boolean }>
    ) => {
      let { sessionId, collapseConfig } = action.payload;
      if (!state.toolOutputStatusMap[sessionId]) {
        return
      }
      state.toolOutputStatusMap[sessionId].collapseConfig = collapseConfig;
      state.toolOutputStatusMap[sessionId].latestViewPanelId = 'config'
    },
  },
});

export default RuntimeStatusSlice;
