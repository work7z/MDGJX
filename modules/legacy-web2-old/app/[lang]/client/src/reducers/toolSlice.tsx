
// Date: Tue, 3 Oct 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
// License: AGPLv3

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { startListening } from "../listenerMiddleware";
import {
  DispatchProp,
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import { Dispatch } from "react";
import AjaxUtils from "../utils/AjaxUtils";
import { logutils } from "../utils/LogUtils";
import PageUtils from "../utils/PageUtils";
import { TreeNodeInfo } from "@blueprintjs/core";
import { TreeWrapInfo } from "../types/constants";
import _ from "lodash";

const initialState = {
  subCategoryTreeInfo: {},
  extensionIdRefreshMap: {},
} as {
  subCategoryTreeInfo: TreeWrapInfo;
  extensionIdRefreshMap: { [key: string]: number };
};

type ToolState = typeof initialState;

const ToolSlice = createSlice({
  name: "tool",
  initialState,
  reducers: {
    updateSubCategoryTreeInfo(
      state: ToolState,
      action: PayloadAction<TreeWrapInfo>
    ) {
      state.subCategoryTreeInfo = action.payload;
      state.subCategoryTreeInfo.updateId = new Date().getTime() + " ";
    },
    updateSubCategoryTreeRemarks(
      state: ToolState,
      action: PayloadAction<TreeNodeInfo>
    ) {
      state.subCategoryTreeInfo.nodes = [
        action.payload,
        ..._.slice(
          state.subCategoryTreeInfo.nodes,
          1,
          _.size(state.subCategoryTreeInfo.nodes)
        ),
      ];
    },
    updateExtensionIdRefreshMap(
      state,
      action: PayloadAction<{ extId: string }>
    ) {
      let extId = action.payload.extId;
      if (_.isNil(state.extensionIdRefreshMap[extId])) {
        state.extensionIdRefreshMap[extId] = 0;
      }
      state.extensionIdRefreshMap[extId]++;
    },
  },
});

export default ToolSlice;
