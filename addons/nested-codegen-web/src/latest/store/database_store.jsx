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

const editorTabsArr = [];

let fn_addConn = () => {
  return {
    ID: null,
    VERSION_PROP: null,
    EXTRA_DATA_IS_SYS_IPT_NAME: null,
    IS_CONNECTION: null,
    CONNECTION_NAME: null,
    ORACLE_ROLE_STR: "normal",
    PG_ROLE_STR: null,
    CONNECTION_BRIEF: null,
    FOLDER_ID: null,
    AUTH_TYPE_PROP: null,
    DBTYPE_ID: null,
    DRIVER_ID: null,
    JDBC_URL: null,
    USERNAME: null,
    PASSWORD: null,
    HOST: null,
    DEFAULT_DATABASE: null,
    H2_FILEPATH: null,
    PORT: null,
    SAVE_PASSWORD_LOCALLY: 1,
  };
};

let fn_addFolder = () => {
  return {
    PARENT_FOLDER_ID: null,
    ID: null,
    FOLDER_NAME: null,
    FOLDER_BRIEF: null,
  };
};

let fn_tabinfo = () => {
  return {
    ID: null,
    TAB_NAME: null,
  };
};

export default {
  tabInfoPageData: {
    updateRef: 0,
    viewkey: "main",
    viewkeyFolder: "main",
    isLoadingTestConn: false,
    loading: false,
    formModel: {},
    toggle_status_loading: false,
    alertType: "create",
    addModelFailures: {},
    isAddModelPass: false,
    updateVersionCallRef: 0,
    initModel: fn_tabinfo(),
    addModel: fn_tabinfo(),
  },
  addNewConnPageData: {
    updateRef: 0,
    viewkey: "main",
    viewkeyFolder: "main",
    isLoadingTestConn: false,
    loading: false,
    formModel: {},
    toggle_status_loading: false,
    alertType: "create",
    addModelFailures: {},
    isAddModelPass: false,
    updateVersionCallRef: 0,
    initModel: fn_addConn(),
    addModel: fn_addConn(),

    initModelForFolder: fn_addFolder(),
    addModelForFolder: fn_addFolder(),

    formNeeds: {
      driver_downloadStatus: {
        desc: "",
        status: "prepare",
        currentSize: 0,
        totalSize: 0,
        errMsg: null,
      },
      dbTypes_loading: false,
      dbVersions_loading: false,
      relatedDrivers_loading: false,
      dbTypes: [],
      dbVersions: [],
      relatedDrivers: [],
      authTypeList: [],
      oracleRoleList: [
        {
          label: "Normal",
          value: "normal",
        },
        {
          label: "SYSDBA",
          value: "SYSDBA",
        },
        {
          label: "SYSOPER",
          value: "SYSOPER",
        },
      ],
      driver_download_uid: null,
    },
    pageData: [],
    pageCount: 0,
    pageInfo: {
      pageIndex: 1,
      pageSize: constants.COMMON_SIZE,
    },
  },
  overlay_addNewConn: {
    ...constants.commonPropsForDialog(),
    title: "Add New Connection",
    open: false,
    confirmIntent: "primary",
    icon: "add-to-artifact",
    confirmText: "Confirm",
  },
  overlay_recentScripts: {
    ...constants.commonPropsForDialog(),
    title: "Recent Scripts",
    open: false,
    confirmIntent: "primary",
    icon: "history",
    confirmText: "Close",
    data: {
      connID: null,
      recentScriptList: [],
    },
  },
  overlay_localAuthUser: {
    ...constants.commonPropsForDialog(),
    title: "Local Service Authentication",
    open: true,
    confirmIntent: "primary",
    icon: "history",
    confirmText: "Close",
    data: {
      connID: null,
      recentScriptList: [],
    },
  },
  overlay_addNewFolder: {
    ...constants.commonPropsForDialog(),
    title: "Add New Folder",
    // open: true,
    confirmIntent: "primary",
    icon: "folder-new",
    confirmText: "Confirm",
  },
  overlay_updateTabInfo: {
    ...constants.commonPropsForDialog(),
    title: "Rename Current Tab",
    // open: true,
    confirmIntent: "primary",
    icon: "history",
    confirmText: "Confirm",
  },
  data: {
    updatingResultSetFlag: 0,
    loadingTree: false,
    formModel: {
      loading: false,
    },
    dataViewIdxWithEditorMapping: {},
    crtErrViewObj: {},
    editorTab: {
      // value: "wlc",
      value: null,
      list: editorTabsArr,
    },
    overviewObj: {
      selectedDatabaseID: 0,
      selectedTableId: 0,
    },
    dataViewTab: {
      value: null,
      list: [],
    },
    connectionList: {
      tree: [],
      connList: [],
      treeSltKeys: {},
      treeExpKeys: {},
    },
    // result-set key: rs-id
    resultSet: {},
    // editor key: editor-id
    data_overviewSet: {},
    overviewDefinition: {
      columnTableData: constants.getResultSetDefinition(),
      reaction_ref: [],
      crtDb: null,
      crtTb: null,
      dbarr: [],
      tbarr: [],
      colarr: [],
      loadingTable: false,
      loadingDatabase: false,
      loadingColumn: false,
    },
  },
};
