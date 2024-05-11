
// Date: Sun, 10 Dec 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
// License: AGPLv3

import { FN_GetState } from "../nocycle";
import _ from "lodash";
import bigtextSlice, { TextKVStatus } from "../reducers/bigTextSlice";

/**
 * if there's an internal value in editor, then read it
 * otherwise read value instead of.
 *
 * @param bigTextId
 * @returns
 */
export let FN_GetActualTextValueByBigTextId = (
  bigTextId: string
): string => {
  let stMap = FN_GetState().bigtext.textKVStatusMap[bigTextId];
  if (_.isNil(stMap)) {
    return "";
  }
  if (!_.isNil(stMap.internalValue)) {
    return stMap.internalValue || '';
  }
  return stMap.value;
};

export let FN_SetTextValueFromInsideByBigTextId___DONOTUSEIT__EXTERNALLY = (
  bigTextId: string,
  newValue: string
) => {
  return (dis) => {
    let stMap: TextKVStatus = FN_GetState().bigtext.textKVStatusMap[bigTextId];
    if (_.isNil(stMap)) {
      stMap = {
        outsideUpdateVer: 1,
        value: newValue,
        internalValue: null,
      };
    } else {
      // do not put outsideUpdateVer here
      stMap = {
        ...stMap,
        internalValue: newValue, // put value into internalValue
      };
    }
    // update
    dis(
      bigtextSlice.actions.updateTextKVStatusMapById({
        key: bigTextId,
        value: stMap,
      })
    );
  };
};

export let FN_SetTextValueFromOutSideByBigTextId = (
  bigTextId: string,
  newValue: string
) => {
  return (dis) => {
    let stMap: TextKVStatus = FN_GetState().bigtext.textKVStatusMap[bigTextId];
    if (_.isNil(stMap)) {
      stMap = {
        outsideUpdateVer: 2,
        value: newValue,
        internalValue: null,
      };
    } else {
      stMap = {
        ...stMap,
        outsideUpdateVer: stMap.outsideUpdateVer + 1,
        internalValue: null,
        value: newValue,
      };
    }
    dis(
      bigtextSlice.actions.updateTextKVStatusMapById({
        key: bigTextId,
        value: stMap,
      })
    );
  };
};
