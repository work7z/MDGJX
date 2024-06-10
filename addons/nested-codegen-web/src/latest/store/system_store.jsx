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
import { Example, } from "@blueprintjs/docs-theme";
import {
  ColumnHeaderCell,
  Cell,
  Column,
  Table,
  Regions,
} from "@blueprintjs/table";
import React from "react";
import Moment from "moment";
import qs from "querystring";
import ReactDOM from "react-dom";
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
import constants from "../constants";
import gutils from "../utils";
import backbone from "../omnibus-backbone.json";
// import pinyin from "pinyin";
window.pinyin = {};

window.ExtensionDefinition = {};

function iterateTreeForRoadMap(arr, loopFunc, nextKey = "children") {
  return _.filter(
    _.map(arr, (x, d, n) => {
      if (_.isNil(x)) {
        return null;
      }
      loopFunc(x, d, n);

      if (x[nextKey]) {
        x[nextKey] = iterateTreeForRoadMap(x[nextKey], loopFunc, nextKey);
      }
      return x;
    }),
    (x) => {
      return !_.isNil(x);
    }
  );
}

let mywidthobj = {
  leftMenuWidth: "260px",
  database_topview_left_project_width: "260px",
  database_top_bottom_view_project_width: "50%",
};
window.mem_private_key_ws_obj = {};

let fn_isCrtChina = () => {
  let language = navigator.language;
  return language == "zh-CN";
};
let home_pathstr = "/dashboard/home";
let fn_raw_local_set = () => {
  let fn_list_1 = () => [
    {
      label: `Home`,
      needTranslate: true,
      id: home_pathstr,
      closable: false,
    },
  ];
  return {
    should_always_consume_mousewheel: false,
    app_sys_app_view_height: 673,
    app_left_to_right_mode: false,
    app_multiple_tab_mode: false,
    app_need_left_tabs_open: true,
    pre_app_multiple_tab_mode: null,
    crt_doc_title: ``,
    global_menu_tabs_obj: {
      value: home_pathstr,
      list: fn_list_1(),
    },
    gloabl_menu_tabs_init_config: {
      fn_init_value: home_pathstr,
      fn_init_list: fn_list_1(),
    },
    nav_menu_remark: {},
    idx_tab_value: "all",
    userInfo: {
      signed: false,
      username: "N/A",
      token: "N/A",
      email: "N/A",
      user_id: null,
    },
    hide_for_init_portal: false,
    expanded_all_menu_settings: "expanded",
    is_disable_using_center_layout: false,
    private_key_ws_obj: {},
    ask_china_before: true,
    is_user_based_on_china: fn_isCrtChina(),
    crt_functions_filter_str: "",
    crt_functions_filter_str_btm: "",
    crt_editor_size: "13px",
    is_debug_mode: false,
    using_desktop_mode: false,
    can_call_remove_requests: "yes",
    editor_mode: "general",
    crt_theme: "vs",
    default_theme_light: "vs",
    default_theme_dark_more: "twilight",
    is_auto_switch_dark_mode: "no",
    showing_terminal_panel: false,
    is_using_dark_mode: false,
    softwareUpdatesTabId: "prod",
    appTypeView: "no-nav,no-subnav,no-leftmenu,no-panel-pad",
    lastExtSize: -1,
    is_allow_show_area_mode_in_time: true,
    // appTypeView: "no-nav,no-subnav",
    // no-nav,no-subnav,no-leftmenu,no-panel-pad
    isLeftMenuOpen: false,
    showingOmnibar: false,
    hasTopNav: false,
    hasTopSubNav: false,
    pre_dataBackupDir: null,
    dataBackupDir: _.get(window, "ipc.backupDir"),
    noPanelPadValue: true,
    ...mywidthobj,
    isShowDataSourceLeftPanel: true,
    currentWorkspaceId: "default",
    pre_currentWorkspaceId: null,
  };
};
window.fn_raw_local_set = fn_raw_local_set;
let localSettings = fn_raw_local_set();
// X-CODEGEN-WORKSPACE-ID
// _.forEach(localSettings, (x, d, n) => {
//   localSettings[d + "_bck"] = x;
// });
// window.RAW_LOCALSETTING = _.cloneDeep(localSettings);
function safeparse(str) {
  try {
    return JSON.parse(str);
  } catch (err) {
    return null;
  }
}
// if (previousLocalSettings != null) {
//   let ok = safeparse(previousLocalSettings);
//   if (false && window.ipc.dev && ok) {
//     _.forEach(localSettings, (x, d, n) => {
//       const cd = d.toLowerCase();
//       if (cd.indexOf("width") != -1 || cd.indexOf("height") != -1) {
//       } else {
//         localSettings[d] = ok[d] || localSettings[d];
//       }
//     });
//   } else {
//     if (ok) {
//       delete ok["database_topview_left_project_width"];
//       delete ok["database_top_bottom_view_project_width"];
//     }
//     // //debugger;
//     // _.merge(localSettings, ok);
//   }
// }
let previousLocalSettingJson = null;

