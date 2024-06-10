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

const fn_localprojects = () => gstore.common_app.localProjects;
const fn_textSearch = () => gstore.common_app.textSearch;
let fn_saveModelById = _.throttle((...args) => {
  return (async function (store_name, needload = true) {
    // debugger;
    let rootLogic = gstore.common_app[store_name];
    // TODO: pluginUtils code also needs to be sync
    let hist = rootLogic.hist;
    if (
      rootLogic.hist.isLoadingForRefreshHist ||
      rootLogic.hist.isLoadingForSaveHist ||
      rootLogic.hist.isLoadingWhenChangeId
    ) {
      // avoid duplicate save datas
      console.log(`avoid duplicate save datas`);
      return;
    }
    if (_.isNil(hist.crtHistId)) {
      return;
    }
    if (needload) {
      rootLogic.hist.isLoadingForSaveHist = true;
    }
    try {
      if (gutils.dev()) {
        window["send_update_" + store_name] = _.cloneDeep(rootLogic.model);
      }
      let modelValue = gutils.strjson(
        _.pickBy(
          {
            ...rootLogic.model,
            config_qr_dataurl: "",
            image_html_code: "",
          },
          (x, d, n) => {
            return !_.isNil(x);
          }
        )
      );
      console.log("model value", modelValue, store_name);
      if (p_mode()) {
        let suchkeyname = fn_getRecordIDKeyName(
          hist.history_table_id,
          hist.crtHistId
        );
        let preval = await localforge.getItem(suchkeyname);
        if (_.isNil(preval)) {
          return;
        }
        preval.SNAPSHOT_JSON = modelValue;
        localforge.setItem(suchkeyname, preval);
      } else {
        // if (!p_visitor_mode()) {
        // debugger;
        await gutils.opt("/hist/update_hist", {
          TABLE_ID: hist.history_table_id,
          SAVE_STR: modelValue,
          ID: hist.crtHistId,
        });
        // }
      }
      if (needload) {
        rootLogic.hist.isLoadingForSaveHist = false;
      }
    } catch (err) {
      if (needload) {
        rootLogic.hist.isLoadingForSaveHist = false;
      }
      throw err;
    }
  })(...args);
}, 200);
const myapi = {
  common: {
    openFileAndFill(setPropMethodName, store_name, x_props = {}) {
      gutils.selectFile(async function (val) {
        console.log("got file ", val);
        if (!_.isNil(val)) {
          console.log("got file ", val, store_name);
          if (store_name == "encodeBase64") {
            let myres = await gutils.opt(
              "/common/format_for_base64_file_encode",
              {
                FILE: val,
              }
            );
            gstore.common_app[store_name][setPropMethodName](
              "[IT'S FROM UPLOADED FILE]"
            );
            gstore.common_app[store_name]["setRightValue"](
              myres.content.result
            );
            return;
          } else if (x_props && x_props.handleRawInBackend) {
            gstore.common_app[store_name][setPropMethodName](
              "[CG_FILE_003]" + val
            );
            if (x_props.handleRawFileTooltip) {
              gutils.alertOk(t(x_props.handleRawFileTooltip, val));
            }
            await x_props.triggerFunc({});
            return;
          } else {
          }
          if (x_props) {
          }
          let { content } = await gutils.opt("/fs/read_uploads_and_clean", {
            name: val,
          });
          let myfilectn = content;
          console.log(myfilectn);
          gstore.common_app[store_name][setPropMethodName](myfilectn);
        }
      });
    },
    saveModelById: fn_saveModelById,
  },
  textCompare: {},
  textSearch: {
    replace: async function () {
      let drag = fn_textSearch().drag;
      if (_.isNil(drag.latestID)) {
        await gutils.win_alert("No selected item to be replaced");
        return;
      }
      try {
        drag.replacingLoading = true;
        drag.replacingText = "Cancelling the search task";
        await myapi.textSearch.cancel();
        drag.replacingText = "Cancelled the task";
        drag.replacingText = "Replacing selected record";
        drag.replacingText = "Being backed up";
        let themodel = gutils.getModel2Obj("text_search_submit_forms");
        let rt = themodel["replacingText"];
        if (_.isNil(rt) || rt.length == 0) {
          gutils.alert("Replace text is empty");
          drag.replacingLoading = false;
          drag.replacingText = null;
          return;
        }
        await gutils.opt("/finding_replacing/backup_one_record", {
          VIEW_RESULT_ID: drag.filesListInfo.viewResultId,
          FOLDER: new Date().getTime(),
          model: themodel,
        });
        drag.replacingText = "Backed it up";
        drag.replacingText = "Replacing";
        await gutils.opt("/finding_replacing/replacing_one_record", {
          VIEW_RESULT_ID: drag.filesListInfo.viewResultId,
          model: themodel,
        });
        drag.replacingText = "Replaced";
        await gutils.sleep(1000);
        drag.viewResultId = null;
        myapi.textSearch.loadResult();
        drag.replacingLoading = false;
        drag.replacingText = false;
        gutils.alertOk("Replaced");
      } catch (err) {
        drag.replacingLoading = false;
      }
    },
    replaceAll: async function () {
      let drag = fn_textSearch().drag;
      if (_.isNil(drag.latestID)) {
        await gutils.win_alert("No selected item to be replaced");
        return;
      }
      try {
        drag.replacingLoading = true;
        drag.replacingText = "Cancelling the search task";
        await myapi.textSearch.cancel();
        drag.replacingText = "Cancelled the task";
        drag.replacingText = "Replacing selected record";
        drag.replacingText = "Being backed up";
        let themodel = gutils.getModel2Obj("text_search_submit_forms");
        let rt = themodel["replacingText"];
        if (_.isNil(rt) || rt.length == 0) {
          gutils.alert("Replace text is empty");
          drag.replacingLoading = false;
          drag.replacingText = null;
          return;
        }
        await gutils.opt("/finding_replacing/backup_all_record", {
          BASIC_ID: drag.latestID,
          FOLDER: new Date().getTime(),
          model: themodel,
        });
        drag.replacingText = "Backed it up";
        drag.replacingText = "Replacing";
        await gutils.opt("/finding_replacing/replacing_all_record", {
          BASIC_ID: drag.latestID,
          model: themodel,
        });
        drag.replacingText = "Replaced";
        await gutils.sleep(1000);
        gutils.alertOk("Replaced");
        gstore.common_app.textSearch.drag.loadObj.REALTIME_STATUS.matchNums = 0;
        gstore.common_app.textSearch.drag.filesListInfo.viewResultId = null;
        drag.viewResultId = null;
        drag.latestID = null;
        myapi.textSearch.loadResult();
        drag.replacingLoading = false;
        drag.replacingText = false;
      } catch (err) {
        drag.replacingLoading = false;
      }
    },
    getResByViewResultId: async function (viewResultId) {
      console.log("viewResultId", viewResultId);
      let myres = await gutils.opt("/finding_replacing/result-detail", {
        VIEW_RESULT_ID: viewResultId,
      });
      return myres.content;
    },
    cancel: async function () {
      // await gutils.opt("/finding_replacing/stop");
    },
    loadResult: async function (offset, limit) {
      let drag = fn_textSearch().drag;
      let crtresultsListRes = await gutils.opt(
        "/finding_replacing/result-pagination",
        {
          BASIC_ID: drag.latestID,
          _limit: limit,
          _offset: offset,
        }
      );
      if (!_.isEmpty(crtresultsListRes.content)) {
        // debugger;
      }
      // _.fill(
      //   drag.filesListInfo.data,
      //   crtresultsListRes.content,
      //   offset,
      //   offset + limit
      // );
      drag.filesListInfo.data = _.map(
        crtresultsListRes.content,
        (crtItem, d, n) => {
          let findLine = crtItem["FIND_LINE"] || "";
          let part_left = findLine.substring(0, crtItem["LINE_START_IDX"]);
          let part_center = findLine.substring(
            crtItem["LINE_START_IDX"],
            crtItem["LINE_END_IDX"]
          );
          let part_right = findLine.substring(crtItem["LINE_END_IDX"]);
          crtItem.part_left = part_left;
          crtItem.part_center = part_center;
          crtItem.part_right = part_right.substring(0, 100);
          return crtItem;
        }
      );
      if (_.isNil(drag.filesListInfo.viewResultId)) {
        drag.filesListInfo.viewResultObj = _.get(crtresultsListRes.content, [
          0,
        ]);
        drag.filesListInfo.viewResultId = _.get(
          drag.filesListInfo.viewResultObj,
          "ID"
        );
      }
    },
    search: _.debounce(async function (model) {
      if (_.isEmpty(model.findingText)) {
        await myapi.textSearch.cancel();
      }
      await myapi.textSearch.cancel();
      const { drag, config } = fn_textSearch();
      drag.replacingLoading = false;
      drag.replacingText = null;
      drag.loadObj.REALTIME_STATUS = drag.loadObj.fn_realtime_st();
      drag.started = true;
      let myres = await gutils.opt("/finding_replacing/start", {
        config: _.merge({}, model, {
          ...gstore.common_app.textSearch.config,
        }),
      });
      drag.filesListInfo.data = [];
      drag.filesListInfo.viewResultId = null;
      let startID = myres.content.ID;
      drag.latestID = startID;
      let isPageBefore = false;
      let delayCall = _.throttle(() => {
        return myapi.textSearch.loadResult(0, 200);
      }, 500);
      while (true) {
        let mystatusres = await gutils.opt("/finding_replacing/status", {
          ID: startID,
        });
        if (drag.latestID != startID) {
          drag.loadObj.REALTIME_STATUS.done = true;
          break;
        }
        if (!isPageBefore) {
          isPageBefore = true;
        }
        await delayCall();

        let mystctn = mystatusres.content;
        // console.log(mystatusres.content);
        if (_.isNil(mystctn.REALTIME_STATUS)) {
          drag.loadObj.REALTIME_STATUS.done = true;
          break;
        }
        drag.loadObj.REALTIME_STATUS = mystctn.REALTIME_STATUS;
        if (_.get(mystctn, ["REALTIME_STATUS", "done"])) {
          break;
        }
        gutils.sleep(200);
      }
    }, 100),
  },
  localProjects: {
    copyDir: async function (x) {
      gutils.copy(x.FILEPATH);
      gutils.alertOk("Copied");
    },
    openDir: async function (x) {
      gutils.openDir(x.FILEPATH);
    },
    delete: async function (x) {
      // debugger;
      if (
        !(await gutils.confirm(
          "Are you sure that you want to delete this record?"
        ))
      ) {
        return;
      }
      let { ID } = x;
      await gutils.opt("/dg/project-files-delete", {
        ID: ID,
      });
      await myapi.localProjects.refresh();
    },
    addProject: async function () {
      // gutils.setModel2Obj(
      //   "s_local_project_addform",
      //   _.cloneDeep(gstore.common_app.localProjects.addForm.initModel)
      // );
      gstore.common_app.localProjects.addForm.addModel = _.cloneDeep(
        gstore.common_app.localProjects.addForm.initModel
      );
      gstore.common_app.localProjects.overlay_addLocalProjects.open = true;
      gstore.common_app.localProjects.addForm.alertType = "create";
      gstore.common_app.localProjects.overlay_addLocalProjects.title =
        "Add Local Folder";
    },
    editProject: async function (x) {
      console.log("edit logic", x);
      gstore.common_app.localProjects.overlay_addLocalProjects.open = true;
      gstore.common_app.localProjects.overlay_addLocalProjects.title =
        "Edit Local Folder";
      gstore.common_app.localProjects.addForm.addModel = _.cloneDeep(x);
      // gutils.setModel2Obj("s_local_project_addform", );
      gstore.common_app.localProjects.addForm.alertType = "update";
    },
    add: async function () {
      let myaddform = gstore.common_app.localProjects.addForm.addModel; // gutils.getModel2Obj("s_local_project_addform");
      let addRes = await gutils.opt("/dg/project-files-upset", myaddform);
      await myapi.localProjects.refresh();
      gstore.common_app.localProjects.overlay_addLocalProjects.open = false;
    },
    refresh: async function () {
      if (p_mode()) {
        return;
      }
      // fn_localprojects().list_loading = true;
      // try {
      //   let myprojectfiles = await gutils.opt("/dg/project-files-query-all");
      //   fn_localprojects().list = myprojectfiles.content;
      //   fn_localprojects().list_loading = false;
      // } catch (e) {
      //   fn_localprojects().list_loading = false;
      // }
    },
  },
  init: async function () {
    await myapi.localProjects.refresh();
    await myapi.textSearch.cancel();
  },
};

export default myapi;
