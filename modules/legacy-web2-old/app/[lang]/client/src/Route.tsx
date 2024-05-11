
// Date: Tue, 26 Sep 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
// License: AGPLv3

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import testReducer, { pong, testSliceActions } from "./reducers/testSlice.jsx";
import { store, RootState } from "./store/index";
import exportUtils from "./utils/ExportUtils.jsx";
import { logutils } from "./utils/LogUtils.jsx";
import { HotkeysProvider, HotkeysTarget2 } from "@blueprintjs/core";
import {
  withRouter,
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  Redirect,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import Welcome from "./pages/Welcome/index.jsx";
import FixedWorkBench from "./pages/WorkBench/FixedLayout/Main/index.jsx";
import $ from "jquery";
import _ from "lodash";
import { CLZ_ROOT_DARK, CLZ_ROOT_LIGHT, URL_LOGIN, URL_REDIRECT, URL_WORKBENCH_WORKSPACE } from "./types/constants.jsx";
import InitSystemEnv from "./pages/Loading/index.jsx";
import UserAskMultipleDialogs from "./containers/UserAskMultipleDialogs/index.jsx";
import gutils from "./utils/GlobalUtils.jsx";
import TranslationUtils from "./utils/cTranslationUtils.jsx";
import PageUtils from "./utils/PageUtils.jsx";
import { URL_ENTRY, URL_WORKBENCH } from "./types/constants.jsx";
import RouteUtils from "./utils/RouteUtils.jsx";
import InitRouteHistory from "./InitRouteHistory.jsx";
import SystemAlertOrPrompt from "./overlap/SystemAlertOrPrompt.jsx";
import Entry from "./pages/Redirect/index.jsx";
import FixedWorkBenchList from "./pages/WorkBench/FixedLayout/Initial/index";
import ALL_NOCYCLE, { FN_GetDispatch } from "./nocycle.jsx";
import { useReadCurrentWorkspaceId } from "./utils/WorkSpaceUtils.jsx";
import SignInLocal from './pages/SignInLocal/index.jsx'
import AuthHookUtils from "./utils/AuthHookUtils.jsx";
import RedirectPage from './pages/Redirect/index.jsx'
import apiSlice from "./reducers/apiSlice.jsx";
import UserSlice from "./reducers/userSlice.jsx";
import loadable from "@loadable/component";
import LoadingText from "./components/LoadingText/index.jsx";


gutils.ExposureIt("$", $);
gutils.ExposureIt("gutils", gutils);
gutils.ExposureIt("TranslationUtils", TranslationUtils);
gutils.ExposureIt("URLUtils", PageUtils);

let RouteComponent = () => {
  let workspaceId = useReadCurrentWorkspaceId();
  ALL_NOCYCLE.workspaceId = workspaceId;

  let hist = useHistory();
  ALL_NOCYCLE.history = hist;

  let forgeObj = exportUtils.useSelector((val) => ({
    HasUserSelectedOption: val.forge.HasUserSelectedOption,
    dark: val.forge.DarkThemeMode,
    lang: val.forge.Language,
  }));

  InitRouteHistory(hist);

  let queryAuthStatus = AuthHookUtils.useQueryAuthStatus();

  let isUserSignInNow = (!queryAuthStatus.isFetching && queryAuthStatus.HasLogin);

  useEffect(() => {
    if (true) {
      return;
    }
    // if (queryAuthStatus.isFetching) {
    //   return;
    // }
    // if (!isUserSignInNow) {
    //   // not sign in
    //   hist.push(URL_LOGIN)
    // } else {
    //   // sign in
    //   if (queryAuthStatus.currentUser) {
    //     FN_GetDispatch()(
    //       UserSlice.actions.updateUserObject({
    //         userConfig: queryAuthStatus.currentUser,
    //       })
    //     );
    //   }

    //   if (hist.location.pathname.indexOf(URL_LOGIN) != -1) {
    //     hist.push(URL_WORKBENCH)
    //   }
    // }
  }, [queryAuthStatus.isFetching, isUserSignInNow])

  return (
    <div
      className={

        // " " + (forgeObj.dark ? " bp5-dark dark " : " ")
        ''

      }
      key={forgeObj.lang}
    >
      <FixedWorkBench />
      {/* <Switch>
        <Route
          path={URL_LOGIN}
          component={SignInLocal}
        ></Route>
        <Route path={URL_WORKBENCH} exact component={FixedWorkBenchList}></Route>
        <Route path={URL_WORKBENCH_WORKSPACE+"/:workspaceId"} component={FixedWorkBench}></Route>
        <Route path={URL_ENTRY} component={Entry}></Route>
        <Route path={URL_REDIRECT} component={RedirectPage}></Route>
        <Redirect path="*" to={URL_REDIRECT}></Redirect>
      </Switch> */}
    </div>
  );
};

export default RouteComponent;
