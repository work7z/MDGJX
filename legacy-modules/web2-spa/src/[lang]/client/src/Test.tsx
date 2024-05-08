
// Date: Sun, 24 Sep 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
// License: AGPLv3

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import testReducer, { pong, testSliceActions } from "./reducers/testSlice";

import { store, RootState } from "./store/index";
import exportUtils from "./utils/ExportUtils";

function App() {
  let msg = exportUtils.useSelector((val: RootState) => {
    return val.test.msg;
  });
  let isOKMsg = exportUtils.useSelector((val) => {
    return val.test.whetherListenMsg;
  });

  let dispatch = exportUtils.dispatch();
  return (
    <div className="App">
      <div>{isOKMsg}</div>
      <div>msg: {msg}</div>
      <input
        type="text"
        onChange={(e) => {
          dispatch(
            testSliceActions.updateMsg({
              newMsg: "update----" + e.target.value,
            })
          );
        }}
      ></input>
    </div>
  );
}

export default App;
