
// Date: Fri, 20 Oct 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
// License: AGPLv3

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { startListening } from "../listenerMiddleware";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

type TextKVMap = { [key: string]: string | null };

export type TextKVStatus = {
  outsideUpdateVer: number; // once this field is updated from outside, then reload the internal editor value forcibly
  value: string;
  internalValue: string | null;
};
type TextKVStatusMap = {
  [key: string]: TextKVStatus;
};

type bigtextState = {
  textKVMap: TextKVMap; // deprecated
  textKVStatusMap: TextKVStatusMap;
};
const initialState: bigtextState = {
  textKVMap: {},
  textKVStatusMap: {},
};

const BigTextSlice = createSlice({
  name: "bigtext",
  initialState,
  reducers: {
    updatebigtext(
      state: bigtextState,
      action: PayloadAction<{ key: string; value: string }>
    ) {
      state.textKVMap[action.payload.key] = action.payload.value;
    },
    updateTextKVStatusMapById(
      state,
      action: PayloadAction<{ key: string; value: TextKVStatus }>
    ) {
      state.textKVStatusMap[action.payload.key] = action.payload.value;
    },
  },
});

export default BigTextSlice;
