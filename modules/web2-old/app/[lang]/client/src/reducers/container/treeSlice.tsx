// LafTools
// 
// Date: Fri, 22 Dec 2023
// Author: LafTools Team - FX <work7z@outlook.com>
// Description: 
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
// License: AGPLv3

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { startListening } from "../../listenerMiddleware";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import SyncStateUtils from "../../utils/SyncStateUtils";

type treeState = {
    treeKeyToList: {
        [treeKey: string]: { // like tree-1, tree-2, tree-3
            selected: string[],
            expanded: string[]
        };
    }
};

const initialState: treeState = {
    treeKeyToList: {}
};


const treeSlice = createSlice({
    name: "tree",
    initialState,
    reducers: {
        ...SyncStateUtils.getSyncStateReducers("tree", {
            RunOnInit: true,
            RequireUserId: true,
            RequireWorkspaceId: true,
        }),
        updatetree(state: treeState, action: PayloadAction) {
            //
        },
    },
});

export default treeSlice;
