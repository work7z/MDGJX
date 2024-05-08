
// Date: Sun, 24 Sep 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
// License: AGPLv3

import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Provider, useDispatch } from "react-redux";
import SubApp from "./SubApp";
import { store, RootState } from "./store/index";
import gutils from "./utils/GlobalUtils";

import { logutils } from "./utils/LogUtils";
import PageUtils from "./utils/PageUtils.tsx";
import InitUtils from "./utils/InitUtils";
import ALL_NOCYCLE from "./nocycle";
import exportUtils from "./utils/ExportUtils";
import fn_tailwindcss from "./hmr/hmr-reload-resources.tsx";
import forgeSlice from "./reducers/forgeSlice.tsx";

import {
  useReadCurrentWorkspaceId,
  useReadCurrentWorkspaceItem,
} from "./utils/WorkSpaceUtils.tsx";
import {
  withRouter,
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  Redirect,
} from "react-router-dom";
import SystemLoadingBar from "./containers/SystemLoadingBar/index.tsx";
import './initapp.tsx'
import { useConstructedKeyAndInit } from "./initapp.tsx";
logutils.debug("Lanuch the page...");

const WrapApp = () => {
  let constructedKey = useConstructedKeyAndInit();
  return <SubApp key={constructedKey} />;
};

export const FinalRootApp = () => {
  return (
    <Provider store={store}>
      <SystemLoadingBar />
      <WrapApp />
    </Provider>
  );
};


