
// Date: Tue, 3 Oct 2023
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
  TreeNodeInfo,
} from "@blueprintjs/core";
import React, { useEffect, useMemo, useState } from "react";
import _ from "lodash";
import { useParams } from "react-router";
import gutils from "../../utils/GlobalUtils";
import { ToolParamType } from "../../types/constants";
import { Dot } from "../../utils/cTranslationUtils";

import AjaxUtils from "../../utils/AjaxUtils";
// import { ACTION_sendToolRequest } from "../../slice/toolSlice";
import exportUtils from "../../utils/ExportUtils";
import {
  ExtensionInfoFormatted as ExtensionInfo,
} from "../../types/purejs-types-READ_ONLY";
import apiSlice from '../../reducers/apiSlice'

import AuthHookUtils from "../../utils/AuthHookUtils";
import QueryUtils from "../../utils/QueryUtils";
import MottoLine from "../../components/MottoLine";
import { Tree } from "@blueprintjs/icons";
import GenTree from "../../components/SystemNavTree";
import ToolSlice from "../../reducers/toolSlice";
import { logutils } from "../../utils/LogUtils";
import RouteUtils from "../../utils/RouteUtils";

import PageUtils from "../../utils/PageUtils";
import forgeSlice from "../../reducers/forgeSlice";
import ExtHookUtils from "../../utils/ExtensionHookUtils";
import { PassToolViewerProp } from "../../types/workbench-types";

type PassProp = PassToolViewerProp;

export default (props: PassProp): any => {
  return <span></span>
}