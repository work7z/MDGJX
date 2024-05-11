
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
  TreeNodeInfo,
} from "@blueprintjs/core";
import {
  ColumnHeaderCell,
  Cell,
  Column,
  Table,
  Regions,
} from "@blueprintjs/table";
import { APPINFOJSON, FN_GetDispatch, delayFN } from "../../../../../../../../../nocycle";

import React, { useEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import gutils from "../../../../../../../../../utils/GlobalUtils";
import { logutils } from "../../../../../../../../../utils/LogUtils";
import _ from "lodash";

import statusSlice from "../../../../../../../../../reducers/statusSlice";
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
import PageUtils from "../../../../../../../../../utils/PageUtils";
import TranslationUtils, {
  Dot,
} from "../../../../../../../../../utils/cTranslationUtils";
import "allotment/dist/style.css";
import { Allotment } from "allotment";


import { type } from "jquery";
import apiSlice from "../../../../../../../../../reducers/apiSlice";

import FunctionalMenu_Panel from "..";
import WorkspaceSlice from "../../../../../../../../../reducers/workspaceSlice";

export let InnerFilePanel = (): any => {
  return (
    <FunctionalMenu_Panel
      loading={false}
      crtLeftNavId="all"
      leftNavList={[
        {
          label: Dot("KYh1N", "All Notes"),
          value: "all"
        },
        {
          label: Dot("yqiRso", "Local Notes"),
          value: "local",
        },
        {
          label: Dot("yiRso", "Cloud Notes"),
          value: "cloud",
        },
      ]}
      children={<div className="p-2">
        <p>{Dot("yVprb", "This part is still under development.")}</p>
        <p>
          <Button onClick={() => {
            FN_GetDispatch()(
              WorkspaceSlice.actions.addTab({
                keyName: "notes",
                newTab: {
                  id: "notes" + Math.random(),
                  label: "Note-1",
                  icon: "document",
                  pageTitle: "Notes",
                }
              })
            );
          }} fill text={Dot("ah-C4", "New Note")} intent="primary"></Button>
        </p>
      </div>} onPopClose={function (): void {
        throw new Error("Function not implemented.");
      }} onPopRedirectPage={function (x: TreeNodeInfo<{}>, newTab: boolean) {
        throw new Error("Function not implemented.");
      }}    ></FunctionalMenu_Panel >
  );
};
export default InnerFilePanel;