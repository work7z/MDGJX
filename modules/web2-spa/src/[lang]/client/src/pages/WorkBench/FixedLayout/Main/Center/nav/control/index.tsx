
// Date: Tue, 14 Nov 2023
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
import {
  APPINFOJSON,
  FN_GetDispatch,
  delayFN,
} from "../../../../../../../nocycle";

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
import {
  EachTabPanelProp,
  TabNavProp,
} from "../../../../../../../types/workbench-types";
import { useLeftTabsList } from "../../../../../../../types/workbench-hook";
import GenTabs from "../../../../../../../components/GenVerticalTabs";
import layoutSlice from "../../../../../../../reducers/layoutSlice";
import { FN_ACTION_CloseMenu_ltr } from "../../../../../../../actions/layout_action";

export default () => {
  return (
    <SysTabPane
      crtLeftNavId="drawer"
      leftNavList={[
        {
          label: Dot("dqTqyvWY", "Drawer Menu"),
          value: "drawer",
        },
      ]}
      rightCtrls={
        <Button
          onClick={() => {
            let dis = FN_GetDispatch();
            dis(
              FN_ACTION_CloseMenu_ltr({
                menuRecordKey: "ttm",
                menuKey: "bottom",
              })
            );
          }}
          small
          minimal
          rightIcon="minus"
        ></Button>
      }
      children={<div>{Dot("qpDBSW", "no available panel")}</div>}
    ></SysTabPane>
  );
};
