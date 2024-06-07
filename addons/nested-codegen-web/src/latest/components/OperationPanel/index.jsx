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
  Menu,
  MenuDivider,
  MenuItem,
  Intent,
  Position,
  Toaster,
  Checkbox,
  ContextMenu,
  NumericInput,
  Tab,
  Popover,
  Tabs,
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
  Tree,
  Icon,
  Card,
  Elevation,
  Button,
  PanelStack2,
} from "@blueprintjs/core";
import { Example,  } from "@blueprintjs/docs-theme";
import {
  ColumnHeaderCell,
  Cell,
  Column,
  Table,
  Regions,
} from "@blueprintjs/table";
import React, { useContext } from "react";
import ReactDOM from "react-dom";
import gutils from "../../utils";
import { useState, useRef, useEffect } from "react";
import HandlerClz from "../../routes/WrapError";

import { Provider, observer, inject ,useLocalStore} from "mobx-react";
import localforge from "localforage";
// var createHistory = require("history").createBrowserHistory;
import {
  withRouter,
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import { autorun, reaction,observable } from "mobx";
import gstore from "../../store.jsx";
import "./index.less";
import {
  Classes as Popover2Classes,
  ContextMenu2,
  Tooltip2,
} from "@blueprintjs/popover2";
import HalfResizeForTwoHorizontal from "../HalfResizeForTwoHorizontal";
import HalfResizeForTwo from "../HalfResizeForTwo";
import GTabs from "../GTabs";
import MinusButton from "../MinusButton";
import _, { truncate } from "lodash";
import HalfResizeForThreeHorizontal from "../HalfResizeForThreeHorizontal";
import moment from "moment";
import HalfResizeForThree from "../HalfResizeForThree";
import Html_select from "../html_select";
import todo_read_putils from "./todo_read_putils";
let key_LIST = "LIST_";
window.key_LIST = key_LIST;
window.STORE_VALUE_PORTAL = {};
function fn_getRecordIDKeyName(history_table_id, id) {
  return "key_R_" + history_table_id + id;
}
window.fn_getRecordIDKeyName = fn_getRecordIDKeyName;
async function getRecordNumberID(history_table_id) {
  let mval = await localforge.getItem("k_ID_" + history_table_id);
  if (_.isNil(mval)) {
    mval = 0;
  }
  mval++;
  await localforge.setItem("k_ID_" + history_table_id, mval);
  return mval;
}
window.getRecordNumberID = getRecordNumberID;
let fn_full_or_not_full = (e) => {
  if (gstore.localSettings.appTypeView == "no-nav") {
    gstore.localSettings.appTypeView = "all";
    gstore.localSettings.isLeftMenuOpen = true;
    gstore.localSettings.app_multiple_tab_mode = true;
  } else {
    gstore.localSettings.appTypeView = "no-nav";
    gstore.localSettings.isLeftMenuOpen = false;
    gstore.localSettings.app_multiple_tab_mode = false;
  }
  gutils.callWhenResize();
  gutils.callWhenResizeInternal();
};
window.fn_full_or_not_full = fn_full_or_not_full;

const OperationPanel = observer((props = {}) => {
  let isLeftRightEditorMode = props.isLeftRightEditorMode;
  console.log("OperationPanel", new Date().getTime(), props);
  let myvalue = gstore.localSettings[props.resizeKey];
  let [refNum, onRefNum] = useState(0);
  if (_.isNil(myvalue) && !_.isNil(props.defaultResizeVal)) {
    myvalue = props.defaultResizeVal;
    gutils.defer(() => {
      gstore.localSettings[props.resizeKey] = props.defaultResizeVal;
    });
  }
  let { left_hist_use_all = false } = props;
  left_hist_use_all = true;
  let key_tabs = props.resizeKey + "tabs";
  let all_display_optkeys = {
    config: key_tabs + "config",
    tabs: key_tabs + "tabs",
  };
  let finalUserOptArr = props.user_opt_arr;
  let { user_opt_arr } = props;
  user_opt_arr = [...user_opt_arr];
  user_opt_arr = _.flattenDeep(user_opt_arr);
  _.forEach(user_opt_arr, (x) => {
    if (x.children) {
      x.children = _.flattenDeep(x.children);
    }
  });
  user_opt_arr = _.filter(user_opt_arr, (x) => !_.isEmpty(x.children));
  // window.finalUserOptArr = user_opt_arr;
  // if (
  //   !gstore.localSettings.app_left_to_right_mode &&
  //   _.isNil(gstore.localSettings[all_display_optkeys.tabs]) &&
  //   _.isEmpty(user_opt_arr)
  // ) {
  //   gstore.localSettings[all_display_optkeys.tabs] = "hidden";
  // }
  let isConfigHide =
    gstore.localSettings[all_display_optkeys.config] == "hidden";
  let isTabHide = gstore.localSettings[all_display_optkeys.tabs] == "hidden";
  window.crtkeytabs_key = key_tabs;
  let val_tabs = gstore.localSettings[key_tabs];
  if (_.isNil(val_tabs)) {
    // gstore.localSettings[key_tabs]
    let dftval = {
      value: "today",
      list: left_hist_use_all
        ? [
            {
              label: t("All"),
              closable: false,
              id: "all",
            },
          ]
        : [
            {
              label: t("Today"),
              id: "today",
              closable: false,
            },
            {
              label: t("History"),
              id: "history",
              closable: false,
            },
          ],
    };
    val_tabs = dftval;
    gutils.defer(() => {
      gstore.localSettings[key_tabs] = dftval;
    });
  }
  // let [getOneAPITimes = 0, onGetOneAPITimes] = useState(0);
  const histObj = props.logicRoot.hist;
  let { getOneAPITimes } = histObj;
  let onGetOneAPITimes = (val) => {
    histObj.getOneAPITimes = val;
  };
  const { totalHistArr, isLoadingForRefreshHist, history_table_id } = histObj;
  // window.histObj = histObj;
  useEffect(() => {
    let r = reaction(
      () => {
        return {
          b: histObj.crtHistId,
        };
      },
      () => {
        if (!_.isEmpty(histObj.history_table_id)) {
          localStorage.setItem(
            `href_${histObj.history_table_id}`,
            "" + histObj.crtHistId
          );
        }
      }
    );
    return () => {
      r();
    };
  }, []);
  const onTotalHistArr = (val) => {
    histObj.totalHistArr = [...val];
    onRefNum(Math.random());
  };
  const onisLoadingForRefreshHist = (val) => {
    histObj.isLoadingForRefreshHist = val;
  };
  const checkAfterLoadedData = (val) => {
    let shouldViewIdx = "today";
    _.every(histObj.totalHistArr, (x, d, n) => {
      if (x.ID == histObj.crtHistId) {
        shouldViewIdx = x["IS_TODAY"] == 1 ? "today" : "history";
        return false;
      }
      return true;
    });
    gutils.defer(() => {
      val_tabs.value = left_hist_use_all ? "all" : shouldViewIdx;
    });
  };
  let getCrtHistoryDataOnlyOne = async (id) => {
    if (p_mode()) {
      let res = await localforge.getItem(
        fn_getRecordIDKeyName(history_table_id, id)
      );

      let allmylist = {
        content: res,
      };
      console.log("allmylist", allmylist);
      onGetOneAPITimes(getOneAPITimes + 1);
      return allmylist;
    } else {
      let allmylist = await gutils.opt("/hist/get_one_hist", {
        TABLE_ID: history_table_id,
        ID: id,
      });
      console.log("allmylist", allmylist);
      onGetOneAPITimes(getOneAPITimes + 1);
      return allmylist;
    }
  };
  let fn_get_initmodel = async () => {
    let initModelValue = _.cloneDeep(props.logicRoot.init_model);
    if (props.logicRoot.fn_init_model) {
      initModelValue = await props.logicRoot.fn_init_model();
    }
    return initModelValue;
  };
  const onCrtHistId = async (val, is_force = false) => {
    try {
      if (histObj.crtHistId == val && !is_force) {
        return;
      }
      histObj.isLoadingWhenChangeId = true;
      histObj.crtHistId = val;
      let myres = await getCrtHistoryDataOnlyOne(val);
      let prop = props;
      let initModelValue = await fn_get_initmodel();

      let mysnapshot = gutils.safeparse(myres.content.SNAPSHOT_JSON);
      if (_.isNil(mysnapshot)) {
        mysnapshot = {};
      }
      _.forEach(_.keys(props.logicRoot.model), (eachKey) => {
        if (_.isNil(initModelValue[eachKey]) && _.isNil(mysnapshot[eachKey])) {
          let finalValue = props.logicRoot.model[eachKey];
          if (typeof finalValue == "string") {
            initModelValue[eachKey] = "";
          } else {
            initModelValue[eachKey] = finalValue;
          }
        }
      });

      // WAY-1
      _.forEach(_.keys(prop.logicRoot.model), (eachKey) => {
        console.log(
          "chking for each key",
          eachKey,
          _.isNil(mysnapshot[eachKey]),
          _.isNil(initModelValue[eachKey]),
          prop.logicRoot.model[eachKey],
          typeof prop.logicRoot.model[eachKey] == "string"
        );
        if (
          _.isNil(mysnapshot[eachKey]) &&
          _.isNil(initModelValue[eachKey]) &&
          typeof prop.logicRoot.model[eachKey] == "string"
        ) {
          initModelValue[eachKey] = "";
        }
      });
      _.defaultsDeep(mysnapshot, initModelValue);
      console.log("updated", mysnapshot);
      props.logicRoot.model = mysnapshot;

      if (is_force) {
        props.updateEditorValueSync();
      }
      histObj.isLoadingWhenChangeId = false;
    } catch (e) {
      histObj.isLoadingWhenChangeId = false;
      throw e;
    }
  };
  /**
 else if (false && p_visitor_mode()) {
      window.STORE_VALUE_PORTAL[history_table_id] = JSON.stringify(
        props.logicRoot.init_model
      );
      onCrtHistId(100, true);
    }   */
  let createNewHistoryFunc = async (conf = {}) => {
    let initModelValue = await fn_get_initmodel();

    if (p_mode()) {
      let ready_obj = {
        TABLE_ID: history_table_id,
        SAVE_STR: JSON.stringify(initModelValue),
        ...conf,
      };
      let mmmid = await getRecordNumberID(history_table_id);
      let k1 = {
        ID: mmmid,
        SNAPSHOT_JSON: ready_obj.SAVE_STR,
        CREATETIME: Date.now(),
        TAB_NAME: null,
      };
      await localforge.setItem(
        fn_getRecordIDKeyName(history_table_id, k1.ID),
        k1
      );
      let res100 = await localforge.getItem(key_LIST + history_table_id);
      if (_.isNil(res100)) {
        res100 = [];
      }
      res100.push({
        ID: k1.ID,
      });
      await localforge.setItem(key_LIST + history_table_id, res100);
      onCrtHistId(k1.ID, true);
    } else {
      let myvalres = await gutils.opt("/hist/create_hist", {
        TABLE_ID: history_table_id,
        SAVE_STR: JSON.stringify(initModelValue),
        ...conf,
      });
      window.myvalres = myvalres;
      if (myvalres.content == null) {
        return;
      }
      onCrtHistId(myvalres.content["ID"], true);
    }
  };

  // [
  //   {
  //     CREATE_TIME: 1658062860344,
  //     CREATE_TIME_OBJ: 1658062860344,
  //     ID: 100,
  //     IS_TODAY: true,
  //     SNAPSHOT_JSON: null,
  //     TAB_NAME: null,
  //   },
  // ]
  let refreshHistoryList = async (adjustAuto = true, config_other = {}) => {
    onisLoadingForRefreshHist(true);
    try {
      let allmylist = null;
      if (p_mode()) {
        let res100 = await localforge.getItem(key_LIST + history_table_id);
        if (_.isNil(res100)) {
          res100 = [];
        }
        let newarr = [];
        for (let eachObj of res100) {
          let eachID = eachObj.ID;
          let suchkeyname = fn_getRecordIDKeyName(history_table_id, eachID);
          let myvalue = await localforge.getItem(suchkeyname);
          newarr.push({
            ...myvalue,
            SNAPSHOT_JSON: null,
            CREATE_TIME_OBJ: myvalue.CREATE_TIME,
            IS_TODAY:
              moment(myvalue.CREATE_TIME).format("YYYY-MM-DD") ==
              moment().format("YYYY-MM-DD"),
          });
        }
        allmylist = {
          content: _.sortBy(newarr, (x) => x.ID * -1),
        };
      } else {
        allmylist = await gutils.opt("/hist/list_hist", {
          TABLE_ID: history_table_id,
        });
      }
      // ? {
      //     content: ,
      //   }
      // :;
      onisLoadingForRefreshHist(false);
      let myctn = allmylist.content;
      // _.forEachRight(myctn, (x, d, n) => {
      //   // if(_.isEmpty(x['TAB_NAME'])){
      //   //   x['TAB_NAME'] = t(``)
      //   // }
      //   // x['SID'] = (d+1);
      // });
      onTotalHistArr(myctn);
      if (false && p_visitor_mode()) {
        gutils.once(`one_${history_table_id}`, () => {
          createNewHistoryFunc({
            init: true,
          });
        });
        onisLoadingForRefreshHist(false);
        return;
      }
      if (_.isEmpty(myctn) && _.isNil(window["a_" + history_table_id])) {
        window["a_" + history_table_id] = "1";
        await createNewHistoryFunc({
          init: true,
        });
        await refreshHistoryList();
      }
      if (
        _.isNil(histObj.crtHistId) ||
        _.isEmpty(
          _.find(histObj.totalHistArr, (x) => x.ID == histObj.crtHistId)
        )
      ) {
        let willIDDefault = _.get(histObj.totalHistArr, "0.ID");

        if (!_.isEmpty(histObj.history_table_id)) {
          let p_val = localStorage.getItem(`href_${histObj.history_table_id}`);
          if (!_.isNil(p_val)) {
            willIDDefault = p_val;
          }
        }

        onCrtHistId(willIDDefault, _.get(config_other, "is_force"));
      } else {
        onCrtHistId(histObj.crtHistId, _.get(config_other, "is_force"));
      }
      if (adjustAuto) {
        gutils.defer(() => {
          checkAfterLoadedData();
        });
      }
    } catch (e) {
      onisLoadingForRefreshHist(false);
      throw e;
    }
  };

  useEffect(() => {
    console.log("opt-panel useEffect", gstore.localSettings.currentWorkspaceId);
    gutils.defer(() => {
      refreshHistoryList();
    });
    return () => {};
  }, [gstore.localSettings.currentWorkspaceId]);

  window.okkkkk = props;
  let fn_delete_crt_tab = async (e) => {
    console.log("running e", e);
    if (_.isNil(histObj.crtHistId)) {
      gutils.alert("No selected tab to be deleted");
      return;
    }
    if (p_mode()) {
      let res100 = await localforge.getItem(key_LIST + history_table_id);
      if (_.isNil(res100)) {
        res100 = [];
      }
      let newarr = [];
      for (let a of res100) {
        if (a.ID == histObj.crtHistId) {
          await localforge.removeItem(
            fn_getRecordIDKeyName(history_table_id, a.ID)
          );
        } else {
          newarr.push(a);
        }
      }
      await localforge.setItem(key_LIST + history_table_id, newarr);
      onCrtHistId(_.get(newarr, [0, "ID"]), true);
    } else {
      await gutils.opt("/hist/delete_hist_data_by_table_id", {
        TABLE_ID: history_table_id,
        ID: histObj.crtHistId,
      });
    }
    let nextID = _.get(histObj.totalHistArr, "0.ID");
    if (!_.isNil(nextID)) {
      onCrtHistId(nextID, true);
    }

    await refreshHistoryList();
  };
  let fn_delete_all_tabs = async () => {
    if (!gutils.confirm("Do you want to delete all tabs?")) {
      return;
    }
    if (p_mode()) {
      let res100 = await localforge.getItem(key_LIST + history_table_id);
      if (_.isNil(res100)) {
        res100 = [];
      }
      let newarr = [];
      for (let a of res100) {
        if (true) {
          await localforge.removeItem(
            fn_getRecordIDKeyName(history_table_id, a.ID)
          );
        } else {
        }
      }
      await localforge.setItem(key_LIST + history_table_id, newarr);
    } else {
      await gutils.opt("/hist/clean_hist_data_by_table_id", {
        TABLE_ID: history_table_id,
        ID: histObj.crtHistId,
      });
    }
    await refreshHistoryList();
  };
  let fn_create_new_tab = async () => {
    await createNewHistoryFunc();
    await refreshHistoryList();
  };
  window.new_tab_panel_view = fn_create_new_tab;
  let fn_save_content = () => {
    props.saveCurrentTab();
  };
  let fn_rename_tab = (rename_args = {}) => {
    _.every(histObj.totalHistArr, (x, d, n) => {
      if (x.ID == histObj.crtHistId) {
        let directChange = rename_args && rename_args.directChange;
        if (directChange) {
          // do nothing
        } else {
          gstore.databaseAllData.overlay_updateTabInfo.open = true;
        }
        let addModel = gstore.databaseAllData.tabInfoPageData.addModel;
        addModel.ID = x.ID;
        addModel.TAB_NAME = x.TAB_NAME || t(`tab-{0}`, x.ID);
        window.update_for_tab_item = async () => {
          console.log(
            "ready update tab item only",
            addModel.ID,
            addModel.TAB_NAME
          );
          if (rename_args && rename_args.fn_directModifyModel) {
            rename_args.fn_directModifyModel(addModel);
          }
          if (p_mode()) {
            // own record
            let suchkeyname = fn_getRecordIDKeyName(
              history_table_id,
              addModel.ID
            );
            let preval = await localforge.getItem(suchkeyname);
            if (_.isNil(preval)) {
              return;
            }
            preval.TAB_NAME = addModel.TAB_NAME;
            await localforge.setItem(suchkeyname, preval);
            // list
            // let res100 = await localforge.getItem(key_LIST + history_table_id);
            // if (_.isNil(res100)) {
            //   res100 = [];
            // }
            // res100.push({
            //   ...history_table_id
            // })
          } else {
            await gutils.opt("/hist/update-tab-by-id", {
              ID: addModel.ID,
              TAB_NAME: addModel.TAB_NAME,
              history_table_id: history_table_id,
              TABLE_ID: history_table_id,
            });
          }
          await refreshHistoryList(false);
          gstore.databaseAllData.overlay_updateTabInfo.open = false;
          await gutils.alertOk("Tab name is updated successfully.");
        };
        if (directChange) {
          window.update_for_tab_item();
        }
        return false;
      }
      return true;
    });
  };
  window.rename_tab_panel_view = fn_rename_tab;
  let fn_refresh_tabs = () => {
    refreshHistoryList(true, {
      is_force: true,
    });
  };
  // crtStoreName

  let arg_crtStoreName = props.crtStoreName;

  todo_read_putils.getCtxPUtils(
    { crtStoreName: arg_crtStoreName },
    (crt_putils) => {
      window.updating_that_crt_putils = { crt_putils };
      crt_putils["fn_rename_tab"] = fn_rename_tab;
      crt_putils["fn_refresh_tabs"] = fn_refresh_tabs;
      crt_putils["fn_delete_all_tabs"] = fn_delete_all_tabs;
      crt_putils["fn_direct_rename_tab"] = async ({ name }) => {
        return fn_rename_tab({
          directChange: true,
          fn_directModifyModel: (addModel) => {
            addModel.TAB_NAME = name;
          },
        });
      };
    }
  );

  let MyHistoryPanel = [];
  let nonTodayCtn = 0;
  let todayCtn = 0;
  let allCtn = _.size(histObj.totalHistArr);
  _.forEach(histObj.totalHistArr, (x, d, n) => {
    if (x["IS_TODAY"] == 1) {
      todayCtn++;
    } else {
      nonTodayCtn++;
    }
  });

  if (_.isEmpty(user_opt_arr)) {
    isConfigHide = true;
  }
  let isLeftAllHide = isConfigHide && isTabHide;
  if (props.onlyMainRightView) {
    isLeftAllHide = true;
  }
  function fn_for_each_child(eachChild, eachChildIdx, crtStoreName) {
    let fn_btn = (eachChild, eachChildIdx) => {
      console.log("eachChild", eachChild);
      if (eachChild.initFn) {
        gutils.defer(() => {
          eachChild.initFn();
        });
      }
      return React.createElement(eachChild.tag || Button, {
        small: true,
        key: eachChildIdx,
        loading:
          eachChild.loadable && _.isNil(eachChild.loading)
            ? gstore.common_app[arg_crtStoreName].loading_beautify
            : false,
        text: eachChild.label,
        ...eachChild,
      });
    };
    let mybtn = fn_btn(eachChild, eachChildIdx);
    if (eachChild.nextType == "pop") {
      return (
        <Popover minimal={true} placement="bottom">
          {mybtn}
          <Menu className={Classes.ELEVATION_1}>
            {_.map(eachChild.nextBtns, (eachBtn, eachBtnIdx) => {
              return fn_btn(
                {
                  ...eachBtn,
                  tag: MenuItem,
                  desc_label: "",
                  label: "",
                  text: eachBtn.label,
                },
                eachBtnIdx
              );
            })}
          </Menu>
          {/* <ButtonGroup>
          </ButtonGroup> */}
        </Popover>
      );
    }
    return mybtn;
  }
  window.fn_refresh_tabs = fn_refresh_tabs;
  let btn_topJSX_in = React.createElement(props.configJsx, {
    viewerConfig: MyHistoryPanel,
    renderFn: (__NOUSE, xx_obj) => {
      let { crtStoreName } = xx_obj;
      let crtStore_1 = gstore.common_app[crtStoreName];
      if (!_.isNil(crtStore_1)) {
        crtStore_1.fn_refresh_tabs = fn_refresh_tabs;
      }
      console.log("user_opt_arr", user_opt_arr);
      finalUserOptArr = user_opt_arr;
      return _.map(user_opt_arr, (eachOpt) => {
        return (
          <div key={eachOpt.label} className="tc-config-item">
            <div className="tc-config-item-title">{eachOpt.label}</div>
            <div className="tc-config-item-content">
              {_.map(eachOpt.children, (x, d, n) => {
                return fn_for_each_child(x, d, crtStoreName);
              })}
            </div>
          </div>
        );
      });
    },
  });

  let btn_topJSX = React.useMemo(() => {
    return btn_topJSX_in;
  }, [
    _.size(finalUserOptArr),
    _.get(gstore.common_app, [props.crtStoreName, "wordWrap"]),
  ]);

  console.log("finalUserOptArr", finalUserOptArr);

  // let r_btmJsx = React.memo(() => {
  //   return (

  //   );
  // }, [_.size(histObj.totalHistArr), histObj.totalHistArr, histObj.crtHistId]);

  let r_tab_obj = React.useMemo(() => {
    return {
      value: val_tabs.value,
      list: left_hist_use_all
        ? [
            {
              label: t("ALL") + `(${allCtn})`,
              closable: false,
              id: "all",
            },
          ]
        : [
            {
              label: t("Today") + `(${todayCtn})`,
              id: "today",
              closable: false,
            },
            {
              label: t("History") + `(${nonTodayCtn})`,
              id: "history",
              closable: false,
            },
          ],
    };
  }, [val_tabs.value, left_hist_use_all, allCtn]);

  let btmJsx = (
    <div className="my-top-box">
      <div
        className={
          "my-top-title mytopleft " + (isConfigHide ? " no-border-top " : "")
        }
      >
        <span>{t("Tabs")}</span>
        <span className="myrightbtnview btnview">
          <MinusButton
            onClick={() => {
              gstore.localSettings[all_display_optkeys.tabs] = "hidden";
              gutils.saveLocalSettings(gstore.localSettings);
            }}
          />
        </span>
      </div>
      <div
        className="my-top-ctn"
        style={{
          ...(p_mode() && !is_sign_in()
            ? {
                // filter: `blur(30px)`,
                // position: "relative",
              }
            : {}),
        }}
      >
        {/* {false && p_visitor_mode() ? (
          <div
            style={{
              position: "absolute",
              top: 0,
              background: "var(--app-bg-white)",
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 13,
              padding: "12px 11px",
            }}
          >
            <FormGroup
              label={t(`Enable More Features`)}
              helperText={t(
                `Since you're currently in visitor status, it means that CodeGen will not save your data or upload files unless you signed in toolbox. To enjoy more features at CodeGen Online ToolBox, please sign in or sign up your own account.`
              )}
            >
              <p>
                <Button
                  onClick={() => {
                    gstore.user.overlayForLogin.open = true;
                  }}
                  intent="primary"
                  text={t(`Sign in`)}
                ></Button>
                <Button
                  style={{ marginLeft: "5px" }}
                  intent="none"
                  onClick={() => {
                    window.open(`https://codegen.cc/user/sign-up`);
                  }}
                  text={t(`Sign up`)}
                ></Button>
              </p>
            </FormGroup>
            <FormGroup
              label={t(`Benefits of signing in ToolBox`)}
              helperText={t(
                `Only limited to CodeGen Online ToolBox, please be noted that CodeGen Offline ToolBox hasn't been supported its cloud features yet so far.`
              )}
            >
              <p className="bp3-text-small bp3-text-muted">
                <div>
                  <ul>
                    <li>{t(`Synchronize All Data`)}</li>
                    <li>{t(`Synchronize All History`)}</li>
                    <li>{t(`Synchronize All Settings`)}</li>
                    <li>{t(`Support Multiple Tabs View Mode`)}</li>
                    <li>{t(`Cloud Dev Environment`) + t(`(TBC)`)}</li>
                    <li>{t(`Cloud Notes and Files`) + t(`(TBC)`)}</li>
                    <li>{`......`}</li>
                  </ul>
                </div>
              </p>
              <div></div>
            </FormGroup>
          </div>
        ) : (
          ""
        )} */}
        <GTabs
          small={true}
          calcAutoHeight={true}
          noAllowAutoAdjust={true}
          noOptBtn={true}
          defaultViewTitle={"Overview"}
          defaultViewJsx={<div>empty</div>}
          mapid="gtabs"
          closeAll={async function (node) {
            //
          }}
          onRemove={async function (node) {}}
          onChangeTab={(x) => {
            val_tabs.value = x;
          }}
          obj={r_tab_obj}
          renderTabPane={(x, d, n) => {
            let todaypanel = x.id == "today";
            return (
              <div className="all-hist-wrapper">
                <div className="hist-global-wrapper">
                  {_.map(
                    _.filter(histObj.totalHistArr, (x, d, n) => {
                      if (left_hist_use_all) {
                        return true;
                      }
                      return todaypanel
                        ? x["IS_TODAY"] == 1
                        : x["IS_TODAY"] == 0;
                    }),
                    (x, d, n) => {
                      return (
                        <div
                          key={x.ID}
                          onClick={() => {
                            onCrtHistId(x.ID, true);
                          }}
                          className={
                            " hist-each-item-wrapper " +
                            (x.ID == histObj.crtHistId
                              ? "active-hist-item"
                              : "")
                          }
                          title={
                            "ID:" +
                            x.ID +
                            ", " +
                            "Create Time: " +
                            x.CREATE_TIME_STR
                          }
                        >
                          <div className="my-left">
                            {x.TAB_NAME ? x.TAB_NAME : t(`tab-{0}`, x.ID)}
                          </div>
                          <div className="my-right">{x.CREATE_TIME_DESC}</div>
                        </div>
                      );
                    }
                  )}
                </div>

                <div className="hist-action-wrapper">
                  <ButtonGroup
                    minimal={true}
                    outline={true}
                    outlined={true}
                    small={true}
                  >
                    <Button
                      style={{
                        display: gstore.localSettings.app_left_to_right_mode
                          ? null
                          : "none",
                      }}
                      title={t(`Adjusting the location of this panel`)}
                      onClick={() => {
                        gstore.localSettings.is_disable_using_center_layout =
                          !gstore.localSettings.is_disable_using_center_layout;
                      }}
                      icon={
                        gstore.localSettings.is_disable_using_center_layout
                          ? "align-center"
                          : "align-left"
                      }
                      small={true}
                    ></Button>
                  </ButtonGroup>

                  <ButtonGroup
                    minimal={true}
                    outline={true}
                    outlined={true}
                    small={true}
                    // fill={true}
                  >
                    {[
                      {
                        icon: "add-to-artifact",
                        title: t("Create New Tab"),
                        onClick: fn_create_new_tab,
                      },
                      {
                        icon: "edit",
                        title: t("Rename Tab"),
                        onClick: fn_rename_tab,
                      },
                      {
                        icon: "floppy-disk",
                        title: t("Save Content"),
                        onClick: fn_save_content,
                        loading: props.logicRoot.hist.isLoadingForSaveHist,
                      },
                      {
                        icon: "refresh",
                        title: t("Refresh Tabs"),
                        // loading: isLoadingForRefreshHist,
                        loading: false,
                        onClick: fn_refresh_tabs,
                      },
                      {
                        icon: "trash",
                        title: t("Delete Current Tab"),
                        onClick: fn_delete_crt_tab,
                      },
                      {
                        icon: "cog",
                        title: t("Manage All Tabs"),
                        onClick: () => {
                          //
                          gutils.w_alertMsgGlobal(
                            _.merge({
                              noBackdrop: false,
                              icon: "cog",
                              style: {
                                width: "300px",
                                height: "240px",
                              },
                              otherJSX: {
                                noBackdrop: false,
                              },
                              s_clzname: "white-app-view-no-pad",
                              title: `Manage All Tabs`,
                              jsx: () => {
                                return (
                                  <div
                                    style={{
                                      width: "100%",
                                      height: "calc(100% - 30px)",
                                      overflow: "hidden",
                                    }}
                                  >
                                    <Button
                                      intent="danger"
                                      text={t(`Delete All Tabs`)}
                                      onClick={fn_delete_all_tabs}
                                    ></Button>
                                  </div>
                                );
                              },
                              noFoot: true,
                              resize: false,
                            })
                          );
                        },
                      },
                    ].map((x) => {
                      return (
                        <Button
                          loading={x.loading}
                          key={x.icon}
                          // {...x}
                          title={x.title}
                          onClick={x.onClick}
                          icon={x.icon}
                          // className={Classes.MINIMAL}
                          small={true}
                          // outlined={true}
                          // minimal={true}
                        ></Button>
                      );
                    })}
                  </ButtonGroup>
                </div>
              </div>
            );
          }}
        />
      </div>
    </div>
  );

  let g_leftJsx = (
    <HalfResizeForTwo
      containerClz="fixheight g-center-container"
      heightValue={gstore.localSettings[props.resizeKey + "left"]}
      onHeightValue={(val) => {
        gstore.localSettings[props.resizeKey + "left"] = val;
      }}
      isTopHide={isConfigHide}
      isBtmHide={isTabHide}
      defaultPercent={props.defaultPercent || 0.4}
      topJsx={
        isConfigHide ? (
          <div></div>
        ) : (
          <div className="my-top-box">
            <div className="my-top-title  no-border-top mytopleft">
              <span>{t("Configuration")}</span>
              <span className="myrightbtnview btnview">
                <MinusButton
                  onClick={() => {
                    gstore.localSettings[all_display_optkeys.config] = "hidden";
                    gutils.saveLocalSettings(gstore.localSettings);
                  }}
                />
              </span>
            </div>
            <div className="my-top-ctn">{btn_topJSX}</div>
          </div>
        )
      }
      btmJsx={btmJsx}
    ></HalfResizeForTwo>
  );
  let mmRef = React.useMemo(() => {
    return props.rightJsx;
  }, [histObj.isLoadingForRefreshHist, histObj.isLoadingWhenChangeId]);

  let is_left_to_right_mode = gstore.localSettings.app_left_to_right_mode;
  let is_top_to_bottom_mode = !is_left_to_right_mode;
  let ThatTagForFirstLayer = HalfResizeForTwoHorizontal;
  let prop_my_root_content = {
    leftClz: "opt-left-panel ",
    rightClz: "opt-right-panel",
    rightStyle: {
      border: props.noPadView ? "none" : null,
      borderLeft: isLeftAllHide ? "none" : null,
    },
    leftStyle: {
      border: props.noPadView ? "none" : null,
    },
    value: myvalue,
    onChg: (val) => {
      gstore.localSettings[props.resizeKey] = val;
    },
    isLeftAllHide: isLeftAllHide,
    leftJsx: g_leftJsx,
    rightJsx: (
      <HandlerClz>
        {_.isFunction(mmRef) ? React.createElement(observer(mmRef)) : mmRef}
      </HandlerClz>
    ),
    defaultPercent: null,
    noAutoResize: true,
  };

  let my_root_content = <ThatTagForFirstLayer {...prop_my_root_content} />;
  let fixing_value = "250px";
  if (
    props.innerJSX &&
    !gstore.localSettings.is_disable_using_center_layout &&
    !isLeftAllHide
  ) {
    my_root_content = (
      <HalfResizeForThreeHorizontal
        containerClz="g-inner-jsx-wrapper"
        parent_style={{ width: "100%", height: "100%" }}
        midRightPercent={(_1, { boxEle }) => {
          let fin_w = fixing_value;
          console.log("sys-lr-midright", { fin_w, boxEle });
          return parseInt(fin_w);
          // let crt_w = boxEle.outerWidth(true);
          // return parseInt(crt_w - fixing_value + "px");
        }}
        leftMidPercent={(_1, { boxEle }) => {
          let crt_w = boxEle.outerWidth(true);
          let fin_w =
            parseInt(
              (crt_w - parseInt(fixing_value)) / 2
              // * (1 - 0.618)
            ) + "px";
          console.log("sys-lr-leftmid", { crt_w, fin_w });
          return parseInt(fin_w) * 0.97;
        }}
        resizekey={props.resizeKey + "innerJSX_2"}
        leftJsx={_.get(props, "innerJSX.leftJsx")}
        midJsx={isLeftAllHide ? "" : g_leftJsx}
        rightJsx={props.innerJSX.rightJsx}
      ></HalfResizeForThreeHorizontal>
    );
  }
  let finalTopBoxStyle = {};
  if (is_top_to_bottom_mode && !_.isNil(props.innerJSX)) {
    console.log(`using mode change jsx`);
    let actions_user_arr = _.find(user_opt_arr, (x) => x.g_type == `actions`);
    let source_user_arr = _.find(user_opt_arr, (x) => x.g_type == `sources`);
    let option_user_arr = _.find(user_opt_arr, (x) => x.g_type == `options`);
    let helpBtns = [];
    let pureOptUserArr = _.filter(
      _.get(actions_user_arr, "children"),
      (x, d, n) => {
        if (x.icon && _.isNil(x.label)) {
          helpBtns.push(x);
          return false;
        } else {
          return true;
        }
      }
    );
    let pure_pre_arr = [
      ...((source_user_arr || []).children || []),
      ...((option_user_arr || []).children || []),
    ];
    let line_wrap = null;
    console.log(`pure_pre_arr`, pure_pre_arr);
    window.test_pure_pre_arr = pure_pre_arr;
    let is_that = (x) =>
      x.n_type == "swap_source" ||
      x.n_type == "clean" ||
      x.n_type == "upload" ||
      x.n_type == "show_example";
    _.filter(pure_pre_arr, (x, d, n) => {
      if (is_that(x)) {
        pureOptUserArr.push(x);
      }
      if (x.n_type == "line_wrap") {
        line_wrap = x;
      }
    });

    let filteredWithMoreUserOptArr = [];
    if (!_.isNil(line_wrap)) {
      filteredWithMoreUserOptArr.push({
        label: t(`Options`),
        children: [line_wrap],
      });
    }
    let extraNonBtnArr = [];
    _.map(user_opt_arr, (x, d, n) => {
      if (
        x.g_type == "actions" ||
        x.g_type == "sources" ||
        x.g_type == "options"
      ) {
        return;
      }
      let children = _.filter(x.children, (xx) => {
        let notAddedItem =
          _.isNil(xx.label) ||
          (_.findIndex(
            pureOptUserArr,
            (xxx) => xxx.label == xx.label || xxx.label == x.label
          ) == -1 &&
            _.findIndex(
              helpBtns,
              (xxx) => xxx.label == xx.label || xxx.label == x.label
            ) == -1);
        if (notAddedItem) {
          // true || xx.tag
          // xx.label &&
          if (!is_that(xx)) {
            // xx.tag != AnchorButton && xx.tag != Button
            if (
              x.g_type != "options" &&
              xx.icon != "help" &&
              xx.sys_internal != true
            ) {
              extraNonBtnArr.push({
                ...xx,
                // _.isNil(xx.tag) ? x.label :
                label: xx.label || x.label,
                parent_label: x.label,
              });
              // xx.label == x.label && !_.isNil(x.label)
              //       ? t("Tools")
              return false;
            }
          }
        }
        return notAddedItem;
      });

      if (!_.isEmpty(children)) {
        children = _.filter(children, (x) => !_.isNil(x.label));
        if (!_.isEmpty(children)) {
          filteredWithMoreUserOptArr.push({
            label: x.label,
            children: children,
          });
        }
      }
    });
    extraNonBtnArr = _.filter(extraNonBtnArr, (x, d, n) => {
      return !is_that(x);
    });
    window.test_extraNonBtnArr = extraNonBtnArr;

    let onlyPrimaryUser = _.filter(
      pureOptUserArr,
      (x) => x.intent == "primary"
    );
    let limitVal = 4;
    if (_.size(onlyPrimaryUser) >= limitVal) {
      let nonPrimaryUser = _.filter(
        pureOptUserArr,
        (x) => x.intent != "primary"
      );
      let finalPrimaryUser = [];
      for (let eachIndex in onlyPrimaryUser) {
        if (eachIndex < limitVal) {
          finalPrimaryUser.push(onlyPrimaryUser[eachIndex]);
        } else {
          extraNonBtnArr.push({
            ...onlyPrimaryUser[eachIndex],
          });
        }
      }
      pureOptUserArr = [...finalPrimaryUser, ...nonPrimaryUser];
    }

    let isMultipleJSXLines = !_.isEmpty(extraNonBtnArr);
    let single_fixing_value = "40px";
    fixing_value = single_fixing_value;
    if (isMultipleJSXLines) {
      fixing_value = "80px";
    }
    let eachLineStyle = {
      display: "flex",
      height: single_fixing_value,
      padding: "0 13px",
      alignItems: "center",
      overflow: "hidden!important",
      justifyContent: "space-between",
      background: "var(--app-bg-f5f8fa-2)",
    };
    //
    my_root_content = (
      <HalfResizeForThree
        containerClz="g-inner-jsx-wrapper-vertical"
        resizekey={props.resizeKey + "innerJSX_3"}
        defaultPercent={0.5}
        isTopHide={false}
        isBtmHide={false}
        needBorderTop={true}
        needBorderBetween={true}
        topJsx={props.innerJSX.leftJsx}
        midJsx={[
          isMultipleJSXLines ? (
            <div
              style={{
                ...eachLineStyle,
                borderBottom: `1px solid var(--app-bg-border-e3e3e2)`,
              }}
              key="top"
            >
              <div className="sub-mr-5 sub-all-dis-inline">
                {_.map(extraNonBtnArr, (x, d, n) => {
                  return (
                    <FormGroup
                      style={{
                        margin: "0px",
                        display: "inline-flex",
                        alignItems: "center",
                        marginRight: "10px",
                      }}
                      label={
                        x.tag == Button || x.tag == AnchorButton
                          ? ""
                          : t(x.parent_label || x.label)
                      }
                      inline={true}
                    >
                      {fn_for_each_child(x, d)}
                    </FormGroup>
                  );
                })}
                {/* <FormGroup
                  style={{ margin: "0px" }}
                  label={t(`Source Language`)}
                  inline={true}
                >
                  <Html_select
                    list={[
                      {
                        label: t(`Auto`),
                        value: "auto",
                      },
                    ]}
                  />
                </FormGroup> */}
              </div>
              {/* <div className="sub-ml-5">right</div> */}
            </div>
          ) : null,
          <div style={eachLineStyle} key="btm">
            <div className="sub-mr-5">
              <ButtonGroup>
                {_.map(pureOptUserArr, (eachChild, eachChildIdx) => {
                  return fn_for_each_child(eachChild, eachChildIdx);
                })}
              </ButtonGroup>
            </div>
            <div className="sub-ml-5">
              {!_.isEmpty(filteredWithMoreUserOptArr) ? (
                <Popover minimal={true} placement="bottom">
                  {fn_for_each_child(
                    {
                      label: t(`More Options`),
                      onClick: () => {},
                    },
                    0
                  )}
                  <Menu className={Classes.ELEVATION_1}>
                    {_.map(filteredWithMoreUserOptArr, (eachItem) => {
                      return [
                        <MenuDivider title={eachItem.label} />,
                        ..._.map(eachItem.children, (xxx, ddd) => {
                          return (
                            <MenuItem
                              key={xxx.label}
                              text={xxx.label}
                              icon={xxx.icon}
                              onClick={xxx.onClick}
                            ></MenuItem>
                          );
                        }),
                      ];
                    })}
                  </Menu>
                </Popover>
              ) : (
                ""
              )}{" "}
              {_.map(helpBtns, (x, d, n) => {
                return fn_for_each_child(x, 0);
              })}
            </div>
          </div>,
        ].filter((x) => !_.isNil(x))}
        btmJsx={props.innerJSX.rightJsx}
        parent_style={{ width: "100%", height: "100%" }}
        midRightPercent={(_1, { boxEle }) => {
          let fin_w = fixing_value;
          console.log("sys-lr-midright", { fin_w, boxEle });
          return parseInt(fin_w);
        }}
        leftMidPercent={(_1, { boxEle }) => {
          let crt_h = boxEle.outerHeight(true);
          let fin_h = parseInt((crt_h - parseInt(fixing_value)) / 2) + "px";
          console.log("sys-lr-leftmid", { crt_h, fin_h });
          return parseInt(fin_h) * 0.97;
        }}
      ></HalfResizeForThree>
    );
  }
  let m_key = arg_crtStoreName + "savekey1";
  let isOnlyOneMode =
    gstore.localSettings[`${arg_crtStoreName}_make_no_options`] == "yes";
  let titleIfOnlyOne = "";
  if (isOnlyOneMode) {
    titleIfOnlyOne = t(
      `Currently, the extension will not support creating multiple tab windows as it is using the single configuration`
    );
  }
  console.log("isOnlyOneMode", isOnlyOneMode, arg_crtStoreName);

  let tmpflow = React.useMemo(() => {
    return React.createElement(
      observer(() => {
        return (
          <Popover
            // minimal={true}
            // transitionDuration={0}
            // captureDismiss={false}
            // isOpen={gstore.localSettings[m_key] == "ok"}
            // onClosing={() => {
            //   gstore.localSettings[m_key] == "notok";
            // }}
            lazy={false}
            disabled={isOnlyOneMode}
            usePortal={true}
            key={"keeping_that_saving"}
          >
            <MinusButton
              // onClick={() => {
              //   gstore.localSettings[m_key] =
              //     gstore.localSettings[m_key] == "ok" ? "notok" : "ok";
              // }}
              disabled={isOnlyOneMode}
              title={titleIfOnlyOne}
              icon="multi-select"
            ></MinusButton>
            <div
              onClick={(e) => {
                gutils.stop_e(e);
              }}
              style={{ height: "385px", minWidth: "248px" }}
            >
              {btmJsx}
            </div>
          </Popover>
        );
      })
    );
  }, ["" + gstore.settings[m_key]]);
  let fn_show_hide = (e) => {
    if (!isConfigHide || !isTabHide) {
      gstore.localSettings[all_display_optkeys.tabs] = "hidden";
      gstore.localSettings[all_display_optkeys.config] = "hidden";
    } else {
      gstore.localSettings[all_display_optkeys.tabs] = "show";
      gstore.localSettings[all_display_optkeys.config] = "show";
    }
    gutils.callWhenResize();
    gutils.callWhenResizeInternal();
  };
  window.toggle_tab_panel_view = () => {
    fn_show_hide();
  };
  let g_rightJsx = props.noTitleBar ? (
    my_root_content
  ) : (
    <div className="my-top-box" style={finalTopBoxStyle}>
      <div
        className="my-top-title opt-top-title "
        style={{
          borderTop: gstore.localSettings.app_multiple_tab_mode ? "none" : null,
          display: "flex",
          // borderLeft: isLeftAllHide ? "none" : null,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* <span
          style={{
            display: props.onlyMainRightView ? "none" : null,
          }}
        ></span> */}

        {true || isTabHide || gstore.localSettings.app_multiple_tab_mode ? (
          <span
            style={{
              display: props.onlyMainRightView ? "none" : null,
            }}
          >
            {/* <MinusButton
              // icon="codicon-menu"
              icon={isTabHide ? "menu-open" : "menu-closed"}
              onClick={() => {
                if (!isConfigHide || !isTabHide) {
                  gstore.localSettings[all_display_optkeys.tabs] = "hidden";
                  gstore.localSettings[all_display_optkeys.config] = "hidden";
                } else {
                  delete gstore.localSettings[all_display_optkeys.tabs];
                  delete gstore.localSettings[all_display_optkeys.config];
                }
                gutils.callWhenResize();
                gutils.callWhenResizeInternal();
              }}
            ></MinusButton> */}

            {tmpflow}
            <MinusButton
              icon="add-to-artifact"
              disabled={isOnlyOneMode}
              title={titleIfOnlyOne}
              onClick={() => {
                fn_create_new_tab();
              }}
            ></MinusButton>
            {/* <MinusButton
              icon="trash"
              onClick={(e) => {
                fn_delete_crt_tab(e);
              }}
            ></MinusButton> */}
          </span>
        ) : (
          <span></span>
        )}
        <span className="top-center-title">{props.rightTitle}</span>
        <span
          className=""
          style={{
            display: props.onlyMainRightView ? "none" : null,
          }}
        >
          <MinusButton
            icon="refresh"
            onClick={(e) => {
              fn_refresh_tabs(e);
            }}
          ></MinusButton>
          <MinusButton
            // icon="codicon-menu"
            icon="cog"
            onClick={(e) => {
              ContextMenu.show(
                <Menu>
                  <MenuDivider title={t("Global Settings")} />

                  {_.isNil(window.FnAppMultipleTab)
                    ? ""
                    : React.createElement(window.FnAppMultipleTab, {
                        mtag: MenuItem,
                        text: !gstore.localSettings.app_multiple_tab_mode
                          ? t(`Switch to Browser Mode`)
                          : t(`Switch to Integrated Mode`),
                        noIntent: true,
                      })}

                  <MenuItem
                    icon={`publish-function`}
                    text={t(
                      gstore.localSettings.appTypeView != "no-nav"
                        ? `Use FullScreen View`
                        : `Use Non-FullScreen View`
                    )}
                    // intent={
                    //   gstore.localSettings.appTypeView == "no-nav"
                    //     ? "primary"
                    //     : "none"
                    // }
                    onClick={fn_full_or_not_full}
                  />
                  {truncate ? (
                    <MenuItem
                      onClick={() => {
                        gstore.localSettings.app_left_to_right_mode =
                          !gstore.localSettings.app_left_to_right_mode;
                      }}
                      intent={"none"}
                      icon={"rotate-page"}
                      text={
                        gstore.localSettings.app_left_to_right_mode
                          ? t(`Use Top to Bottom Layout`)
                          : t(`Use Left to Right Layout`)
                      }
                    />
                  ) : (
                    ""
                  )}
                  <MenuDivider title={t("Global Behaviours")} />
                  <MenuItem
                    icon={`circle-arrow-down`}
                    text={t(
                      gstore.localSettings.should_always_consume_mousewheel
                        ? `Enable ScrollPage Mode in Text Editor`
                        : `Disable ScrollPage Mode in Text Editor`
                    )}
                    onClick={async (e) => {
                      gstore.localSettings.should_always_consume_mousewheel =
                        !gstore.localSettings.should_always_consume_mousewheel;
                      await gutils.saveLocalSettings(gstore.localSettings);
                      setTimeout(() => {
                        location.reload();
                      }, 1000);
                    }}
                  />
                  <MenuDivider title={t("Internal Settings")} />
                  <MenuItem
                    icon={`key-option`}
                    // intent={isConfigHide || isTabHide ? "primary" : "none"}
                    text={
                      isConfigHide || isTabHide
                        ? t("Show Tabs Panel")
                        : t("Hide Tabs Panel")
                    }
                    onClick={fn_show_hide}
                  />
                  <MenuItem
                    onClick={() => {
                      delete gstore.localSettings[all_display_optkeys.tabs];
                      delete gstore.localSettings[all_display_optkeys.config];
                    }}
                    intent={"none"}
                    icon={"redo"}
                    text={t(`Restore Layout`)}
                  />

                  {props.right_menu_arr || []}
                  <MenuDivider title={t("About This Extension")} />
                  <MenuItem
                    onClick={async () => {
                      //
                      await gutils.win_alert(
                        t(
                          `We beg your pardon if you encountered any issues while using this extension, such as incorrect generated results, uncomfortable layout, or anything else. We tried our best to completely test each version before releasing it, but it’s hard to say that there's no bug in the newer version.   For any support or issue, please tell us via E-Mail work7z@outlook.com or our other contacts on our official website.`
                        )
                      );
                    }}
                    intent={"none"}
                    icon={"locate"}
                    text={t(`Report Bug`)}
                  />
                </Menu>,
                { left: e.clientX, top: e.clientY },
                () => {}
              );
            }}
          />
        </span>
      </div>
      <div className="my-top-ctn">{my_root_content}</div>
    </div>
  );

  if (gutils.dev()) {
  }
  let ctx = useContext(window.MyContext);
  console.log("ctx100", _.cloneDeep(ctx));
  return (
    <div
      className="operation-panel"
      myval={refNum}
      style={
        !gstore.localSettings.app_multiple_tab_mode
          ? {}
          : gstore.sysinfo.unlimited_app_obj[arg_crtStoreName]
          ? {}
          : ctx.pop === true
          ? {}
          : {
              height: "730px",
              minHeight: "730px",
              maxHeight: "730px",
            }
      }
    >
      {g_rightJsx}
    </div>
  );
});

export default OperationPanel;
