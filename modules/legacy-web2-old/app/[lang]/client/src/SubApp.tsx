
// Date: Sun, 24 Sep 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
// License: AGPLv3

import { useEffect } from "react";
import exportUtils from "./utils/ExportUtils";
import { HotkeysProvider, HotkeysTarget2 } from "@blueprintjs/core";
import { BrowserRouter as Router } from "react-router-dom";
import $ from 'jquery'
import RouteComponent from "./Route";
import UserAskMultipleDialogs from "./containers/UserAskMultipleDialogs";
import { CLZ_ROOT_DARK, CLZ_ROOT_LIGHT } from "./types/constants";
import InitSystemEnv from "./pages/Loading";
import SystemAlertOrPrompt from "./overlap/SystemAlertOrPrompt";
import PageUtils from "./utils/PageUtils";
import AuthHookUtils from "./utils/AuthHookUtils";
import LoadingBar from 'react-top-loading-bar'
import InitUtils from "./utils/InitUtils";
import { FN_GetDispatch, IsDevMode, getIconPngFile } from "./nocycle";
import systemSlice from "./reducers/systemSlice";
import forgeSlice from "./reducers/forgeSlice";
import { Dot } from "./utils/cTranslationUtils";
import { GetUserActualClientLang, getFormattedLang } from "./i18n";
import AlertUtils from "./utils/AlertUtils";
import SystemLoadingBar from "./containers/SystemLoadingBar";
import { fmtURL_Client } from "@/app/__CORE__/utils/cRouteUtils";
import SmallScreenDetecter from "./SmallScreenDetecter";
import SetupPopPanel from "@/app/__CORE__/containers/SetupPopPanel";
import VersionCheck from "@/app/__CORE__/containers/VersionCheck";
import { useTheme } from "@/app/__CORE__/components/LightDarkButton/theme";

function App() {
  let forgeObj = exportUtils.useSelector((val) => ({
    HasUserSelectedOption: val.forge.HasUserSelectedOption,
    dark: val.forge.DarkThemeMode,
    lang: val.forge.Language,
  }));
  let systemObj = exportUtils.useSelector((val) => ({
    LoadSystemData: val.system.LoadSystemData,
  }));
  let { theme, setTheme } = useTheme()
  let queryAuthStatus = AuthHookUtils.useQueryAuthStatus();
  let hotkeys = [
    {
      combo: "shift + D",
      global: true,
      label: Dot("H8fQ4", "Toggle to Light or Dark Mode"),
      onKeyDown: () => {
        // FN_GetDispatch()(
        // forgeSlice.actions.updateDarkMode({
        //   isDark: !forgeObj.dark,
        // })
        // );
        setTheme(theme == 'dark' ? 'light' : 'dark')
      },
    },
  ];

  let innerJSX: any;
  let isUserSignInNow =
    !forgeObj.HasUserSelectedOption ||
    (!queryAuthStatus.isFetching && !queryAuthStatus.HasLogin);
  let isEnvNotLoad = !systemObj.LoadSystemData;
  let dis = exportUtils.dispatch();
  useEffect(() => {
    if (!(isUserSignInNow || isEnvNotLoad)) {
      InitUtils.InitAllWithDOMAfterLoginIn(dis);
    }
  }, [isUserSignInNow, isEnvNotLoad]);

  useEffect(() => {
    if (IsDevMode()) {
      $(".icon-ele").attr("href", "/static/" + getIconPngFile());
    }
  }, []);

  // add window resize listneer in useEffect
  useEffect(() => {
    let fn = () => {
      dis(
        systemSlice.actions.updateClientWidthHeight({
          ClientWidth: window.innerWidth,
          ClientHeight: window.innerHeight,
        })
      );
    };
    window.addEventListener("resize", fn);
    return () => {
      window.removeEventListener("resize", fn);
    };
  }, []);


  let basename = fmtURL_Client(["/client/"])

  return (
    <HotkeysProvider>
      <Router basename={basename} >
        <HotkeysTarget2 hotkeys={hotkeys}>
          {({ handleKeyDown, handleKeyUp }) => {
            return (
              <div
                // draggable
                // onDrop={(e) => {
                //   e.preventDefault();
                // }}
                // onDragOver={(e) => {
                //   e.preventDefault();
                // }}
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyUp}
                style={{ width: "100%", height: "100%" }}
              >
                <SmallScreenDetecter />
                <RouteComponent></RouteComponent>
                <SystemAlertOrPrompt></SystemAlertOrPrompt>
              </div>
            );
          }}
        </HotkeysTarget2>
        <SetupPopPanel />
        <VersionCheck />
      </Router>
    </HotkeysProvider >

  );
}

export default App;
