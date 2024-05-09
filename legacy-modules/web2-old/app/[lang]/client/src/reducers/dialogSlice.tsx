
// Date: Sat, 7 Oct 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
// License: AGPLv3

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { startListening } from "../listenerMiddleware";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import ALL_NOCYCLE from "../nocycle";
import { logutils } from "../utils/LogUtils";
import gutils from "../utils/GlobalUtils";
interface PutNewDialogRes {
  index?: number;
  ele: (prop: PutNewDialogReqProp) => JSX.Element;
  close: () => void;
}
export const DialogStoreMap: {
  [key: string]: PutNewDialogRes;
} = {};
export type PutNewDialogReqProp = {
  closeBtnJSX: JSX.Element;
  obj: PutNewDialogRes;
};
gutils.ExposureIt("DialogStoreMap", DialogStoreMap, true);

const initialState = {
  dialogIncrement: 1,
};

type DialogState = typeof initialState;

const DialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    updateDialogIncrement(state: DialogState, action: PayloadAction) {
      logutils.info("updating the increment");
      state.dialogIncrement++;
    },
  },
});

type PutNewDialogReq = {
  dispatch;
  id: string;
  Dialog: (any) => JSX.Element;
};
export const TOOL_PutNewDialog = ({
  dispatch,
  id,
  Dialog: dialog,
}: PutNewDialogReq): PutNewDialogRes => {
  const prev = DialogStoreMap[id];
  if (prev) {
    // logutils.error("why this field is duplicated");
    return prev;
  }
  DialogStoreMap[id] = {
    ele: dialog,
    index: ALL_NOCYCLE.store?.getState().dialog.dialogIncrement,
    close() {
      delete DialogStoreMap[id];
      dispatch(DialogSlice.actions.updateDialogIncrement());
    },
  };
  dispatch(DialogSlice.actions.updateDialogIncrement());
  return DialogStoreMap[id];
};

export default DialogSlice;
