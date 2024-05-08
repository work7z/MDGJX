
// Date: Tue, 5 Dec 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
// License: AGPLv3

import { PayloadAction } from "@reduxjs/toolkit";
import ALL_NOCYCLE, {
  FN_GetDispatch,
  FN_GetState,
  IsDevMode,
  getAjaxResPayloadValue,
} from "../nocycle";
import AjaxUtils from "./AjaxUtils";
import _, { DebouncedFunc } from "lodash";
import Qs from "query-string";

import AlertUtils from "./AlertUtils";
import TokenUtils from "./TokenUtils";
import { logutils } from "./LogUtils";
if (typeof window !== 'undefined') {
  // Your client-side code that uses window goes here
  window["_"] = _;
}

export function btoaUTF8(str) {
  return btoa(unescape(encodeURIComponent(str)));
}

export function atobUTF8(str) {
  return decodeURIComponent(escape(atob(str)));
}

type SyncDefinition = {
  RunOnInit?: boolean;
  RunOnEnterWorkBench?: boolean;
  RequireUserId: boolean;
  RequireWorkspaceId: boolean;
  SyncWithKVStorage?: boolean; // some state is synced with KV storage where we use a utils to impl
  SyncLocationOnParameter?: string; // TODO: wait to be implemented. Once it's enabled, the config will be synced to url parameters
};
let syncReducerDefinitions: { [key: string]: SyncDefinition } = {};
let syncedReducerNames: string[] = [];
let syncedReducerNameFnMap: { [key: string]: DebouncedFunc<any> } = {};
let syncedAlreadyMap: { [key: string]: boolean } = {};
// let originalInitialState: any = {};
let SyncStateUtils = {
  rootObj: null,
  setSyncedReducerNames(val: string[], st: any) {
    syncedReducerNames = val;
  },
  getSyncStateReducers(sliceName: string, syncDefinition: SyncDefinition) {
    syncReducerDefinitions[sliceName] = syncDefinition;
    return {
      replaceWithLatestState(state, action: PayloadAction<{ newState: any }>) {
        let newState = action.payload.newState;
        // _.defaultsDeep(newState, state);
        function checkDefaultsDeep(
          value: any,
          srcValue: any,
          key: string,
          object: any,
          source: any
        ) {
          if (_.isNil(value)) {
            return srcValue;
          }
          if (_.isArray(value) || _.isArray(srcValue)) {
            return value;
          }
          return value;
        }
        let obj = { ...newState };
        let src = { ...state };
        newState = _.mergeWith(obj, src, checkDefaultsDeep);
        return newState;
      },
    };
  },
  retrieveAllIDsFromServer: async function (
    checkFN: (i: SyncDefinition) => boolean
  ) {
    for (let eachReducerName of syncedReducerNames) {
      let def = syncReducerDefinitions[eachReducerName];
      if (def && !checkFN(def)) {
        continue;
      }
      await SyncStateUtils.retrieveIDFromServer(eachReducerName);
      syncedAlreadyMap[eachReducerName] = true;
    }
  },
  retrieveIDFromServer: async (eachReducerName: string) => {
    let def = syncReducerDefinitions[eachReducerName];
    let queryStr = {
      Name: eachReducerName,
      ...def,
    };
    let usingSyncLocationParam = def && !_.isNil(def.SyncLocationOnParameter)
    let replaceState: any = null;
    if (usingSyncLocationParam) {
      // TODO: write the code to retrieve the state from url parameters
      replaceState = null;
      if (ALL_NOCYCLE.history && def.SyncLocationOnParameter) {
        let loc = ALL_NOCYCLE.history.location
        let p = Qs.parse(loc.search.replace("?", ""))
        let v = p[def.SyncLocationOnParameter]
        if (v) {
          try {
            let obj = JSON.parse(atobUTF8(v as string))
            replaceState = obj
          } catch (e) {
            console.log(e);
          }
        }
      }
    } else {
      // TODO: using KVStorageUtils to get the state
      // let val = {};
      // //  await AjaxUtils.DoLocalRequestWithNoThrow({
      // //   url: "/sync/reducer/get?" + Qs.stringify(queryStr),
      // // });
      // if (val.error) {
      //   // if (IsDevMode()) {
      //   //   AlertUtils.popError(val.error);
      //   // }
      // }
      // if (val.response) {
      //   let innerValue = getAjaxResPayloadValue(val);
      //   if (innerValue) {
      //     replaceState = innerValue;
      //   }
      // }
    }
    // replace state
    // if (replaceState == null) {
    //   let fn = _.get(SyncStateUtils.rootObj, [
    //     eachReducerName,
    //     "getInitialState",
    //   ]) as any;
    //   if (fn) {
    //     replaceState = fn();
    //   }
    // }
    // let t =
    //   SyncStateUtils.rootObj &&
    //   (SyncStateUtils.rootObj[eachReducerName] as any);
    // let replaceWithLatestState = _.get(
    //   t,
    //   "actions.replaceWithLatestState"
    // ) as any;
    // if (replaceWithLatestState) {
    //   FN_GetDispatch()(replaceWithLatestState({ newState: replaceState }));
    // }
  },
  notifyChanges(state, action_type: string) {
    // check if action_type starts with any one of the syncedReducerNames
    // if so, then dispatch replaceWithLatestState
    if (action_type.indexOf("replaceWithLatestState") != -1) {
      return;
    }

    // if the user is initilizing his/her setup, then exit
    let userId = TokenUtils.getLocalUserId()
    if (!userId || userId == "") {
      return;
    }
    // let hasUserSelectOption = FN_GetState().forge.HasUserSelectedOption
    // if (!hasUserSelectOption) {
    //   return;
    // }

    if (_.isEmpty(syncedReducerNameFnMap)) {
      _.forEach(syncedReducerNames, (eachReducerName) => {
        syncedReducerNameFnMap[eachReducerName] = _.debounce(
          async (newState) => {
            let def = syncReducerDefinitions[eachReducerName];
            let obj = {
              Name: eachReducerName,
              ...def,
            };
            let usingSyncLocationParam = def && !_.isNil(def.SyncLocationOnParameter)
            if (usingSyncLocationParam && def.SyncLocationOnParameter) {
              if (ALL_NOCYCLE.history) {
                let p = ALL_NOCYCLE.history.location
                // let newPathname = p.pathname + "?v=" + ("" + Date.now()).substring(7) + "&" + Qs.stringify((
                let prevObj = Qs.parse(p.search.replace("?", "")) || {};
                // let newPathname = p.pathname +"?v=" + ("" + (prevObj.v||1)+1).substring(7) + "&" + Qs.stringify((
                let newPathname = p.pathname + "?v=" + ("" + (prevObj.v || 1) + 1).substring(7) + "&" + Qs.stringify((
                  _.pickBy({
                    ...prevObj,
                    [def.SyncLocationOnParameter]: btoaUTF8((JSON.stringify({
                      ...newState,
                    }))),
                    v: null
                  }, x => !_.isNil(x))
                ))
                logutils.debug('newPathname', newPathname)
                ALL_NOCYCLE.history.push(newPathname)
              }
            } else {
              let r = (await AjaxUtils.DoLocalRequestWithNoThrow({
                url: "/sync/reducer/save?" + Qs.stringify(obj),
                isPOST: true,
                data: newState,
              })) as any;
              if (r.error) {
                AlertUtils.popError(r.error);
              }
            }
          },
          5
        );
      });
    }
    _.forEach(syncedReducerNames, (eachReducerName) => {
      if (action_type.startsWith(eachReducerName)) {
        let crtReducerObj = state[eachReducerName];
        syncedReducerNameFnMap[eachReducerName] &&
          syncedReducerNameFnMap[eachReducerName](crtReducerObj);
      }
    });
    //
  },
};

if (typeof window !== 'undefined') {
  _.set(window, "SyncStateUtils", SyncStateUtils);
}

export default SyncStateUtils;
