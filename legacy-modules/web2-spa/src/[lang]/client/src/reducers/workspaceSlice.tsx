
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
import SyncStateUtils from "../utils/SyncStateUtils";
import { ExtensionInfo, ExtensionVM } from "../types/purejs-types-READ_ONLY";

// workspace slice, will be used to store and display the selected workspace.
// note that this slice should not be used unless the user got an valid workspace.

type GeneralTabBasicTab = {
  tabId: string | null;
  tabs: EachTab[];
  selected: string[];
  expanded: string[];
  favourites: string[];
  initialized?: boolean; // has it completed first time initialization?
};


type CurrentWorkspaceState = {
  tools: {} & GeneralTabBasicTab;
  notes: {} & GeneralTabBasicTab
};

export type WorkspaceStateKey = keyof CurrentWorkspaceState;

export function fn_newTabData(): GeneralTabBasicTab {
  return {
    tabId: null,
    tabs: [],
    selected: [],
    expanded: [],
    favourites: [],
  };
}

const initialState: CurrentWorkspaceState = {
  tools: fn_newTabData(),
  notes: fn_newTabData(),
};

// write a function that shadowlly merge and only merge when target value is undefined||null
// this function is used to merge the state with the payload.
export function MergeShadowly<T>(target: T, source: T) {
  for (const key in source) {
    if (target[key] === undefined || target[key] === null) {
      target[key] = source[key];
    }
  }
  return target;
}

const WorkspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    ...SyncStateUtils.getSyncStateReducers("workspace", {
      RunOnEnterWorkBench: true,
      RequireUserId: true,
      RequireWorkspaceId: true,
      SyncLocationOnParameter: "workspace"
    }),
    markInitialized: (state, action: PayloadAction<WorkspaceStateKey>) => {
      state[action.payload].initialized = true;
    },
    addTab: (
      state,
      action: PayloadAction<{
        keyName: keyof CurrentWorkspaceState;
        newTab: EachTab;
      }>
    ) => {
      // if newTab is in tabs, then do not push it into array, meanwhile, set its id as tabId
      if (state[action.payload.keyName] && state[action.payload.keyName].tabs) {
        let tabId = action.payload.newTab.id;
        let tab = _.find(state[action.payload.keyName].tabs, (x) => {
          return x.id === tabId;
        });
        if (tab) {
          state[action.payload.keyName].tabId = tabId;
        } else {
          state[action.payload.keyName].tabs.push(action.payload.newTab);
          state[action.payload.keyName].tabId = tabId;
        }
      }
    },
    refreshTabList: (
      state,
      action: PayloadAction<{
        keyName: keyof CurrentWorkspaceState;
        newTabs: EachTab[];
      }>
    ) => {
      let o = state[action.payload.keyName];
      let prevIndex = _.findIndex(o.tabs, (x) => x.id === o.tabId);
      o.tabs = action.payload.newTabs;
      if (_.findIndex(o.tabs, (x) => x.id === o.tabId) === -1) {
        let finalTabId: string | null = null;
        if (prevIndex != -1 && prevIndex < o.tabs.length) {
          finalTabId = o.tabs[prevIndex].id;
        } else {
          let lastItem = _.last(o.tabs);
          if (lastItem) {
            finalTabId = lastItem!.id;
          }
        }
        if (finalTabId) {
          o.tabId = finalTabId;
        }
      }
    },
    mergeTabPart: (state, action: PayloadAction<{
      name: keyof CurrentWorkspaceState;
      value: Partial<GeneralTabBasicTab>;
    }>) => {
      _.forEach(action.payload.value, (x, d, n) => {
        state[action.payload.name][d] = x;
      });
    },
  },
});

export default WorkspaceSlice;
