
// Date: Sun, 24 Sep 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
// License: AGPLv3

import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { RootState } from "../store";
import { useMemo } from "react";
import _ from "lodash";

const exportUtils = {
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
