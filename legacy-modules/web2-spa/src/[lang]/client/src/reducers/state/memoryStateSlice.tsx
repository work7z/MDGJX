// LafTools
// 
// Date: Sat, 2 Mar 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { startListening } from "../../listenerMiddleware";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { TrueFalseType } from './paramStateSlice'


export type MemoryStateState = {
    mainDOTUpdateCtn: number,
    siteToolDialogOpen: TrueFalseType,
    siteToolOptRenderMap: { [key: string]: number } // when config is changed, this will be updated
};
const initialState: MemoryStateState = {
    mainDOTUpdateCtn: 0,
    // siteToolDialogOpen: 'false'
    siteToolDialogOpen: 'f',
    siteToolOptRenderMap: {}
};

export type MemoryStateStateKeyType = keyof MemoryStateState;

const MemoryStateSlice = createSlice({
    name: "memoryState",
    initialState,
    reducers: {
        updateOneOfParamState: (state, action: PayloadAction<Partial<MemoryStateState>>) => {
            _.merge(state, action.payload)
        }
    },
});

export default MemoryStateSlice;
