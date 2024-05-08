
// Date: Wed, 22 Nov 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
// License: AGPLv3

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { startListening } from "../listenerMiddleware";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { EachTab } from "../components/GenHorizontalTab";
import _ from "lodash";

// each time our router is changed, we need to check if the workspace is empty or still accessible.
// this slice is used for checking and doing the setup for users.

type CurrentPreWorkSpaceState = {};

const initialState: CurrentPreWorkSpaceState = {
  //
};

const PreWorkSpaceSlice = createSlice({
  name: "preWorkSpace",
  initialState,
  reducers: {
    //
  },
});

export default PreWorkSpaceSlice;
