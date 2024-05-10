// LafTools
// 
// Date: Fri, 2 Feb 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { startListening } from "../listenerMiddleware";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import SyncStateUtils from "../utils/SyncStateUtils";

const initialState = {
  updatePathCount: 0,
  showSideBarNavIconOnly: false,
};

type settingsState = typeof initialState;

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    ...SyncStateUtils.getSyncStateReducers("settings", {
      RunOnEnterWorkBench: true,
      RequireUserId: true,
      RequireWorkspaceId: true,
      SyncWithKVStorage: true,
    }),
    updateShowSideBarNavIconOnly(state: settingsState, action: PayloadAction<boolean>) {
      state.showSideBarNavIconOnly = action.payload;
    },
    updatePathCount(state: settingsState, action: PayloadAction<number>) {
      state.updatePathCount = action.payload;
    }
  },
});

export default settingsSlice;
