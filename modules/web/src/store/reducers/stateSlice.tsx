// LafTools
// 
// Date: Fri, 2 Feb 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from 'lodash'
import { SignInCredentials } from "./apiSlice";

type StateState = {
    kvSessionMap: {
        [key: string]: object | null
    }
    npKVSessionMap: {
        [key: string]: object | null
    }
};
const initialState: StateState = {
    kvSessionMap: {},
    npKVSessionMap: {}
};

export type PStatetate = Partial<StateState>
const StateSlice = createSlice({
    name: "state",
    initialState,
    reducers: {
        updateSessionMapValue: function (state: StateState, action: PayloadAction<{
            keyname: string,
            state: any,
            isItPState: boolean
        }>) {
            if (action.payload.isItPState) {
                if (!state.kvSessionMap[action.payload.keyname]) {
                    state.kvSessionMap[action.payload.keyname] = {}
                }
                _.merge(state.kvSessionMap[action.payload.keyname], action.payload.state)
            } else {
                if (!state.npKVSessionMap[action.payload.keyname]) {
                    state.npKVSessionMap[action.payload.keyname] = {}
                }
                _.merge(state.npKVSessionMap[action.payload.keyname], action.payload.state)
            }
        },
    },
});
export default StateSlice;
