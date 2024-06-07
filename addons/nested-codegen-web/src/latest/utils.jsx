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
  PopoverInteractionKind,
  Radio,
  Popover,
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
import gapi from "./gapi.jsx";
import React from "react";
import axios from "axios";

import { Provider, observer, inject ,useLocalStore} from "mobx-react";
// var createHistory = require("history").createBrowserHistory;
import $ from "jquery";
window.$ = $;
import {
  withRouter,
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import {autorun, observable, reaction}  from 'mobx'
var Moment = require("moment");
import _ from "lodash";
import gstore from "./store.jsx";
import extobj from "./editor_ext";
import calculateTextWidth from "calculate-text-width";
import GForm2Wrapper from "./components/GForm2Wrapper/index.jsx";
import constants from "./constants.jsx";
import Qs from "querystring";
import WrapperGeditor from "./components/GEditor/index.jsx";
import { CodeGenDefinition } from "./routes/main_menu_frame/im.jsx";

window.calculateTextWidth = calculateTextWidth;

// axios.defaults.withCredentials = true;

let all_inst_now = Toaster.create({
  className: "root_recipe m_all_recipe",
  position: Position.TOP,
});
window.Toaster = Toaster;
window.ALL_ALERT_INST = {};

const AppToaster = (name) => {
  try {
    let allInst = Toaster.create({
      className: " m_all_recipe " + (name || _.uniqueId("recipe-toaster")),
      position: Position.TOP,
    });
    if (!_.isNil(name)) {
      window.ALL_ALERT_INST[name] = allInst;
    }
    return allInst;
  } catch (e) {
    console.log("e", e);
    return all_inst_now;
  }
};

let delayUpdateResize = _.debounce(() => {
  gutils.defer(() => {
    gutils.callWhenResize();
    gutils.callWhenResizeInternal();
  });
}, 100);
window.AppToaster = AppToaster;
window.ProgressBar = ProgressBar;
window.axios = axios;

function uuid(str = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx") {
  return str
    .replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    })
    .replace(/-/gi, "");
}

const renderingStFunc = () => {
  return {
    0: {
      label: "Not Running",
      color: "var(--app-text-viewblack-pure)",
    },
    1: {
      color: gutils.intent.success,
      label: "Running",
    },
    2: {
      label: "Error Occured",
      color: gutils.intent.danger,
    },
    5: {
      label: "Executing",
      color: "var(--app-text-viewblack-pure)",
    },
  };
};

window.Moment = Moment;
window.moment = Moment;

const cacheMap = {};
const cacheMapForEditor = {};

window.getThatPrivateKey = (id) => {
  if (id == "default") {
    return "default";
  }
  return (
    gstore.localSettings.private_key_ws_obj[id] ||
    window.mem_private_key_ws_obj[id]
  );
};

