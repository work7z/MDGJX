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
  TreeNodeInfo,
} from "@blueprintjs/core";
import React, { useEffect, useState } from "react";
import _ from "lodash";

interface PassProp {
  defaultNodes: TreeNodeInfo[]
  sessionId: string
}
export default (props: PassProp): any => {
  return <div>this is sync tree view</div>;
};
