
// Date: Fri, 13 Oct 2023
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
} from "@blueprintjs/core";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import { useParams } from "react-router";
import gutils from "../../utils/GlobalUtils";
import { ToolParamType } from "../../types/constants";
import { Dot } from "../../utils/cTranslationUtils";

import AjaxUtils from "../../utils/AjaxUtils";
// import { ACTION_sendToolRequest } from "../../slice/toolSlice";
import exportUtils from "../../utils/ExportUtils";
import apiSlice from "../../reducers/apiSlice";

import { Link } from "react-router-dom";
import PageUtils from "../../utils/PageUtils";
import { FnPureToolDefinition } from "../../types/workbench-types";

type PassProp = {
  allPureMenuArr: FnPureToolDefinition[];
  findCurrentPureItem: FnPureToolDefinition | null;
};

export default (props: PassProp): any => {
  let dis = exportUtils.dispatch();
  let toolParam = useParams() as ToolParamType;
  let allPureMenuArr = props.allPureMenuArr;

  if (props.findCurrentPureItem == null) {
    return <div>loading...</div>;
  }

  return (
    <ul className="app-nav-menu">
      {allPureMenuArr.map((x, d, n) => {
        let isActive = toolParam.category == x.Id;
        return (
          <Link
            to={"nouse" + "/" + x.Id}
            className={isActive ? "active-tool-item" : ""}
            key={x.Id}
          >
            {x.Label}
          </Link>
        );
      })}
    </ul>
  );
};
