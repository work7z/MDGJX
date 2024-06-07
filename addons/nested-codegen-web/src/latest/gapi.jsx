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
import gstore from "./store.jsx";
import LoadingPage from "./routes/loading/index";
import MainPage from "./routes/main/index";
import "./index.less";
import _ from "lodash";
import static_server_api from "./apis/static_server_api";
import proxy_server_api from "./apis/proxy_server_api";
import system_api from "./apis/system_api";
import message_api from "./apis/message_api";
import preli_api from "./apis/preli_api";
import user_api from "./apis/user_api";
import database_dblink_api from "./apis/database_dblink_api";
import common_app_api from "./apis/common_app_api";
import ext_api from "./apis/ext_api";

const myapi = {
  ext: ext_api,
  common_app: common_app_api,
  user: user_api,
  static: static_server_api,
  proxy: proxy_server_api,
  system: system_api,
  msg: message_api,
  preli: preli_api,
  dblink: database_dblink_api,
};

export default myapi;
