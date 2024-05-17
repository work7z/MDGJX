
// Date: Fri, 29 Sep 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
// License: AGPLv3

import React, { useEffect, useState } from "react";
import _ from "lodash";

interface BlinkProp {
  max: number;
  min: number;
  interval?: number;
}
export default (props: BlinkProp): any => {
  let max = props.max;
  if (_.isNil(max)) {
    max = 8;
  }
  let min = props.min;
  if (_.isNil(min)) {
    min = 1;
  }
  let [viewTextNum, onViewTextNum] = useState(min);
  useEffect(() => {
    let tmpval = viewTextNum;
    let timeoutref = window.setInterval(() => {
      let nextval = tmpval + 1;
      if (nextval > max) {
        nextval = min;
      }
      tmpval = nextval;
      onViewTextNum(nextval);
    }, props.interval || 1000);
    return () => {
      window.clearInterval(timeoutref);
    };
  }, []);
  let totalStr = "";
  for (let i = 0; i < viewTextNum; i++) {
    totalStr += ".";
  }
  return totalStr;
};
