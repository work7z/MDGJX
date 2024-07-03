// LafTools
// 
// Date: Fri, 2 Feb 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from 'lodash'

export type MemoryState = {
  scrollPos: number,
  showLoginModal: boolean,
  showChangeLogModal: boolean
  clickQuickSearchInput: boolean
};
const initialState: MemoryState = {
  scrollPos: 0,
  showLoginModal: false,
  showChangeLogModal: false,
  clickQuickSearchInput: false,
};


const MemorySlice = createSlice({
  name: "memory",
  initialState,
  reducers: {
    updateOneOfParamState: (state, action: PayloadAction<Partial<MemoryState>>) => {
      _.merge(state, action.payload)
    },
  },
});

export default MemorySlice;
