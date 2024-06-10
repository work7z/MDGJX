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
import {autorun, observable, reaction}  from 'mobx'
import gstore from "../store.jsx";
import LoadingPage from "../routes/loading/index";
import MainPage from "../routes/main/index";
import "../index.less";
import _ from "lodash";
import constants from "../constants";

// // console.log("got the func for gutils", gutils);

function getOverviewDefinition() {
  return {};
}
function rollbackRef(e) {
  if (e && e.reaction_ref) {
    _.forEach(e.reaction_ref, (x) => x());
  }
}

let { getResultSetDefinition } = constants;

let readMoreDataRefSourceObj = {};

const myapi = {
  syncTest: async (x) => {
    gutils.syncFunc("slp", async () => {
      // console.log("start this job for " + x);
      await gutils.sleep(1000);
      // console.log("finish this job for " + x);
    });
  },
  readMoreData: async function ({ saveRsId }) {
    let crtRS_Id = parseInt(saveRsId.replace("rs-", ""));
    if (readMoreDataRefSourceObj[crtRS_Id]) {
      console.log("RMD reject more data");
      return;
    }
    let myrs = gstore.databaseAllData.data.resultSet[saveRsId];
    let crtFetchedSize = _.size(myrs.res.dataList);
    if (crtFetchedSize == 0 || myrs.extra.viewNoMore) {
      return;
    }
    myrs.extra.viewMoreLoading = true;
    readMoreDataRefSourceObj[crtRS_Id] = () => {
      // temp init func
      console.log("temp init func");
    };
    console.log("RMD handling read more data action", saveRsId);
    try {
      let readMoreDataRes = await gutils.opt(
        "/dblink/fetch-more-data",
        {
          RS_ID: crtRS_Id,
          CRT_END_INDEX: crtFetchedSize,
        },
        {
          ref(e) {
            readMoreDataRefSourceObj[crtRS_Id] = () => {
              e.cancel();
            };
          },
        }
      );
      console.log("RMD fetched data", readMoreDataRes.content);
      if (_.isEmpty(readMoreDataRes.content)) {
        myrs.extra.viewNoMore = true;
      } else {
        myrs.res.dataList.push(...readMoreDataRes.content);
      }
      myrs.extra.viewMoreLoading = false;
      delete readMoreDataRefSourceObj[crtRS_Id];
      console.log("RMD finished data action");
    } catch (err) {
      myrs.extra.viewMoreLoading = false;
      delete readMoreDataRefSourceObj[crtRS_Id];
      console.log("RMD finished data action, but has err");
      throw err;
    }
  },
  startWorkingForCurrentEditor: async function ({
    ackType,
    crtSQL,
    EDITOR_ID,
  }) {
    // console.log("start working", ackType, crtSQL, EDITOR_ID);
    let dbdata = gstore.databaseAllData.data;
    const { databaseAllData } = gstore;
    const fn_dataViewTab = () => gstore.databaseAllData.data.dataViewTab.list;
    let fn_getFinalResultSet = () => {
      return _.chain(fn_dataViewTab())
        .filter((x) => {
          if (x.type == "overview") {
            return false;
          }
          // only can use one connection
          return (
            gstore.databaseAllData.data.resultSet[x.id].extra.loading != true
          );
        })
        .first()
        .value();
    };
    let finalSearchingTheLists = fn_getFinalResultSet();
    let pre_rs_id = null;
    if (_.isNil(finalSearchingTheLists)) {
      let ttres = await gutils.optWithThrowErr("/dblink/result-set-new", {
        EDITOR_ID: EDITOR_ID,
      });
      pre_rs_id = "rs-" + ttres.content["ID"];
      // TODO: here need to use the latest one
      await myapi.refreshResultSetAndDbTbList("e-" + EDITOR_ID);
      finalSearchingTheLists = _.chain(fn_dataViewTab())
        .find((x) => x.id == pre_rs_id)
        .value();
    }
    await myapi.refreshAll();
    let saveRsId = finalSearchingTheLists.id;
    databaseAllData.data.dataViewTab.value = saveRsId;
    const crtTabObj = _.find(fn_dataViewTab(), (x) => {
      return x.id == saveRsId;
    });
    const crtTabMeta = crtTabObj.meta;
    // start querying the SQL
    let myrs = gstore.databaseAllData.data.resultSet[saveRsId];
    // myrs.res = myrs.fn_res();
    // myrs.req = myrs.fn_req();
    myrs.extra = myrs.fn_extra();
    myrs.extra.loading = true;
    myrs.extra.viewNoMore = false;
    myrs.extra.viewMoreLoading = false;
    try {
      myrs.extra.errmsgForQuery = null;
      let crtRS_Id = parseInt(saveRsId.replace("rs-", ""));
      if (readMoreDataRefSourceObj[crtRS_Id]) {
        readMoreDataRefSourceObj[crtRS_Id]();
        delete readMoreDataRefSourceObj[crtRS_Id];
      }
      let mockDataRes = await gutils.opt(
        "/dblink/conn-user-" + ackType,
        {
          SQL: crtSQL,
          PARAM: {
            ...gstore.databaseAllData.data.resultSet[saveRsId].req,
          },
          RS_ID: crtRS_Id,
          ID: crtTabMeta.CONN_ID,
          OFFSET: 0,
          EDITOR_ID: crtTabMeta.EDITOR_ID,
        },
        {
          forceNoModel: true,
        }
      );
      const mockData = mockDataRes.content;
      console.log(
        "cpt saving data for id " + saveRsId,
        _.size(mockData.dataList),
        mockData,
        myrs
      );
      let dataListSize = _.size(mockData.dataList);
      if (dataListSize < myapi.getOneBatchReadNum()) {
        myrs.extra.viewNoMore = true;
      }
      // //debugger;
      myrs.res.dataList = mockData.dataList;
      myrs.res.spendMS = mockData.optTimeMiles;
      myrs.res.columnIndexArr = mockData.columnIndexArr;
      myrs.extra.loading = false;
      await this.refreshAll();
    } catch (e) {
      console.log(e);
      debugger;
      // debugger;
      myrs.extra.errmsgForQuery = _.get(
        e,
        "data.message",
        _.toString(gutils.getErrMsg(e))
      );
      myrs.extra.loading = false;
      throw e;
    }
  },
  loadMockDataForVisualTable: async function () {},
  getActiveEditorMeta() {
    const obj = _.find(
      gstore.databaseAllData.data.editorTab.list,
      (x) => x.id == gstore.databaseAllData.data.editorTab.value
    );
    return obj.meta;
  },
  getOneBatchReadNum() {
    return parseInt(gutils.getSetting("DATASOURCE_LOADED_NUM"));
  },
  closeDataTab: async function (node) {
    // // console.log("closing node id", node);
    let myID = parseInt(node.key.replace("rs-", ""));
    await gutils.optWithThrowErr("/dblink/result-set-close", {
      RS_ID: myID,
      helpCatch: true,
    });
    delete gstore.databaseAllData.data.resultSet[node.key];
    rollbackRef(
      gstore.databaseAllData.data.data_overviewSet[myapi.getCrtEditorId()]
    );
    delete gstore.databaseAllData.data.data_overviewSet[myapi.getCrtEditorId()];
    await myapi.refreshAll();
  },
  getCrtEditorId() {
    return (gstore.databaseAllData.data.editorTab.value || "").replaceAll(
      "e-",
      ""
    );
  },
  closeAllDataTab: async function () {
    await gutils.optWithThrowErr("/dblink/result-set-all-close", {
      EDITOR_ID: parseInt(
        (gstore.databaseAllData.data.editorTab.value || "").replaceAll("e-", "")
      ),
    });
    gstore.databaseAllData.data.resultSet = {};
    _.forEach(gstore.databaseAllData.data.data_overviewSet, (x, d, n) => {
      rollbackRef(x);
    });
    gstore.databaseAllData.data.data_overviewSet = {};
    await myapi.refreshAll();
  },
  closeEditor: async function (node) {
    // // console.log("closing node id", node);
    let editorID = parseInt(node.key.replace("e-", ""));
    await gutils.optWithThrowErr("/dblink/editor-close", {
      EDITOR_ID: editorID,
      helpCatch: true,
    });
    await myapi.refreshAll();
  },
  closeAllEditor: async function () {
    await gutils.optWithThrowErr("/dblink/editor-all-close");
    await myapi.refreshAll();
  },
  getAllRelatedEditorsByConnID(connID) {
    const allEditorTab = _.map(
      _.find(
        gstore.databaseAllData.data.editorTab.list,
        (x) => x.meta.CONN_ID == connID
      ),
      (x) => {
        return x.meta;
      }
    );
    return allEditorTab;
  },
  connectAllConnByNodeId: async function (connID) {
    myapi.markLoadingStatus(connID, true);
    try {
      await myapi.refreshAll();
      // let allRelatedEditors = myapi.getAllRelatedEditorsByConnID(connID);
      // if (_.isEmpty(allRelatedEditors)) {
      //   // TODO: here need to add the logic about showing the label CONNECTTING...
      //   // await myapi.openNewEditor(connID);
      //   await myapi.refreshAll();
      //   allRelatedEditors = myapi.getAllRelatedEditorsByConnID(connID);
      // }
      await gutils.optWithThrowErr("/dblink/conn-user-connect-all-by-conn-id", {
        ID: connID,
      });
      myapi.markLoadingStatus(connID, false);
      await myapi.refreshAll();
    } catch (e) {
      myapi.markLoadingStatus(connID, false);
      throw e;
    }
  },
  destroyAllConnByNodeId: async function (connID, node) {
    try {
      myapi.markLoadingStatus(connID, true);
      await gutils.optWithThrowErr(
        "/dblink/conn-user-disconnect-all-by-conn-id",
        {
          ID: connID,
        }
      );
      await myapi.refreshAll();
      myapi.markLoadingStatus(connID, false);
    } catch (e) {
      myapi.markLoadingStatus(connID, false);
      throw e;
    }
  },
  markLoadingStatus(connID, loadValue) {
    let findobj = myapi.getFindObj(connID);
    findobj.isLoading = loadValue;
    gstore.databaseAllData.data.connectionList.tree = [
      ...gstore.databaseAllData.data.connectionList.tree,
    ];
  },
  getFindObj(connID) {
    let findObj = null;
    gutils.iterateTree(myapi.getTree(), (node) => {
      if (node.meta.ID == connID) {
        findObj = node;
      }
    });
    return findObj;
  },
  reConnectionAllConnByNodeId: async function (connID) {
    try {
      myapi.markLoadingStatus(connID, true);
      await myapi.destroyAllConnByNodeId(connID);
      await myapi.connectAllConnByNodeId(connID);
      await myapi.refreshAll();
      myapi.markLoadingStatus(connID, false);
    } catch (e) {
      myapi.markLoadingStatus(connID, false);
      throw e;
    }
  },
  refreshAll: async function () {
    await myapi.refresh();
    await myapi.loadEditor();
    await myapi.refreshResultSetAndDbTbList(
      gstore.databaseAllData.data.editorTab.value
    );
  },
  openNewEditor: async function (connID) {
    let findObj = null;
    try {
      gutils.iterateTree(myapi.getTree(), (node) => {
        if (node.meta.ID == connID) {
          findObj = node;
        }
      });
      if (_.isNil(findObj)) {
        throw new Error("no such ID as " + connID);
      }
      findObj.isLoading = true;
      gstore.databaseAllData.data.connectionList.tree = [
        ...gstore.databaseAllData.data.connectionList.tree,
      ];
      let newEditorRes = await gutils.optWithThrowErr("/dblink/editor-new", {
        ID: connID,
      });
      await gutils.optWithThrowErr("/dblink/conn-connect", {
        ID: connID,
      });
      let { EDITOR_ID } = newEditorRes.content;
      // // console.log("newEditorRes", newEditorRes);
      await myapi.loadEditor();
      const editorTab = gstore.databaseAllData.data.editorTab;
      editorTab.value = "e-" + EDITOR_ID;
      if (findObj) {
        findObj.isLoading = false;
        gstore.databaseAllData.data.connectionList.tree = [
          ...gstore.databaseAllData.data.connectionList.tree,
        ];
      }
      await myapi.refreshAll();
    } catch (err) {
      if (findObj) {
        findObj.isLoading = false;
        gstore.databaseAllData.data.connectionList.tree = [
          ...gstore.databaseAllData.data.connectionList.tree,
        ];
      }
      gutils.w_handleError(err);
    }
  },
  resumePreviousEditorById: async function ({ editorId, connId }) {
    //     editorId,connId
    let findPreviousIdx = _.findIndex(
      gstore.databaseAllData.data.editorTab.list,
      (x) => x.meta.ID == editorId
    );
    console.log(
      "resume editorId and connId",
      editorId,
      connId,
      findPreviousIdx
    );
    if (findPreviousIdx != -1) {
      gstore.databaseAllData.data.editorTab.value = "e-" + editorId;
    } else {
      await gutils.opt("/dblink/markUncloseForEditor", {
        editorId: editorId,
      });
      await myapi.refreshAll();
      gstore.databaseAllData.data.editorTab.value = "e-" + editorId;
    }
    gstore.databaseAllData.overlay_recentScripts.open = false;
  },
  refreshResultSetAndDbTbList: async function (editorTabIdx) {
    const { databaseAllData } = gstore;
    if (!_.isNil(editorTabIdx)) {
      const editorId = parseInt(editorTabIdx.split("-")[1]);
      // console.log("got editor tab change", editorTabIdx);
      // gutils.api.dblink.loadMockDataForVisualTable();
      function getResultListFunc() {
        return gutils.optWithThrowErr("/dblink/result-set-list", {
          EDITOR_ID: editorId,
        });
      }
      let resultSetsArrRes = await getResultListFunc();
      let crtResultSetList = resultSetsArrRes.content;

      // console.log("final crt result set", crtResultSetList);

      const newTabList = [
        {
          label: t("Overview"),
          id: "overview",
          closable: false,
          type: "overview",
        },
        ..._.map(crtResultSetList, (x, d, n) => {
          let tabid = "rs-" + x["ID"];
          const resultSet = gstore.databaseAllData.data.resultSet;
          if (_.isNil(resultSet[tabid])) {
            const mynewResultObj = getResultSetDefinition();
            resultSet[tabid] = mynewResultObj;
          }
          return {
            meta: x,
            id: tabid,
            type: "dataview",
            label: `ResultSet-${x["CRT_RS_ORDER"]}`,
          };
        }),
      ];

      databaseAllData.data.dataViewTab.list = newTabList;
      let preChgValue =
        databaseAllData.data.dataViewIdxWithEditorMapping[editorTabIdx];
      if (!_.isNil(preChgValue)) {
        databaseAllData.data.dataViewTab.value = preChgValue;
      }
      if (
        _.findIndex(
          newTabList,
          (x) =>
            x.id == databaseAllData.data.dataViewTab.value ||
            x.id == preChgValue
        ) == -1
      ) {
        databaseAllData.data.dataViewTab.value = _.last(newTabList).id;
      }
      // the loading logic need to be placed inside component
      if (gstore.databaseAllData.data.data_overviewSet[editorTabIdx]) {
        rollbackRef(gstore.databaseAllData.data.data_overviewSet[editorTabIdx]);
      }
      gstore.databaseAllData.data.data_overviewSet[editorTabIdx] =
        getOverviewDefinition();
      gutils.once("overview-logic", () => {
        let data_overviewSet =
          gstore.databaseAllData.data.data_overviewSet[editorTabIdx];
        if (_.isEmpty(data_overviewSet)) {
          return;
        }
        this.refreshDatabaseAndRelatedTable({
          editorId,
          data_overviewSet,
        });
      });
    }
  },
  refreshDatabaseAndRelatedTable: async function ({
    editorId,
    data_overviewSet,
  }) {
    // data_overviewSet
    // let all_react_ref_arr = [
    //   reaction(
    //     () => {
    //       return data_overviewSet.crtDb;
    //     },
    //     () => {}
    //   ),
    //   reaction(
    //     () => {
    //       return data_overviewSet.crtTb;
    //     },
    //     () => {}
    //   ),
    // ];
    // data_overviewSet.reaction_ref.push(...all_react_ref_arr);
  },
  loadBySystemQuery: async function ({ editorId, RUN_TYPE, other_args = {} }) {
    let showDatabaseRes = await gutils.opt(
      "/dblink/conn-editor-id-system-query",
      {
        EDITOR_ID: parseInt(("" + editorId).replace("e-", "")),
        RUN_TYPE: RUN_TYPE,
        ...other_args,
      }
    );
    console.log("DTO showDatabaseRes", showDatabaseRes.content);
    return showDatabaseRes.content;
  },
  loadAllDatabaseAllEditorId: async function ({ editorId }) {
    let myres = await myapi.loadBySystemQuery({
      editorId,
      RUN_TYPE: "show-databases",
    });
    return myres;
  },
  loadAllTablesByEditorIdAndDatabaseName: async function ({
    editorId,
    DBNAME,
  }) {
    let myres = await myapi.loadBySystemQuery({
      editorId,
      RUN_TYPE: "show-tables",
      other_args: {
        DBNAME,
      },
    });
    return myres;
  },
  loadAllColumnByEditorIdDbNameTbName: async function ({
    editorId,
    DBNAME,
    TBNAME,
  }) {
    let myres = await myapi.loadBySystemQuery({
      editorId,
      RUN_TYPE: "show-columns",
      other_args: {
        DBNAME,
        TBNAME,
      },
    });
    return myres;
  },
  loadEditor: async function () {
    const databaseAllData = gstore.databaseAllData;
    gutils.once("init_auto_load_wlc", () => {
      // llinit
      // init result set
      reaction(
        () => [databaseAllData.data.editorTab.value],
        async function (chgValue) {
          const [editorTabIdx] = chgValue;
          await myapi.refreshResultSetAndDbTbList(editorTabIdx);
          gutils.callWhenResize();
        }
      );
      reaction(
        () => {
          return {
            dataViewVal: databaseAllData.data.dataViewTab.value,
          };
        },
        (mobj) => {
          let editorVal = databaseAllData.data.editorTab.value;
          if (!_.isNil(editorVal)) {
            databaseAllData.data.dataViewIdxWithEditorMapping[editorVal] =
              mobj.dataViewVal;
          }
        }
      );
      // init overview logic
      (() => {
        // let editorId = props.editorId;
        let overviewDefinition = gstore.databaseAllData.data.overviewDefinition;

        let onCrtDb = (val) => {
          overviewDefinition.crtDb = val;
        };
        let onCrtTb = (val) => {
          overviewDefinition.crtTb = val;
          if (_.isNil(val)) {
            // gstore.databaseAllData.data.overviewDefinition.res =
            //   gstore.databaseAllData.data.overviewDefinition.fn_res();
          }
        };
        let onDbArr = (val) => {
          overviewDefinition.dbarr = val;
        };
        let onTbArr = (val) => {
          overviewDefinition.tbarr = val;
        };
        let onColArr = (val) => {
          overviewDefinition.colarr = val;
        };
        let onLoadingTable = (val) => {
          overviewDefinition.loadingTable = val;
        };
        let onLoadingDatabase = (val) => {
          overviewDefinition.loadingDatabase = val;
        };
        let onLoadingColumn = (val) => {
          overviewDefinition.loadingColumn = val;
        };
        let getEditorId = () => {
          return gstore.databaseAllData.data.editorTab.value;
        };

        let fn_refreshDatabaseList = async () => {
          let {
            crtDb,
            crtTb,
            dbarr,
            tbarr,
            colarr,
            loadingTable,
            loadingDatabase,
            loadingColumn,
          } = overviewDefinition;

          onLoadingTable(true);
          onLoadingDatabase(true);
          onDbArr([]);
          onTbArr([]);
          onCrtDb(null);
          onCrtTb(null);
          try {
            let myres = await gutils.api.dblink.loadAllDatabaseAllEditorId({
              editorId: getEditorId(),
            });
            console.log("DTO myres", myres);
            let mydbarr = _.chain(myres)
              .get("dataList")
              .map((x) => {
                return _.chain(x).get("DBNAME.value").value();
              })
              .map((x) => {
                return {
                  label: x,
                  value: x,
                };
              })
              .value();
            onDbArr(mydbarr);
            if (!_.isEmpty(mydbarr)) {
              onCrtDb(_.get(mydbarr, "0.value"));
            }
            onLoadingTable(false);
            onLoadingDatabase(false);
          } catch (err) {
            onLoadingTable(false);
            onLoadingDatabase(false);
            throw err;
          }
        };

        let fn_refreshTableList = async () => {
          let {
            crtDb,
            crtTb,
            dbarr,
            tbarr,
            colarr,
            loadingTable,
            loadingDatabase,
            loadingColumn,
          } = overviewDefinition;
          if (_.isNil(crtDb)) {
            return;
          }
          onTbArr([]);
          onCrtTb(null);
          onLoadingTable(true);
          try {
            let myres =
              await gutils.api.dblink.loadAllTablesByEditorIdAndDatabaseName({
                editorId: getEditorId(),
                DBNAME: crtDb,
              });
            console.log("DTO myres", myres);
            let mydbarr = _.chain(myres)
              .get("dataList")
              .map((x) => {
                return _.chain(x).get("TBNAME.value").value();
              })
              .map((x) => {
                return {
                  label: x,
                  value: x,
                };
              })
              .value();
            onTbArr(mydbarr);
            if (!_.isEmpty(mydbarr)) {
              onCrtTb(_.get(mydbarr, "0.value"));
            }
            onLoadingTable(false);
          } catch (err) {
            onLoadingTable(false);
            throw err;
          }
        };

        let fn_refreshColumnList = async () => {
          let {
            crtDb,
            crtTb,
            dbarr,
            tbarr,
            colarr,
            loadingTable,
            loadingDatabase,
            loadingColumn,
          } = overviewDefinition;
          if (_.isNil(crtTb)) {
            return;
          }
          onColArr([]);
          onLoadingColumn(true);
          try {
            let myres =
              await gutils.api.dblink.loadAllColumnByEditorIdDbNameTbName({
                editorId: getEditorId(),
                DBNAME: crtDb,
                TBNAME: crtTb,
              });
            console.log("DTO myres", myres);
            let thatctn = myres;
            let columnTableData = overviewDefinition.columnTableData;
            columnTableData.extra = columnTableData.fn_extra();
            columnTableData.res.dataList = thatctn.dataList;
            columnTableData.res.columnIndexArr = thatctn.columnIndexArr;
            columnTableData.res.spendMS = thatctn.optTimeMiles;
            onLoadingColumn(false);
          } catch (err) {
            onLoadingColumn(false);
            throw err;
          }
        };
        myapi.fn_refreshDatabaseList = fn_refreshDatabaseList;
        myapi.fn_refreshTableList = fn_refreshTableList;
        myapi.fn_refreshColumnList = fn_refreshColumnList;

        reaction(
          () => {
            return overviewDefinition.crtDb;
          },
          () => {
            fn_refreshTableList();
          }
        );
        reaction(
          () => {
            return overviewDefinition.crtTb;
          },
          () => {
            fn_refreshColumnList();
          }
        );
        reaction(
          () => {
            return myapi.getCrtEditorId();
          },
          () => {
            fn_refreshDatabaseList();
          }
        );
        if (!_.isNil(getEditorId())) {
          fn_refreshDatabaseList();
        }
      })();
    });
    let editorListRes = await gutils.opt("/dblink/editor-list");
    let editorList = editorListRes.content;
    if (_.isEmpty(editorList)) {
      gstore.databaseAllData.data.editorTab.list = [];
      return;
    } else {
      gstore.databaseAllData.data.editorTab.list = _.map(
        editorList,
        (x, d, n) => {
          return {
            label: x["EDITOR_NAME"],
            id: "e-" + x["ID"],
            type: "editor",
            meta: x,
            system: 0,
            unsave: false,
            closable: true,
          };
        }
      );
      if (
        "overview" == databaseAllData.data.editorTab.value ||
        _.isNil(databaseAllData.data.editorTab.value)
      ) {
        databaseAllData.data.editorTab.value = _.get(
          databaseAllData.data.editorTab.list,
          "0.id"
        );
      }
    }
  },
  queryAndCreateResult() {
    // init if not exists
    // if (_.isEmpty(crtResultSetList)) {
    //   await gutils.optWithThrowErr(
    //     "/dblink/result-set-new",
    //     {
    //       EDITOR_ID: editorId,
    //     },
    //     {
    //       ref(e) {
    //         cancelRefForInitRs.push(() => {
    //           e.cancel();
    //         });
    //       },
    //     }
    //   );
    //   resultSetsArrRes = await getResultListFunc();
    //   crtResultSetList = resultSetsArrRes.content;
    // }
  },
  startQueryForCurrentEditor: async function ({ EDITOR_ID, crtSQL, ackType }) {
    // console.log("start querying", EDITOR_ID, crtSQL, ackType);
  },
  loadConnTree: async function () {
    const databaseAllData = gstore.databaseAllData;
    try {
      databaseAllData.data.loadingTree = true;
      const data = databaseAllData.data;
      // const tree = data.connectionList.tree;
      // debugger;
      const connListRes = await gutils.opt("/dblink/conn-list");
      const rootRawTree = [connListRes.content];
      let allConnList = [];
      function makeFormatting(rootRawTree) {
        const crtLayerArr = [];
        _.forEach(rootRawTree, (x, d, n) => {
          _.forEach(x.EXTRA_DATA_SUB_FOLDER, (xx, dd, nn) => {
            crtLayerArr.push({
              title: xx["FOLDER_NAME"],
              key: "f-" + xx["ID"],
              isLoading: false,
              expanded: false,
              selected: false,
              isConnect: xx["IS_CONNECTION"] == 1,
              meta: {
                ...xx,
                EXTRA_DATA_CONN: [],
                EXTRA_DATA_SUB_FOLDER: [],
              },
              isLeaf: false,
              children: makeFormatting([xx]),
            });
          });
          _.forEach(x.EXTRA_DATA_CONN, (xx, dd, nn) => {
            let myobj = {
              title: xx["CONNECTION_NAME"],
              key: "c-" + xx["ID"],
              id: xx["ID"],
              expanded: false,
              selected: false,
              isConnect: xx["IS_CONNECTION"] == 1,
              meta: xx,
              isLoading: false,
              isLeaf: true,
            };
            allConnList.push(myobj);
            crtLayerArr.push(myobj);
          });
        });
        return crtLayerArr;
      }
      const rootTree = makeFormatting(rootRawTree);
      // // console.log(rootRawTree, rootTree);
      data.connectionList.tree = rootTree;
      data.connectionList.connList = allConnList;
      databaseAllData.data.loadingTree = false;
    } catch (err) {
      databaseAllData.data.loadingTree = false;
      throw err;
    }
  },
  forceTreeUpdate() {
    gstore.databaseAllData.data.connectionList.tree = [
      ...gstore.databaseAllData.data.connectionList.tree,
    ];
  },
  getTree() {
    let crtTree = gstore.databaseAllData.data.connectionList.tree;
    return crtTree;
  },
  menu_moveto: async function (node, to_menu_key) {
    let crtTree = gstore.databaseAllData.data.connectionList.tree;
    let placeNode = null;
    gutils.iterateTree([{ root: 1, children: crtTree }], (e) => {
      let findidx = _.findIndex(e.children, (x) => x.key == node.key);
      if (findidx != -1) {
        e.children = gutils.pickArr(e.children, findidx);
        if (e.root == 1) {
          crtTree = gutils.pickArr(crtTree, findidx);
        }
      }
      if (e.key == to_menu_key) {
        placeNode = e;
      }
    });
    if (!_.isNil(placeNode)) {
      if (_.isNil(placeNode.children)) {
        placeNode.children = [];
      }
      placeNode.children.push(node);
    }
    if (_.isNil(to_menu_key)) {
      crtTree = [...crtTree, node];
    }
    gstore.databaseAllData.data.connectionList.tree = [...crtTree];
    await myapi.saveTreeAndRefreshIt();
  },
  testConn: async function () {
    const addModel = gstore.databaseAllData.addNewConnPageData.addModel;
    // // console.log("test connection", addModel);
    try {
      gstore.databaseAllData.addNewConnPageData.isLoadingTestConn = true;
      let connTestRes = await gutils.opt(
        "/dblink/conn-test",
        {
          CONN: addModel,
          errorResponse: true,
        },
        {
          ref(source) {
            window.cancelTheTestConn = () => {
              source.cancel();
            };
          },
        }
      );
      gutils.w_alertSuccess(
        "Connected successfully! Elapsed time: " + connTestRes.content + "ms",
        { width: "430px", title: "Test Connection Result" }
      );
      // // console.log("conn test res");
      gstore.databaseAllData.addNewConnPageData.isLoadingTestConn = false;
    } catch (e) {
      gutils.w_handleError(e);
      gstore.databaseAllData.addNewConnPageData.isLoadingTestConn = false;
    }
  },
  refresh: async function () {
    await myapi.loadEditor();
    await myapi.loadConnTree();
  },
  open_recent_scripts: async (crtNodeObj) => {
    gstore.databaseAllData.overlay_recentScripts.open = true;
    let connID = crtNodeObj.meta.ID;
    console.log("you opened the recent script panel for", connID);
    let data = gstore.databaseAllData.overlay_recentScripts.data;
    data.connID = connID;
    data.recentScriptList = [];
    if (!_.isNil(connID)) {
      let myres = await gutils.opt("/dblink/get-all-recent-scripts", {
        connID: connID,
      });
      data.recentScriptList = myres.content;
    }
  },
  create_folder(folderNode, crtNodeObj) {
    gstore.databaseAllData.overlay_addNewFolder.open = true;
    const nextObj = _.isNil(crtNodeObj)
      ? gstore.databaseAllData.addNewConnPageData.initModelForFolder
      : crtNodeObj.meta;
    gstore.databaseAllData.addNewConnPageData.addModelForFolder =
      _.cloneDeep(nextObj);
    if (!_.isNil(folderNode)) {
      // // console.log("add model for folder");
      gstore.databaseAllData.addNewConnPageData.addModelForFolder.PARENT_FOLDER_ID =
        folderNode.meta.ID;
    }
    gutils.clearCache();
  },
  confirm_create_connection: async function () {
    try {
      const model = gstore.databaseAllData.addNewConnPageData.addModel;
      gstore.databaseAllData.overlay_addNewConn.loading = true;
      if (_.isNil(model.CONNECTION_NAME)) {
        model.CONNECTION_NAME = `${model.HOST}:${model.PORT}`;
      }
      const isNewCreate = _.isNil(model.ID);
      if (!isNewCreate) {
        await gutils.opt("/dblink/opt-conn-upset", {
          ...model,
        });
        await myapi.refresh();
      } else {
        const crtTree = gstore.databaseAllData.data.connectionList.tree;
        let newobj = {
          new: true,
          title: model.CONNECTION_NAME,
          meta: _.cloneDeep(model),
          isLeaf: true,
        };
        if (!_.isNil(model.FOLDER_ID)) {
          gutils.iterateTree(
            crtTree,
            (x) => {
              // // console.log("loop tree", x);
              if (x.meta.ID == model.FOLDER_ID) {
                let gotParent = x;
                if (!_.isNil(gotParent)) {
                  if (_.isNil(gotParent.children)) {
                    gotParent.children = [];
                  }
                  gotParent.children.push(newobj);
                }
              }
            },
            "children"
          );
        } else {
          crtTree.push(newobj);
        }
        gstore.databaseAllData.data.connectionList.tree = [
          ...gstore.databaseAllData.data.connectionList.tree,
        ];
        await myapi.saveTreeAndRefreshIt();
        await myapi.refreshAll();
      }
      gstore.databaseAllData.overlay_addNewConn.loading = false;
      gstore.databaseAllData.overlay_addNewConn.open = false;
    } catch (err) {
      gstore.databaseAllData.overlay_addNewConn.loading = false;
      throw err;
    }
  },
  confirm_create_folder: async function () {
    try {
      const addModelForFolder =
        gstore.databaseAllData.addNewConnPageData.addModelForFolder;
      gstore.databaseAllData.overlay_addNewFolder.loading = true;
      const isNewCreate = _.isNil(addModelForFolder.ID);
      if (isNewCreate) {
        await gutils.opt("/dblink/opt-folder-upset", {
          ...addModelForFolder,
        });
        await myapi.refresh();
      } else {
        const crtTree = gstore.databaseAllData.data.connectionList.tree;
        let newobj = {
          new: true,
          title: addModelForFolder.FOLDER_NAME,
          meta: _.cloneDeep(addModelForFolder),
          isLeaf: false,
          children: [],
        };
        if (!_.isNil(addModelForFolder.PARENT_FOLDER_ID)) {
          gutils.iterateTree(
            crtTree,
            (x) => {
              // // console.log("loop tree", x);
              if (x.meta.ID == addModelForFolder.PARENT_FOLDER_ID) {
                let gotParent = x;
                if (!_.isNil(gotParent)) {
                  if (_.isNil(gotParent.children)) {
                    gotParent.children = [];
                  }
                  gotParent.children.push(newobj);
                }
              }
            },
            "children"
          );
        } else {
          crtTree.push(newobj);
        }
        gstore.databaseAllData.data.connectionList.tree = [
          ...gstore.databaseAllData.data.connectionList.tree,
        ];
        await myapi.saveTreeAndRefreshIt();
      }
      gstore.databaseAllData.overlay_addNewFolder.loading = false;
      gstore.databaseAllData.overlay_addNewFolder.open = false;
    } catch (err) {
      gstore.databaseAllData.overlay_addNewFolder.loading = false;
      throw err;
    }
  },
  saveTreeAndRefreshIt: async function (isRefreshAndAjax = true) {
    try {
      gstore.databaseAllData.overlay_addNewFolder.loading = true;

      let crtTree = gstore.databaseAllData.data.connectionList.tree;
      let callFunc = (crtTree) => {
        if (_.isEmpty(crtTree)) {
          return null;
        }
        let crtObj = {
          root: 0,
          EXTRA_DATA_CONN: [],
          EXTRA_DATA_SUB_FOLDER: [],
        };
        _.forEach(crtTree, (x, d, n) => {
          if (x.isLeaf) {
            if (_.isNil(crtObj.EXTRA_DATA_CONN)) {
              crtObj.EXTRA_DATA_CONN = [];
            }
            crtObj.EXTRA_DATA_CONN.push({
              CONNECTION_NAME: x["title"],
              ID: gutils.noNaNWithNull(
                parseInt(("" + x["key"]).replaceAll("c-", ""))
              ),
              ...(x["meta"] || {}),
              EXTRA_DATA_meta: x["meta"],
            });
          } else {
            let nextChildObj = callFunc(x.children);
            if (_.isNil(nextChildObj)) {
              nextChildObj = {};
            }
            if (_.isNil(crtObj.EXTRA_DATA_SUB_FOLDER)) {
              crtObj.EXTRA_DATA_SUB_FOLDER = [];
            }
            crtObj.EXTRA_DATA_SUB_FOLDER.push({
              FOLDER_NAME: x["title"],
              ID: gutils.noNaNWithNull(
                parseInt(("" + x["key"]).replaceAll("f-", ""))
              ),
              EXTRA_DATA_meta: x["meta"],
              ...(x["meta"] || {}),
              EXTRA_DATA_SUB_FOLDER: nextChildObj.EXTRA_DATA_SUB_FOLDER,
              EXTRA_DATA_CONN: nextChildObj.EXTRA_DATA_CONN,
            });
          }
        });
        return crtObj;
      };
      let finalTree = callFunc(crtTree);
      if (finalTree == null) {
        finalTree = {};
      }
      finalTree.root = 1;
      // // console.log("save and refresh", finalTree, crtTree);
      let connSaveRes = await gutils.opt("/dblink/conn-save", {
        CONN_DATA: finalTree,
      });
      if (isRefreshAndAjax) {
        await myapi.refresh();
      }
      gstore.databaseAllData.overlay_addNewFolder.loading = false;
    } catch (err) {
      gstore.databaseAllData.overlay_addNewFolder.loading = false;
      throw err;
    }
  },
  initDbVersion: async () => {
    gstore.databaseAllData.addNewConnPageData.formNeeds.dbVersions_loading = true;
    try {
      // selecting the dbVersions logic by dbtypeID
      let dbTypeId =
        gstore.databaseAllData.addNewConnPageData.addModel.DBTYPE_ID;
      let getDbVersionsRes = await gutils.opt("/dblink/get-db-versions", {
        DBTYPE_ID: dbTypeId,
      });
      let myfinlist = _.map(getDbVersionsRes.content, (x, d, n) => {
        return {
          label: x["VERSION_LABEL"],
          value: x["VERSION_PROP"],
          DRIVERS_LIST: x["DRIVERS_LIST"],
        };
      });
      gstore.databaseAllData.addNewConnPageData.formNeeds.dbVersions =
        myfinlist;
      if (
        gutils.ifNotInArr(
          gstore.databaseAllData.addNewConnPageData.addModel.VERSION_PROP,
          myfinlist
        )
      ) {
        gstore.databaseAllData.addNewConnPageData.addModel.VERSION_PROP = _.get(
          myfinlist,
          "0.value"
        );
      }
      // gstore.databaseAllData.addNewConnPageData.updateVersionCallRef++;

      gstore.databaseAllData.addNewConnPageData.formNeeds.dbVersions_loading = false;
    } catch (err) {
      gstore.databaseAllData.addNewConnPageData.formNeeds.dbVersions_loading = false;
      throw err;
    }
  },
  initPreLogic() {
    gutils.once("init_for_the_prop", () => {
      // auto download driver when driver_id is changed
      autorun(async () => {
        myapi.downloadDriver();
      });
      // refresh version list
      reaction(
        () => {
          return [
            gstore.databaseAllData.addNewConnPageData.updateVersionCallRef,
            gstore.databaseAllData.addNewConnPageData.addModel.DBTYPE_ID,
          ];
        },
        () => {
          myapi.initDbVersion();
        }
      );
      // refresh driver lists when version_prop is changed
      reaction(
        () => {
          return [
            gstore.databaseAllData.addNewConnPageData.updateVersionCallRef,
            gstore.databaseAllData.addNewConnPageData.addModel.VERSION_PROP,
            myapi.getCrtDriverList(),
            gstore.databaseAllData.overlay_addNewFolder.open,
          ];
        },
        _.debounce(async () => {
          myapi.initDriverCustomList();
        }, 300)
      );
    });
  },
  create_connection: async function (folderNode, currentConnNode) {
    myapi.initPreLogic();

    gstore.databaseAllData.overlay_addNewConn.open = true;

    let newModel = null;
    if (_.isNil(currentConnNode)) {
      newModel = _.cloneDeep(
        gstore.databaseAllData.addNewConnPageData.initModel
      );
    } else {
      newModel = _.cloneDeep(currentConnNode.meta);
    }
    gstore.databaseAllData.addNewConnPageData.addModel = newModel;

    if (!_.isEmpty(folderNode)) {
      gstore.databaseAllData.addNewConnPageData.addModel.FOLDER_ID =
        folderNode.meta.ID;
    }

    gstore.databaseAllData.addNewConnPageData.formNeeds.dbTypes_loading = true;
    // query basic data
    let queryAllData = await gutils.opt("/dblink/dbtype-query-all");
    let finalDatabaseType = [];
    _.forEach(queryAllData.content, (x, d, n) => {
      finalDatabaseType.push({
        label: x["DATABASE_NAME"],
        value: x["DATABASE_PROP"],
        DATABASE_PROP: x["DATABASE_PROP"],
      });
    });
    const addNewConnPageData = gstore.databaseAllData.addNewConnPageData;

    // myapi.initDbVersion();

    // assign and auto execute first one
    addNewConnPageData.formNeeds.dbTypes = finalDatabaseType;
    if (
      gutils.ifNotInArr(
        addNewConnPageData.addModel.DBTYPE_ID,
        addNewConnPageData.formNeeds.dbTypes
      )
    ) {
      addNewConnPageData.addModel.DBTYPE_ID = _.get(
        finalDatabaseType,
        "0.value"
      );
    }
    // finish the basic connection
    gstore.databaseAllData.addNewConnPageData.formNeeds.dbTypes_loading = false;
    gutils.clearCache();
  },
  downloadDriver: async function () {
    if (true) {
      return;
    }
    let crtDriverId =
      gstore.databaseAllData.addNewConnPageData.addModel.DRIVER_ID;
    if (!_.isNil(crtDriverId)) {
      let res = {
        content: {},
      };
      // await gutils.opt("/dblink/download-driver", {
      //   DRIVER_ID: crtDriverId,
      // });
      gstore.databaseAllData.addNewConnPageData.formNeeds.driver_download_uid =
        gutils.uuid();
      // start downloading the driver files
      gutils.defer(async () => {
        // const saveFile = null;
        // const { groupId, artifactId, version, base, folder } = res.content;
        // // // console.log("got source", res.content);
        // const driver_downloadStatus =
        //   gstore.databaseAllData.addNewConnPageData.formNeeds
        //     .driver_downloadStatus;
        // // do download
        // driver_downloadStatus.status = "init";
        // let myst = driver_downloadStatus;
        // let crtTypeArr = [".jar"];
        // let idx = 0;
        // for (let crtType of crtTypeArr) {
        //   idx++;
        //   await new Promise((resolve, reject) => {
        //     myst.desc = `${idx}/${_.size(crtTypeArr)}`;
        //     window.ipc.downloadJar(
        //       {
        //         groupId,
        //         artifactId,
        //         version,
        //         type: crtType,
        //       },
        //       {
        //         onProgress(e) {
        //           myst.status = "started";
        //           myst.currentSize = e.loaded_num;
        //           myst.totalSize = e.total_num;
        //           if (e.loaded_num == e.total_num) {
        //             // do verify
        //             myst.status = "done";
        //             resolve();
        //           }
        //         },
        //         onSuccess: async function () {
        //           // do verify
        //           myst.status = "done";
        //           resolve();
        //         },
        //         onFail(err) {
        //           myst.status = "error";
        //           myst.errMsg = err;
        //           reject();
        //         },
        //       }
        //     );
        //   });
        // }
        await gutils.sleep(100);
        myst.status = "started";
        await gutils.sleep(100);
        myst.status = "done";
        await gutils.sleep(300);
        gstore.databaseAllData.addNewConnPageData.formNeeds.driver_download_uid =
          null;
        // do verify
      });
    }
  },
  getCrtDriverList() {
    return _.chain(
      gstore.databaseAllData.addNewConnPageData.formNeeds.dbVersions
    )
      .find((x) => {
        return (
          x.value ==
          gstore.databaseAllData.addNewConnPageData.addModel.VERSION_PROP
        );
      })
      .get("DRIVERS_LIST")
      .value();
  },
  initOtherOptionsForCurrentDb: async function () {
    let crt_DATABASE_PROP = _.chain(
      gstore.databaseAllData.addNewConnPageData.formNeeds.dbTypes
    )
      .find((x) => {
        return (
          x.value ==
          gstore.databaseAllData.addNewConnPageData.addModel.DBTYPE_ID
        );
      })
      .get("DATABASE_PROP")
      .value();
    let authTypeList = [];
    if (!_.isNil(crt_DATABASE_PROP)) {
      console.log("init got crt_DATABASE_PROP", crt_DATABASE_PROP);
      let generalObj = {
        label: t("General Type"),
        value: "general",
      };
      authTypeList.push(generalObj);
      switch (crt_DATABASE_PROP) {
        case "mysql":
        case "mariadb":
          break;
        case "postgresql":
          authTypeList = [
            {
              label: t("Database Native"),
              value: "pg_native",
            },
          ];
          break;
        case "sqllite":
          authTypeList = [
            {
              label: t("Local Datafile"),
              value: "sqllite_fs_system",
            },
          ];
          break;
        case "h2embedded":
          authTypeList = [
            {
              label: "Local Datafile",
              value: "h2_fs_system",
            },
          ];
          break;
        case "oracle":
          authTypeList = [
            {
              label: "Service Name",
              value: "oracle_service_name",
            },
            {
              label: "SID",
              value: "oracle_sid",
            },
          ];
          break;
      }
    }
    authTypeList.push({
      label: "Custom Type",
      value: "custom",
    });
    _.forEach(authTypeList, (x, d, n) => {
      x.label = t(x.label);
    });
    gstore.databaseAllData.addNewConnPageData.formNeeds.authTypeList =
      authTypeList;
    let isCannotFindInList =
      _.findIndex(
        gstore.databaseAllData.addNewConnPageData.formNeeds.authTypeList,
        (x) =>
          x.value ==
          gstore.databaseAllData.addNewConnPageData.addModel.AUTH_TYPE_PROP
      ) == -1;
    if (
      _.isNil(
        gstore.databaseAllData.addNewConnPageData.addModel.AUTH_TYPE_PROP
      ) ||
      isCannotFindInList
    ) {
      gstore.databaseAllData.addNewConnPageData.addModel.AUTH_TYPE_PROP = _.get(
        authTypeList,
        "0.value"
      );
    }
    if (gutils.dev()) {
      gutils.once("onlytfdds", () => {
        // gstore.databaseAllData.addNewConnPageData.addModel.DBTYPE_ID = "oracle";
        // gstore.databaseAllData.addNewConnPageData.addModel.AUTH_TYPE_PROP =
        //   "oracle_service_name";
      });
    }
    gstore.databaseAllData.addNewConnPageData.updateRef++;
  },
  initDriverCustomList: async function () {
    let crtDatabaseTypeId =
      gstore.databaseAllData.addNewConnPageData.addModel.DBTYPE_ID;
    if (_.isNil(crtDatabaseTypeId)) {
      return;
    }
    gstore.databaseAllData.addNewConnPageData.formNeeds.relatedDrivers_loading = true;
    let queryDrivers = await gutils.opt("/dblink/driver-custom-list", {
      DBTYPE_ID: crtDatabaseTypeId,
      DRIVERS_LIST: myapi.getCrtDriverList(),
    });
    gstore.databaseAllData.addNewConnPageData.formNeeds.relatedDrivers = _.map(
      queryDrivers.content,
      (x, d, n) => {
        return {
          label: x["DRIVER_NAME"],
          value: x["DRIVER_PROP"],
          meta: x,
        };
      }
    );
    let relatedDrivers =
      gstore.databaseAllData.addNewConnPageData.formNeeds.relatedDrivers;
    // if (
    //   gutils.ifNotInArr(
    //     gstore.databaseAllData.addNewConnPageData.addModel.DRIVER_ID,
    //     relatedDrivers
    //   )
    // ) {
    // }
    gstore.databaseAllData.addNewConnPageData.addModel.DRIVER_ID = _.get(
      relatedDrivers,
      "0.value"
    );

    this.initOtherOptionsForCurrentDb();

    gstore.databaseAllData.addNewConnPageData.formNeeds.relatedDrivers_loading = false;
  },
  // _.chain(
  //   relatedDrivers
  // )
  //   .find(
  //     (x) => x.label.indexOf("-rc") == -1 && x.label.indexOf("-dmr") == -1
  //   )
  //   .thru((x) => {
  //     if (_.isNil(x)) {
  //       return _.get(relatedDrivers, "0");
  //     } else {
  //       return x;
  //     }
  //   })
  //   .get("value")
  //   .value();
  openAllConnections() {},
  closeAllConnections() {},
  formatFolderAndCreateNew(node) {
    return _.chain(node)
      .cloneDeep()
      .merge({
        title: node.title + "-1",
        key: node.key + "-1",
        meta: {
          FOLDER_NAME: node.meta.FOLDER_NAME + "-1",
          ID: null,
        },
        children: gutils.iterateTree(node.children, (x, d, n) => {
          if (x.isLeaf) {
            return _.merge(myapi.formatNodeAndCreateNew(x), {
              label: x.label,
              meta: {
                ID: null,
                CONNECTION_NAME: x.meta.CONNECTION_NAME,
              },
            });
          } else {
            return _.merge(myapi.formatFolderAndCreateNew(x), {
              label: x.label,
              meta: {
                ID: null,
                FOLDER_NAME: x.meta.FOLDER_NAME,
              },
            });
          }
        }),
      })
      .value();
  },
  duplicate_folder: async function (node) {
    // // console.log("duplicate connection", node, node.meta);
    const crtTree = gstore.databaseAllData.data.connectionList.tree;
    const nextJob = myapi.formatFolderAndCreateNew(node);
    gutils.iterateTree(
      [nextJob],
      (x) => {
        _.set(x, "meta.ID", null);
      },
      "children"
    );
    // // console.log("duplicate order nextjob", nextJob);
    let isFind = false;
    gutils.iterateTree(
      crtTree,
      (item) => {
        let findItem = _.find(item.children, (x) => x.key == node.key);
        if (!_.isNil(findItem)) {
          item.children.push(nextJob);
          isFind = true;
        }
      },
      "children"
    );
    if (!isFind) {
      gstore.databaseAllData.data.connectionList.tree = [
        ...gstore.databaseAllData.data.connectionList.tree,
        nextJob,
      ];
    }
    gstore.databaseAllData.data.connectionList.tree = [
      ...gstore.databaseAllData.data.connectionList.tree,
    ];
    await myapi.saveTreeAndRefreshIt();
  },
  delete_folder: async function (node) {
    let folderID = node.meta.ID;
    // // console.log("deleing the folder by id", folderID);
    if (
      !(await gutils.confirm(
        "Do you want to delete this folder and related sub connections?"
      ))
    ) {
      return;
    }
    await gutils.opt("/dblink/opt-folder-delete", {
      ID: folderID,
    });
    await myapi.refresh();
  },
  delete_connection: async function (node) {
    let connID = node.meta.ID;
    // // console.log("deleing the conn by id", connID);
    if (!(await gutils.confirm("Do you want to delete this connection?"))) {
      return;
    }
    await gutils.opt("/dblink/opt-conn-delete", {
      ID: connID,
    });
    await myapi.refresh();
  },
  formatNodeAndCreateNew(node) {
    return _.chain(node)
      .cloneDeep()
      .merge({
        title: node.title + "-1",
        key: node.key + "-1",
        meta: {
          CONNECTION_NAME: node.meta.CONNECTION_NAME + "-1",
          ID: null,
        },
      })
      .value();
  },
  duplicate_connection: async function (node) {
    // // console.log("duplicate connection", node, node.meta);
    const crtTree = gstore.databaseAllData.data.connectionList.tree;
    const nextJob = myapi.formatNodeAndCreateNew(node);
    let isFind = false;
    gutils.iterateTree(
      crtTree,
      (item) => {
        let findItem = _.find(item.children, (x) => x.key == node.key);
        if (!_.isNil(findItem)) {
          item.children.push(nextJob);
          isFind = true;
        }
      },
      "children"
    );
    if (!isFind) {
      gstore.databaseAllData.data.connectionList.tree = [
        ...gstore.databaseAllData.data.connectionList.tree,
        nextJob,
      ];
    }
    gstore.databaseAllData.data.connectionList.tree = [
      ...gstore.databaseAllData.data.connectionList.tree,
    ];
    await myapi.saveTreeAndRefreshIt();
  },
  edit_connection() {},
  rename_folder() {},
  rename_connection() {},
};

export default myapi;
