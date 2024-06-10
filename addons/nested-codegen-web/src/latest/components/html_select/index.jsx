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
  ContextMenu,
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
  Tree,
  Icon,
  Card,
  Elevation,
  Button,
  PanelStack2,
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
import {
  Classes as Popover2Classes,
  ContextMenu2,
  Tooltip2,
} from "@blueprintjs/popover2";

export default observer((props) => {
  console.log("rendering html select", props.value);
  window.mytestlist = props.list;
  return (
    <div {...props} key={props.value} className="bp3-html-select .modifier">
      <select
        onChange={(x) => {
          _.invoke(props, "onChange", x);
        }}
        ref={(e) => {
          console.log("e", e);
          if (e != null) {
            gutils.defer(() => {
              $(e).val(props.value);
            });
          }
        }}
        disabled={props.disabled}
        value={_.get(props.value, _.get(props, "list.0.value"))}
        // value={props.value}
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
});
