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
  Tabs,
  Tab,
  Icon,
  Card,
  Elevation,
  Button,
} from "@blueprintjs/core";
import { Example, IExampleProps } from "@blueprintjs/docs-theme";
import {
  ColumnHeaderCell,
  Cell,
  Column,
  Table,
  Regions,
} from "@blueprintjs/table";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import $ from "jquery";
import { useState } from "react";
import {
  useStores,
  useAsObservableSource,
  useLocalStore,
  useObserver,
} from "mobx-react-lite";
import { Provider, observer, inject } from "mobx-react";
var createHistory = require("history").createBrowserHistory;
import {
  withRouter,
  HashRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
var { autorun, observable, reaction } = require("mobx");
import "./index.less";
import { FocusStyleManager } from "@blueprintjs/core";
import { Omnibar } from "@blueprintjs/select";
import gapi from "../../utils/gapi";
import cstore from "../../store/cstore";

const HtmlSelect = observer((props) => {
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
export default HtmlSelect;
