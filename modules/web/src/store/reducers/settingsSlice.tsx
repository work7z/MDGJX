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
  currentNavTabId: "Home",
};

type SettingsState = typeof initialState;

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    updateOneOfParamState: (state, action: PayloadAction<Partial<SettingsState>>) => {
      _.merge(state, action.payload)
    },
  },
});

export default settingsSlice;
