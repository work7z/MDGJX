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
import { autorun, observable }  from 'mobx';
import gstore from "../store.jsx";
import LoadingPage from "../routes/loading/index";
import MainPage from "../routes/main/index";
import "../index.less";
import _ from "lodash";

const reqInfo = {
  lastCount: -1,
};

const myapi = {
  cleanAllLatestMessages: async () => {
    await gutils.opt("/channel/clean");
    await gutils.api.msg.readCurrentNotifcation({ reset: true });
  },
  markReadAllLatestMessages: async () => {
    await gutils.opt("/channel/have-it-read");
    await gutils.api.msg.readCurrentNotifcation({ reset: true });
  },
  readCurrentNotifcation: async (config = {}) => {
    const msgPanelDataStore = gstore.msgPanelData;
    msgPanelDataStore.loading = true;
    const msgData = await gutils.opt("/channel/msg-query-by-page", {
      ...msgPanelDataStore,
      idDesc: true,
    });
    msgPanelDataStore.loading = false;
    msgPanelDataStore.pageData = msgData.content.pageData;
    msgPanelDataStore.pageCount = msgData.content.pageCount;
    if (config && config.reset) {
      reqInfo.lastCount = -1;
    }
  },
  runSingleUpdatingMsgCount: async () => {
    let latestNewMsgCount = await gutils.opt("/channel/latest-new-msg-count", {
      lastCount: reqInfo.lastCount,
    });
    let myval = latestNewMsgCount.content.count;
    gstore.sysinfo.latestNewMsgCount = myval;
    reqInfo.lastCount = myval;
  },
  openNotificationPanel: async () => {
    if (gstore.sysinfo.isOpenNotification) {
      gstore.sysinfo.isOpenNotification = false;
    } else {
      gstore.sysinfo.isOpenNotification = true;
      gstore.msgPanelData.pageInfo.pageIndex = 1;
      await gutils.api.msg.readCurrentNotifcation({ reset: true });
      // await gutils.opt("/channel/have-it-read");
      gstore.sysinfo.latestNewMsgCount = 0;
    }
  },
};
export default myapi;
