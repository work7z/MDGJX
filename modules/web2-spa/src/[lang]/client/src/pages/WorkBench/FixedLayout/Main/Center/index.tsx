
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

import React, { useEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
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
import "allotment/dist/style.css";
import { Allotment } from "allotment";

import {
  RefAlloProp,
  VAL_CSS_TAB_TITLE_PANEL,
} from "../../../../../types/workbench-types";
import { MainStage } from "./sub/CenterFirstLayer";
import { SidebarMenu } from "./nav/sidebar/Biz_SidebarMenu";
import { FunctionalMenu } from "./nav/functional";
import {
  FN_CLOSE_LTR_MENU,
  FN_SHOW_LTR_MENU,
  FN_TAB_ITEM_CLICKED_FN,
} from "./nav/functional/panel-group/controls/FunctionalControls";
import exportUtils from "../../../../../utils/ExportUtils";

export let WB_CenterStage = () => {
  let dis = exportUtils.dispatch();

  let ref_allo: { current: RefAlloProp } = useRef({
    ref_p: null,
    ref_left: null,
    latest_size: [],
  } as RefAlloProp);

  return (
    <div className="  fixed-wb-nav-body">
      <div className="fixed-wb-nav-body-centre w-full flex">
        <FunctionalMenu
          onItemClicked={(e, isCurrentActive) => {
            FN_TAB_ITEM_CLICKED_FN("left", isCurrentActive);
          }}
          showNavOrContent="nav"
          className="flex-shrink-0"
          ref_allo={ref_allo.current}
        />
        <MainStage className="flex-grow" />
        <SidebarMenu
          onItemClicked={(e, isCurrentActive) => {
            FN_TAB_ITEM_CLICKED_FN("right", isCurrentActive);
          }}
          showNavOrContent="nav"
          className="flex-shrink-0"
          ref_allo={ref_allo.current}
        />
      </div>
    </div>
  );
};
