
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
import { APPINFOJSON, FN_GetDispatch, delayFN } from "../../../../../nocycle";

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
import TranslationUtils, { Dot } from "../../../../../utils/cTranslationUtils";
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
} from "../../../../../types/constants";
import { type } from "jquery";
import apiSlice from "../../../../../reducers/apiSlice";

import {
  SystemStatusBarItem,
  VAL_CSS_MENU_TITLE_PANEL,
} from "../../../../../types/workbench-types";
import {
  useMergeParamWithWorkSpace,
  useSearchQuery,
} from "../../../../../types/workbench-hook";
import {
  FN_ACTION_CloseMenu_ltr,
  FN_ACTION_CloseMenu_ttm,
  FN_ACTION_OpenMenu_ltr,
  FN_ACTION_OpenMenu_ttm,
} from "../../../../../actions/layout_action";
import {
  useReadCurrentWorkspaceId,
  useReadCurrentWorkspaceItem,
} from "../../../../../utils/WorkSpaceUtils";
import DesktopUtils from "../../../../../utils/DesktopUtils";
import ParamStateSlice, { TabBottomType } from "@/app/[lang]/client/src/reducers/state/paramStateSlice";

const SystemStatusBarItemElement = (props: SystemStatusBarItem) => {
  let p_ws = useMergeParamWithWorkSpace();
  // let Target = ? ({children}) : 
  let btn = <Button
    minimal={true}
    text={props.text}
    small={true}
    className="statusbar-item focus:outline-none"
    icon={props.icon as any}
    onClick={props.onClick}
    active={props.active}
    disabled={props.disabled}
    intent={props.intent}
  />
  let fn_clk = () => {
    FN_GetDispatch()(
      ParamStateSlice.actions.updateOneOfParamState({
        b: props.id as TabBottomType,
      })
    )
  }
  return (
    <Tooltip
      content={props.tooltip}
      position={Position.BOTTOM}
      disabled={props.disabled}
    >
      {
        props.disableLinkMode ? <span onClick={fn_clk}>
          {btn}
        </span> : <Link
          to={p_ws({
            b: props.id as TabBottomType,
          })}
          onClick={fn_clk}
        >
          {btn}
        </Link>

      }
    </Tooltip>
  );
};

