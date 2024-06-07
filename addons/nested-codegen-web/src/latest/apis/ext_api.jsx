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
import { Resizable } from "re-resizable";

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
window.allPluginsObj = {};
let updateAndCall = () => {
  gstore.ext.sub_menu = window.allPluginsObj;
  gstore.sysinfo.updateMenuCount++;
};
window.updateAndCall = updateAndCall;

window.allExtMenuAndState = {};

const myapi = {
  initAllPlugins() {
    let init_refresh_function = async () => {
      // if (_.isNil(window.before_roadmap)) {
      //   window.before_roadmap = _.cloneDeep(gstore.roadmap.get());
      // } else {
      //   gstore.overwrite_roadmap = _.cloneDeep(window.before_roadmap);
      // }
      try {
        let {
          content: { menu },
        } = await gutils.opt(`/env_init/read_menu_json`);
        if (!_.isEmpty(menu)) {
          _.merge(allPluginsObj, menu);
          updateAndCall();
        } else {
          window.mustMenuReload = true;
        }
      } catch (e) {
        console.log("error", e);
      }
      let myextlist = await n_ext.plugins.readList();
      if (
        !_.isNil(gstore.localSettings.lastExtSize) &&
        gstore.localSettings.lastExtSize != _.size(myextlist)
      ) {
        if (-1 != gstore.localSettings.lastExtSize) {
          window.mustMenuReload = true;
        }
        gstore.localSettings.lastExtSize = _.size(myextlist);
      }
      gstore.ext.dev.extList = _.map(
        _.filter(myextlist, (x) => x != "example"),
        (x) => ({
          label: x,
          value: x,
        })
      );
      if (_.isNil(gstore.localSettings.extIndex)) {
        gstore.localSettings.extIndex = _.get(
          gstore.ext.dev.extList,
          "0.value"
        );
      }
      let myarr_all = [];
      let must_do_it = _.isEmpty(window.allPluginsObj);
      for (let x of gstore.ext.dev.extList) {
        // !p_mode() ||
        // gutils.dev() ||
        // DO NOT REMOVE THIS DUE TO LEFT_MENU.json
        if (true || !gutils.dev()) {
          if (
            // gutils.dev() ||
            localStorage.getItem(`need_refresh_now`) ||
            window.mustMenuReload ||
            must_do_it
          ) {
            try {
              await myapi.initSinglePlugins(x.value);
              window["info_" + x.value] = "inited";
            } catch (e) {
              console.log(e);
            }
          }
        }
      }
      localStorage.removeItem(`need_refresh_now`);
      for (let eachval of myarr_all) {
        try {
          await eachval;
        } catch (e) {
          console.log(e);
        }
      }
      if (
        gutils.dev() ||
        (gutils.dev() && (must_do_it || window.mustMenuReload))
      ) {
        if (!p_mode()) {
          await gutils.opt("/env_init/save_menu_json", {
            menu: _.mapValues(
              _.pickBy(window.allPluginsObj, (x, d, n) => {
                return x.hideThisPage != true;
              }),
              (x, d, n) => {
                // let finok = {
                //   ...x,
                //   arr: x.rawArr || x.arr,
                // };
                // delete finok["rawArr"];
                function iterateTreeForRoadMap(
                  arr,
                  loopFunc,
                  nextKey = "children"
                ) {
                  return _.map(arr, (x, d, n) => {
                    if (_.isNil(x)) {
                      return null;
                    }
                    loopFunc(x, d, n);

                    if (x[nextKey]) {
                      x[nextKey] = iterateTreeForRoadMap(
                        x[nextKey],
                        loopFunc,
                        nextKey
                      );
                    }
                    return x;
                  });
                }
                let finok = _.cloneDeep(x);
                finok.arr = iterateTreeForRoadMap(finok.arr, (x, d, n) => {
                  if (x.label) {
                    let crtlabel = x.label;
                    let myfinkey = _.findKey(
                      window.pkgInfo.i18n.zh_CN,
                      (x) => x == crtlabel
                    );
                    if (!_.isNil(myfinkey)) {
                      x.label = myfinkey;
                      crtlabel = x.label;
                    }
                    myfinkey = _.findKey(
                      window.pkgInfo.i18n.zh_CN_overwrite,
                      (x) => x == crtlabel
                    );
                    if (!_.isNil(myfinkey)) {
                      x.label = myfinkey;
                      crtlabel = x.label;
                    }
                  }
                  return x;
                });
                return finok;
              }
            ),
          });
        }
      }
      updateAndCall();
      if (window.refresh_now_plugin) {
        window.refresh_now_plugin();
      }
    };
    init_refresh_function();
    window.init_refresh_function = init_refresh_function;
    window.refreshCrtFunction = async () => {
      localStorage.setItem(`need_refresh_now`, "1");
      await window.updateLangFunc();
      myapi.initSinglePlugins(gstore.localSettings.extIndex, {
        force_refresh_dev: "1",
      });
    };

    // window.refresh_now_plugin = () => {
    //   init_refresh_function();
    // };
  },
  initSinglePlugins(id, x_args = {}) {
    if (!gutils.dev()) {
      if (window["init-before2" + id]) {
        return;
      } else {
        window["init-before2" + id] = "1";
      }
    }
    if (true) {
      // return;
    }
    let props = {
      id: id,
    };
    let { crtStoreName_underline, crtStoreName } =
      window.getCrtStoreInfoByPluginId(id);
    let crt_store = gstore.ext.init[id];
    if (_.isNil(crt_store)) {
      crt_store = {
        hideThisPage: false,
        message: [],
        loading: true,
      };
      gstore.ext.init[id] = crt_store;
    }
    let fn_refresh_plugin = async () => {
      if (!gutils.dev()) {
        if (window["init-before" + props.id]) {
          return;
        } else {
          window["init-before" + props.id] = "1";
        }
      }
      crt_store.loading = true;
      try {
        crt_store.message = ["Initializing the extension"];
        crt_store.message.push("Extension ID: " + props.id);
        let pluginDetail = await n_ext.plugins.getDetailById(props.id);
        var { entryJs, entryCss, dir, timestamp } = pluginDetail;
        // console.log("pluginDetail", pluginDetail);
        gutils.once("refresh-" + props.id, () => {
          if (gutils.dev()) {
            // let lastTimestamp = null;
            // gutils.run_async_loop(async () => {
            //   if (gstore.localSettings.extIndex != props.id) {
            //     return;
            //   }
            //   let crt_timestmap = await n_ext.plugins.getUpdateValue(dir.root);
            //   if (crt_timestmap != -1 && crt_timestmap != lastTimestamp) {
            //     console.log("update timestamp", crt_timestmap);
            //     lastTimestamp = crt_timestmap;
            //     if (window.refresh_now_plugin) {
            //       window.refresh_now_plugin();
            //     }
            //   }
            // }, 2000);
          }
        });
        crt_store.message.push("Extension Going Logic: " + _.size(entryJs));
        crt_store.message.push(
          "Extension Root Directory: " + (dir.root || "base")
        );
        crt_store.message.push(
          "Extension FrontEnd Directory: " + (dir.frontend || "base")
        );
        crt_store.message.push(
          "Extension BackEnd Directory: " + (dir.backend || "base")
        );
        crt_store.finished = true;

        // entryJs = entryJs.replace(/ROOT_EXTENSION_ADDONS/g, props.id);

        window.eval(entryJs);

        let preEleFound = $(document.body).find(
          `[data-sid="${crtStoreName_underline}"]`
        );
        if (preEleFound.length != 0) {
          preEleFound.text(entryCss);
          // debugger;
        } else {
          let ele = $("<style></style>");
          // ele.attr("u", Math.random());
          ele.attr("data-sid", crtStoreName_underline);
          ele.text(entryCss);
          $(document.body).append(ele);
          // debugger;
        }

        if (gutils.dev() && props.id == gstore.localSettings.extIndex) {
          await gutils.opt("/ext/integrating", {
            ...(x_args || {}),
            is_first_in_page: window["is_first_in_page" + props.id],
            // frontend: dir.frontend,
            // backend: dir.backend,
            // root: dir.root,
            id: props.id,
          });
        }
        // let res = await gutils.opt("/ext/integrating", {
        //   ...(x_args || {}),
        //   is_first_in_page: window["is_first_in_page" + props.id],
        //   // frontend: dir.frontend,
        //   // backend: dir.backend,
        //   // root: dir.root,
        //   id: props.id,
        // });
        // if (res.content && res.content.message) {
        //   crt_store.message.push(res.content.message);
        // }
        window["is_first_in_page" + props.id] = "1";

        let extObject = gutils.readDefinition(
          window.ExtensionDefinition[props.id],
          props.id
        );

        if (extObject && extObject.hideThisPage) {
          // if(!gutils.dev()){
          // }
          return;
        }

        if (_.isNil(extObject) || _.isNil(extObject.render)) {
          crt_store.message.push(`The Component Definition is Empty`);
        }

        window.extObject = extObject;
        crt_store.hideThisPage = extObject.hideThisPage;

        if (_.isNil(extObject)) {
          return;
        }

        if (extObject.menus) {
          let targetMenuArr = extObject.menus;
          if (_.isFunction(targetMenuArr)) {
            targetMenuArr = await extObject.menus();
          }
          // window.allExtMenuAndState[props.id] = targetMenuArr
          window.allPluginsObj = allPluginsObj;
          allPluginsObj[id] = {
            arr: targetMenuArr,
            // rawArr: _.cloneDeep(targetMenuArr),
            hideThisPage: extObject.hideThisPage,
          };

          updateAndCall();
        }

        if (extObject.hideThisPage) {
          return;
        }

        window[id + "_hide"] = extObject.hideThisPage == true;

        let fn_sync_common_store = async () => {
          let initialState = await extObject.initialState();
          let config_for_commonstore =
            window.createStoreForCommonStore_direct_with_parse_str(
              crtStoreName_underline,
              initialState,
              extObject.initialState
            );
          // let is_quick_no_check = _.isNil(
          //   window["init_" + crtStoreName_underline]
          // );
          gstore.common_app[crtStoreName] =
            config_for_commonstore[crtStoreName];
          window["init_" + crtStoreName_underline] = "1";
        };

        if (
          !_.isNil(window["DLIB_" + id]) // !_.isEmpty(extObject.PreRequisiteJson) &&
          // !_.isEmpty(extObject.PreRequisiteJson.runtime_listings)
        ) {
          crt_store.fn_sync_common_store = fn_sync_common_store;
        } else {
          await fn_sync_common_store();
        }

        if (false) {
          // await gutils.opt("/dev/init?p=" + crtStoreName_underline, {
          //   is_quick_no_check,
          //   crtStoreName_underline: crtStoreName_underline,
          // });
        }
        crt_store.message.push(`Loaded.`);
        crt_store.loading = false;
        crt_store.message = [];
        gstore.ext.init[id] = crt_store;
      } catch (e) {
        console.log("haserr", e);
        crt_store.loading = false;
        crt_store.got_err = false;
        crt_store.err_obj = e;
        collectErrors(e, crt_store.message);
        window.errorGot = true;
        gstore.ext.init[id] = crt_store;
        gutils.alert({
          message: "Sorry, An Error Occurred while loading the plugin.",
          intent: "danger",
        });
      }
    };
    return fn_refresh_plugin();
  },
};

export default myapi;
