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
  Radio,
  ButtonGroup,
  TextArea,
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
import { Example,  } from "@blueprintjs/docs-theme";
import {
  ColumnHeaderCell,
  Cell,
  Column,
  Table,
  Regions,
} from "@blueprintjs/table";
import React from "react";
import ReactDOM from "react-dom";
import gutils from "../../utils";
import { useState } from "react";

import { Provider, observer, inject ,useLocalStore} from "mobx-react";
// var createHistory = require("history").createBrowserHistory;
import {
  withRouter,
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import { autorun, observable }  from 'mobx';
import gstore from "../../store.jsx";
import "./index.less";
import _ from "lodash";

export default observer((props) => {
  let { column, data } = props;
  return (
    <table
      style={{ width: "100%", height: "100%" }}
      className="bp3-html-table simple-g-table  bp3-html-table-striped bp3-html-table-condensed bp3-html-table-bordered"
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
});
