
// Date: Thu, 2 Nov 2023
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

// write SimpleTableProp according to the code
interface SimpleTableProp {
  column: Array<{
    label: string;
    value: (row: any) => any;
  }>;
  data: Array<any>;
}

export default (props: SimpleTableProp) => {
  let { column, data } = props;
  return (
    <table
      style={{ width: "100%", height: "100%" }}
      className="bp5-html-table simple-g-table  bp5-html-table-striped bp5-html-table-condensed bp5-html-table-bordered"
    >
      <thead>
        <tr>
          {_.map(column, (x, d, n) => {
            return <th key={x.label}>{x.label}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {_.map(data, (x, d, n) => {
          return (
            <tr key={d}>
              {_.map(column, (eachCol, eachColIdx) => {
                return <td>{eachCol.value(x) || ""}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
