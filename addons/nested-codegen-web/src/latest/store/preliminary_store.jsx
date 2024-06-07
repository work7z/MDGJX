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
import _ from "lodash";
import { autorun, observable }  from 'mobx';
import constants from "../constants";

function getCheckingStatus() {
  return {
    start: false,
    done: false,
    doneText: "Finish",
    hasError: false,
    tryStopLoading: false,
    interrupt: false,
    logs: {
      init: {
        work: false,
        msg: null,
        error: null,
      },
      runtime: {
        work: false,
        msg: null,
        error: null,
      },
      core: {
        work: false,
        msg: null,
        error: null,
      },
      local: {
        work: false,
        msg: null,
        error: null,
      },
    },
  };
}

export default {
  updateRefForLang: 0,
  real_update_for_lang: 0,
  configs: {
    signModel: {
      username: "",
      password: "",
      confirmPassword: "",
      invCode: "",
    },
    is_activation_panel_opened: false,
    // previous definitions
    sign_username: "Administrator",
    sign_loading: false,
    sign_password: "",
    sign_ok: false,
    username: "Administrator",
    password: "",
    password_confirm: "",
    workspace_list: [],
    previous_history_list: [],
    apphome: ipc.store_get(`gen.system.apphome`),
    appdata: ipc.store_get(`gen.system.appdata`),
    isUserInChina: false,
    lang: _.get(window.ipc.readInitJSON(), "lang", "en_US"),
    // ipc.locale == "zh-CN"
    //   ? "zh_CN"
    //   : ipc.locale == "zh-TW" || ipc.locale == "zh-HK"
    //   ? "zh_HK"
    //   :
    mirror: "global",
  },
  getCheckingStatus,
  checkingStatus: getCheckingStatus(),
  authStatus: {
    invCode: "N12345",
    username: null,
    isAdmin: false,
  },
  formList: {
    mirrors: [
      {
        label: "Global Network Mirror",
        value: "global",
      },
      {
        label: "China Network Mirror(国内加速源)",
        value: "china",
      },
    ],
    lang: [
      {
        label: "English",
        value: "en_US",
      },
      {
        label: "简体中文(Simplified Chinese)",
        value: "zh_CN",
        // disabled: true,
      },
      {
        label: "繁體中文(Traditional Chinese)",
        value: "zh_HK",
        // disabled: true,
      },
    ],
  },
};