export let WB_ControllerBar = () => {
  let workspaceObj = useReadCurrentWorkspaceItem();
  let sq = useSearchQuery();
  if (sq.b == undefined) {
    sq.b = "overview";
  }
  let v = exportUtils.useSelector((v) => {
    return {
      // show
      bottom_hide: v.layout.menuHide.bottom,
      // size
      bottom_size: v.layout.menuSize.bottom,
    };
  });

  let statusBarItemLeft: SystemStatusBarItem[] = [
    // define items for Terminal, TODO, Problems
    {
      text: Dot("Kw4OJr", "Terminal"),
      icon: "console",
      onClick: () => { },
      active: false,
      disabled: false,
      tooltip: Dot(
        "VAZq8r",
        "It allows developers to execute various commands, such as running scripts, installing packages, and navigating the file system, all from within the editor. "
      ),
      intent: Intent.NONE,
      id: "terminal",
    },
    // {
    //   text: Dot("spCqEa", "TODO"),
    //   icon: "annotation",
    //   onClick: () => {},
    //   active: false,
    //   disabled: false,
    //   tooltip: Dot("xeP4zV", "Quickly view your TODO items"),
    //   intent: Intent.NONE,
    //   key: "todo",
    // },
    {
      text: Dot("dpRY4", "Dictionary"),
      icon: "book",
      onClick: () => { },
      active: false,
      disabled: false,
      tooltip: Dot("xeP4zVd", "Quickly look up an English vocabulary."),
      intent: Intent.NONE,
      id: "dictionary",
    },

    /*
    {
      text: Dot("BShq3M", "Problems"),
      icon: "error",
      onClick: () => {},
      active: false,
      disabled: false,
      tooltip: Dot(
        "Cide2w",
        "To see if there's any problem while executing your action."
      ),
      intent: Intent.NONE,
      key: "problems",
    },

 {
      text: Dot("8LdevRj", "Service"),
      icon: "signal-search",
      onClick: () => {},
      active: false,
      disabled: false,
      tooltip: Dot("Mq9ppT", "Quickly view the status of your services"),
      intent: Intent.NONE,
      key: "service",
    },


*/
    /**

{
  text: Dot("wsWcXd", "Notifications"),
  icon: "notifications",
  onClick: () => {},
  active: false,
  disabled: false,
  tooltip: Dot(
    "39dsCt",
    "You would receive latest notification from app services if have."
  ),
  intent: Intent.NONE,
  id: "notifications",
},
 
 */ {
      text: Dot("0PgZ_", "Translation"),
      icon: "paragraph",
      onClick: () => { },
      active: false,
      disabled: false,
      tooltip: Dot("c0eCw", "Translate your text into any language you want."),
      intent: Intent.NONE,
      id: "translation",
    },
    {
      text: Dot("8LdRjq", "Compute"),
      icon: "calculator",
      onClick: () => { },
      active: false,
      disabled: false,
      tooltip: Dot(
        "M4ywN1",
        "Calculator, Calendar, Clock, Weather, and more."
      ),
      intent: Intent.NONE,
      id: "compute",
    },
    // item for Help 
    {
      text: Dot("C3L9MmdDU7", "Handbook"),
      icon: "map",
      onClick: () => { },
      active: false,
      disabled: false,
      tooltip: Dot(
        "Mqq9pdpT",
        "Help you to get started with LafTools."
      ),
      intent: Intent.NONE,
      id: "help",
    }
    // TODO: help menu can be added here. 
    // when the user click any menu, then
    // {
    //   text: Dot("8LdRj", "Overview"),
    //   icon: "panel-stats",
    //   onClick: () => { },
    //   active: false,
    //   disabled: false,
    //   tooltip: Dot( "Mq9pdpT","List all relevant resources for the functional menu you selected."),
    //   intent: Intent.NONE,
    //   id: "overview",
    // },
  ].map((x) => {
    if (sq.b == x.id && !v.bottom_hide) {
      x.active = true;
    }
    x.onClick = () => {
      if (v.bottom_hide || !x.active) {
        let dis = FN_GetDispatch();
        // TODO: update bottom hide logic here
        dis(
          FN_ACTION_OpenMenu_ttm({
            menuRecordKey: "ttm",
            menuKey: "bottom",
          })
        );
      } else {
        let dis = FN_GetDispatch();
        dis(
          FN_ACTION_CloseMenu_ttm({
            menuRecordKey: "ttm",
            menuKey: "bottom",
          })
        );
      }
    };
    return x;
  });
  let isActivated = true;

  let statusBarItemRight: SystemStatusBarItem[] = [
    // show items for version, messages, windows
    {
      text: `${Dot("2Ocbey", "Version")}: ${APPINFOJSON.version}(${isActivated
        ? Dot("ipOSQE", "Pro Edition")
        : Dot("QhdpH", "Community Edition")
        })`,
      onClick: () => { },
      active: false,
      disabled: false,
      tooltip: Dot(
        "Eyq856",
        "We're not done yet - we're dedicated to providing the latest and greatest features, and we'll keep releasing updates to make sure you have the best experience possible. "
      ),
      intent: isActivated ? Intent.PRIMARY : Intent.WARNING,
      id: "version",
    },
    /*
    {
      text: Dot("tBIX-d", "Windows"),
      icon: "grid-view",
      onClick: () => {},
      active: false,
      disabled: false,
      tooltip: Dot(
        "sO0MOe",
        "Every time you stay in a window more than 5 seconds, it would be shown here."
      ),
      intent: Intent.NONE,
      key: "windows",
    },
   */
  ];
  return (
    <div
      className="fixed-wb-nav-foot"
      style={{
        padding: `0 ${VAL_CSS_MENU_TITLE_PANEL}px`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        {statusBarItemLeft.map((item) => {
          return <SystemStatusBarItemElement disableLinkMode={true} key={item.id} {...item} />;
        })}
      </div>
      <div>
        <Tooltip content={Dot("1JOFP", "Open My Workspace")}>
          <Button
            className={Classes.MINIMAL}
            small={true}
            intent={"none"}
            // icon="floppy-disk"
            text={workspaceObj?.Label}
            onClick={() => {
              workspaceObj &&
                workspaceObj.Path &&
                DesktopUtils.openDir(workspaceObj.Path);
            }}
          ></Button>
        </Tooltip>
        {statusBarItemRight.map((item) => {
          return <SystemStatusBarItemElement disableLinkMode={true} key={item.id} {...item} />;
        })}
      </div>
    </div>
  );
};
