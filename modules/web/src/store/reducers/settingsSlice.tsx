// LafTools
// 
// Date: Fri, 2 Feb 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from 'lodash'

const initialState = {
  initCount: 0,
  testContent: 'yes',
  darkMode: false,
  hideLeftMenu: false,
  currentNavTabId: "Home",
  entryHottestCountMap: {
    'Home': 0,
  },
};

type SettingsState = typeof initialState;

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    updateOneOfParamState: (state, action: PayloadAction<Partial<SettingsState>>) => {
      _.merge(state, action.payload)
    },
    countDownPageWeight: (state,action:PayloadAction<{
      id: string
    }>)=>{
      state.entryHottestCountMap[action.payload.id] = (state.entryHottestCountMap[action.payload.id] || 0) + 1
    }
  },
});

export default settingsSlice;
