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
import { useState, useEffect } from "react";

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
import Blink from "../Blink";

export default observer((props) => {
  return (
    <Callout
      intent={props.intent}
      icon={props.icon || "swap-vertical"}
      style={{
        margin: "12px 0px",
      }}
    >
      <h4 class="bp3-heading">
        {t(props.title)}
        {props.noProcess ? "" : <Blink />}
      </h4>
      <p>
        {t(props.desc)}
        {props.noProcess ? "" : "."}{" "}
        {props.extraJSXLabel ? (
          <a
            onClick={() => {
              if (props.extraJSXFunc) {
                props.extraJSXFunc();
              }
            }}
          >
            {t(props.extraJSXLabel)}
          </a>
        ) : (
          ""
        )}
      </p>
      {props.noProcess ? (
        ""
      ) : (
        <ProgressBar stripes={true} intent={props.intent} />
      )}
    </Callout>
  );
});
