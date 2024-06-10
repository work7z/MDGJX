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
import auth_obj from "../auth";

const myapi = {
  refreshWorkspaceList: async function () {
    return;
    // try {
    //   if (
    //     _.isNil(
    //       window.getThatPrivateKey(gstore.localSettings.currentWorkspaceId)
    //     ) &&
    //     gstore.localSettings.currentWorkspaceId != "default"
    //   ) {
    //     gstore.localSettings.currentWorkspaceId = "default";
    //   }
    //   // try {
    //   //   await gutils.opt("/ws/verifyRequest");
    //   // } catch (e) {
    //   //   gstore.localSettings.currentWorkspaceId = "default";
    //   //   gstore.localSettings.pre_currentWorkspaceId = "default";
    //   //   gutils.once("only-alert-one", () => {
    //   //     // await gutils.win_alert(
    //   //     //   t(
    //   //     //     `Sorry, it seems that your workspace cannot be able to access due to the unauthorized request, system will redirect you to the default workspace.`
    //   //     //   )
    //   //     // );
    //   //   });
    //   //   return;
    //   // }

    //   let ws_list_res = await gutils.opt("/ws/list");
    //   gstore.preliAllData.configs.workspace_list = ws_list_res.content;
    //   let currentWorkspaceId = gstore.localSettings.currentWorkspaceId;
    //   if (
    //     _.isNil(currentWorkspaceId) ||
    //     _.findIndex(
    //       gstore.preliAllData.configs.workspace_list,
    //       (x) => x.value == currentWorkspaceId
    //     ) == -1
    //   ) {
    //     gstore.localSettings.currentWorkspaceId = "default";
    //     return;
    //   }
    //   gutils.once("initxxxx", () => {
    //     gutils.defer(() => {
    //       let delaynum = 120000;
    //       let okfunc = async () => {
    //         try {
    //           await gutils.optWithNoWin("/ws/gc");
    //         } catch (e) {
    //           // got error
    //           console.log(e);
    //         }
    //         setTimeout(okfunc, delaynum);
    //       };
    //       setTimeout(okfunc, delaynum);
    //     });
    //   });
    // } catch (e) {
    //   gstore.localSettings.currentWorkspaceId = "default";
    //   gstore.localSettings.pre_currentWorkspaceId = "default";
    //   // await gutils.win_alert(
    //   //   t(
    //   //     `Sorry, it seems that your workspace cannot be able to access due to the unauthorized request, system will redirect you to the default workspace.`
    //   //   )
    //   // );
    //   console.log(e);
    //   // gutils.defer(() => {
    //   //   location.reload();
    //   // }, 1000);
    // }
  },
  login: auth_obj.login,
};

export default myapi;
