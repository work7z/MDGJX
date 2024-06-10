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
import { ColumnHeaderCell, Cell, Table, Regions } from "@blueprintjs/table";
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

const initModelForPageData = () => {
  return {
    username: null,
    password: null,
    verificationCode: null,
  };
};
let initModelForPageDataOffline = () => {
  return {
    activation_code: null,
    local_serial_ID: null,
  };
};

const initModelForWorkspace = () => {
  return {
    name: null,
    private_key: null,
    confirm_private_key: null,
    SAVE_PRIVATE_KEY_LOCALLY: 1,
  };
};

export default {
  overlayForInputtingPrivateKey: {
    ...constants.commonPropsForDialog(),
    title: "Enter Private Key",
    name: "N/A",
    open: false,
    confirmIntent: "primary",
    confirmText: "Confirm",
  },
  overlayForRollbackVersion: {
    ...constants.commonPropsForDialog(),
    title: "Rollback to Previous Version",
    name: "N/A",
    open: false,
    confirmIntent: "primary",
    confirmText: "Confirm",
    cancelText: "Close",
    noConfirm: true,
  },
  overlayForManageWorkspace: {
    ...constants.commonPropsForDialog(),
    title: "Manage My Workspaces",
    name: "N/A",
    open: false,
    confirmIntent: "primary",
    confirmText: "Confirm",
    cancelText: "Close",
    noConfirm: true,
  },
  enterPrivatePageData: {
    loading: false,
    toggle_status_loading: false,
    alertType: "create",
    addModelFailures: {},
    isAddModelPass: false,
    initModel: initModelForWorkspace(),
    addModel: initModelForWorkspace(),
    formNeeds: {},
    pageData: [],
    pageCount: 0,
    pageInfo: {
      pageIndex: 1,
      pageSize: constants.COMMON_SIZE,
    },
  },
  workspacePageData: {
    loading: false,
    toggle_status_loading: false,
    alertType: "create",
    addModelFailures: {},
    isAddModelPass: false,
    initModel: initModelForWorkspace(),
    addModel: initModelForWorkspace(),
    formNeeds: {},
    pageData: [],
    pageCount: 0,
    pageInfo: {
      pageIndex: 1,
      pageSize: constants.COMMON_SIZE,
    },
  },
  rollbackPageData: {
    loading: false,
    toggle_status_loading: false,
    alertType: "create",
    addModelFailures: {},
    isAddModelPass: false,
    initModel: initModelForWorkspace(),
    addModel: initModelForWorkspace(),
    formNeeds: {},
    pageData: [],
    pageCount: 0,
    pageInfo: {
      pageIndex: 1,
      pageSize: constants.COMMON_SIZE,
    },
  },
  overlayForCreateWorkspace: {
    ...constants.commonPropsForDialog(),
    title: "Add New Workspace",
    name: "N/A",
    open: false,
    confirmIntent: "primary",
    confirmText: "Confirm",
  },
  overlayForLogin: {
    ...constants.commonPropsForDialog(),
    title: "Sign In",
    name: "N/A",
    open: false,
    confirmIntent: "primary",
    confirmText: "Confirm",
  },
  overlayForUserInfo: {
    ...constants.commonPropsForDialog(),
    title: t("Welcome to CodeGen ToolBox"), // + get_user_info().username, // localStorage.getItem("SYS_USER_NAME"),
    name: "N/A",
    open: false,
    confirmIntent: "primary",
    confirmText: "Confirm",
  },

  loginPageData: {
    loading: false,
    toggle_status_loading: false,
    alertType: "create",
    addModelFailures: {},
    isAddModelPass: false,
    initModel: initModelForPageData(),
    addModel: initModelForPageData(),
    formNeeds: {},
    pageData: [],
    pageCount: 0,
    pageInfo: {
      pageIndex: 1,
      pageSize: constants.COMMON_SIZE,
    },
  },
  offlineActivatePageData: {
    loading: false,
    toggle_status_loading: false,
    alertType: "create",
    addModelFailures: {},
    isAddModelPass: false,
    initModel: initModelForPageDataOffline(),
    addModel: initModelForPageDataOffline(),
    formNeeds: {},
    pageData: [],
  },
  loginInfo: {
    token: null,
  },
  usermodel: {},
};