window.gutils = {
  wrapClz(obj) {
    return (key) => {
      return obj[key] || key;
    };
  },
  getStaticURLPrefix() {
    return gutils.dev() ? "/app/static" : `/app_${pkgInfo.version}` + `/static`;
  },
  hideAlertFnIfHas(name) {
    try {
      if (window.ALL_ALERT_INST[name]) {
        window.ALL_ALERT_INST[name].clear();
        window.ALL_ALERT_INST[name].dismiss();
      }
    } catch (e) {
      console.log("e", e);
    }
  },
  wrapLink(str) {
    // return `${location.origin}${location.pathname}${str}`;
    return `${location.origin}${str}`;
  },
  sep() {
    return isWin() ? "\\" : "/";
  },
  adjustIfMiss(myid, myarr, prop = "value") {
    console.log("checking adjust if missed pre", myid, myarr, prop);
    let isFound = _.findIndex(myarr, (x) => x[prop] == myid) != -1;
    if (!isFound || _.isNil(myid)) {
      myid = _.get(myarr, "0." + prop);
    }
    console.log("checking adjust if missed aft", myid, myarr, prop);
    return myid;
  },
  getValueFromE(e) {
    return _.get(e, "target.value", e);
  },
  showProcessLoader(amount, dismiss) {
    return {
      className: "",
      icon: "cloud-upload",
      usingName: "uploadRef",
      message: (
        <ProgressBar
          className={{
            [Classes.PROGRESS_NO_STRIPES]: amount >= 100,
          }}
          intent={amount < 100 ? Intent.PRIMARY : Intent.SUCCESS}
          value={amount / 100}
        />
      ),
      onDismiss: (didTimeoutExpire) => {
        if (!didTimeoutExpire) {
          // user dismissed toast with click
          // window.clearInterval(this.progressToastInterval);
        }
        if (dismiss) {
          dismiss();
        }
      },
      timeout: amount < 100 ? 0 : 2000,
    };
  },
  ask_danger_opt: async function () {
    return await gutils.win_confirm(
      t(
        `Are you sure that you want to trigger this operation? This operation is irreversible.`
      )
    );
  },
  readDefinition(obj, id) {
    if (_.isFunction(obj)) {
      return obj(
        gutils.getPluginRender({
          id: id,
        })
      );
    } else {
      return obj;
    }
  },
  getPluginRender({ id }) {
    let getOptAPI = async (action, params) => {
      try {
        if (_.isNil(params)) {
          params = {};
        }
        // console.log("Sending action ", action);
        // console.log("Sending params", params);
        let { content } = await gutils.opt(
          "/ext/handling/" +
            action +
            (params.biz_type && false ? `?p=${params.biz_type}` : ""),
          {
            action: action,
            params: params,
            CODEGEN_ID: id,
          }
        );
        // console.log("Received Content", content);
        return content;
      } catch (e) {
        if (params.alert_muted) {
          //
        } else {
          let msg = gutils.getErrMsg(e);
          if (
            msg &&
            msg.indexOf &&
            msg.indexOf(
              "Failed to obtain JDBC Connection; nested exception is com.alibaba.druid.pool.DataSourceDisableException"
            ) != -1
          ) {
            console.log("do nothing here");
          } else {
            gutils.alert({
              intent: "danger",
              noTranslate: true,
              message: msg,
            });
          }
        }
        throw e;
      }
    };
    return {
      optAPI: getOptAPI,
      optAPI_getConfigValue: async function (prop) {
        let res = await getOptAPI("get_config_value", {
          prop,
        });
        return res;
      },
      optAPI_setConfigValue: async function (prop, value) {
        let res = await getOptAPI("set_config_value", {
          prop,
          crt_value: value,
        });
        return res;
      },
    };
  },
  ask_reload: async function () {
    if (window.will_leave) {
      return;
    }
    if (
      await gutils.win_confirm(
        t(`Would you like to reload the page immediately?`)
      )
    ) {
      setTimeout(async () => {
        window.will_leave = true;
        await gutils.saveLocalSettings(_.cloneDeep(gstore.localSettings));
        location.reload();
      }, 2000);
    }
  },
  getAllLangList() {
    return _.chain(
      `en: English
    zh: 简体中文(Simplified Chinese)
    zh-TW: 繁体中文(Traditional Chinese)
    en: English
    ja: Japanese
    ko: Korean
    fr: French
    es: Spanish
    it: Italian
    de: German
    tr: Turkish
    ru: Russian
    pt: Portuguese
    vi: Vietnamese
    id: Indonesian
    th: Thai
    ms: Malaysian
    ar: Arabic
    hi: Hindi`
    )
      .split("\n")
      .map((x) => _.trim(x))
      .map((x) => ({
        value: _.trim(x.split(":")[0]),
        label: t(_.trim(x.split(":")[1])),
      }))
      .value();
  },
  stop_e(e) {
    e.preventDefault();
    e.stopPropagation();
  },
  delayUpdateResize,
  time() {
    return new Date().getTime();
  },
  delay_refresh() {
    setTimeout(() => {
      location.reload();
    }, 2000);
  },
  getEditorTheme(needCalcDark = true) {
    if (needCalcDark || _.isNil(window["init_before"])) {
      window["init_before"] = "1";
      gstore.localSettings.crt_theme = gstore.localSettings.is_using_dark_mode
        ? gstore.localSettings.default_theme_dark_more
        : gstore.localSettings.default_theme_light;
    }
    // gstore.localSettings.crt_theme = "twilight";
    return gstore.localSettings.crt_theme;
  },
  getZone() {
    let valval = -new Date().getTimezoneOffset() / 60;
    return "GMT" + (valval < 0 ? "-" : "+") + valval;
  },
  getErrMsg(e) {
    console.log(e);
    try {
      return _.get(
        e,
        "data.message",
        _.get(
          e,
          "message",
          _.get(e, "data")
            ? `${t(`Unknown Error`)}: ` + JSON.stringify(e.data)
            : JSON.stringify(e)
        )
      );
    } catch (e) {
      return _.toString(e);
    }
  },
  msg_error(e) {
    console.log(e);
    try {
      return _.get(e, "data.message", _.get(e, "message", JSON.stringify(e)));
    } catch (e) {
      return _.toString(e);
    }
  },
  getCentreLinkWithGo(str) {
    return `https://codegen.cc${str}`;
  },
  bindSimpleIpt({ model, key, prefn }) {
    return {
      value: model[key],
      onChange: (e) => {
        if (prefn) {
          prefn();
        }
        model[key] = e.target.value;
      },
    };
  },
  getEValue(x) {
    return _.get(x, "target.value", x);
  },
  ifNotInArr(val, arr) {
    if (_.isNil(val)) {
      return true;
    }
    if (_.findIndex(arr, (x) => x.value == val) != -1) {
      return false;
    } else {
      return true;
    }
  },
  win_confirm_with_once: async function (label, savekey, fn) {
    if (_.isNil(gstore.localSettings[savekey])) {
      let b = await gutils.win_confirm(label);
      if (!b) {
        return;
      }
      gstore.localSettings[savekey] = new Date().getTime();
    }
    fn();
  },
  fn_createWithRed(mylabel) {
    mylabel = t(mylabel);
    return (
      <span>
        {mylabel}
        <span className="with-red-aristerisk">*</span>
      </span>
    );
  },
  ipc() {
    return window.ipc;
  },
  getUpdateServiceLink(aftlink) {
    // https://codegen-prod-release.work7z.com/test/v1.0.2/updates.zip
    // return "https://codegen-prod-release.work7z.com" + aftlink;
    return "https://codegen-prod-release.work7z.com" + aftlink;
  },
  getUserId() {
    return get_user_info().user_id; // localStorage.getItem("SYS_USER_ID");
  },

  optCentreWithDeviceInfo(url, param = {}) {
    let { version, platform, release } = window.ipc;
    return gutils.optCentre(
      url,
      {
        ...param,
        VERSION: version,
        PLATFORM: platform, // + "@" + release,
        DEVICE_ID: window.ipc.getMachineId(),
        USER_ID: gutils.getUserId(),
        USER_AREA: localStorage.getItem("isChinaUser") ? "CHINA" : "FOREIGN",
        USER_LANG: window.ipc.locale,
      },
      {
        mute: true,
      }
    );
  },
  confirmIfNotClickOk(savekey, msg, fn, conf = {}) {
    msg = t(msg);
    if (localStorage.getItem(savekey)) {
      fn();
      return;
    }
    return gutils.w_alertMsgGlobal(
      _.merge(
        {
          cancelText: "OK",
          icon: "info-sign",
          width: "430px",
          s_clzname: "white-app-view",
          confirmText: "Do not show again",
          confirmIntent: "none",
          title: conf.title || "Friendly Reminder",
          jsx: () => {
            return <div>{msg}</div>;
          },
          onCancel() {
            fn();
            if (conf.needBothSet) {
              localStorage.setItem(savekey, "ok");
            }
            if (conf.fn_first) {
              conf.fn_first();
            }
          },
          onConfirm() {
            localStorage.setItem(savekey, "ok");
            fn();
            if (conf.fn_second) {
              conf.fn_second();
            }
          },
        },
        conf
      )
    );
  },
  confirmOrJustTimeout(conf) {
    let { savekey, msg, timeout, fn } = conf;
    let crtTimeSeconds = parseInt(new Date().getTime() / 1000) + "";
    let prevalue = localStorage.getItem(savekey);
    if (!_.isNil(prevalue) && crtTimeSeconds < prevalue) {
      // not work til next times;
      return;
    }
    localStorage.removeItem(savekey);
    return gutils.w_alertMsgGlobal(
      _.merge(
        {
          cancelText: "Remind me in 3 days",
          icon: "info-sign",
          width: "430px",
          s_clzname: "white-app-view",
          confirmText: "Upgrade Now",
          confirmIntent: "success",
          title: conf.title,
          jsx: () => {
            return <div>{msg}</div>;
          },
          onCancel() {
            let nextval = parseInt(crtTimeSeconds) + parseInt(timeout + "");
            localStorage.setItem(savekey, "" + nextval);
          },
          onConfirm() {
            fn();
          },
        },
        conf
      )
    );
  },
  bindIpt(myform, mykey, bfunc) {
    return {
      asyncControl: true,
      defaultValue: myform[mykey],
      onChange: (e) => {
        myform[mykey] = e.target.value;
        if (bfunc) {
          bfunc();
        }
      },
    };
  },
  is_crt_dragging_sth_select_row_cols: false,
  log_1(...args) {
    console.log(...args);
  },
  example_json: `{
    "glossary": {
        "strArr": ["str1","str2"],
        "intArr": [31,1203],
        "title": "example glossary",
        "queriedTimes": 22,
		"GlossDiv": {
            "title": "S",
            "decimalTestValue": 3.1415,
            "integerTestValue": 1024,
			"GlossList": {
                "GlossEntry": {
                    "ID": "SGML",
                    "time": "2016-07-01", 
					"SortAs": "SGML",
					"GlossTerm": "Standard Generalized Markup Language",
					"Acronym": "SGML",
					"Abbrev": "ISO 8879:1986",
					"GlossDef": {
                        "para": "A meta-markup language, used to create markup languages such as DocBook.",
						"GlossSeeAlso": ["GML", "XML"]
                    },
					"GlossSee": "markup"
                }
            }
        }
    },
    "widget": {
    "debug": "on",
    "window": {
        "title": "Sample Konfabulator Widget",
        "name": "main_window",
        "width": 500,
        "height": 500
    },
    "image": { 
        "src": "Images/Sun.png",
        "name": "sun1",
        "hOffset": 250,
        "vOffset": 250,
        "alignment": "center"
    },
    "text": {
        "data": "Click Here",
        "size": 36,
        "style": "bold",
        "name": "text1",
        "hOffset": 250,
        "vOffset": 100,
        "alignment": "center",
        "onMouseUp": "sun1.opacity = (sun1.opacity / 100) * 90;"
    }
},
"menu": {
  "id": "file",
  "value": "File",
  "popup": {
    "menuitem": [
      {"value": "New", "onclick": "CreateNewDoc()"},
      {"value": "Open", "onclick": "OpenDoc()"},
      {"value": "Close", "onclick": "CloseDoc()"}
    ]
  }
}
}`,
  example_code: `const animals = ['pigs', 'goats', 'sheep'];
const count = animals.push('cows');
console.log(count);
console.log(animals);

function testfunc(a,b,c){
  console.log({a,b,c})
}

let myobj = {
  test: [1,2,3,4,5],
  name: 'test'
}

let attrNode = document.body.ATTRIBUTE_NODE    
for(let item of document.body.classList){
    console.log('item', item, 'attr_note', attrNode)
}

let $ = window.$;
$.ajax({
    url: '/api/test',
    data: attrNode
})
  
  
                  `,
  waitSyncStatus: {},
  waitSyncKeys: {},
  syncFunc(key, func) {
    if (_.isNil(gutils.waitSyncKeys[key])) {
      gutils.waitSyncKeys[key] = [];
      gutils.waitSyncStatus[key] = { isOccupied: false };
    }
    return (async function (...args) {
      if (gutils.waitSyncStatus[key].isOccupied) {
        gutils.waitSyncKeys[key].push(() => {
          return func(...args);
        });
        return;
      }
      gutils.waitSyncStatus[key].isOccupied = true;
      try {
        let res = await func(...args);
        gutils.waitSyncStatus[key].isOccupied = false;
        for (let item of gutils.waitSyncKeys[key]) {
          await item();
        }
        gutils.waitSyncKeys[key] = [];
        return res;
      } catch (e) {
        gutils.waitSyncStatus[key].isOccupied = false;
        gutils.waitSyncKeys[key] = [];
        throw e;
      }
    })();
  },
  getFocusPanelId() {
    return window[gutils.global_panel_db_page_focus];
  },
  setFocusPanelId(obj) {
    window[gutils.global_panel_db_page_focus] = obj;
  },
  initWindowsForm(key, initobj) {
    if (_.isNil(window[key])) {
      window[key] = initobj;
    }
    return window[key];
  },
  ext: extobj,
  getErrTooltipForEditor(mymsg) {
    return {
      intent: "danger",
      icon: "error",
      color: "var(--app-text-darkred)",
      textColor: "var(--app-text-darkred)",
      msg: t(mymsg),
    };
  },
  global_panel_db_page_focus: "global_panel_db_page_focus",
  onEditForTab: async function (
    type,
    info,
    { props, onRemove, list, setValue, setList, crtvalue }
  ) {
    if (type == "remove") {
      // // console.log("action remove", type, info);
      let nextKeyStrValue = null;
      const findObjIdx = _.findIndex(list, (x) => x.id == info.key);
      let nextKey =
        findObjIdx + 1 >= _.size(list) ? findObjIdx - 1 : findObjIdx + 1;
      if (nextKey == -1) {
        // //debugger;
      }
      if (nextKey < 0) {
        nextKey = 0;
      }
      if (nextKey >= _.size(list)) {
        nextKey = _.size(list) - 1;
      }
      // let nextKeyStrValue = _.get(list, [nextKey, "id"]);
      // // console.log("next key str value", nextKeyStrValue, nextKey);
      if (_.get(list, [findObjIdx, "id"]) == crtvalue) {
        // props.obj.value
        const nextKeyStr = _.get(list, [nextKey, "id"]);
        nextKeyStrValue = nextKeyStr;
      }
      if (onRemove) {
        await onRemove(info);
      } else {
        setList(
          _.filter(
            _.concat(
              _.slice(list, 0, findObjIdx),
              _.slice(list, findObjIdx + 1)
            ),
            (x) => !_.isNil(x)
          )
        );
      }
      if (!_.isNil(nextKeyStrValue) && setValue) {
        setValue(nextKeyStrValue);
      }
    }
  },
  isCloseAction(e) {
    let isOk = (e.ctrlKey || e.metaKey) && e.key == "w";
    if (isOk) {
      gutils.stop_e(e);
    }
    return isOk;
  },
  isCloseAllAction(e) {
    let isOk = (e.ctrlKey || e.metaKey) && e.shiftKey && e.key == "w";
    if (isOk) {
      gutils.stop_e(e);
    }
    return isOk;
  },
  callWhenResize() {
    gutils.defer(() => {
      _.forEach(gutils.anyResizeTriggerArr, (x) => {
        if (x) {
          x();
        }
      });
    });
  },
  callWhenResizeForResizeBox() {
    gutils.defer(() => {
      _.forEach(gutils.resizeTriggerArr, (x) => {
        if (x) {
          x();
        }
      });
    });
  },
  callWhenResizeInternal() {
    gutils.defer(() => {
      _.forEach(gutils.internalResizeTriggerArr, (x) => {
        if (x) {
          x();
        }
      });
    });
  },
  resizeTriggerArr: {},
  anyResizeTriggerArr: {},
  internalResizeTriggerArr: {},
  getLastOneIdxAndItem(arr, idx) {
    idx--;
    if (idx < 0) {
      idx = _.size(arr) - 1;
    }
    // // console.log("last one idx is", idx, _.size(arr));
    // if (idx < 0) {
    //   idx = _.size(arr) - 1;
    // }
    return {
      idx: idx,
      item: arr[idx],
    };
  },
  toggleViewType(mynextappview) {
    const isLastAction = false; //e.which == 57;
    const nextvalue = gutils[
      isLastAction ? "getLastOneIdxAndItem" : "getNextOneIdxAndItem"
    ](
      gstore.settings.appViewTypeArr.get(),
      _.findIndex(
        gstore.settings.appViewTypeArr.get(),
        (x) => x.value == gstore.localSettings.appTypeView
      )
    );
    const nextAppTypeView = mynextappview || nextvalue.item.value;

    gstore.localSettings.appTypeView = nextAppTypeView;
  },
  getNextOneIdxAndItem(arr, idx) {
    idx++;
    if (idx >= _.size(arr)) {
      idx = 0;
    }
    return {
      idx: idx,
      item: arr[idx],
    };
  },
  win_confirm: async function (obj, ...args) {
    return new Promise((r, e) => {
      let res = t(obj, ...args);
      gstore.sysinfo.confirmObj.open = true;
      gstore.sysinfo.confirmObj.msg = res;
      gstore.sysinfo.confirmObj.fn = r;
    });
  },
  win_prompt(obj) {
    return new Promise((r, e) => {
      gstore.sysinfo.promptObj.ipt = "";
      let msg = obj;
      gstore.sysinfo.promptObj.open = true;
      gstore.sysinfo.promptObj.msg = msg;
      gstore.sysinfo.promptObj.fn = () => {
        r(
          gstore.sysinfo.promptObj.ipt == "" ||
            _.isNil(gstore.sysinfo.promptObj.ipt)
            ? null
            : gstore.sysinfo.promptObj.ipt
        );
      };
    });
  },
  win_alert(str, ...args) {
    return new Promise((r, e) => {
      let res = t(str, ...args);
      gstore.sysinfo.alertObj.open = true;
      gstore.sysinfo.alertObj.msg = res;
      gstore.sysinfo.alertObj.fn = r;
    });
  },
  win_alert_no_t(str, ...args) {
    return new Promise((r, e) => {
      let res = str;
      gstore.sysinfo.alertObj.open = true;
      gstore.sysinfo.alertObj.msg = res;
      gstore.sysinfo.alertObj.fn = r;
    });
  },
  changeLang(lang) {
    gstore.preliAllData.configs.lang = lang;
    window.changeLang(lang);
    setTimeout(() => {
      window.updateLangFunc();
    }, 10);
  },
  editor_inst: {},
  scrollObjByE(obj, e) {
    let isLastOne = e.shiftKey;
    if (e.ctrlKey && e.key == "Tab") {
      let crtIndex = _.findIndex(obj.list, (x) => x.id == obj.value);
      if (isLastOne && crtIndex == 0) {
        crtIndex = _.size(obj.list) - 1;
      } else if (!isLastOne && crtIndex == _.size(obj.list) - 1) {
        crtIndex = 0;
      } else {
        crtIndex = crtIndex + (isLastOne ? -1 : 1);
      }
      // // console.log("crt index is ", crtIndex);
      obj.value = _.get(obj.list, [crtIndex, "id"]);
    }
  },
  w_handleError(e) {
    const themsg = _.isString(e)
      ? e
      : _.get(
          e,
          "data.message",
          _.get(e, "message", "Failed to execute this request")
        );
    // JSON.stringify(e)
    // // console.log("got error", e);
    gutils.w_alertError(_.toString(themsg), { width: "430px" });
  },
  strjson(org) {
    var cache = [];
    var str = JSON.stringify(org, function (key, value) {
      if (typeof value === "object" && value !== null) {
        if (cache.indexOf(value) !== -1) {
          // Circular reference found, discard key
          return;
        }
        // Store value in our collection
        cache.push(value);
      }
      return value;
    });
    cache = null; // Enable garbage collection
    return str;
  },
  w_alertError(errmsg, conf) {
    // errmsg = errmsg.replaceAll(/\s+/gi, "<br/>");
    // console.log("errmsg", errmsg);
    return gutils.w_alertMsgGlobal(
      _.merge(
        {
          noCancel: true,
          confirmIntent: "none",
          icon: "error",
          width: "430px",
          s_clzname: "danger-view",
          confirmText: "Close",
          confirmIntent: "none",
          title: "An error occurred...",
          jsx: () => {
            return <div>{t(errmsg)}</div>;
          },
        },
        conf
      )
    );
  },
  w_alertSuccess(errmsg, conf) {
    return gutils.w_alertMsgGlobal(
      _.merge(
        {
          noCancel: true,
          icon: "error",
          width: "430px",
          s_clzname: "succ-view",
          confirmText: "Close",
          confirmIntent: "none",
          title: conf.title || "Positive Operation Result",
          jsx: () => {
            return <div>{t(errmsg)}</div>;
          },
        },
        conf
      )
    );
  },
  ask_isChina: async () => {
    if (!gstore.localSettings.ask_china_before) {
      let myval = await gutils.win_confirm(
        `Are you currently located in Mainland China? If the answer would be yes, please click confirm option to continue. We will use the corresponding mirror source according to your choice, and please be noted the download speeds will depend heavily on the mirror you selected.`
      );
      await gutils.win_alert(
        t(
          `Okay, we will use {0} as your download mirror, please be noted you can alternate this option in the setting whenever you may need`,
          myval ? `China` : `Global`
        )
      );
      gstore.localSettings.is_user_based_on_china = myval;
      gstore.localSettings.ask_china_before = true;
      return myval;
    }
    return gstore.localSettings.is_user_based_on_china;
  },
  showPageByModal(willWorkPath, { extMap = {}, title, icon }) {
    let CptInst = null;
    let hasCpt = willWorkPath.startsWith("/exts");
    if (hasCpt) {
      CptInst = (props) => (
        <PluginLoadView
          {...Qs.parse(willWorkPath.substring(willWorkPath.indexOf("?") + 1))}
          id={willWorkPath.replace("/exts/", "")}
          extMap={extMap}
          pop={true}
        />
      );
    } else {
      let allRoutesArr = window.allRoutesArr;
      let CptObj = _.find(allRoutesArr, (x) => x.path == willWorkPath);
      CptInst = CptObj.cpt;
    }
    gutils.w_alertMsgGlobal(
      _.merge({
        noBackdrop: false,
        icon,
        style: {
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "85vw",
          height: "95vh",
          paddingBottom: "0px",
        },
        otherJSX: {
          noBackdrop: false,
        },
        no_padding: true,
        s_clzname: "white-app-view-no-pad",
        title: title,
        jsx: () => {
          return (
            <div
              style={{
                width: "100%",
                height: "calc(100% - 30px)",
                overflow: hasCpt ? "hidden" : null,
              }}
            >
              <CptInst />
            </div>
          );
        },
        noFoot: true,
        resize: false,
      })
    );
  },
  w_alertMsgGlobal(obj) {
    const unikey = gutils.uuid();
    _.defaultsDeep(obj, {
      loading: false,
      open: false,
      confirm: null,
      title: "Unknown",
      icon: null,
      cancelText: "Cancel",
      confirmIntent: null,
      confirmText: "Confirm",
    });
    obj.cleanFunc = () => {
      delete gstore.settings.alerts[unikey];
    };
    gstore.settings.alerts[unikey] = {
      ...obj,
      open: true,
    };
    autorun(() => {
      const obj = gstore.settings.alerts[unikey];
      // // console.log("checking and turn it off", obj, obj.cleanFunc);
      if (obj && obj.open == false) {
        gutils.defer(() => {
          obj.cleanFunc();
        });
      }
    });
    return gstore.settings.alerts[unikey];
  },
  clearCache() {
    _.forEach(gutils.whenBlurFunc, (x) => x());
  },
  delay(fn) {
    return _.debounce(fn, 300);
  },
  anyEmpty(arr) {
    let isAnyEmpty = false;
    for (let value of arr) {
      isAnyEmpty = _.isNil(value) || value == "";
      if (isAnyEmpty) {
        return true;
      }
    }
    return false;
  },
  anyMax(arr) {
    let isAnyEmpty = false;
    for (let value of arr) {
      if (_.isNil(value.value)) {
        continue;
      }
      isAnyEmpty = value.value.length >= value.max;
      if (isAnyEmpty) {
        return true;
      }
    }
    return false;
  },
  empty(str) {
    return _.isNil(str) || _.trim(str + "").length == 0;
  },
  uuid,
  crt_live_id: uuid(),
  drag(dragBody, dragRef) {
    gutils.defer(() => {
      const dialogDIV = dragBody;
      const $header = dragRef;
      window.isDragging = false;
      const handleObj = {
        pageX: null,
        pageY: null,
        padLeft: null,
        padTop: null,
        finLeft: null,
        finTop: null,
      };
      function setFuncForHandle(rect, handleObj) {
        handleObj.finLeft = rect.left + handleObj.padLeft;
        handleObj.finTop = rect.top + handleObj.padTop;
        handleObj.padLeft = 0;
        handleObj.padTop = 0;
      }

      const delayUpdateEle = () => {
        dialogDIV[0].style.top = handleObj.finTop + "px";
        dialogDIV[0].style.left = handleObj.finLeft + "px";
      };

      $header
        .css({
          userSelect: "none",
          cursor: "default",
        })
        .mousedown(function (e) {
          window.isDragging = true;
          const $dialogDIV = $(dialogDIV[0]);

          handleObj.padLeft = parseFloat($dialogDIV.css("margin-left"));
          handleObj.padTop = parseFloat($dialogDIV.css("margin-top"));
          const rect = dialogDIV[0].getBoundingClientRect();

          setFuncForHandle(rect, handleObj);

          dialogDIV[0].style.left = handleObj.finLeft + "px";
          dialogDIV[0].style.top = handleObj.finTop + +"px";
          // // console.log("mouse down");
          handleObj.pageX = e.pageX;
          handleObj.pageY = e.pageY;
          window.global_handleObj = handleObj;
          window.global_delayUpdateEle = delayUpdateEle;
        })
        .mousemove(function (e) {})
        .mouseup(function () {
          window.isDragging = false;
        });
    });
    // register common
    gutils.defer(() => {
      gutils.once("only_trace_global", () => {
        document.addEventListener("mousemove", (e) => {
          const handleObj = window.global_handleObj;
          const delayUpdateEle = window.global_delayUpdateEle;
          if (window.isDragging) {
            const diffTop = e.pageY - handleObj.pageY;
            const diffLeft = e.pageX - handleObj.pageX;

            // // console.log("draging", { diffTop, diffLeft });

            handleObj.finLeft += diffLeft;
            handleObj.finTop += diffTop;

            delayUpdateEle();

            handleObj.pageX = e.pageX;
            handleObj.pageY = e.pageY;
            // // console.log("mouse is dragging", e.pageX, e.pageY);
          } else {
            // // // console.log("simple moving");
          }
        });
        document.addEventListener("mouseup", () => {
          window.isDragging = false;
        });
      });
    });
  },
  resizeEvent(conf) {
    return {
      defaultSize: _.merge(
        {},
        {
          width: conf.obj[conf.key],
          height: "100%",
        },
        conf.size || {}
      ),
      onResizeStop: (event, direct, refToEle, delta) => {
        gutils.defer(() => {
          conf.obj[conf.key] = refToEle.style.width;
          gutils.defer(() => {
            gutils.callWhenResize();
          });
        });
      },
    };
  },
  allResizeProps() {
    return {
      handleClasses: _.mapValues(
        {
          top: false,
          right: false,
          bottom: false,
          left: false,
          topRight: false,
          bottomRight: false,
          bottomLeft: false,
          topLeft: false,
        },
        (x, d, n) => {
          return `common-handle-bars`;
        }
      ),
    };
  },
  enableResize() {
    return {
      top: false,
      right: false,
      bottom: false,
      left: false,
      topRight: false,
      bottomRight: false,
      bottomLeft: false,
      topLeft: false,
    };
  },
  enableResizeAllTrue() {
    return {
      top: true,
      right: true,
      bottom: true,
      left: true,
      topRight: true,
      bottomRight: true,
      bottomLeft: true,
      topLeft: true,
    };
  },
  getLocalApiLink(str) {
    // "http://127.0.0.1:18080" +
    return str;
    // const host = window.ipc.isDevCentreLink
    //   ? "http://127.0.0.1:18080" + str
    //   : "https://api.codegen.cc" + str;
    // return host;
  },
  getCentreLink(str) {
    if (p_mode()) {
      return `/cloud_redirect${str}`;
      // return `https://codegen.cc${str}`;
    }
    return `/cloud_redirect${str}`;
    const host = window.ipc.isDevCentreLink
      ? "http://127.0.0.1:8080" + str
      : "https://codegen.cc" + str;
    return host;
  },
  dev() {
    return window.ipc.dev;
  },
  run_async_loop(fn, timeval) {
    let myref = {
      still_run: true,
    };
    let mycancelFn = () => {
      myref.still_run = false;
    };
    let okfunc = () => {
      setTimeout(async () => {
        if (!myref.still_run) {
          return;
        }
        let ok = await fn();
        if (ok === false) {
          return;
        }
        if (!myref.still_run) {
          return;
        }
        if (_.isNil(timeval) || timeval < 0) {
          return;
        }
        await gutils.sleep(timeval);
        if (!myref.still_run) {
          return;
        }
        okfunc();
        if (!myref.still_run) {
          return;
        }
      }, 0);
    };
    okfunc();
    return mycancelFn;
  },
  waitInitializeRefFunc: [],
  frame_defaultWidth: "220px",
  createEditor: async function (ele, conf, chkObj = {}) {
    // // console.log("start creating editor", ele, conf);
    if (
      chkObj &&
      cacheMapForEditor[chkObj.ID] &&
      cacheMapForEditor[chkObj.ID].getDomNode
    ) {
      let preEle = cacheMapForEditor[chkObj.ID].getDomNode();
      if (!document.body.contains(preEle)) {
        cacheMapForEditor[chkObj.ID].dispose();
      } else {
        cacheMapForEditor[chkObj.ID].dispose();
      }
    }
    // await gutils.getScript("app.bundle.jsx");
    const { monaco, initVimMode, EmacsExtension } = window.CodeGenPluginED();
    await new Promise((resolve, reject) => {
      _.forEach(constants.finalThemeObj, (x, d, n) => {
        if (!_.isNil(x.json)) {
          monaco.editor.defineTheme(d, x.json);
        }
      });
      resolve();
      // import("monaco-themes/themes/Monokai.json").then((data) => {
      //   monaco.editor.defineTheme("monokai", data);
      // });
    });
    let inst = monaco.editor[conf.callFuncName ? conf.callFuncName : "create"](
      ele,
      conf
    );
    cacheMapForEditor[chkObj.ID] = inst;
    window.crt_editor = inst;
    if (chkObj.created) {
      chkObj.created(inst);
    }
    let initTempLocal = () => {
      if (chkObj.viewmode == "vim") {
        const vimMode = initVimMode(inst, $("#" + chkObj.btmID)[0]);
      }
      if (chkObj.viewmode == "emacs") {
        let ok = $("#" + chkObj.btmID);
        const emacsMode = new EmacsExtension(inst);
        emacsMode.onDidMarkChange((ev) => {
          ok.text(ev ? "Mark Set!" : "Mark Unset");
        });
        emacsMode.onDidChangeKey((str) => {
          ok.text(str);
        });
        emacsMode.start();
      }
    };
    initTempLocal();
    // if (_.isNil(updateModelObj[chkObj.ID])) {
    //   updateModelObj[chkObj.ID] = [];
    // }
    // updateModelObj[chkObj.ID].push(() => {
    //   initTempLocal();
    // });
    return inst;
  },
  callAllUpdateModel() {
    _.forEach(gutils.updateModelObj, (x) => {
      _.forEach(x, (xx) => {
        xx();
      });
    });
  },
  updateModelObj: {},
  setLangForEditor(c_text, lang) {
    if (true) {
      // TODO: here
      return;
    }
    const { monaco } = window.CodeGenPluginED();
    monaco.editor.setModelLanguage(c_text.getModel(), lang);
  },
  scriptCache: {},
  // $.getScript("https://unpkg.com/monaco-vim/dist/monaco-vim", (e) => {
  //   console.log(e);
  // });
  addonScript(str) {
    if (gutils.scriptCache[str]) {
      return;
    }
    return new Promise((ok) => {
      $.getScript(str, (val) => {
        (() => {
          console.log("now the val", val);
          let preval = window.define;
          window.define = null;
          eval(val);
          window.define = preval;
          gutils.scriptCache[str] = "1";
          ok();
        })();
      });
    });
  },
  wrapErrAlert: (fn) => {
    return async () => {
      try {
        return await fn();
      } catch (e) {
        gutils.alert({
          intent: "danger",
          message: gutils.getErrMsg(e),
        });
      }
    };
  },
  getScript(str) {
    if (gutils.scriptCache[str] && window.CodeGenPluginED) {
      return;
    }
    gutils.scriptCache[str] = "1";
    str = "../e/" + str;
    return new Promise((ok) => {
      $.getScript(str, () => {
        ok();
      });
    });
  },
  openCodePanel(args) {
    gutils.w_alertMsgGlobal(
      _.merge({
        noBackdrop: false,
        icon: "signal-search",
        style: {
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "61.8vw",
          height: "85vh",
          paddingBottom: "0px",
        },
        otherJSX: {
          noBackdrop: false,
        },
        no_padding: true,
        s_clzname: "white-app-view-no-pad",
        title: args.title,
        jsx: () => {
          return (
            <div
              style={{
                width: "100%",
                // height: "calc(100% - 30px)",
                height: "100%",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                {gutils.createGEditorWithNoStorageAndSimple({
                  readOnly: true,
                  fontSize: 11,
                  title: args.subTitle,
                  wordWrap: "on",
                  loading: false,
                  key: "unknown",
                  language: args.language || "javascript",
                  directValue: args.data,
                  onRef(ref) {
                    console.log("ref", ref);
                  },
                })}
              </div>
            </div>
          );
        },
        noFoot: true,
        resize: false,
      })
    );
  },
  createGEditorWithNoStorageAndSimple(args) {
    let crtStoreName = "tmpcache";
    let { directValue } = args;
    console.log("rendering_editor wrap", directValue);
    let FormGEditor = WrapperGeditor;
    return (
      <FormGEditor
        key={(directValue + "").length + "" + gstore.localSettings.editor_mode}
        title={args.title}
        noAutoFocus={true}
        otherConfig={{
          callFuncName: "create",
          enableSplitViewResizing: true,
          originalEditable: true,
          readOnly: _.get(args, "readOnly", false),
          wordWrap: _.get(args, "wordWrap", "off"),
          followsCaret: true,
          ignoreCharChanges: true,
        }}
        wordWrap={_.get(args, "wordWrap", "off")}
        readOnly={args.readOnly}
        fontSize={args.fontSize}
        id={crtStoreName + args.key}
        language={args.language}
        onRef={(editor, monaco) => {
          console.log("rendering_editor", directValue);
          if (_.isNil(editor)) {
            return;
          }
          if (args.onRef) {
            gutils.defer(() => {
              args.onRef({
                editor,
                monaco,
                fn_setValue: (value) => {
                  try {
                    window.ok100 = editor;
                    editor.getModel().setValue(value);
                  } catch (e) {
                    console.log("e", e);
                  }
                },
              });
            });
          }
          let modifiedModel = () => editor.getModel();
          modifiedModel().setValue(directValue + "");
        }}
        style={{ width: "100%", height: "100%" }}
      ></FormGEditor>
    );
  },
  safeparse(str) {
    try {
      return JSON.parse(str);
    } catch (err) {
      return null;
    }
  },
  safestr(str) {
    try {
      return JSON.stringify(str, 0, 4);
    } catch (err) {
      return null;
    }
  },
  safeparsenow(str) {
    try {
      return JSON.parse(str);
    } catch (err) {
      return null;
    }
  },
  getSetting(mykey) {
    return gstore.settings.model[mykey];
  },
  col_yesno(obj) {
    return {
      label: obj.label,
      value: (x) => (x[obj.value] == 1 ? "Yes" : "No"),
    };
  },
  filternil(arr) {
    return _.filter(arr, (x) => !_.isNil(x));
  },
  filterEmpty(arr) {
    return _.filter(arr, (x) => !_.isEmpty(x));
  },
  reInitAllDataBeforeOpenModal(obj, alertType, x) {
    obj.alertType = alertType;
    obj.addModelFailures = {};
    obj.isAddModelPass = alertType == "update" ? true : false;
    if (alertType === "update") {
      obj.addModel = gutils.clone(x);
    } else {
      obj.addModel = gutils.clone(obj.initModel);
    }
  },
  validate_http: (x) => {
    return /(http|https):\/\/([\w.]+\/?)\S*/.test(x);
  },
  keyDownListenObj: {},
  keyDownListener: [],
  saveLocalSettings: async function (value) {
    console.log("saving local settings");
    await window.ipc.saveLocalSettingJsonToSource(value);
  },
  saveLangToDisk() {
    let readinitjson = window.ipc.readInitJSON();
    readinitjson.lang = gstore.preliAllData.configs.lang;
    window.ipc.saveInitJson(JSON.stringify(readinitjson));
  },
  toggleWindowMaxActiveId() {
    let idx = _.findIndex(
      gstore.desktop.windows,
      (x) => x.id == gstore.desktop.win_max_active_id
    );
    if (idx == null || idx == -1) {
      idx = -1;
    }
    gstore.desktop.win_max_active_id = _.get(
      _.get(gstore.desktop.windows, [idx + 1], _.first(gstore.desktop.windows)),
      "id"
    );
  },
  // llinit
  init() {
    // gutils.api.proxy.openAddingModal("create");
    setTimeout(() => {
      // gutils.api.proxy.openAddRulePanel();
      setTimeout(() => {
        // gutils.api.proxy.openAddRulePathRewritePanel();
        // gutils.api.dblink.open_recent_scripts({ meta: { ID: 1 } });
      }, 500);
    }, 200);
    setTimeout(() => {
      if (ipc.dev) {
        // gutils.api.system.openSettingAPI("appearance");
        // gutils.api.system.openSettingAPI("abouts");
        // gutils.api.system.openSettingAPI("supports");
        // gutils.api.system.openSettingAPI("updates");
        // gutils.api.system.openSettingAPI("library");
      }
      // gutils.api.dblink.create_connection();
    }, 300);
    // autorun(() => {
    //   let localSettings = gstore.localSettings;
    //   gutils.saveLocalSettings(gstore.localSettings);
    //   // // console.log("got new chg for ");
    //   // let newSettingObj = _.merge({}, window.RAW_LOCALSETTING, localSettings);
    //   // _.forEach(window.RAW_LOCALSETTING, (x, d, n) => {
    //   //   newSettingObj[d] = localSettings[d];
    //   // });
    //   // localStorage.setItem("LOCAL_SETTINGS", JSON.stringify(newSettingObj));
    // });
    reaction(
      () => {
        return {
          ...gstore.localSettings,
        };
      },
      () => {
        gutils.saveLocalSettings(gstore.localSettings);
      }
    );
    setInterval(() => {
      gutils.saveLocalSettings(gstore.localSettings);
    }, 5000);
    window.addEventListener("resize", () => {
      window.gutils.callWhenResize();
      window.gutils.defer(() => {
        window.gutils.callWhenResize();
      }, 50);
    });
    // key register
    document.onkeydown = function (e) {
      console.log("which", e.which);
      if (e.which == 16) {
        window.down16 = true;
      }
      if (e.which == 17) {
        window.down91 = true;
      }
      // if()
      // no left menu
      if (e.ctrlKey && e.shiftKey && e.which == 57) {
        gstore.localSettings.isLeftMenuOpen =
          !gstore.localSettings.isLeftMenuOpen;
        if (window.fn_init_desktop) {
          window.fn_init_desktop();
        }
      }
      // updating the app view
      if (e.ctrlKey && e.shiftKey && e.which == 48) {
        gutils.toggleViewType();
        // // console.log("next app type view", nextAppTypeView);
      }
      if (e.ctrlKey && e.shiftKey && e.which == 189) {
        gutils.api.system.openSettingAPI("general");
        // gutils.toggleViewType();
        // // console.log("next app type view", nextAppTypeView);
      }
      if (e.shiftKey && e.shiftKey && e.which == 80) {
        gutils.toggleWindowMaxActiveId();
      }
      if (e.shiftKey && e.shiftKey && e.which == 79) {
        gstore.desktop.isMenuOpen = !gstore.desktop.isMenuOpen;
        if (gstore.desktop.isMenuOpen) {
          gutils.defer(() => {
            $("#win_search_all").focus();
          }, 100);
        }
      }
      if (e.metaKey && (e.key == "w" || e.key == "q")) {
        // gutils.stop_e(e);;
      }
      _.forEach(gutils.keyDownListener, (x) => {
        if (x) {
          x(e);
        }
      });
      _.forEach(gutils.keyDownListenObj, (x) => {
        if (x) {
          x(e);
        }
      });
      if (e.which == 83) {
        if (e.metaKey || e.ctrlKey) {
          gutils.stop_e(e);
        }
      }
      // // console.log("keydown", e.which, e.ctrlKey, e.altKey, e.shiftKey);
    };
    setTimeout(() => {
      gutils.api.ext.initAllPlugins();
    });
    document.onkeyup = function (e) {
      window.down16 = null;
      window.down91 = null;
    };
    autorun(() => {
      const myval_appviewtype = gstore.localSettings.appTypeView;
      if (myval_appviewtype == "all") {
        gstore.localSettings.hasTopNav = true;
        gstore.localSettings.hasTopSubNav = true;
        gstore.localSettings.noPanelPadValue = true;
      } else {
        _.forEach(myval_appviewtype.split(","), (x, d, n) => {
          // // console.log("checking the left menu");
          switch (x) {
            case "no-leftmenu":
              // gstore.localSettings.isLeftMenuOpen = false;
              break;
            case "no-nav":
              gstore.localSettings.hasTopNav = false;
              break;
            case "no-subnav":
              gstore.localSettings.hasTopSubNav = false;
              break;
            case "no-panel-pad":
              gstore.localSettings.noPanelPadValue = false;
              break;
          }
        });
      }
      gstore.localSettings.noPanelPadValue = false;
      gstore.localSettings.hasTopSubNav = false;
      gutils.callWhenResize();
    });

    autorun((arr) => {
      console.log("saving desktop", arr);
      localStorage.setItem("desktop_str", JSON.stringify(gstore.desktop));
    });
  },
  jsx_remove(x, props, rowidx) {
    return (
      <a
        href={gutils.void_ref}
        onClick={() => {
          props.onChange(gutils.pickArr(props.value, rowidx));
        }}
      >
        Remove
      </a>
    );
  },
  delete_nouse_id_before_clean(x) {
    const newobjx = gutils.clone(x);
    delete newobjx["ID"];
    let temparr = [
      "EXTRA_DATA_PROXY_RULES_PATH_REWRITE",
      "EXTRA_DATA_PROXY_RULES",
    ];
    temparr.forEach((kkk) => {
      _.forEach(newobjx[kkk], (xxx) => {
        delete xxx["ID"];
        delete xxx["CONFIG_ID"];
        delete xxx["CONFIG_RULE_ID"];
        _.forEach(temparr, (x1) => {
          if (xxx[x1]) {
            _.forEach(xxx[x1], (n) => {
              delete n["ID"];
              delete n["CONFIG_RULE_ID"];
              delete n["CONFIG_ID"];
            });
          }
        });
      });
    });
    return newobjx;
  },
  jsx_duplicate(x, props, rowidx) {
    return (
      <a
        href={gutils.void_ref}
        onClick={() => {
          const newarr = [...props.value];
          const newobjx = gutils.delete_nouse_id_before_clean(x);
          newarr.push(newobjx);
          props.onChange(newarr);
        }}
      >
        Duplicate
      </a>
    );
  },
  col_disable(props) {
    return {
      label: "Status",
      value: (x) => (x.DISABLE == 1 ? "Disabled" : "Enabled"),
    };
  },
  jsx_disable(x, func) {
    return "";
    return (
      <a
        href={gutils.void_ref}
        onClick={() => {
          // x.DISABLE = x.DISABLE == 0 || _.isNil(x.DISABLE) ? 1 : 0;
          func();
        }}
      >
        {x.DISABLE == 0 || _.isNil(x.DISABLE) ? "Disable" : "Enable"}
      </a>
    );
  },
  pickArr(arr, index) {
    return _.concat(_.slice(arr, 0, index), _.slice(arr, index + 1));
  },
  isChinaUser: false,
  hist: null,
  confirm: async function (msg) {
    return await gutils.win_confirm(msg);
  },
  openDir(x) {
    window.ipc.mkdirDir(x);
    window.ipc.openFile(x);
  },
  openFile(x) {
    window.ipc.openFile(x);
  },
  copyWithAlert(ctn) {
    gutils.copy(ctn);
    gutils.alertOk(`Copied`);
  },

  copy(ctn) {
    var obj = document.getElementById("uniqueiptele");
    obj.value = ctn;
    obj.select();
    document.execCommand("Copy");
  },
  renderingStaticRunStatus: renderingStFunc,
  renderingProxyRunStatus: renderingStFunc,
  runStatusViewColor: () => {
    return {
      0: "primary",
      1: "danger",
      2: "success",
      5: "warning",
    };
  },
  logging_obj() {
    let redColor = "#ff2020";
    return {
      0: {
        label: "INFO",
        color: "deepskyblue",
      },
      1: {
        label: "SUCC",
        color: "yellowgreen",
      },
      2: {
        label: "ERROR",
        color: redColor,
      },
      3: {
        label: "WARNING",
        color: "yellow",
      },
      4: {
        label: "DEBUG",
        color: "green",
      },
      14: {
        label: "ERROR",
        color: redColor,
      },
    };
  },
  logging_list() {
    return [
      {
        label: "INFO",
        value: 0,
      },
      {
        label: "SUCC(Success)",
        value: 1,
      },
      {
        label: "ERROR",
        value: 2,
      },
      {
        label: "ERROR(DEBUG)",
        value: 14,
      },
      {
        label: "WARNING",
        value: 3,
      },
      {
        label: "DEBUG",
        value: 4,
      },
    ];
  },
  runStatusViewColorWithIntent: () => {
    return {
      0: "primary",
      1: "danger",
      2: "success",
      5: "warning",
    };
  },
  runStatusDefineObj: () => {
    return {
      0: "StartUp",
      1: "Stop",
      2: "Restart",
      5: "Interrupt",
    };
  },
  deleteConfirmPanel(func) {
    return (
      <div key="text">
        <p>Do you want to trigger the delete operation?</p>
        <div
          style={{ display: "flex", justifyContent: "flex-end", marginTop: 15 }}
        >
          <Button
            className={Classes.POPOVER_DISMISS}
            style={{ marginRight: 10 }}
          >
            Cancel
          </Button>
          <Button
            intent={Intent.DANGER}
            className={Classes.POPOVER_DISMISS}
            onClick={() => {
              func();
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    );
  },
  getModel2Obj(key) {
    return window[key];
  },
  setModel2Obj(key, value) {
    window[key] = value;
  },
  whenBlurFunc: [],
  commonPopover() {
    return {
      popoverClassName: Classes.POPOVER_CONTENT_SIZING,
      portalClassName: "faults",
      minimal: true,
      captureDismiss: true,
      transitionDuration: 5,
      lazy: false,
      hoverOpenDelay: 5,
      hoverCloseDelay: 5,
      interactionKind: PopoverInteractionKind.HOVER_TARGET_ONLY,
    };
  },
  sleep(val) {
    return new Promise((e) => {
      setTimeout(() => {
        e();
      }, val);
    });
  },
  clone(obj) {
    return _.cloneDeep(obj);
  },
  propsForInput(props, iptVal, onIptVal) {
    // // console.log("input value", props.id, props.value);
    return {
      intent: props.intent,
      placeholder: t(props.placeholder),
      id: props.id,
      value: iptVal, // props.value
      onBlur: (x) => {
        // // // console.log("final update", iptVal);
        // props.onChange(iptVal);
        _.forEach(gutils.whenBlurFunc, (x, d, n) => {
          x();
        });
        gutils.whenBlurFunc = [];
      },
      asyncControl: true,
      onChange: (x) => {
        // // // console.log("on change", x.target.value);
        onIptVal(x.target.value);
        if (props.onChangeDelay) {
          props.onChangeDelay(x.target.value, {
            // needUpdateValue: false,
            forceUpdateNow: false,
          });
        }
        if (props.onChange) {
          props.onChange(x.target.value);
        }
        if (props.chg) {
          props.chg(x.target.value);
        }
      },
    };
  },
  wakeobj: {},
  // selectDir: async function(func) {
  //   window.ipc.receiveOnce("get-dirs", (value) => {
  //     // // console.log("selectDirs", value);
  //     func(_.first(value));
  //   });
  //   window.ipc.send("select-dirs");
  // },
  selectDir(func) {
    ipc.selectDir();
  },
  selectFileForMulti(func) {
    window.ipc.receiveOnce("get-files-multi", (value) => {
      console.log("i got files");
      func(value);
    });
    window.ipc.send("select-files-multi");
  },
  selectFile(func, isFirst = true) {
    window.ipc.selectFile(func);
    // window.ipc.receiveOnce("get-files", (value) => {
    //   console.log("i got files");
    //   func(isFirst ? _.first(value) : value);
    // });
    // window.ipc.send("select-files");
  },
  createForm2(modelObj, saveglobalkey, validConditions) {
    return (
      <GForm2Wrapper
        modelObj={modelObj}
        saveglobalkey={saveglobalkey}
        validConditions={validConditions}
        key={saveglobalkey}
      />
    );
  },
  createForm(modelObj, modelKeys, arr) {
    let obj = modelKeys.obj;
    if (_.isNil(obj)) {
      obj = {};
    }
    const model = modelObj[modelKeys.model];
    const modelFailures = modelObj[modelKeys.failures];
    function validateCurrentX(x, finval) {
      let isDanger = false,
        dangerTooltip = null;
      if (
        x.need &&
        (_.isNil(finval) ||
          (_.isString(finval) && finval.length == 0) ||
          (finval.length == 0 && _.isArray(finval)))
      ) {
        isDanger = true;
        dangerTooltip = "Value cannot be empty";
      }
      let strval = "" + (_.isNil(finval) ? "" : finval);
      if (x.max && strval.length >= x.max) {
        isDanger = true;
        dangerTooltip = "Value length cannot greater than maximum " + x.max;
      }
      if (x.validator) {
        let isok = x.validator(finval);
        if (!isok) {
          isDanger = true;
          dangerTooltip =
            x.errorText ||
            "The formatting of value mismatches with the validate rule.";
        }
      }

      return {
        isDanger,
        dangerTooltip: t(dangerTooltip),
      };
    }
    return (
      <Example>
        {_.chain(arr)
          .map((x, d, n) => {
            let mycrtid = x.prop;
            const CrtTag = x.jsx;
            let extraFormGroupsProps = {
              helperText: t(x.tooltip),
            };
            if (_.isNil(model[x.prop]) && x.defaultValue) {
              gutils.defer(() => {
                model[x.prop] = x.defaultValue;
              });
            }
            const crtValidObj = modelFailures[x.prop];
            if (crtValidObj) {
              extraFormGroupsProps.intent = "danger";
              extraFormGroupsProps.helperText = crtValidObj.dangerTooltip;
            }
            function checkTotalValid() {
              return _.chain(arr)
                .filter((xx) => xx.prop != x.prop)
                .map((x) => validateCurrentX(x, model[x.prop]))
                .thru((x) => {
                  for (let e of x) {
                    if (e && e.isDanger) {
                      return false;
                    }
                  }
                  return true;
                })
                .value();
            }
            const updateFuncMiles = 50;
            const debounce = (x) => x;
            const deleteModelFailuresFunc = debounce(() => {
              delete modelFailures[x.prop];
            }, 500);
            const updateAllPassFunc = debounce((isAllPass) => {
              modelObj[modelKeys.isAllPass] = isAllPass;
            }, 500);
            const updateFuncDelay = debounce((finval) => {
              model[x.prop] = finval;
            }, updateFuncMiles);
            const chgfunc = (temp1, configForChg = {}) => {
              _.defaultsDeep(configForChg, {
                needUpdateValue: true,
              });
              let finval = temp1;
              if (
                _.get(temp1, "__proto__.constructor.name") === "SyntheticEvent"
              ) {
                finval = temp1.target.value;
              }
              const { dangerTooltip, isDanger } = validateCurrentX(x, finval);
              let isAllPass = null;
              if (isDanger) {
                isAllPass = false;
              } else {
                isAllPass = checkTotalValid();
              }
              if (isAllPass != null) {
                // gutils.whenBlurFunc.push(() => {
                // });
                updateAllPassFunc(isAllPass);
              }
              if (isAllPass == false && modelObj[modelKeys.isAllPass] == true) {
                updateAllPassFunc(false);
              }

              if (!isDanger && modelFailures[x.prop]) {
                deleteModelFailuresFunc();
              }
              if (isDanger) {
                modelFailures[x.prop] = {
                  dangerTooltip,
                };
              }
              console.log("changing", finval, x, configForChg);
              if (configForChg.needUpdateValue) {
                updateFuncDelay(finval);
              }
            };
            const put_value = model[x.prop];
            const put_onchg = (...args) => {
              try {
                return chgfunc(...args);
              } catch (e) {
                //debugger;
                console.error("fail", e);
                throw e;
              }
            };
            gutils.wakeobj[modelKeys.wakekey + "." + mycrtid] = () => {
              gutils.defer(() => {
                put_onchg(model[x.prop]);
              });
            };
            if (x.type == "html") {
              return (
                <div
                  key={x.prop}
                  style={{
                    margin: "0 0 15px",
                  }}
                >
                  {x.value({
                    value: put_value,
                    onChange: put_onchg,
                  })}
                </div>
              );
            }
            const showFunc = x.show;
            if (showFunc) {
              if (!showFunc(model)) {
                return null;
              }
            }
            return (
              <FormGroup
                {...extraFormGroupsProps}
                label={t(x.label)}
                labelFor={mycrtid}
                labelInfo={x.need ? t("(required)") : ""}
                key={x.prop}
              >
                <CrtTag
                  intent={extraFormGroupsProps.intent}
                  id={mycrtid}
                  placeholder={t(x.placeholder)}
                  value={put_value}
                  onChange={put_onchg}
                  onChangeDelay={debounce(chgfunc, 300)}
                />
              </FormGroup>
            );
          })
          .filter((x) => !_.isNil(x))
          .value()}
      </Example>
    );
  },
  alertOk_noT(msg) {
    if (_.isString(msg)) {
      msg = {
        intent: "success",
        message: msg,
      };
    }
    _.merge(msg, {
      intent: "success",
    });
    return gutils.alert({
      ...msg,
      skipT: true,
    });
  },
  alertErr_noT(msg) {
    if (_.isString(msg)) {
      msg = {
        message: msg,
      };
    }
    _.merge(msg, {
      intent: "danger",
    });
    return gutils.alert({
      ...msg,
      skipT: true,
    });
  },
  alertOk(config, otherconfigifhas) {
    if (_.isString(config)) {
      config = {
        message: config,
      };
    }
    if (!_.isNil(otherconfigifhas)) {
      _.merge(config, otherconfigifhas);
    }
    return gutils.alert({
      intent: "success",
      icon: "endorsed",
      ...config,
    });
  },
  pipe_message_arr: [],
  alert(config) {
    if (_.isString(config)) {
      config = {
        message: config,
      };
    }
    try {
      if (
        config.message &&
        config.message.indexOf(" (No such file or directory)") != -1 &&
        config.message.indexOf("groovy") != -1
      ) {
        return;
      }
    } catch (e) {
      console.log("err", e);
    }
    if (
      !_.isNil(config.message) &&
      config.message.indexOf &&
      config.message.indexOf("setValue") != -1
    ) {
      console.log("ignore that errors");
      return;
    }
    config.message =
      _.isString(config.message) && config.skipT !== true
        ? t(config.message)
        : config.message;
    try {
      let now_value = Date.now();
      let item = _.find(
        gutils.pipe_message_arr,
        (x) =>
          x.message == config.message &&
          Math.abs(x.timestamp - now_value) <= 3000
      );
      if (!_.isNil(item)) {
        return;
      }
      gutils.pipe_message_arr.push({
        message: config.message,
        timestamp: now_value,
      });
      if (_.size(gutils.pipe_message_arr) > 5) {
        gutils.pipe_message_arr = _.takeRight(gutils.pipe_message_arr, 5);
      }
    } catch (e) {
      console.log(e);
    }
    if (_.isString(config.message)) {
      let rawMsg = config.message;
      try {
        config.message = (
          <div>
            {_.map(config.message.split("\n"), (x, d, n) => {
              return <div key={d}>{x}</div>;
            })}
          </div>
        );
      } catch (e) {
        config.message = rawMsg;
        console.log(e);
      }
    }

    return AppToaster(config.usingName ? config.usingName : null).show(config);
  },
  alertOkDirect: async function (obj) {
    await gutils.win_alert(obj.message);
  },

  genCol(arr, tableData = []) {
    return _.chain(arr)
      .map((x, d, n) => {
        return {
          name: t(x.label),
          render(rowIndex) {
            let crtRowObj = tableData[rowIndex];
            let finValue = "";
            if (!_.isNil(crtRowObj)) {
              if (_.isString(x.value)) {
                finValue = crtRowObj[x.value];
              } else {
                finValue = x.value(crtRowObj, rowIndex);
              }
            }
            return <Cell key={x.label}>{finValue}</Cell>;
          },
        };
      })
      .value();
  },
  noNaN(val) {
    return isNaN(val) ? 0 : val;
  },
  noNaNWithNull(val) {
    return isNaN(val) ? null : val;
  },
  removeOnce(key) {
    delete cacheMap[key];
  },
  once(key, func) {
    if (cacheMap[key]) {
      return;
    }
    cacheMap[key] = 1;
    func();
  },
  api: gapi,
  app_name: "CodeGen",
  app_version: window.ipc.version,
  sample_text: "the quick brown fox jumps over the lazy dog",
  iterateTree(arr, loopFunc, nextKey = "children") {
    return _.map(arr, (x, d, n) => {
      loopFunc(x, d, n);
      if (x[nextKey]) {
        x[nextKey] = gutils.iterateTree(x[nextKey], loopFunc, nextKey);
      }
      return x;
    });
  },
  intent: {
    danger: "#db3737",
    success: "#0f9960",
    fineyellow: "#a71fa9",
  },
  void_ref: "javascript:void(0);",
  formatDate(date) {
    return new Moment(date).format("YYYY-MM-DD HH:mm:ss");
  },
  findTree(arr, loopFunc, findPushArr = []) {
    let nextKey = "children";
    let findObj = null;
    _.every(arr, (x, d, n) => {
      findObj = loopFunc(x, d, n);
      if (x[nextKey] && findObj == null) {
        findObj = gutils.findTree(x[nextKey], loopFunc, findPushArr);
      }
      if (findObj != null) {
        findPushArr.push(x);
      }
      return findObj == null;
    });
    return findObj;
  },
  defer(func, timeout = 0) {
    setTimeout(func, timeout);
  },
  optCentre: async (url, param = {}, config = {}) => {
    let mywaitval = localStorage.getItem("mywaittimenow");
    if (gstore.localSettings.can_call_remove_requests == "no") {
      let iscanworknow = false;
      if (mywaitval != null) {
        if (parseInt(mywaitval) < new Date().getTime()) {
          gstore.localSettings.can_call_remove_requests = "yes";
          localStorage.removeItem("mywaittimenow");
          await gutils.win_alert(
            `CodeGen already enabled the sending requests ability because the previous operation already expired, please check configuration if needed.`
          );
          iscanworknow = true;
        } else {
          console.log("no allow");
          return;
        }
      }
      if (_.isNil(param.CHECKING) && !iscanworknow) {
        await gutils.win_alert(
          `Application cannot connect to server because you disallow CodeGen from sending requests to remote server, please check settings`
        );
      }
    }

    let finURL = gutils.getCentreLink(url);
    return new Promise((okfunc, errfunc) => {
      if (_.isNil(param)) {
        param = {};
      }
      let allFormData = new FormData();
      _.forEach(param, (x, d, n) => {
        allFormData.append(d, x);
      });
      axios({
        // method: "GET",
        // params: {
        //   ...param,
        // },
        method: "POST",
        data: {
          ...param,
        },
        // data: allFormData,
        url: finURL,
        headers: _.merge(
          {
            "X-WORK7Z-TOKEN": window.user_token(), //  localStorage.getItem("USER_TOKEN"),
            // "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            // "Content-Type": "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
            "X-WORK7Z-RES-TYPE": "JSON",
            "X-WORK7Z-API": "v2",
            "X-WORK7Z-LANG": window.getCrtLang(),
            "X-FE-RUID": ipc.fn_ruid(),
            "X-FE-MACHINE-ID": localStorage.getItem("machineID"),
            "X-WORK7Z-DEV": "MOB",
            "X-WORK7Z-MACHINEID": window.ipc.getMachineId(),
          },
          gutils.getHeaderFromConfig({ config, param })
        ),
        validateStatus: (status) => {
          return true; // I'm always returning true, you may want to do it depending on the status received
        },
      })
        .then((e) => {
          // // console.log("got then ", e);
          if (e.status != 200) {
            if (e.data && e.data.message && !config.mute) {
              gutils.alert({
                intent: "danger",
                icon: "error",
                message: e.data.message,
              });
            }
            errfunc(e);
          } else {
            e.data["TOKEN"] = e.headers["x-work7z-token"];
            if (e.headers["x-work7z-username"]) {
              get_user_info().username = e.headers["x-work7z-username"];
              // localStorage.setItem(
              //   "SYS_USER_NAME",
              // );
            }
            if (e.headers["x-work7z-userid"]) {
              get_user_info().user_id = e.headers["x-work7z-userid"];
              // localStorage.setItem("SYS_USER_ID", );
            }
            if (e.headers["x-work7z-email"]) {
              get_user_info().email = e.headers["x-work7z-email"];

              // localStorage.setItem(
              //   "SYS_USER_EMAIL",
              // );
            }
            okfunc(e.data);
          }
        })
        .catch((re, val) => {
          // // console.log("got failure", re, val);
          errfunc(re);
        });
    });
  },
  optWithThrowErr: async function (url, param, config) {
    try {
      let res = await gutils.opt(
        url,
        _.merge(param, {
          errorResponse: true,
          forceNoModel: true,
        }),
        config
      );
      return res;
    } catch (e) {
      if (param.helpCatch || true) {
        gutils.w_handleError(e);
      }
      throw e;
    }
  },
  optWithNoWin: async function (url, param, config) {
    try {
      let res = await gutils.opt(
        url,
        _.merge(param, {
          errorResponse: true,
          forceNoModel: true,
        }),
        config
      );
      return res;
    } catch (e) {
      throw e;
    }
  },
  optStatic: async function (link) {
    if (p_mode() && !gutils.dev()) {
      link = "https://cdn.codegen.cc/cloud/" + `v${pkgInfo.version}` + link;
    }
    let res = await axios({
      url: link,
    });
    return res;
  },
  getHeaderFromConfig({ config, param }) {
    // let localUserInfo = window.LOCAL_AUTH_LOGIN_CHK.getUserInfo();
    return {
      // "X-LOCAL-USERNAME": localUserInfo.username,
      // "X-LOCAL-PASSWORD": localUserInfo.password,
      // "X-FE-RUID": ipc.fn_ruid(),
      "X-FE-RUID": ipc.store_get("token"),
      "Content-Type": config.contentType || "application/json;charset=UTF-8",
      "X-FE-LIVE-ID": gutils.crt_live_id,
      "X-CODEGEN-WORKSPACE-ID":
        param.USER_OPT_WS_ID || gstore.localSettings.currentWorkspaceId,
      "X-CODEGEN-USER-PRI-KEY":
        param.USER_OPT_WS_KEY ||
        getThatPrivateKey(gstore.localSettings.currentWorkspaceId),
    };
  },
  md5(value) {
    return window.CryptoJS.MD5(value).toString();
  },
  optCtn: async function (...args) {
    let { content } = await gutils.opt(...args);
    return content;
  },
  opt: async function (url, param = {}, config = {}) {
    if (_.startsWith(url, "/static")) {
      url = url.replace("/static", "/stserver");
    }
    if (
      p_mode() &&
      !_.startsWith(url, "/portal_public") &&
      !_.startsWith(url, "/api_tool")
    ) {
      // url = `/r_cloud_api${url}`;
    }
    if (p_mode()) {
      // url = `https://codegen.cc${url}`;
    }
    while (ipc.store_get("token") == null) {
      await gutils.sleep(300);
      console.log("no code can be used");
    }
    let localUserInfo = window.LOCAL_AUTH_LOGIN_CHK.getUserInfo();
    url = gutils.getLocalApiLink(url);
    const conf = {
      method: "POST",
      data: config.fn_data
        ? config.fn_data()
        : {
            userInfo: window.get_user_info(),
            sysInfo: {
              lang: window.getCrtLang(),
              version: pkgInfo.version,
            },
            localUserInfo,
            param: param,
          },
      headers: gutils.getHeaderFromConfig({ config, param }),
    };
    if (
      config &&
      (config.fn_data || config.contentType == "multipart/form-data")
    ) {
      _.merge(conf.headers, {
        "X-LOCAL-USER-INFO": Base64.encode(JSON.stringify(localUserInfo)),
      });
    }
    let workNow = new Promise((okfunc, errfunc) => {
      const port = _.get(config, "port", window.ipc.port);
      // TODO: logic objects
      // http://127.0.0.1:${port}
      const completeURL = `${url}`;
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();
      if (config && config.ref) {
        config.ref(source);
      }
      axios({
        ...conf,
        cancelToken: source.token,
        url: completeURL,
        validateStatus: (status) => {
          return true; // I'm always returning true, you may want to do it depending on the status received
        },
      })
        .then((e) => {
          // // console.log("got then ", e);
          if (e.status != 200) {
            if (
              e.data &&
              e.data.message &&
              completeURL.indexOf("waiting-for") == -1 &&
              param.errorResponse != true &&
              param.forceNoModel != true &&
              config.forceNoModel != true
            ) {
              // debugger;
              let isNoModal = false;
              let myerrmsg = gutils.getErrMsg(e);
              if (
                (myerrmsg && myerrmsg.indexOf("[CG_NO_PERM]") != -1) ||
                (myerrmsg || "").indexOf(
                  "aba.druid.pool.DataSourceClosedException"
                ) ||
                (myerrmsg || "").indexOf(
                  `Unknown database and table definitio`
                ) != -1 ||
                (myerrmsg || "").indexOf("/users/jerrylai/mincontent/Per") != -1
              ) {
                isNoModal = true;
              }
              let isChanged = myerrmsg == "application has not configured yet";

              // if (isChanged) {
              //   if (
              //     await gutils.win_confirm(
              //       `System detected the token had been changed, would you like to refresh now?`
              //     ) &&
              //     _.isNil(window.chgnow)
              //   ) {
              //     window.chgnow = true;
              //     // location.reload();
              //   } else {
              //     window.chgnow = true;
              //   }
              // }
              if (!isNoModal) {
                gutils.w_handleError(e);
              }
              // gutils.alert({
              //   intent: "danger",
              //   icon: "error",
              //   message: e.data.message,
              // });
            }
            errfunc(e);
          } else {
            let m_data = e.data;
            window.m_data = m_data;
            if (m_data && m_data.content) {
              let dataArr = m_data.content;
              function formattingDataArr(dataArr) {
                if (_.isNil(dataArr)) {
                  return;
                }
                _.forEach(dataArr, (x, d, n) => {
                  if (window.Moment && x && x.CREATE_TIME) {
                    x.CREATE_TIME_STR = Moment(x.CREATE_TIME).format(
                      "YYYY-MM-DD HH:mm:ss"
                    );
                    x.CREATE_TIME_DESC = Moment(x.CREATE_TIME).fromNow();
                  }
                });
              }
              window.formattingDataArr = formattingDataArr;
              formattingDataArr(dataArr);
              formattingDataArr(_.get(m_data, "value.data.value.LIST"));
            }
            okfunc(m_data);
          }
        })
        .catch((re, val) => {
          // // console.log("got failure", re, val);
          errfunc(re);
        });
    });

    let res = await workNow;
    return res;
  },
};
CodeGenDefinition.gutils=gutils
// window.gutils = gutils.getExposeGUtils();
const otherRef = gutils;
gutils.getExposeGUtils = () => {
  return {
    ...otherRef,
    optCentreWithDeviceInfo: (...args) => {
      // all kinds of optWithDeviceInfo will be sent here
      // console.log("handling optCentreWithDeviceInfo");
      return otherRef.optCentreWithDeviceInfo(...args);
    },
    opt: (...args) => {
      // all kinds of opt will be sent here
      // console.log("handling opt");
      return otherRef.opt(...args);
    },
    optCentre(...args) {
      // all kinds of opt centre will be sent here
      // console.log("handling opt centre");
      return otherRef.optCentre(...args);
    },
  };
};
gutils = {
  ...gutils,
  ...gutils.getExposeGUtils(),
};
window.gutils = gutils;
console.log("gutils-pre", gutils);

export default gutils;
