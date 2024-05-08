
// Date: Sun, 12 Nov 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
// License: AGPLv3

import localforage from "localforage";
import {
  Callout,
  PanelStack,
  ProgressBar,
  AnchorButton,
  Tooltip,
  Dialog,
  Drawer,
  Overlay,
  Alert,
  RadioGroup,
  MenuItem,
  Radio,
  ButtonGroup,
  TextArea,
  HotkeysProvider,
  Intent,
  Position,
  Toaster,
  Checkbox,
  NumericInput,
  FormGroup,
  HTMLSelect,
  ControlGroup,
  InputGroup,
  Navbar,
  NavbarHeading,
  NonIdealState,
  NavbarDivider,
  NavbarGroup,
  Alignment,
  Classes,
  Icon,
  Card,
  Elevation,
  Button,
  Popover,
  Menu,
  MenuDivider,
} from "@blueprintjs/core";
import {
  ColumnHeaderCell,
  Cell,
  Column,
  Table,
  Regions,
} from "@blueprintjs/table";
import ALL_NOCYCLE, {
  APPINFOJSON,
  FN_GetDispatch,
  delayFN,
  getIconPngFile,
} from "../../../../../nocycle";

import React, { useEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import gutils from "../../../../../utils/GlobalUtils";
import { logutils } from "../../../../../utils/LogUtils";
import _ from "lodash";
import RouteMem from "../../../../../types/router-mem";
import statusSlice from "../../../../../reducers/statusSlice";
import { useState, useContext, useCallback, useRef } from "react";
import {
  withRouter,
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  Redirect,
} from "react-router-dom";
import PageUtils from "../../../../../utils/PageUtils";
import TranslationUtils, { Dot, sysLocale } from "../../../../../utils/cTranslationUtils";
import "allotment/dist/style.css";
import { Allotment } from "allotment";
import exportUtils from "../../../../../utils/ExportUtils";
import forgeSlice, {
  ACTION_UPDATE_LANG_AND_APPLY_CHANGE,
} from "../../../../../reducers/forgeSlice";
import { ACTION_callRefreshAll } from "../../../../../reducers/systemSlice";
import {
  ID_FILES,
  ID_HISTORY as ID_MANUAL,
  ID_NOTES,
  ID_TOOLS,
  URL_WORKBENCH,
} from "../../../../../types/constants";
import { type } from "jquery";
import apiSlice from "../../../../../reducers/apiSlice";

import { FixedMenuItem } from "../../../../../types/workbench-types";
import { FixedMenuBar } from "./sub/InnerMenuBar";
import {
  pushToWorkSpace,
  useReadCurrentWorkspaceId,
  useWorkSpaceListGet,
} from "../../../../../utils/WorkSpaceUtils";
import AlertUtils from "../../../../../utils/AlertUtils";
import { useGetI18nLangList } from "../../../../../containers/UserAskMultipleDialogs";
import TokenUtils from "../../../../../utils/TokenUtils";
import { useCloudLoginStatus } from "../../../../../hook/login-hook";
import { getFormattedLang } from "../../../../../i18n";
import { fmtURL_Client } from "@/app/__CORE__/utils/cRouteUtils";
// import { useTheme } from "next-themes";
import { useTheme } from "@/app/__CORE__/components/LightDarkButton/theme";

import settingsSlice from "@/app/[lang]/client/src/reducers/settingsSlice";

type PassProp = {
  leftPart?: JSX.Element;
};

let AboutThisSoftware = () => {
  return (
    <div className="center flex flex-col  m-auto w-full self-center">
      <p className="text-center flex items-center p-4 justify-center flex-col bg-slate-200 dark:bg-slate-600" style={{ textAlign: 'center' }}>
        <img style={{ width: "50px" }} src={"/static/" + getIconPngFile()}></img>
        <p className="mt-2">{Dot("k41a5", "LafTools")}({APPINFOJSON.version})</p>
      </p>
      <h3><b>{Dot("aked61", "Introduction")}</b></h3>
      <p>
        {Dot("rycJy", "LafTools is a versatile toolbox specifically designed for programmers. It represents the second version of the CodeGen Toolbox, now with a more lightweight runtime wrriten in Golang and JavaScript.")}
      </p>
      <p>
        {Dot("X6Fq4j", "After years of dedicated development and refinement, we are confident that LafTools can significantly enhance your programming experience by bringing more convenience and efficiency to your workflow. ")}
      </p>
      <p>{Dot("QLKzF", "It's packed with features that cater to the needs of both novice and experienced developers, making it a must-have tool in any programmer's arsenal.")}</p>
      <p>
        {Dot("hRFxV", "For more information, please visit our website")}         <a href="https://laftools.dev" target="_blank">
          laftools.dev
        </a>
      </p>
      <h3><b>{Dot("aked6", "References")}</b></h3>
      <ul>
        <li>
          <a href="https://github.com/work7z/LafTools" target="_blank">
            [1] {Dot("Kyd9H", "Source Code on GitHub")}
          </a>
        </li>
        <li>
          <a href="https://codegen.cc/blogs/preview-list" target="_blank">
            [2] {Dot("eTmq", "History of CodeGen ToolBox")}
          </a>
        </li>
      </ul>

    </div>
  );
};

export let WB_MenuBar = (props: PassProp) => {
  let val_1 = exportUtils.useSelector((val) => ({
    dark: val.forge.DarkThemeMode,
  }));
  const var_3 = exportUtils.useSelector((val) => ({
    LoadingForPageData: val.system.LoadingForPageData,
  }));
  let stObj = exportUtils.useSelector((val) => {
    return {
      currentPlateId: val.status.nav.currentPlateId,
    };
  });
  let hist = useHistory();
  let dis = exportUtils.dispatch();

  let workspaceList: FixedMenuItem[] = [];
  let allWorkspacesList = useWorkSpaceListGet() || [];
  let crtWorkspaceId = useReadCurrentWorkspaceId();
  _.forEach(allWorkspacesList, (x, d, n) => {
    workspaceList.push({
      id: x.Id,
      label: x.Label,
      intent: crtWorkspaceId == x.Id ? "primary" : "none",
      link: URL_WORKBENCH + "/" + x.Id,
      routerLinkType: true,
      // onClick: () => {
      // AlertUtils.popOK(
      //   Dot("-GJ_72", "Switched to the selected workspace {0}", x.Label)
      // );
      // },
      // onClick: () => {
      //   pushToWorkSpace(x.Id);
      // },
    });
  });

  let m = exportUtils.useSelector(v => {
    return {
      iconOnly: v.settings.showSideBarNavIconOnly
    }
  })

  let menus: FixedMenuItem[] = [
    {
      id: "file",
      label: Dot("wQYoz", "File"),
      children: [
        {
          id: "file-new-file",
          label: Dot("F4uS2", "New File"),
          disabled: true,
        },
        {
          id: "file-new-window",
          label: Dot("qF4uS23", "New Window"),
          link: location.href,
        },
        // {
        //   id: "file-new-workspace",
        //   label: Dot("qF4uS2", "Create Workspace"),
        // },
        {
          id: "gJf4R",
          spliter: true,
        },
        {
          id: "file-open-file",
          label: Dot("pJoOz", "Open File"),
          disabled: true,
        },
        {
          id: "file-open-workspace",
          label: Dot("1NTgQ", "Open Workspace"),
          disabled: true,
        },
        {
          id: "g7dVE",
          label: Dot("g5SK9", "Open Recent"),
          children: [
            {
              label: Dot("Opcty", "Files"),
              id: "XSxYm",
              disabled: true,
            },
            {
              label: Dot("zN2ES", "Workspaces"),
              id: "65-Xk",
              disabled: true,
            },
          ],
        },
        {
          id: "dwq",
          spliter: true,
        },
        {
          id: "SFnhx",
          label: Dot("aCkOP", "Exit"),
          onClick: () => {
            // hist.push(URL_WORKBENCH);
            location.href = fmtURL_Client([])
          },
        },
      ],
    },
    {
      id: "edit",
      label: Dot("wQdYoz", "Edit"),
      children: [
        {
          id: "rZfcx",
          label: Dot("kOi5A", "Print Page"),
          onClick: () => {
            window.print();
          },
        },
      ],
    },
    {
      id: "view",
      label: Dot("wQdqwYoz", "View"),
      children: [
        {
          id: "view.full",
          // label: !PageUtils.isFullScreen()
          //   ? Dot("lRHDQ", "Exit Full Screen Mode")
          //   : Dot("M7jct", "Enter Full Screen Mode"),
          label: Dot("2S5ap", "Toggle Full Screen Mode"),
          onClick: () => {
            // page show full screen or not
            PageUtils.toggleFullScreen();
          },
        },
        {
          id: "view.navicononly",
          label: m.iconOnly ? Dot("cU0YAMbxU", "Show Text in Sidebar") : Dot("w1ANqKoBf", "Hide Text in Sidebar"),
          onClick: () => {
            FN_GetDispatch()(
              settingsSlice.actions.updateShowSideBarNavIconOnly(!m.iconOnly)
            )
          }
        },
      ],
    },
    {
      id: "tabs",
      label: Dot("qqwYoz", "Tabs"),
      children: [
        {
          id: "tab.closeCur",
          label: Dot("xbz0B2", "Close Tab"),
          onClick: ALL_NOCYCLE.Fn_LastCloseTab,
        },
        {
          id: "tab.closeAll",
          label: Dot("xbz0B", "Close All Tabs"),
          onClick: ALL_NOCYCLE.Fn_LastCloseAllTab,
        },
      ],
    },
    {
      id: "workspace",
      label: Dot("qqwYqwe", "Workspaces"),
      children: workspaceList,
    },
    {
      id: "help",
      label: Dot("qqqwYoz", "Help"),
      children: [
        {
          id: "help.website",
          label: Dot("WPrTW", "Official Website"),
          link: "https://laftools.dev",
        },
        {
          id: "help.github",
          label: Dot("mSFei", "Source Code on GitHub"),
          link: "https://github.com/work7z/LafTools",
        },
        {
          id: "qPR4G",
          spliter: true,
        },
        {
          id: "help.reportIssue",
          label: Dot("VOsZc", "Report Issue"),
          link: "https://github.com/work7z/LafTools/issues",
        },
        {
          id: "lxIYP",
          spliter: true,
        },
        {
          id: "help.condition",
          label: Dot("VeY9K", "Terms of Use"),
          link: "https://codegen.cc/main/license/main",
        },
        {
          id: "help.about",
          label: Dot("Z2QTU", "About"),
          onClick: () => {
            AlertUtils.win_alert({
              id: "0kcZT",
              msg: <AboutThisSoftware />,
            });
          },
        },
      ],
    },
  ];
  let p_langlist = useGetI18nLangList();
  let langList: { label?: string; value?: string }[] = [];
  if (p_langlist) {
    langList = _.take(p_langlist.map((x) => {
      return {
        label: x.LabelByLang,
        value: x.Value,
        ...x,
      };
    }), 18);
  }
  let cloudStatus = useCloudLoginStatus()
  const { theme, setTheme } = useTheme();
  let darkMode = theme == 'dark'
  return (
    <FixedMenuBar
      requiredPageIcon
      leftPart={props.leftPart}
      menus={menus}
      rightShownContent={
        <div>
          <Tooltip
            content={Dot("rf0mql3", `Light or Dark Theme`)}
            position="bottom"
          >
            <Button
              className={Classes.MINIMAL}
              small={true}
              // text="Software Updates"
              intent={darkMode ? "primary" : "none"}
              // title={Dot(`Spcfdee`, `Light or Dark Mode`)}
              text={""}
              icon={darkMode ? "flash" : "moon"}
              onClick={() => {
                setTheme(theme == 'dark' ? 'light' : 'dark')
                // dis(forgeSlice.actions.updateDarkMode({ isDark: !val_1.dark }));
              }}
            />
          </Tooltip>

          <Tooltip
            content={Dot("IKqqATS", "Refresh Current Page Data")}
            position="bottom"
          >
            <Button
              className={Classes.MINIMAL}
              small={true}
              // text="Software Updates"
              intent={"none"}
              // text={Dot("kPJ-A4", "Refresh")}
              loading={var_3.LoadingForPageData}
              icon={"refresh"}
              onClick={() => {
                dis(ACTION_callRefreshAll(true));
              }}
            />
          </Tooltip>



          <Popover
            placement="bottom-end"
            content={
              // write items for en_US, zh_CN, zh_HK
              <Menu>
                {langList.map((x) => {
                  return (
                    <MenuItem
                      text={x.label}
                      key={x.value}
                      onClick={() => {


                        // let newValue = x.value + "";
                        // let splitArr = location.pathname.split("/")
                        // let m = [...splitArr]
                        // m[2] = getFormattedLang(newValue)
                        // location.replace(m.join("/") + "" + location.search)
                        location.href = "/" + getFormattedLang(x.value + "") + '/client'
                        // alert()

                        // location.reload()


                        // TranslationUtils.CurrentLanguage = x.value + "";
                        // TranslationUtils.ForcbilyLanguage = x.value + ""
                        // dis(ACTION_UPDATE_LANG_AND_APPLY_CHANGE(x.value + ""));
                        // // AlertUtils.win_alert({
                        // //   id:"ksk12219s",
                        // //   msg:
                        // // })
                        // AlertUtils.popMsg("success", {
                        //   message: Dot(
                        //     "k1k239q",
                        //     "Please reload page or restart app to apply this change.",
                        //   ),
                        // });
                      }}
                      intent={
                        x.value == TranslationUtils.getCurrentLang()
                          ? "primary"
                          : "none"
                      }
                    />
                  );
                })}
              </Menu>
            }
          >
            <Tooltip
              content={
                Dot("LWaeFqd", "Switch to your preferred language") +
                (TranslationUtils.getCurrentLang() != "en_US"
                  ? "(Language)"
                  : "")
              }
              usePortal={false}
              position="bottom-right"
            >
              <Button
                small={false}
                minimal
                intent={"none"}
                // text={
                //   Dot("TBPqy7", "Language") +
                //   ` (${TranslationUtils.CurrentLanguage})`
                // }
                onClick={() => {
                  //
                }}
                icon={"globe"}
              />
            </Tooltip>
          </Popover>
          {/* <Tooltip
            content={Dot("Ma5mv", "Toggle the visibility of toolbar tabs")}
            position="bottom"
          >
            <Button
              className={Classes.MINIMAL}
              small={true}
              intent={"none"}
              // title={Dot(`YPPPL`, `Toggle the visibility of toolbars tabs`)}
              // text={APPINFOJSON.version}
              icon={"multi-select"}
              onClick={() => {
                //
              }}
            />
          </Tooltip> */}
          <Tooltip
            content={Dot("trywithclassicalwebui", "Try with Classical Web UI")}
            position="bottom"
          >
            <AnchorButton
              href={fmtURL_Client([])}
              className={Classes.MINIMAL}
              small={true}
              // target="_blank"
              // text="Software Updates"
              intent={"none"}
              // text={Dot("kPJ-A4", "Refresh")}
              loading={var_3.LoadingForPageData}
              icon={"desktop"}
              onClick={() => {
              }}
            />
          </Tooltip>
          <Tooltip
            content={Dot("iNqF1T", "Manage Cloud Account")}
            position="bottom"
          >
            <Button
              className={Classes.MINIMAL}
              small={true}
              intent={cloudStatus.Info?.isLogin ? "primary" : "warning"}
              // title={Dot(`ZAKaFq`, `My Cloud Account`)}
              icon={"cloud"}
              onClick={() => {
                if (!cloudStatus.Info?.isLogin) {
                  FN_GetDispatch()(
                    statusSlice.actions.setWhetherShow({
                      fieldName: "signIn",
                      fieldValue: true,
                    })
                  )
                }
              }}
              loading={cloudStatus.Loading}
            />
          </Tooltip>
          {/* <Tooltip content={Dot("ExqvX", "Hot Keys List")} position="bottom">
            <Button
              className={Classes.MINIMAL}
              small={true}
              icon={"key-option"}
              onClick={() => {
                // simulate ctrl+?
                AlertUtils.win_alert({
                  id: "xmSPw",
                  msg: (
                    <div>
                      {Dot(
                        "uVseB",
                        "Press {0} to show hot key list",
                        "Shift+/"
                      )}
                    </div>
                  ),
                });
              }}
            />
          </Tooltip> */}



          <Tooltip content={Dot("LqWaFd", "System Settings")} position="bottom">
            <Button
              className={Classes.MINIMAL}
              small={true}
              intent={"none"}
              // title={Dot(`RhqzcdD`, `System Settings`)}
              // text={APPINFOJSON.version}
              icon={"cog"}
              onClick={() => {
                dis(forgeSlice.actions.updateDarkMode({ isDark: !val_1.dark }));
              }}
            />
          </Tooltip>
          <Tooltip content={Dot("DVoKw", "Sign out this System")} position="bottom">
            <Button
              className={Classes.MINIMAL}
              small={true}
              intent={"none"}
              // title={Dot(`BuihG`, `System Settings`)}
              // text={APPINFOJSON.version}
              icon={"power"}
              onClick={async () => {
                if (await AlertUtils.win_confirm_promise({
                  id: "8KF41kd",
                  msg: Dot("az4uS2", "Are you sure to sign out this system? Note that you will be redirected to the login page.")
                })) {
                  TokenUtils.cleanAndSignOut()
                }
                // dis(forgeSlice.actions.updateDarkMode({ isDark: !val_1.dark }));
              }}
            />
          </Tooltip>
        </div>
      }
    />
  );
};
