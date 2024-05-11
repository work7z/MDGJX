
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
import { APPINFOJSON, FN_GetDispatch, delayFN } from "../../../../../../../nocycle";

import React, { useEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import gutils from "../../../../../../../utils/GlobalUtils";
import { logutils } from "../../../../../../../utils/LogUtils";
import _ from "lodash";
import RouteMem from "../../../../../../../types/router-mem";
import statusSlice from "../../../../../../../reducers/statusSlice";
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
import PageUtils from "../../../../../../../utils/PageUtils";
import TranslationUtils, {
  Dot,
} from "../../../../../../../utils/cTranslationUtils";
import "allotment/dist/style.css";
import { Allotment } from "allotment";
import exportUtils from "../../../../../../../utils/ExportUtils";
import forgeSlice, {
  ACTION_UPDATE_LANG_AND_APPLY_CHANGE,
} from "../../../../../../../reducers/forgeSlice";
import { ACTION_callRefreshAll } from "../../../../../../../reducers/systemSlice";
import {
  ID_FILES,
  ID_HISTORY as ID_MANUAL,
  ID_NOTES,
  ID_TOOLS,
} from "../../../../../../../types/constants";
import { type } from "jquery";
import apiSlice from "../../../../../../../reducers/apiSlice";
import { SysTabPane } from "../../../../../../../components/SysTabPane";
import GenTabs from "../../../../../../../components/GenVerticalTabs";
import {
  EachTabPanelProp,
  TabNavProp,
} from "../../../../../../../types/workbench-types";
import { FN_ACTION_CloseMenu_ltr } from "../../../../../../../actions/layout_action";
import {
  useMergeParamWithWorkSpace,
  useSearchQuery,
} from "../../../../../../../types/workbench-hook";
import ParamStateSlice, { TabRightType } from "@/app/[lang]/client/src/reducers/state/paramStateSlice";

let RightPanelNoAvailablePanel = () => {
  let dis = exportUtils.dispatch();
  return (
    <SysTabPane
      crtLeftNavId="not_finished_yet"
      leftNavList={[
        {
          label: Dot("qTqyvWdY", "Not finished yet"),
          value: "not_finished_yet",
        },
      ]}
      rightCtrls={
        <Button
          small
          minimal
          rightIcon="minus"
          onClick={() => {
            dis(
              FN_ACTION_CloseMenu_ltr({
                menuRecordKey: "ltr",
                menuKey: "right",
              })
            );
          }}
        ></Button>
      }
      children={
        <div>{Dot("pDBSWq", "no available content for right panel")}</div>
      }
    ></SysTabPane>
  );
};

export let SidebarMenu = (props: TabNavProp): any => {
  let mp_with_ws = useMergeParamWithWorkSpace();
  let sq = useSearchQuery();
  let fn_format_menu = (x) => {
    return {
      ...x,
      pathname: mp_with_ws({ r: x.id }),
      panel: x.panel || RightPanelNoAvailablePanel,
    };
  };
  let val_memo_deps = _.values(sq);
  let mainTabs: EachTabPanelProp[] = useMemo(() => {
    let tmparr: EachTabPanelProp[] = [
      // {
      //   desc: Dot("pEk1qkk", "List all the opened tabs"),
      //   icon: "grid-view",
      //   id: "grid-view",
      //   label: Dot("RNeBze0", "Opened Tabs"),
      // },
      // {
      //   desc: Dot("dkkq12", "Configure your tool in this tab."),
      //   icon: "cog",
      //   id: "cog",
      //   label: Dot("RNewBze0", "Tool Config"),
      // },
      {
        desc: Dot("twamg", "AI Assistant, Empowering Your Creativity"),
        icon: "lab-test",
        id: "ai",
        label: Dot("krxSK", "AI Assistant"),
      },
      {
        desc: Dot(
          "82r0C",
          "Manage your TODO list, and get things done more efficiently."
        ),
        icon: "generate",
        id: "todo",
        label: Dot("OeOQY", "TODO"),
      },
      {
        desc: Dot(
          "DSEtLTxUU",
          "Time is the currency of your life, spend it wisely."
        ),
        icon: "stopwatch",
        id: "stopwatch",
        label: Dot("hu-iz", "Timer"),
      },

      /**
      {
         desc: Dot(
           "dk122q",
           "Manage your workflows to combine multiple tools together."
         ),
         icon: "new-layers",
         id: "flows",
         label: Dot("1bd", "Workflow"),
       },
       */
    ];
    return tmparr.map(fn_format_menu);
  }, [val_memo_deps]);

  // let extraTabs: EachTabPanelProp[] = useMemo(() => {
  //   let tmparr: EachTabPanelProp[] = [
  //     //
  //   ];
  //   return tmparr.map(fn_format_menu);
  // }, [val_memo_deps]);

  let activeId = sq.r || _.get(mainTabs, "0.id");

  let v = exportUtils.useSelector((v) => {
    return {
      // show
      right_hide: v.layout.menuHide.right,
    };
  });

  return (
    <GenTabs
      highlightIntent={"success"}
      className={props.className}
      showNavOrContent={props.showNavOrContent}
      whichPart="right"
      activeId={v.right_hide ? "" : activeId + ""}
      onItemClicked={(a, b) => {
        FN_GetDispatch()(
          ParamStateSlice.actions.updateOneOfParamState({ r: a.id as TabRightType })
        )
        props.onItemClicked && props.onItemClicked(a, b);
      }}
      onActiveIdChange={(x) => 1}
      tabs={mainTabs}
    ></GenTabs>
  );
};
