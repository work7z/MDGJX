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
import ProxyServerApi from "./proxy_server_api.jsx";

const reqInfo = {
  lastCount: -1,
};

const myapi = {
  initConsoleViewData: async () => {
    const viewDetailConsole = gstore.static_view_detail_console;
    viewDetailConsole.loading = true;
    const { id } = viewDetailConsole;
    if (_.isNil(id)) {
      return;
    }
    let configQueryByIdObj = await gutils.opt("/static/config-query-by-page", {
      pageInfo: gstore.staticServerPageData.pageInfo,
      callType: "static-list-with-folder",
      ID: id,
    });
    viewDetailConsole.view_model = _.first(configQueryByIdObj.content.pageData);
    await myapi.initLoggingData({ id, viewDetailConsole });
    viewDetailConsole.loading = false;
  },
  initLoggingData: ProxyServerApi.createInitLoggingData({
    infraType: "st",
    fullType: "static",
  }),
  duplicateItem: async () => {
    delete gstore.staticServerPageData.addModel["ID"];
    gstore.staticServerPageData.addModel["RUN_STATUS"] = 0;
    gstore.staticServerPageData.addModel["NAME"] += "-1";
    await gutils.api.static.confirmModalForAddingItem();
  },
  optMachine: async ({ ID, RUN_STATUS }) => {
    // // console.log("toggle status", ID, RUN_STATUS);
    gstore.staticServerPageData.toggle_status_loading = true;
    let doneFunc = async () => {
      await gutils.api.static.loadAddedList();
      await gutils.api.static.initConsoleViewData();
      gstore.staticServerPageData.toggle_status_loading = false;
    };
    try {
      if (RUN_STATUS == 5) {
        await gutils.opt(
          "/static/interrupt-process",
          {
            ID,
          },
          {
            forceNoModel: true,
          }
        );
      } else {
        let nextOptType = null;
        if (RUN_STATUS == 0) {
          nextOptType = "start";
        } else if (RUN_STATUS == 1) {
          nextOptType = "stop";
        } else if (RUN_STATUS == 2) {
          nextOptType = "restart";
        }
        await gutils.opt(
          "/static/opt-machine",
          {
            ID,
            optType: nextOptType,
          },
          {
            forceNoModel: true,
          }
        );
      }
      await doneFunc();
      await gutils.alertOk({
        message: "Executed",
      });
    } catch (e) {
      await doneFunc();
      throw e;
    }
  },
  deleteItem: async (ID) => {
    await gutils.opt(
      "/static/config-delete",
      {
        ID: gstore.staticServerPageData.addModel["ID"],
      },
      {
        forceNoModel: true,
      }
    );
    await gutils.api.static.loadAddedList();
    gstore.staticOverlay.addItem.open = false;
  },
  openAddingModal: async (alertType, x) => {
    // setup related formModels
    await gutils.api.static.loadFolderList();
    gstore.staticServerPageData.alertType = alertType;
    gstore.staticServerPageData.addModelFailures = {};
    gstore.staticServerPageData.isAddModelPass =
      alertType == "update" ? true : false;
    if (alertType === "update") {
      gstore.staticServerPageData.addModel = gutils.clone(x);
    } else {
      gstore.staticServerPageData.addModel = gutils.clone(
        gstore.staticServerPageData.initModel
      );
    }
    // Confirm text
    gstore.staticOverlay.addItem.confirmText =
      gstore.staticServerPageData.alertType == "create" ? "Create" : "Update";
    gstore.staticOverlay.addItem.title =
      gstore.staticServerPageData.alertType == "create"
        ? "Create New Server"
        : "Update Server Config";
    gstore.staticOverlay.addItem.confirmIntent =
      gstore.staticServerPageData.alertType == "create" ? "primary" : "success";
    // open layer
    let addItem = gstore.staticOverlay.addItem;
    addItem.open = true;
  },
  confirmModalForAddingItem: async () => {
    let overlayObj = gstore.staticOverlay.addItem;
    overlayObj.loading = true;
    try {
      let addModel = gstore.staticServerPageData.addModel;
      await gutils.opt("/static/config-upset", addModel, {
        forceNoModel: true,
      });
      await gutils.api.static.loadAddedList();
      gutils.alertOk({
        message: `The server is ${
          gstore.staticServerPageData.alertType == "create"
            ? "created"
            : "updated"
        } successfully.`,
      });
      if (addModel.RUN_STATUS == 1) {
        if (gstore.staticServerPageData.alertType == "update") {
          gutils.alertOkDirect({
            message:
              "The changes will be applied after the server restart manually",
          });
        }
      }
      overlayObj.open = false;
    } catch (e) {
      throw e;
    } finally {
      overlayObj.loading = false;
    }
  },
  loadFolderList: async () => {
    let folderListRes = await gutils.opt(
      "/static/folder-list",
      {},
      {
        forceNoModel: true,
      }
    );
    gstore.staticServerPageData.formNeeds.groups = _.chain(
      folderListRes.content
    )
      .map((x) => ({
        label: x["NAME"],
        value: x["ID"],
        desc: x["BRIEF"],
      }))
      .value();
    let netCards = await gutils.opt("/system/net-cards");
    gstore.staticServerPageData.formNeeds.netcards = netCards.content;
  },
  loadAddedList: async () => {
    gstore.staticServerPageData.loading = true;
    try {
      gstore.staticServerPageData.pageData = [];
      await gutils.api.static.loadFolderList();
      let pageDataRes = await gutils.opt("/static/config-query-by-page", {
        pageInfo: gstore.staticServerPageData.pageInfo,
        callType: "static-list-with-folder",
      });
      gstore.staticServerPageData.pageData = pageDataRes.content.pageData;
      gstore.staticServerPageData.pageCount = pageDataRes.content.pageCount;
    } catch (err) {
      throw err;
    } finally {
      gstore.staticServerPageData.loading = false;
    }
  },
};
export default myapi;
