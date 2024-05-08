
// Date: Sun, 24 Sep 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
// License: AGPLv3

import {
  PayloadAction,
  Store,
  configureStore,
  createAsyncThunk,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { listenerMiddleware } from "./listenerMiddleware";
import rootObj from "./reducers";
import apiSlice from "./reducers/apiSlice";
import _ from "lodash";
import { logutils } from "./utils/LogUtils";
import { saveIntoForge2 } from "./reducers/forgeSlice";
import SyncStateUtils from "./utils/SyncStateUtils";
import {
  createStateSyncMiddleware,
  initMessageListener,
} from "redux-state-sync";
import onlineAPISlice from "./reducers/onlineAPISlice";

type RootObjType = typeof rootObj;
const rootReducer = _.mapValues(rootObj, (x, d, n) => {
  return x.reducer;
}) as { [K in keyof RootObjType]: RootObjType[K]["reducer"] };

let syncedReducerNames: string[] = [];
_.forEach(rootObj, (x: any, d, n) => {
  if (x?.actions?.replaceWithLatestState) {
    syncedReducerNames.push(d);
  }
});

SyncStateUtils.setSyncedReducerNames(syncedReducerNames, rootObj);
SyncStateUtils.rootObj = rootObj as any;

const alwaysHappyMiddleware =
  (storeAPI) => (next) => (action: PayloadAction) => {
    const originalResult = next(action);
    // check forge
    if (
      _.startsWith(action.type, "forge/") &&
      action.type != "forge/updateStateComingFromServer"
    ) {
      let state = storeAPI.getState();
      let forge = state.forge;
      logutils.debug("saving forge", state, action);

      logutils.debug("saved forge");
      saveIntoForge2(forge);
    }
    let state = storeAPI.getState();
    SyncStateUtils.notifyChanges(state, action.type);
    return originalResult;
  };


export default function configureAppStore() {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware()
        .concat(onlineAPISlice.middleware)
        .concat(apiSlice.middleware)
        .concat(alwaysHappyMiddleware)
        .concat(createStateSyncMiddleware({
          predicate: (v) => {
            console.log('predicate', v)
            return v.type.startsWith("localState/");
          }
        }))
        .prepend(listenerMiddleware.middleware);
    },
    // preloadedState, // TODO: restore previous session
    enhancers: [],
  });


  initMessageListener(store);
  _.set(window, 'gstore', store)
  return store;
}
