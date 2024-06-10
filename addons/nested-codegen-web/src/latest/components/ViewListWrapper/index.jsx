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

export default observer((props) => {
  let loadingDatabase = props.loading;
  let dbarr = props.list;
  let crtDb = props.crt;
  let onCrtDb = props.onChange;
  return (
    <div className="db-list-view">
      {_.isEmpty(dbarr) && !loadingDatabase ? (
        <div className="empty-view-item">
          {t(props.notext || "0 database(s)")}
        </div>
      ) : (
        ""
      )}
      {loadingDatabase ? (
        <div className="empty-view-item">
          {t("Loading")}
          <Blink />
        </div>
      ) : (
        ""
      )}
      {_.map(dbarr, (x, d, n) => {
        return (
          <div
            key={x.value}
            className={
              "db-list-item" + " " + (crtDb == x.value ? "active-item" : "")
            }
            onClick={() => {
              onCrtDb(x.value);
            }}
          >
            <Icon size={12} icon={props.icon || "database"} />
            <span>{x.label}</span>
          </div>
        );
      })}
    </div>
  );
});
