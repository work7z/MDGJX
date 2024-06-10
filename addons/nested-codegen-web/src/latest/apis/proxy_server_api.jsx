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

function createInitLoggingData({ infraType, fullType }) {
  let temp_11_func = async (p_arg) => {
    let { viewDetailConsole } = p_arg;
    const id = viewDetailConsole.id;
    let loggingObj = viewDetailConsole.logging;
    const pageInfo = loggingObj.pageInfo;
    try {
      if (!p_arg.need_scroll) {
        loggingObj.loading = true;
      }
      let newSize = parseInt(
        gutils.getSetting("LOGGING_VIEW_RETRIEVE_LINES_NUMBER")
      );
      pageInfo.pageSize = newSize;
      let msgSource = infraType + ".server." + id;
      let featureArgs = () => {
        return {
          loggingTypes: gutils.getSetting("LOGGING_VIEW_SEARCH_LOG_TYPE"),
          MSG_SOURCE: msgSource,
          callType: "logging-query",
        };
      };
      let res = await gutils.opt("/infra/logging-query-by-page", {
        pageInfo: {
          pageIndex: pageInfo.pageIndex,
          pageSize: newSize,
        },
        ...featureArgs(),
      });
      viewDetailConsole.logging.pageData = res.content.pageData;
      viewDetailConsole.logging.pageCount = res.content.pageCount;
      loggingObj.loading = false;
      if (p_arg.need_scroll) {
        gutils.defer(() => {
          viewDetailConsole.logging.scrollBottom = true;
          // $(".logging-content-panel").scrollTo(null,$(".logging-content-panel").scrollHeight)
        });
      }
      let onceKey = "stat-for" + msgSource;
      let crtIDValue = viewDetailConsole.id;
      gutils.once(onceKey, async () => {
        let reqLastInfo = {
          ctn: res.content.pageCount,
        };
        do {
          let otherCheckFunc = () => {
            return (
              crtIDValue + "" !=
              gstore[fullType + "_view_detail_console"].id + ""
            );
          };
          let needRealtime = gutils.getSetting("LOGGING_VIEW_REALTIME_LOAD");
          if (needRealtime != "true" || otherCheckFunc()) {
            break;
          }
          try {
            let resLogs = await gutils.opt("/infra/waiting-for-logs", {
              MSG_SOURCE: msgSource,
              SIZE: parseInt(
                gutils.getSetting("LOGGING_VIEW_RETRIEVE_LINES_NUMBER")
              ),
              CTN: reqLastInfo.ctn,
              featureArgs: {
                ...featureArgs(),
              },
            });
            needRealtime = gutils.getSetting("LOGGING_VIEW_REALTIME_LOAD");
            if (needRealtime != "true" || otherCheckFunc()) {
              break;
            }
            pageInfo.pageSize = resLogs.content.pageSize;
            pageInfo.pageIndex = resLogs.content.pageIndex;
            reqLastInfo.ctn = resLogs.content.pageCount;
            await temp_11_func({
              ...p_arg,
              need_scroll: true,
            });
            await gutils.sleep(500);
          } catch (err) {
            // // console.log("got err when realtime", err);
            await gutils.sleep(5000);
          }
        } while (true);
        gutils.removeOnce(onceKey);
      });
    } catch (err) {
      loggingObj.loading = false;
      throw err;
    }
  };
  return temp_11_func;
}

