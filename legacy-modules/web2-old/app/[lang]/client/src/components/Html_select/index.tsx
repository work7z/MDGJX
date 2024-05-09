
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
import $ from "jquery";

export default (props: {
  list: { label: string; value: string; disabled?: boolean; desc?: string }[];
  value: string;
  onChange: (x: string) => void;
  disabled?: boolean;
}) => {
  return (
    <div key={props.value} className="bp5-html-select .modifier">
      <select
        onChange={(x) => {
          props.onChange(x.target.value);
        }}
        ref={(e) => {
          if (e != null) {
            $(e).val(props.value);
          }
        }}
        disabled={props.disabled}
        value={_.get(props.value, _.get(props, "list.0.value") as any)}
      >
        {_.map(props.list || [], (x, d, n) => {
          return (
            <option
              disabled={x.disabled}
              key={x.value}
              title={x.desc}
              value={x.value}
              selected={x.value == props.value}
            >
              {x.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};
