
// Date: Sun, 24 Sep 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
// License: AGPLv3

import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { RootState } from "../store";
import { useEffect, useMemo } from "react";
import _ from "lodash";
import { FN_GetDispatch, FN_GetState } from "@/store/nocycle";
import StateSlice from "@/store/reducers/stateSlice";
import AlertUtils from "./AlertUtils";
import MemorySlice from "@/store/reducers/memorySlice";

export type ActionFn<T> = (state: T, helpers: {
  updateState: (newState: Partial<T>) => void
}) => void
export type ActionMap<T> = {
  [key: string]: ActionFn<T>
}
export type ROptions<T, K> = {
  getPersistedStateFn: () => T,
  getNotPersistedStateFn: () => K,
}
export type BindKey<T, K> = {
  pStateKey?: keyof T,
  npStateKey?: keyof K
}
export class RHelper<T, K> {
  keyname: string = ''
  pState: T | null = null
  npState: K | null = null

  constructor(keyname: string, pState: T, npState: K) {
    this.keyname = keyname
    this.pState = pState
    this.npState = npState
  }
  getActualValueInState = (): T & K => {
    return {
      ...(FN_GetState().state.kvSessionMap[this.keyname] || {}) as T,
      ...(FN_GetState().state.npKVSessionMap[this.keyname] || {}) as K,
    }
  }
  checkLoginStatus = async () => {
    const signIn = FN_GetState().users.hasSignIn
    if (!signIn) {
      FN_GetDispatch()(
        MemorySlice.actions.updateOneOfParamState({
          showLoginModal: true
        })
      )
      throw new Error("not login")
    }
  }
  bindOnChange = (bindKey: BindKey<T, K>, optionalFn?: () => void) => {
    let pStateKey = bindKey.pStateKey
    let npStateKey = bindKey.npStateKey
    let finalKey: any = pStateKey || npStateKey
    let isItPState = finalKey == pStateKey
    const { pState, npState } = this;
    let finalKeyValue: string | null = (!this.pState || !this.npState) ? null : pState == null || npState == null ? null : isItPState ? _.toString(pState[pStateKey as keyof T]) : _.toString(npState[npStateKey as keyof K])
    return {
      name: finalKey,
      value: finalKeyValue || '',
      onChange: (e: any) => {
        FN_GetDispatch()(StateSlice.actions.updateSessionMapValue({
          keyname: this.keyname,
          state: {
            [finalKey]: _.isString(e) ? e : e.target.value
          },
          isItPState: isItPState
        }))
        optionalFn && optionalFn()
      }
    }
  }
  updatePState = (value: Partial<T>) => {
    let name = this.keyname
    FN_GetDispatch()(StateSlice.actions.updateSessionMapValue({
      keyname: name,
      state: value,
      isItPState: true
    }))
  }
  updateNonPState = (value: Partial<K>) => {
    let name = this.keyname
    FN_GetDispatch()(StateSlice.actions.updateSessionMapValue({
      keyname: name,
      state: value,
      isItPState: false
    }))
  }
}
function register<T, K>(name: string, options: ROptions<T, K>): RHelper<T, K> | null {
  let crtPState = exportUtils.useSelector(v => v.state.kvSessionMap[name])
  let crtNPState = exportUtils.useSelector(v => v.state.npKVSessionMap[name])
  useEffect(() => {
    const emptyOrNot = _.isEmpty(crtPState)
    if (emptyOrNot) {
      FN_GetDispatch()(StateSlice.actions.updateSessionMapValue({
        keyname: name,
        state: options.getPersistedStateFn(),
        isItPState: true
      }))
    }
  }, [_.isEmpty(crtPState)])
  useEffect(() => {
    const emptyOrNot = _.isEmpty(crtNPState)
    if (emptyOrNot) {
      FN_GetDispatch()(StateSlice.actions.updateSessionMapValue({
        keyname: name,
        state: options.getNotPersistedStateFn(),
        isItPState: false
      }))
    }
  }, [_.isEmpty(crtNPState)])


  if (_.isEmpty(crtPState) || _.isEmpty(crtNPState)) {
    return null;
  }
  return new RHelper<T, K>(name, crtPState as T, crtNPState as K)
}
const exportUtils = {
  register,
  dispatch: useDispatch,
  useDispatch: useDispatch,
  useCachedSelector<T>(callBack: (val: RootState) => T, cachedArr: any[]): T {
    return exportUtils.useSelector(callBack);
  },
  useSelector<T>(callBack: (val: RootState) => T, n?: any): T {
    if (_.isNil(n)) {
      n = shallowEqual;
    }
    return useSelector((val2: RootState) => {
      return callBack(val2);
    }, n);
  },
};

export default exportUtils;
