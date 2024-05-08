
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
  useLocation,
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
import {
  EachTabPanelProp,
  TabNavProp,
} from "../../../../../../../types/workbench-types";
import { useLeftTabsList, useSearchQuery } from "../../../../../../../types/workbench-hook";
import layoutSlice from "../../../../../../../reducers/layoutSlice";
import GenTabs from "../../../../../../../components/GenVerticalTabs";
import ParamStateSlice, { TabLeftType } from "@/app/[lang]/client/src/reducers/state/paramStateSlice";
import LocalStateSlice from "@/app/[lang]/client/src/reducers/state/localStateSlice";

export let FunctionalMenu = (props: TabNavProp) => {
  let leftTabs: EachTabPanelProp[] = useLeftTabsList();

  let dis = exportUtils.dispatch();
  let hist = useHistory();

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  let sp = useSearchQuery()
  // Get individual query parameters
  // let [activeId, onActiveId] = useState(sp.f || "tools");
  let onActiveId = (x: TabLeftType) => {
    // TODO:
    FN_GetDispatch()(
      ParamStateSlice.actions.updateOneOfParamState({ l: x })
    )
  }
  let activeId: TabLeftType = sp.l || 'tools'

  let currentActiveMenu = _.find(leftTabs, (x) => {
    return x.id == activeId;
  });

  PageUtils.useUpdateTitle(_.get(currentActiveMenu, "label"), [activeId]);

  let v = exportUtils.useSelector((v) => {
    return {
      // show
      left_hide: v.layout.menuHide.left,
    };
  });

  return (
    <GenTabs
      highlightIntent={"primary"}
      className={props.className}
      showNavOrContent={props.showNavOrContent}
      whichPart="left"
      activeId={v.left_hide ? "" : activeId}
      onItemClicked={(x, b1) => {
        if (props.showNavOrContent != "nav") {
          alert("added a wrong placement");
        }
        props.onItemClicked && props.onItemClicked(x, b1);
      }}
      onActiveIdChange={(x) => {
        onActiveId(x.id as TabLeftType);
        // dis(statusSlice.actions.updatePlateId({ value: x.id }));
        // let finPathName = x.pathname;
        // if (RouteMem[x.id]) {
        //   finPathName = RouteMem[x.id];
        // }
        // if (finPathName) {
        //   hist.push(finPathName);
        // }
      }}
      tabs={leftTabs}
    ></GenTabs>
  );
};
