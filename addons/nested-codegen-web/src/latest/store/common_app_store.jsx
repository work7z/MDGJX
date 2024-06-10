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
import _, { constant } from "lodash";
import { autorun, observable }  from 'mobx';
import constants from "../constants";
import systemstore from "./system_store";

let fn_localProjects_model = () => {
  return {
    FILEPATH: "",
    NAME: "",
  };
};

const overlay_addForm = () => ({
  loading: false,
  afterConfirmFunc: null,
  toggle_status_loading: false,
  alertType: "create",
  addModelFailures: {},
  isAddModelPass: false,
  updateRef: 1,
  initModel: fn_localProjects_model(),
  addModel: fn_localProjects_model(),
});

function fn_realtime_st() {
  return {
    matchNums: 0,
    ackFiles: 0,
    foundFiles: 0,
    done: true,
  };
}
let val_wordWrap = "off";
let fn_init_model = () => {
  return {
    inlineView: false,
    wordWrap: val_wordWrap,
    leftValue: ``,
    rightValue: ``,
  };
};

// timestamp
// code generator
// gen_selected_project_list: [],
// gen_generate_result: [],
// gen_generate_source_definition: "json",
// gen_generate_source_json: "",
// gen_generate_connection_id: null,
// gen_generate_remark: "",
// crtLoadType: null,
// codegen general
// gen_config_turnon_including: "true",
// gen_config_turnon_excluding: "true",
// gen_config_actual_folders_for_dto: "",
// gen_config_naming_rules: "auto",
// gen_config_filter_field: "",
// gen_config_filter_class: "",
// gen_config_filter_database: "",
// gen_config_filter_field_including: "",
// gen_config_filter_class_including: "",
// gen_config_filter_database_including: "",
// gen_config_package: "com.test.example",
// gen_config_overwrite_when_exists: "yes",
// gen_config_delete_before_run: "yes",
// gen_config_all_in_one: "no",
// gen_output_folder_preview: [],
// gen_output_folder_result: [],
// gen_output_folder_preview_idx: [],
// gen_output_folder_result_idx: [],
// sourceLang: "auto",
// targetLang: "zh",
// config: constants.getConfigForLocalProject(),
// extra_for_codegenerator: {
//   preview_folder_info: {
//     path: "",
//   },
//   right_tabs: {
//     value: ipc.dev ? "general" : "general",
//   },
//   result_tabs: {
//     value: ipc.dev ? "preview" : "preview",
//   },
// },

function createCodeBeautify(conf) {
  function mycodebeauitfy_model() {
    let tobj = {
      inlineView: false,
      wordWrap: val_wordWrap,
      leftValue: ``,
      rightValue: ``,
      // DBTYPE: "mysql",
      // SHATYPE: "sha256",
      // MD5TYPE: "md5",
      // attachments_files: [],
      ...(conf.initObj || {}),
    };

    if (conf.name && _.toLower(conf.name).startsWith("random")) {
      _.merge(tobj, {
        random_ipt_length: "32",
        random_ipt_seeds: undefined,
        random_ipt_size: 100,
      });
    }

    if (conf.name) {
      let lowerName = _.toLower(conf.name);
      if (
        lowerName != null &&
        (lowerName.indexOf("sql") != -1 || lowerName.indexOf("encrypt") != -1)
      ) {
        _.merge(tobj, {
          DBTYPE: "mysql",
          SHATYPE: "sha256",
          MD5TYPE: "md5",
        });
      }
    }

    if (conf.name && _.toLower(conf.name).startsWith("time")) {
      _.merge(tobj, {
        timestamp_realtime_view_action: false,
        timestamp_ipt_locale: "",
        timestamp_source_formattings: "timestamp",
        timestamp_ipt_source_formattings: "timestamp",
        timestamp_ipt_source: "" + new Date().getTime(),
        timestamp_format_has_error: null,
        timestamp_val_compare_with_today: "",
        timestamp_val_day_of_year: "",
        timestamp_val_week_of_year: "",
        timestamp_val_day_of_week: "",
        timestamp_val_timestamp_str: "",
        timestamp_val_month: "",
        timestamp_val_hour: "",
        timestamp_val_calendar_str: "",
        timestamp_val_datetime_str: "",
      });
    }
    if (conf.name && _.toLower(conf.name).startsWith("trans")) {
      _.merge(tobj, {
        sourceLang: "auto",
        targetLang: "zh",
      });
    }

    return tobj;
  }
  let fn_initObj = conf.fn_initObj;

  _.defaultsDeep(conf, {
    basic_value_left_value: {
      left: "",
      right: "",
    },
    editor: null,
    loading: {
      isLoadingForPrimaryAction: false,
      isLoadingForSecondaryAction: false,
    },
    hist: {
      updateRef: 1,
      totalHistArr: [],
      crtHistId: null,
      getOneAPITimes: 0,
      isLoadingWhenChangeId: false,
      isLoadingForRefreshHist: false,
      isLoadingForSaveHist: false,
    },
    gen_obj: {
      running_loggings: [],
    },
    editor_obj_listings: {},
    fn_init_model: fn_initObj,
    init_model: mycodebeauitfy_model(),
    model: mycodebeauitfy_model(),
    editorKeys: {},
    extra_for_time: {
      tobj: {},
    },
  });
  return conf;
}

