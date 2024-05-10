
// Date: Mon, 25 Sep 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
// License: AGPLv3

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { startListening } from "../listenerMiddleware";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

interface RouteState {
  visited404Before: boolean;
}

const initialState: RouteState = {
  visited404Before: false,
};

const routeSlice = createSlice({
  name: "route",
  initialState,
  reducers: {
    //
  },
});

export default routeSlice;