// try {
//   function customizer(objValue, srcValue) {
//     // if (_.isArray(objValue)) {
//     //   if (!_.isEmpty(srcValue)) {
//     //     return srcValue;
//     //   } else {
//     //     return objValue;
//     //   }
//     // }
//   }
//   previousLocalSettingJson = window.ipc.readLocalSourceReadOnlyLocalSettings();
//   let p_global_menu_tabs_obj = _.cloneDeep(
//     window.ipc.readLocalSourceReadOnlyLocalSettings().global_menu_tabs_obj
//   );
//   _.mergeWith(localSettings, previousLocalSettingJson, customizer);
//   _.merge(localSettings, mywidthobj);
//   if (!_.isEmpty(p_global_menu_tabs_obj)) {
//     localSettings.global_menu_tabs_obj = p_global_menu_tabs_obj;
//   }
//   // _.defaultsDeep(localSettings.global_menu_tabs_obj);
//   // debugger;
// } catch (e) {
//   // debugger;
//   // document.write(JSON.stringify(e));
// }

// if (
//   _.isNil(localSettings.dataBackupDir) ||
//   !window.ipc.hasFile(localSettings.dataBackupDir)
// ) {
//   localSettings.dataBackupDir = window.ipc.backupDir;
// }

localSettings.currentWorkspaceId = "default";
localSettings.idx_tab_value = "all";
localSettings.showingOmnibar = false;
localSettings.crt_functions_filter_str = "";
// lldesktop
let fn_desktop = () => {
  return {
    timestamp: 0,
    main_id: null,
    windows: [],
    win_max_active_id: null,
    search: {
      text: "",
      lower_text: "",
    },
    bounds: {
      width: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    draggingObj: {
      show: false,
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
    isMenuOpen: false,
  };
};
window.fn_desktop = fn_desktop;
let mydesktop = fn_desktop();

function customizer(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return srcValue; // objValue.concat(srcValue);
  }
}

let desktop_str = localStorage.getItem("desktop_str");
if (!_.isNil(desktop_str)) {
  try {
    _.mergeWith(mydesktop, JSON.parse(desktop_str), customizer);
    _.defaultsDeep(mydesktop, fn_desktop());
  } catch (err) {
    localStorage.removeItem("desktop_str");
  }
}
// mydesktop.windows = [];
mydesktop.timestamp = new Date().getTime();

let config_str_definition = `beautify_yaml
beautify_css
beautify_less
beautify_scss
beautify_json
beautify_javascript
beautify_typescript
com_temp
beautify_jsx
beautify_markdown
beautify_java
beautify_sql
xml_transform
xml_browser
json_transform
json_browser
encode_base64
encode_url
escape_xml
escape_html
escape_java
escape_json
escape_javascript
escape_csv
encrypt_md5
encrypt_rsa
encrypt_sha
encrypt_des

trans_text
trans_json
trans_i18n

encrypt_aes
notes_snippet
notes_clipboard
notes_vim
notes_emacs

time_timestamp
time_timezone
time_difference
time_timeunit_convert
random_uuid
random_text
random_shuffle
case_ascii
case_number
case_chinese


`;
// gen_mybatis
// gen_dto_php
// gen_dto_cpp
// gen_dto_go
// gen_dto_python
// gen_dto_java
// gen_dto_csharp
// gen_dto_scala
// gen_dto_kotlin
// gen_dto_groovy
// gen_dto_clojure
// gen_dto_javascript
// gen_dto_typescript
// gen_dto_coffeescript
// gen_dto_es5

let fn_init_other_parser_config = (config_str_definition) => {
  return _.chain(config_str_definition)
    .split("\n")
    .map((x) => _.trim(x))
    .filter((x) => !_.isEmpty(x))
    .map((x, d, n) => {
      let x_arr = _.split(x, "_");
      return {
        group: x_arr[0],
        lang: _.trim(x_arr[1]),
        storeName: x_arr[0] + _.upperFirst(_.join(x_arr.slice(1), "_")),
        path: x,
        tableId: x,
      };
    })
    .value();
};

window.fn_init_other_parser_config = fn_init_other_parser_config;

function formatForPyStr(x) {
  x.pystr = x.label;
  x.raw_label = x.label;
  try {
    if (window.PinyinEngine) {
      x.pystr =
        x.label +
        "," +
        _.dropRight(PinyinEngine.participle(x.label).split("\x01"), 1).join(
          ","
        );
    }
  } catch (e) {
    console.log(e);
  }
  x.pystr = _.toLower(x.pystr);
}

window.formatForPyStr = formatForPyStr;
let handleForEachRoadMap = (x, needTranslate) => {
  if (x.label && x.skipT != true) {
    x.label = t(x.label);
  }
  if (!_.isNil(x.children) && x.expand !== false) {
    x.expand = true;
  }
  if (x.pathname && !x.pathname.startsWith("")) {
    x.pathname = "" + x.pathname;
  } else {
    if (_.isNil(x.children) && _.isNil(x.pathname)) {
      x.pathname = "/exts/" + x.pid;
    }
  }
  // if(window.prePyObj){
  //   window.prePyObj.push(x.label)
  // }
  formatForPyStr(x);
  // console.log(x);
  if (_.isNil(x.pid)) {
    // console.log("no pid", x);
    // throw new Error("no pid field can be found");
  }
  // x.id = parseInt(_.uniqueId());
  x.id = x.pid;

  let customize_menu_list = gstore.sysinfo.customize_menu_list;
  if (!_.isEmpty(customize_menu_list) && !_.isNil(x.children)) {
    _.forEach(customize_menu_list, (eachMenu) => {
      if (eachMenu.PARENT_MENU_PID == x.pid) {
        x.children.push({
          pathname:
            `/exts/SiteBrowser` +
            qs.stringify({
              // id: "SiteBrowser",
              link: eachMenu.MENU_LINK,
              name: eachMenu.MENU_NAME,
              pid: eachMenu.MENU_PID,
            }),
          label: eachMenu.MENU_NAME,
          pid: eachMenu.MENU_PID,
          icon: "link",
          type: "system_menu_item",
        });
      }
    });
  }
};

window.handleForEachRoadMap = handleForEachRoadMap;

const system_store = {
  desktop: mydesktop,
  bootServer: {
    text: "",
    err: null,
    updates: {
      loading: false,
      newVersion: null,
      updateObj: {},
      errInfo: null,
      installMessage: "",
      isInstalling: false,
      restartNeeded: false,
    },
  },
  localSettings: localSettings,
  settings: {
    filter_for_left_menu_search_bar: "",
    appViewTypeArr: {
      get: () => {
        return [
          {
            label: t("Full View Mode"),
            id: "all",
            value: "all",
          },
          // {
          //   id: "concentrate",
          //   label: t("Concentrate Mode"),
          //   value: "no-nav,no-leftmenu,no-panel-pad",
          // },
          // {
          //   id: "highly",
          //   label: t("Highly Concentrate Mode"),
          //   value: "no-nav,no-subnav,no-leftmenu",
          // },
          {
            id: "panel-only",
            label: t("Panel-Only Concentrate Mode"),
            value: "no-nav,no-subnav,no-leftmenu,no-panel-pad",
          },
        ];
      },
    },
    drawerConfig: {
      open: false,
      view_key: "general",
    },
    // isShowDataSourceLeftPanel: true,
    model: {},
    loading: false,
    dev_mode: false,
    langArr: {},
    other: {
      temp_model: {},
      ...constants.extraModelProps(),
      addModelFailures: {},
      isAddModelPass: true,
    },
    alerts: {},
  },
  licenseConfig: {
    drawer: {
      tabId: "online_activation",
      open: false,
    },
  },
  localUserConfig: {
    drawer: {
      tabId: flag_isDev() ? "admin_tools" : "basic_information",
      open: false,
    },
  },
  localDeviceConfig: {
    drawer: {
      open: false,
    },
  },
  apiInfo: {
    finalChk: false,
    reg_from_BE: false,
    can_this_device_use_presently: false,
    using_portal_mode: false,
    using_dev_mode: false,
  },
  omnibusInfo: {
    backbone: backbone,
    actions: [],
    menus: [],
  },
  sysinfo: {
    reg: {
      showDeviceManagePanel: false,
    },
    unlimited_app_obj: {},
    hasDesktop: !_.isNil(window.desktop_utils),
    alertObj: {
      open: false,
      msg: "",
      fn: null,
    },
    confirmObj: {
      open: false,
      msg: "",
      fn: null,
    },
    promptObj: {
      open: false,
      msg: "",
      ipt: null,
      fn: null,
    },
    cs: !_.isNil(window.desktop_utils), // Client <-> Server mode
    view_controls: {
      tabs: {
        init: false,
        value: null,
        list: [],
      },
    },
    customize_menu_list: [],
    updateMenuCount: 0,
    latestRoutePath: null,
    routeTitleMap: {},
    breadmenu: null,
    roadmapHighlightPath: null,
    latestNewMsgCount: 0,
    // isOpenNotification: false,
    isOpenNotification: false,
    keepFullScrollPageArr: [
      // "/dashboard/home",
      // "/server/static/view",
      // "/server/proxy/view",
      // "/server/static/added",
      // "/server/proxy/added",
    ],
  },
  msgPanelData: {
    loading: false,
    formModel: {},
    alertType: "create",
    addModelFailures: {},
    isAddModelPass: false,
    initModel: constants.initModel(),
    addModel: constants.initModel(),
    formNeeds: {
      groups: [],
    },
    pageData: [],
    pageCount: 0,
    pageInfo: {
      pageIndex: 1,
      pageSize: 25,
    },
  },
  otherParserConfigList: fn_init_other_parser_config(config_str_definition),
  roadmap: (...abc) => {
    window.all_route = abc;
    // if (!_.isEmpty(_.get(window, "gstore.overwrite_roadmap"))) {
    //   return _.get(window, "gstore.overwrite_roadmap");
    // }
    let obj = [
      {
        label: "Dashboard",
        icon: "layers",
        pid: "dashboard",
        children: [
          {
            icon: "area-of-interest",
            label: "Home",
            pid: "home",
            pathname: "/",
          },
          ipc.dev
            ? {
                icon: "build",
                label: "Extension DevTools",
                pid: "extdevtools",
                pathname: "/dashboard/extension",
              }
            : null,
          // {
          //   label: "Settings",
          //   icon: "settings",
          //   pathname: "/dashboard/settings",
          // },
        ],
      },
      // {
      //   label: "Notes",
      //   icon: "paperclip",
      //   pid: "notes",
      //   children: [
      //     {
      //       label: "Vim",
      //       skipT: true,
      //       icon: "wind",
      //       pid: "vim",
      //       pathname: "/notes/notes_vim",
      //     },
      //     {
      //       label: "Emacs",
      //       skipT: true,
      //       icon: "ninja",
      //       pid: "emacs",
      //       pathname: "/notes/notes_emacs",
      //     },
      //     {
      //       label: "MarkDown",
      //       skipT: true,
      //       icon: "hat",
      //       pid: "markdown",
      //       pathname: "/notes/notes_snippet",
      //     },
      //     // 剪切板先不做，因为windows已经有提供该功能
      //     // {
      //     //   label: "Clipboard",
      //     //   icon: "clipboard",
      //     //   pathname: "/notes/notes_clipboard",
      //     // },
      //   ],
      // },
      gstore.apiInfo.using_portal_mode
        ? null
        : {
            label: "Utility Server",
            icon: "globe",
            pid: "server",
            children: [
              // {
              //   label: "Static Server",
              //   icon: "mountain",
              //   pid: "staticserver",
              //   pathname: "/server/static/added",
              //   // expand: false,
              //   // children: [
              //   //   {
              //   //     icon: "panel-table",
              //   //     label: "Added",
              //   //     pathname: "/server/static/added",
              //   //   },
              //   //   {
              //   //     icon: "console",
              //   //     label: "View Panel",
              //   //     pathname: "/server/static/view",
              //   //   },
              //   // ],
              // },
              // {
              //   label: "Proxy Server",
              //   icon: "pulse",
              //   pid: "proxyserver",
              //   pathname: "/server/proxy/added",
              //   // expand: false,
              //   // children: [
              //   //   {
              //   //     label: "Added",
              //   //     icon: "panel-table",
              //   //     pathname: "/server/proxy/added",
              //   //   },
              //   //   {
              //   //     icon: "console",
              //   //     label: "View Panel",
              //   //     pathname: "/server/proxy/view",
              //   //   },
              //   // ],
              // },
            ],
          },

      gstore.apiInfo.using_portal_mode
        ? null
        : {
            label: "Database Management",
            icon: "database",
            pid: "database",
            children: [],
          },
      //   : {
      //       label: "Database Management",
      //       icon: "database",
      //       pid: "database",
      //       children: [
      //         {
      //           label: "Connections",
      //           pid: "connections",
      //           pathname: "/database/connections",
      //           icon: "swap-horizontal",
      //         },
      //         // {
      //         //   label: "Data Console",
      //         //   pathname: "/db/console",
      //         //   icon: "console",
      //         // },
      //         // {
      //         //   label: "Data Import",
      //         //   pathname: "/db/import",
      //         //   icon: "import",
      //         // },
      //         // {
      //         //   label: "Data Export",
      //         //   pathname: "/db/export",
      //         //   icon: "export",
      //         // },
      //       ],
      //     },
      gstore.apiInfo.using_portal_mode
        ? null
        : {
            label: "Code Generator",
            icon: "oil-field",
            pid: "gen",
            children: [
              // {
              //   label: "Spring",
              //   pathname: "/gen/gen_spring",
              //   icon: "array-numeric",
              // },
              // {
              //   label: "DAO Layer",
              //   icon: "send-to-map",
              //   children: [
              //     {
              //       label: "MyBatis",
              //       pathname: "/gen/gen_mybatis",
              //       skipT: true,
              //     },
              //   ].map((x) => {
              //     x.skipT = true;
              //     return x;
              //   }),
              // },
              // {
              //   label: "DTO Helper",
              //   icon: "inheritance",
              //   pid: "dtohelper",
              //   children: [
              //     {
              //       pathname: "/gen/gen_dto_php",
              //       label: "PHP",
              //       pid: "dto_php",
              //     },
              //     {
              //       pathname: "/gen/gen_dto_cpp",
              //       label: "C++",
              //       pid: "dto_cpp",
              //     },
              //     {
              //       pathname: "/gen/gen_dto_go",
              //       label: "Go",
              //       pid: "dto_go",
              //     },
              //     {
              //       pathname: "/gen/gen_dto_python",
              //       label: "Python",
              //       pid: "dto_python",
              //     },
              //     {
              //       pathname: "/gen/gen_dto_csharp",
              //       label: "C#",
              //       pid: "dto_csharp",
              //     },
              //     {
              //       icon: "code",
              //       label: "JVM",
              //       pid: "jvm",
              //       children: [
              //         {
              //           pathname: "/gen/gen_dto_java",
              //           label: "Java",
              //           pid: "dto_java",
              //         },
              //         {
              //           pathname: "/gen/gen_dto_scala",
              //           label: "Scala",
              //           pid: "dto_scala",
              //         },
              //         {
              //           pathname: "/gen/gen_dto_kotlin",
              //           label: "Kotlin",
              //           pid: "dto_kotlin",
              //         },
              //         {
              //           pathname: "/gen/gen_dto_groovy",
              //           label: "Groovy",
              //           pid: "dto_groovy",
              //         },
              //         // {
              //         //   pathname: "/gen/gen_dto_clojure",
              //         //   label: "Clojure",
              //         // },
              //       ].map((x) => {
              //         x.skipT = true;
              //         return x;
              //       }),
              //     },
              //     {
              //       icon: "code",
              //       label: "ECMAScript",
              //       pid: "ecmahelper",
              //       children: [
              //         {
              //           pathname: "/gen/gen_dto_javascript",
              //           label: "JavaScript",
              //           pid: "gen_js",
              //         },
              //         {
              //           pathname: "/gen/gen_dto_typescript",
              //           label: "TypeScript",
              //           pid: "gen_ts",
              //         },
              //         {
              //           pathname: "/gen/gen_dto_coffeescript",
              //           label: "CoffeeScript",
              //           pid: "gen_coffeescript",
              //         },
              //         {
              //           pathname: "/gen/gen_dto_es5",
              //           label: "ES5 Prototype",
              //           pid: "gen_es5",
              //         },
              //       ].map((x) => {
              //         x.skipT = true;
              //         return x;
              //       }),
              //     },
              //   ].map((x) => {
              //     x.skipT = true;
              //     return x;
              //   }),
              // },
              // {
              //   label: "React",
              //   pathname: "/gen/gen_react",
              //   icon: "array-numeric",
              // },
              // {
              //   label: "Vue",
              //   pathname: "/gen/gen_vue",
              //   icon: "array-boolean",
              // },
            ],
          },
      {
        label: "Graphic Tools",
        icon: "contrast",
        pid: "color",
        children: [],
      },
      {
        label: "Time Tools",
        icon: "time",
        pid: "time",
        children: [
          {
            label: "Timestamp",
            pathname: "/time/time_timestamp",
            icon: "array-timestamp",
            pid: "timestamp",
          },
          {
            label: "TimeZone",
            pathname: "/time/time_timezone",
            icon: "area-of-interest",
            pid: "timezone",
          },
          // {
          //   label: "Time Difference",
          //   pathname: "/time/time_difference",
          //   icon: "pivot",
          // },
          // {
          //   label: "TimeUnit Convert",
          //   pathname: "/time/time_timeunit_convert",
          //   icon: "percentage",
          // },
        ],
      },
      {
        label: "Text Tools",
        icon: "new-text-box",
        pid: "text",
        children: [
          // {
          //   label: "Text Search",
          //   icon: "search-text",
          //   pid: "textsearch",
          //   pathname: "/text/text_search",
          // },
          {
            label: "Quick Differentiate",
            pid: "quick_difference",
            children: [
              {
                label: "Text Compare",
                icon: "multi-select",
                pid: "textcompare",
                pathname: "/text/text_compare",
              },
            ],
          },
          {
            label: "Text Case",
            icon: "polygon-filter",
            pid: "textcase",
            children: [
              {
                label: "ASCII Text",
                pid: "ascii",
                pathname: "/case/case_ascii",
                icon: "pivot",
              },
              {
                label: "Numeric Text",
                pathname: "/case/case_number",
                pid: "numerictext",
                icon: "array-timestamp",
              },
              {
                label: "Chinese Text",
                pathname: "/case/case_chinese",
                icon: "translate",
                pid: "chinesetext",
              },
            ],
          },
          // !ipc.dev
          //   ? null
          //   : {
          //       label: "Regex Tools",
          //       icon: "signal-search",
          //       pid: "regex",
          //       children: [
          //         {
          //           label: "Matcher",
          //           pathname: "/regex/regex_matcher",
          //           icon: "locate",
          //           pid: "regex_matcher",
          //         },
          //         {
          //           label: "Generator",
          //           pathname: "/regex/regex_generator",
          //           icon: "diagram-tree",
          //           pid: "regex_generator",
          //         },
          //       ],
          //     },
          {
            label: "Random Tools",
            icon: "random",
            pid: "random",
            children: [
              {
                label: "UUID",
                pathname: "/random/random_uuid",
                icon: "social-media",
                pid: "uuid",
              },
              // {
              //   label: "Random Text",
              //   pathname: "/random/random_text",
              //   icon: "numbered-list",
              // },
              // {
              //   label: "Shuffle Lists",
              //   pathname: "/random/random_shuffle",
              //   icon: "sort-alphabetical",
              // },
            ],
          },
          {
            label: "Code Beautify",
            icon: "code",
            pid: "beautify",
            children: _.map(
              [
                {
                  pathname: "/text/beautify_html",
                  label: "HTML",
                  pid: "beautify_html",
                },
                {
                  pathname: "/text/beautify_xml",
                  pid: "beautify_xml",
                  label: "XML",
                },
                {
                  pathname: "/text/beautify_yaml",
                  pid: "beautify_yaml",
                  label: "YAML",
                },
                {
                  pathname: "/text/beautify_css",
                  pid: "beautify_css",
                  label: "CSS",
                },
                {
                  pid: "beautify_less",
                  pathname: "/text/beautify_less",
                  label: "LESS",
                },
                {
                  pid: "beautify_sass",
                  pathname: "/text/beautify_scss",
                  label: "SASS",
                },
                {
                  pid: "beautify_json",
                  pathname: "/text/beautify_json",
                  label: "JSON",
                },
                {
                  pid: "beautify_markdown",
                  pathname: "/text/beautify_markdown",
                  label: "MarkDown",
                },
                {
                  pid: "beautify_javascript",
                  pathname: "/text/beautify_javascript",
                  label: "JavaScript",
                },
                {
                  pid: "beautify_typescript",
                  pathname: "/text/beautify_typescript",
                  label: "TypeScript",
                },
                // {
                //   pathname: "/text/beautify_jsx",
                //   label: "JSX",
                // },
                // {
                //   pathname: "/text/beautify_java",
                //   label: "Java",
                // },
                {
                  pid: "beautify_sql",
                  pathname: "/text/beautify_sql",
                  label: "SQL",
                },
                {
                  pid: "beautify_graphql",
                  pathname: "/text/beautify_graphql",
                  label: "Graphql",
                },
              ],
              (x) => {
                x.skipT = true;
                x.icon = "array";
                return x;
              }
            ),
            expand: true,
          },
          {
            icon: "git-merge",
            label: `YAML Helper`,
            pid: "yaml_helper",
            children: [
              {
                pathname: "/text/beautify_yaml",
                pid: "beautify_yaml",
                icon: "key-tab",
                label: "YAML Formatter",
              },
            ],
          },
          {
            icon: "flow-review-branch",
            label: `SQL Helper`,
            pid: "dsl_tools",
            children: [
              {
                pathname: "/text/beautify_sql",
                pid: "beautify_sql",
                icon: "key-tab",
                label: "SQL Formatter",
              },
            ],
          },

          {
            icon: "document-open",
            label: "XML Helper",
            pid: "xmlhelper",
            children: _.map(
              [
                {
                  pid: "xml_transform",
                  label: "XML Formatter",
                  icon: "key-tab",
                  pathname: "/text/xml_transform",
                },
                // {
                //   label: "Data Browser",
                //   icon: "panel-stats",
                //   pathname: "/text/xml_browser",
                // },
              ],
              (x) => {
                return x;
              }
            ),
            expand: true,
          },
          {
            label: "JSON Helper",
            icon: "pivot-table",
            pid: "jsonhelper",
            children: _.map(
              [
                {
                  label: "JSON Formatter",
                  pid: "json_transform",
                  icon: "key-tab",
                  pathname: "/text/json_transform",
                },
                // {
                //   label: "Data Browser",
                //   icon: "panel-stats",
                //   pathname: "/text/json_browser",
                // },
              ],
              (x) => {
                // x.icon = "array";
                return x;
              }
            ),
            expand: true,
          },
        ],
      },
      {
        label: "Codec Tools",
        icon: "lock",
        pid: "codec",
        children: [
          {
            label: "Digest Algorithm",
            icon: "segmented-control",
            pid: "digest",
            expand: true,
            children: [
              {
                label: "MD5",
                skipT: true,
                pathname: "/codec/encrypt_md5",
                pid: "encrypt_md5",
              },
              {
                label: "SHA",
                skipT: true,
                pathname: "/codec/encrypt_sha",
                pid: "encrypt_sha",
              },
            ],
          },
          {
            label: "Encode/Decode",
            icon: "widget-button",
            expand: true,
            pid: "encode",
            children: [
              {
                label: "Base64",
                skipT: true,
                pathname: "/codec/encode_base64",
                pid: "encode_base64",
              },
              {
                pid: "encode_url",
                label: "URL Codec",
                pathname: "/codec/encode_url",
              },
            ],
          },
          {
            label: "Escape/UnEscape",
            icon: "flow-branch",
            expand: true,
            pid: "escape",
            children: [
              {
                pid: "escape_xml",
                label: "XML",
                pathname: "/codec/escape_xml",
              },
              {
                pid: "escape_html",
                label: "HTML",
                pathname: "/codec/escape_html",
              },
              {
                pid: "escape_csv",
                label: "CSV",
                pathname: "/codec/escape_csv",
              },
              {
                pid: "escape_java",
                label: "Java String",
                pathname: "/codec/escape_java",
              },
              {
                pid: "escape_json",
                label: "JSON String",
                pathname: "/codec/escape_json",
              },
              {
                pid: "escape_javascript",
                label: "JavaScript String",
                pathname: "/codec/escape_javascript",
              },
            ],
          },
          // {
          //   label: "Encrypt/Decrypt",
          //   icon: "segmented-control",
          //   expand: true,
          //   children: [
          //     {
          //       label: "RSA",
          //       pathname: "/codec/encrypt_rsa",
          //     },
          //     {
          //       label: "DES",
          //       pathname: "/codec/encrypt_des",
          //     },
          //     {
          //       label: "AES",
          //       pathname: "/codec/encrypt_aes",
          //     },
          //   ],
          // },
        ],
      },
      {
        label: "Translation Tools",
        icon: "translate",
        pid: "translate",
        children: [
          {
            label: "Text Translate",
            // skipT: true,
            pid: "texttranslate",
            icon: "search-text",
            pathname: "/trans/trans_text",
          },
          // {
          //   label: "JSON Translate",
          //   skipT: true,
          //   icon: "code",
          //   pathname: "/trans/trans_json",
          // },
          // {
          //   label: "i18n Translate",
          //   skipT: true,
          //   icon: "office",
          //   pathname: "/trans/trans_i18n",
          // },
        ],
      },
      // {
      //   label: "Schedule Plan",
      //   icon: "stopwatch",
      //   children: [
      //     {
      //       label: "Backup Files",
      //       icon: "compressed",
      //       pathname: "/sch/backup_files",
      //     },
      //     {
      //       label: "Local File History",
      //       icon: "pivot",
      //       pathname: "/sch/local_code_hist",
      //     },
      //   ],
      // },
    ].filter((x) => !_.isNil(x));
    if (true) {
      if (window.gstore && window.gstore.ext && true) {
        let all_sub_menu = _.cloneDeep(window.gstore.ext.sub_menu);
        let all_expand_menu = _.map(_.values(all_sub_menu), (x) => x.arr);

        function mergeFn(objValue, srcValue) {
          // objValue = _.cloneDeep(objValue);
          // srcValue = _.cloneDeep(srcValue);
          // console.log("chking", objValue, srcValue);
          if (_.isEmpty(srcValue) || _.isNil(srcValue)) {
            return objValue;
          }
          if (_.isArray(objValue)) {
            objValue = _.cloneDeep(objValue);
            objValue = _.filter(objValue, (x) => !_.isNil(x));
            if (!_.isEmpty(srcValue) && _.isArrayLike(srcValue)) {
              for (let item of srcValue) {
                if (_.isNil(item)) {
                  continue;
                }
                let findItemInObjValue = _.find(objValue, (x) => {
                  if (!_.isNil(x) && !_.isNil(item)) {
                    return x.pid == item.pid;
                  }
                });
                if (_.isNil(findItemInObjValue)) {
                  objValue.push(item);
                } else {
                  _.mergeWith(findItemInObjValue, item, mergeFn);
                }
              }
            }
            objValue = _.sortBy(objValue, (x) => x.rank);
            // let arr_1 = _.filter(objValue, (x) => _.isArray(x));
            // let arr_2 = _.filter(objValue, (x) => !_.isArray(x));
            // objValue = [...arr_2, ...arr_1];
            // console.log("final obj value", objValue);
            return objValue;
          }
        }
        obj = _.mergeWith(
          { children: obj },
          ..._.map(all_expand_menu, (x) => ({ children: x })),
          mergeFn
        ).children;
      }
    }
    if (window.PinyinEngine) {
      window.prePyObj = [];
    }
    obj = iterateTreeForRoadMap(obj, handleForEachRoadMap);
    if (window.PinyinEngine) {
      window.pytool = new PinyinEngine(window.prePyObj);
    }
    setTimeout(() => {
      if (window.initMenuToNavMenu) {
        window.initMenuToNavMenu();
      }
    }, 500);
    return obj;
  },
  nav_menu: [],
};

function initMenuToNavMenu() {
  let navMenuArr = [];

  _.forEach(gstore.roadmap.get(), (x, d, n) => {
    let parentRootForX = {
      label: x.label,
      children: [],
    };
    if (x.children) {
      _.forEach(x.children, (xx, dd, nn) => {
        if (!_.isEmpty(xx.children)) {
          let parentRootForXX = {
            label: xx.label,
            children: [],
          };
          iterateTreeForRoadMap(xx.children, (xxx) => {
            // if(!_.isNil(xxx.children))
            if (!_.isEmpty(xxx.children)) {
              return;
            }
            parentRootForXX.children.push(xxx);
            // if (!_.isEmpty(xxx.children)) {
            //   _.forEach(xxx.children, (xxxx, ddd) => {
            //     parentRootForXX.children.push(xxxx);
            //   });
            // }
          });
          navMenuArr.push(parentRootForXX);
        } else {
          parentRootForX.children.push(xx);
        }
      });
      if (!_.isEmpty(parentRootForX.children)) {
        navMenuArr.push(parentRootForX);
      }
    }
  });

  console.log("final menu", navMenuArr);

  system_store.nav_menu = navMenuArr;
  gstore.nav_menu = navMenuArr;

  setTimeout(() => {
    // gutils.iterateTree(gstore.nav_menu, async (x, d, n) => {
    //   let pre_value = localStorage.getItem("preval_" + x.label);
    //   if (_.isNil(pre_value)) {
    //     // TODO: pinyin need to be computed by B/E, or pre-compile
    //     // let myres = {
    //     //   content: {
    //     //     CTN: _.join(
    //     //       _.map(
    //     //         pinyin(x.label, {
    //     //           mode: pinyin.MODE_SURNAME,
    //     //           heteronym: true,
    //     //           style: "NORMAL",
    //     //         }),
    //     //         (x) => _.join(x, "")
    //     //       ),
    //     //       ""
    //     //     ),
    //     //   },
    //     // };
    //     // await gutils.opt("/common/calcpy", {
    //     //   value: x.label,
    //     // });
    //     // pre_value = _.toLower(x.label + " " + myres.content.CTN);
    //     // localStorage.setItem("preval_" + x.label, pre_value);
    //   }
    //   x.pystr = x.label;
    //   x.pystr = pre_value;
    // });
  }, 0);
}

window.initMenuToNavMenu = _.debounce(initMenuToNavMenu, 300);

window.d_mode = () => {
  return gstore.sysinfo.hasDesktop;
};

export default system_store;
