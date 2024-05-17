
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
export type ROptions<T> = {
  getDefaultStateFn: () => T,
  actions?: ActionMap<T>
}
export class RHelper<T> {
  keyname: string = ''
  state: T | null = null
  constructor(keyname: string, state: T) {
    this.keyname = keyname
    this.state = state
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
  bindOnChange = (key: keyof T) => {
    return {
      name: key,
      value: this.state ? _.toString(this.state[key]) : '',
      onChange: (e: any) => {
        FN_GetDispatch()(StateSlice.actions.updateKvSessionMap({
          keyname: this.keyname,
          keystate: {
            [key]: _.isString(e) ? e : e.target.value
          }
        }))
      }
    }
  }
  updateValue = (value: Partial<T>) => {
    let name = this.keyname
    FN_GetDispatch()(StateSlice.actions.updateKvSessionMap({
      keyname: name,
      keystate: value
    }))
  }
}
function register<T>(name: string, options: ROptions<T>): RHelper<T> | null {
  let crtMap = exportUtils.useSelector(v => v.state.kvSessionMap[name])
  useEffect(() => {
    const emptyOrNot = _.isEmpty(crtMap)
    if (emptyOrNot) {
      FN_GetDispatch()(StateSlice.actions.updateKvSessionMap({
        keyname: name,
        keystate: options.getDefaultStateFn()
      }))
    }
  }, [_.isEmpty(crtMap)])
  if (_.isEmpty(crtMap)) {
    return null;
  }
  return new RHelper<T>(name, crtMap as T)
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
