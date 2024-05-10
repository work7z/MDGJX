
// Date: Sat, 30 Sep 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
// License: AGPLv3

import ALL_NOCYCLE, { RootState2 } from "../nocycle";

const TakeUtils = {
  take<T>(callBack: (val: RootState2) => T): T | null {
    let st = ALL_NOCYCLE.store?.getState();
    if (st == null) {
      return null;
    }
    return callBack(st);
  },
};
export default TakeUtils;
