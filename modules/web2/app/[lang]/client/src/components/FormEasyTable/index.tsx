
// Date: Fri, 29 Sep 2023
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

interface Column {
  label: string;
  key?: string;
  value: (column: Column, idx: number) => any;
}

interface PropFormEasyTable {
  column: Column[];
  data: any[];
}

export default (props: PropFormEasyTable): any => {
  let { column, data } = props;
  return (
    <table
      style={{ width: "100%", maxWidth: "100%", overflowX: "auto" }}
      className="bp3-html-table simple-g-table  bp3-html-table-striped bp3-html-table-condensed bp3-html-table-bordered"
    >
      <thead>
        <tr>
          {_.map(column, (x, d, n) => {
            return <th key={x.key || x.label}>{x.label}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {_.map(data, (x, d, n) => {
          return (
            <tr key={d + `${x.label}`}>
              {_.map(column, (eachCol, _eachColIdx) => {
                let eachColIdx = _eachColIdx;
                return (
                  <td
                    style={{ verticalAlign: "center" }}
                    key={eachCol.label + eachColIdx}
                  >
                    {eachCol.value(x, eachColIdx) || ""}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