let createStoreForCommonStore = (
  otherParserConfigList,
  initObj = {},
  fn_initObj
) => {
  let otherObjSpread = {};
  _.forEach(otherParserConfigList, (x, d, n) => {
    otherObjSpread[x.storeName] = createCodeBeautify({
      name: x.storeName,
      initObj: initObj,
      fn_initObj,
      hist: {
        TABLE_ID: x.tableId,
        history_table_id: x.tableId,
      },
    });
  });
  return otherObjSpread;
};

window.createStoreForCommonStore_direct_with_parse_str = (
  str,
  initObj,
  fn_initObj
) => {
  let config = window.fn_init_other_parser_config(str, initObj);
  return createStoreForCommonStore(config, initObj, fn_initObj);
};

let otherObjSpread = createStoreForCommonStore(
  systemstore.otherParserConfigList
);

window.otherObjSpread = otherObjSpread;

export default {
  ...otherObjSpread,
  model_charset_listings: [],
  beautifyHtml: createCodeBeautify({
    hist: {
      history_table_id: "beautify_html",
    },
  }),
  beautifyGraphql: createCodeBeautify({
    hist: {
      history_table_id: "beautify_graphql",
    },
  }),
  beautifyXml: createCodeBeautify({
    hist: {
      history_table_id: "beautify_xml",
    },
  }),
  textCompare: {
    editor: null,
    hist: {
      history_table_id: "text_compare",
      updateRef: 1,
      totalHistArr: [],
      crtHistId: null,
      isLoadingForRefreshHist: false,
      isLoadingForSaveHist: false,
    },
    init_model: fn_init_model(),
    model: fn_init_model(),
  },
  textSearch: {
    drag: {
      searchTopHeight: null,
      started: false,
      latestID: null,
      ended: false,
      loadObj: {
        REALTIME_STATUS: fn_realtime_st(),
        fn_realtime_st,
      },
      filesListInfo: {
        data: [],
        viewResultId: null,
        viewResultObj: null,
      },
      replacingText: null,
      replacingLoading: false,
      fileDetail: {},
    },
    config: constants.getConfigForLocalProject(),
  },
  localProjects: {
    list_loading: false,
    list: [],
    addForm: overlay_addForm(),
    fn_overlay_addForm: overlay_addForm,
    list_open: {},
    overlay_addLocalProjects: {
      ...constants.commonPropsForDialog(),
      title: "Add Local Folder",
      open: false,
      // isAddModelPass: false,
      confirmDisable: false,
      confirmIntent: "primary",
      icon: "add-to-artifact",
      confirmText: "Confirm",
    },
    static: {
      recordTypes: [
        {
          label: "Global",
          value: "global",
        },
        {
          label: "History",
          value: "history",
        },
      ],
    },
  },
};
