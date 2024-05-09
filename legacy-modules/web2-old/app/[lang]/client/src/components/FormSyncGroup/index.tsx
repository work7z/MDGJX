
// Date: Tue, 17 Oct 2023
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
  TreeNode,
  Switch,
  FormGroupProps,
} from "@blueprintjs/core";
import React, { useEffect, useMemo, useState } from "react";
import _ from "lodash";
import { Dot } from "../../utils/cTranslationUtils";
import moment from "moment";
import DateUtils from "../../utils/DateUtils";
import { QueryStatus } from "@reduxjs/toolkit/dist/query";
import {
  MutationState,
  MutationSubState,
  QuerySubState,
} from "@reduxjs/toolkit/dist/query/core/apiState";
import gutils from "../../utils/GlobalUtils";
import { UseQueryHookResult } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { ContextMenu, Tree, TreeNodeInfo } from "@blueprintjs/core";
import { Example, ExampleProps } from "@blueprintjs/docs-theme";
import { TreeWrapInfo } from "../../types/constants";
import "./index.scss";
import Html_select from "../Html_select";
import {
  ExtQuickAllType,
  PassExtQuickAllType,
} from "../../utils/ExtensionHookUtils";
type PassProp = {
  tooltip?: string;
  children: JSX.Element;
  formGroupProp?: FormGroupProps;
};

export default (props: PassProp) => {
  let r = (
    <FormGroup {...(props.formGroupProp || {})}>{props.children}</FormGroup>
  );
  if (props.tooltip)
    return (
      <div>
        <Tooltip content={props.tooltip}>{r}</Tooltip>
      </div>
    );
  return r;
};
