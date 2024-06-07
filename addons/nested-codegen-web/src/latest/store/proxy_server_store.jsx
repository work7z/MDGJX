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
import gutils from "../utils";
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
import _ from "lodash";
import { autorun, observable }  from 'mobx';
import constants from "../constants";

export default {
  overlay: {
    addRulePathRewrite: {
      ...constants.commonPropsForDialog(),
      name: "N/A",
    },
    addRule: {
      ...constants.commonPropsForDialog(),
      name: "N/A",
    },
    deleteServer: {
      ...constants.commonPropsForDialog(),
      name: "N/A",
    },
    addItem: {
      ...constants.commonPropsForDialog(),
      title: null,
      // open: true,
      confirmText: null,
    },
  },
  consoleData: {
    loading: false,
    id: null,
    view_model: {},
    req_path: null,
    net_card_list: [],
    logging: _.merge(constants.getPageData(), {
      msgSource: null,
      scrollBottom: true,
    }),
  },
  pageData: constants.getPageData(),
  pageDataForRule: constants.getPageData({}),
  pageDataForPathRewrite: constants.getPageData(),
};
