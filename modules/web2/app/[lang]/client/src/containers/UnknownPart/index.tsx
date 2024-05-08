// LafTools
// 
// Date: Sat, 18 Nov 2023
// Author: LafTools Team <work7z@outlook.com>
// Description: 
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
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
import { CommonTransformerPassProp as CommonTransformerPassProp } from "../../types/workbench-types";
import { Dot } from "../../utils/cTranslationUtils";

interface PassProp { }

let UnknownPart = (props: CommonTransformerPassProp & { reason?: string }) => {
  return <div className="p-5"><h1>{props.reason}</h1><br /> {Dot("RPVRl", "It appears that this extension is not compatible with the current version of LafTools. Please consider installing the latest version to support this extension, or feel free to contact us by raising an issue on GitHub.")}</div>
}
export default UnknownPart