const myapi = {
  createInitLoggingData,
  openAddRulePanel: (type = "create", x, afterConfirmGetValFunc) => {
    gutils.reInitAllDataBeforeOpenModal(
      gstore.proxyServerPageDataForRule,
      type,
      x
    );
    gstore.proxyOverlay.addRule.open = true;
    gstore.proxyServerPageDataForRule.afterConfirmFunc = afterConfirmGetValFunc;
    let isUpt = type == "update";
    gstore.proxyOverlay.addRule.title =
      (isUpt ? "Update" : "Create New") + " Rule";
    gstore.proxyOverlay.addRule.confirmText = isUpt ? "Update" : "Create";
    gstore.proxyOverlay.addRule.confirmIntent = isUpt ? "success" : "primary";
  },
  confirmModalForAddingItemRule: async () => {
    // //debugger;
    let overlayObj = gstore.proxyOverlay.addRule;
    overlayObj.loading = true;
    try {
      const myobj = gstore.proxyServerPageDataForRule;
      let addModel = myobj.addModel;
      const crtRulesRewriteArr =
        gstore.proxyServerPageData.addModel["EXTRA_DATA_PROXY_RULES"] || [];
      if (myobj.afterConfirmFunc) {
        myobj.afterConfirmFunc(gutils.clone(addModel));
      } else {
        crtRulesRewriteArr.push(gutils.clone(addModel));
        gstore.proxyServerPageData.addModel["EXTRA_DATA_PROXY_RULES"] =
          crtRulesRewriteArr;
      }
      gutils.defer(() => {
        gstore.proxyServerPageData.addModel = {
          ...gstore.proxyServerPageData.addModel,
        };
      });
      _.invoke(gutils.wakeobj, "server.EXTRA_DATA_PROXY_RULES");
      overlayObj.open = false;
    } catch (e) {
      throw e;
    } finally {
      overlayObj.loading = false;
    }
  },
  openAddRulePathRewritePanel: (type = "create", x, afterConfirmGetValFunc) => {
    gutils.reInitAllDataBeforeOpenModal(
      gstore.proxyServerPageDataForPathRewrite,
      type,
      x
    );
    gstore.proxyOverlay.addRulePathRewrite.open = true;
    gstore.proxyServerPageDataForPathRewrite.afterConfirmFunc =
      afterConfirmGetValFunc;
    let isUpt = type == "update";
    gstore.proxyOverlay.addRulePathRewrite.title =
      (isUpt ? "Update" : "Create") + " Path Rewrite Rule";
    gstore.proxyOverlay.addRulePathRewrite.confirmText = isUpt
      ? "Update"
      : "Create";
    gstore.proxyOverlay.addRulePathRewrite.confirmIntent = isUpt
      ? "success"
      : "primary";
  },
  confirmModalForAddingItemPathRewrite: async () => {
    // //debugger;
    let overlayObj = gstore.proxyOverlay.addRulePathRewrite;
    overlayObj.loading = true;
    try {
      let addModel = gstore.proxyServerPageDataForPathRewrite.addModel;
      const crtRulesRewriteArr =
        gstore.proxyServerPageDataForRule.addModel[
          "EXTRA_DATA_PROXY_RULES_PATH_REWRITE"
        ] || [];
      if (gstore.proxyServerPageDataForPathRewrite.afterConfirmFunc) {
        gstore.proxyServerPageDataForPathRewrite.afterConfirmFunc(
          gutils.clone(addModel)
        );
      } else {
        crtRulesRewriteArr.push(gutils.clone(addModel));
        gstore.proxyServerPageDataForRule.addModel[
          "EXTRA_DATA_PROXY_RULES_PATH_REWRITE"
        ] = crtRulesRewriteArr;
        gstore.proxyServerPageDataForRule.addModel = {
          ...gstore.proxyServerPageDataForRule.addModel,
        };
      }
      _.invoke(gutils.wakeobj, "rule.EXTRA_DATA_PROXY_RULES_PATH_REWRITE");
      overlayObj.open = false;
    } catch (e) {
      throw e;
    } finally {
      overlayObj.loading = false;
    }
  },
  initConsoleViewData: async () => {
    const viewDetailConsole = gstore.proxy_view_detail_console;
    viewDetailConsole.loading = true;
    const { id } = viewDetailConsole;
    if (_.isNil(id)) {
      return;
    }
    let configQueryByIdObj = await gutils.opt("/proxy/config-query-by-page", {
      pageInfo: gstore.proxyServerPageData.pageInfo,
      callType: "proxy-list-with-folder",
      ID: id,
    });
    let fin_view_model = _.first(configQueryByIdObj.content.pageData);
    viewDetailConsole.view_model = fin_view_model;
    if (!_.isEmpty(fin_view_model)) {
      await gutils.api.proxy.openAddingModal("update", fin_view_model, false);
    }
    await myapi.initLoggingData({ id, viewDetailConsole });
    viewDetailConsole.loading = false;
  },
  initLoggingData: createInitLoggingData({
    infraType: "px",
    fullType: "proxy",
  }),
  duplicateItem: async () => {
    gstore.proxyServerPageData.addModel = gutils.delete_nouse_id_before_clean(
      gstore.proxyServerPageData.addModel
    );

    gstore.proxyServerPageData.addModel["RUN_STATUS"] = 0;
    gstore.proxyServerPageData.addModel["NAME"] += "-1";
    await gutils.api.proxy.confirmModalForAddingItem();
  },
  optMachine: async ({ ID, RUN_STATUS }) => {
    // // console.log("toggle status", ID, RUN_STATUS);
    gstore.proxyServerPageData.toggle_status_loading = true;
    let doneFunc = async () => {
      await gutils.api.proxy.loadAddedList();
      await gutils.api.proxy.initConsoleViewData();
      gstore.proxyServerPageData.toggle_status_loading = false;
    };
    try {
      if (RUN_STATUS == 5) {
        await gutils.opt("/proxy/interrupt-process", {
          ID,
        });
      } else {
        let nextOptType = null;
        if (RUN_STATUS == 0) {
          nextOptType = "start";
        } else if (RUN_STATUS == 1) {
          nextOptType = "stop";
        } else if (RUN_STATUS == 2) {
          nextOptType = "restart";
        }
        await gutils.opt("/proxy/opt-machine", {
          ID,
          optType: nextOptType,
        });
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
    await gutils.opt("/proxy/config-delete", {
      ID: gstore.proxyServerPageData.addModel["ID"],
    });
    await gutils.api.proxy.loadAddedList();
    gstore.proxyOverlay.addItem.open = false;
  },
  openAddingModal: async (alertType, x, mustOpen = true) => {
    // setup related formModels
    await gutils.api.proxy.loadFolderList();

    gutils.reInitAllDataBeforeOpenModal(
      gstore.proxyServerPageData,
      alertType,
      x
    );

    // Confirm text
    gstore.proxyOverlay.addItem.confirmText =
      gstore.proxyServerPageData.alertType == "create" ? "Create" : "Update";
    gstore.proxyOverlay.addItem.title =
      gstore.proxyServerPageData.alertType == "create"
        ? "Create New Server"
        : "Update Server Config";
    gstore.proxyOverlay.addItem.confirmIntent =
      gstore.proxyServerPageData.alertType == "create" ? "primary" : "success";
    // open layer
    let addItem = gstore.proxyOverlay.addItem;
    if (mustOpen) {
      addItem.open = true;
    }
  },

  confirmModalForAddingItem: async () => {
    let overlayObj = gstore.proxyOverlay.addItem;
    overlayObj.loading = true;
    try {
      let addModel = gstore.proxyServerPageData.addModel;
      await gutils.opt("/proxy/config-upset", addModel);
      await gutils.api.proxy.loadAddedList();
      gutils.alertOk({
        message: `The server is ${
          gstore.proxyServerPageData.alertType == "create"
            ? "created"
            : "updated"
        } successfully.`,
      });
      if (addModel.RUN_STATUS == 1) {
        if (gstore.proxyServerPageData.alertType == "update") {
          gutils.alertOk({
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
    let folderListRes = await gutils.opt("/proxy/folder-list");
    gstore.proxyServerPageData.formNeeds.groups = _.chain(folderListRes.content)
      .map((x) => ({
        label: x["NAME"],
        value: x["ID"],
        desc: x["BRIEF"],
      }))
      .value();
    let netCards = await gutils.opt("/system/net-cards");
    gstore.proxyServerPageData.formNeeds.netcards = netCards.content;
  },
  loadAddedList: async () => {
    gstore.proxyServerPageData.loading = true;
    try {
      gstore.proxyServerPageData.pageData = [];
      await gutils.api.proxy.loadFolderList();
      let pageDataRes = await gutils.opt("/proxy/config-query-by-page", {
        pageInfo: gstore.proxyServerPageData.pageInfo,
        callType: "proxy-list-with-folder",
      });
      gstore.proxyServerPageData.pageData = pageDataRes.content.pageData;
      gstore.proxyServerPageData.pageCount = pageDataRes.content.pageCount;
    } catch (err) {
      throw err;
    } finally {
      gstore.proxyServerPageData.loading = false;
    }
  },
};
export default myapi;
