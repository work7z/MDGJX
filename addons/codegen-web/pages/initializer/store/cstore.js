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
  MenuItem,
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
import { Example, IExampleProps } from "@blueprintjs/docs-theme";
import {
  ColumnHeaderCell,
  Cell,
  Column,
  Table,
  Regions,
} from "@blueprintjs/table";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import { useState } from "react";
import {
  useStores,
  useAsObservableSource,
  useLocalStore,
  useObserver,
} from "mobx-react-lite";
import { Provider, observer, inject } from "mobx-react";
var createHistory = require("history").createBrowserHistory;
import {
  withRouter,
  HashRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
var { autorun, observable, reaction } = require("mobx");
import { FocusStyleManager } from "@blueprintjs/core";
import { Omnibar } from "@blueprintjs/select";

let finalLang = "en_US";
if (ipc.locale == "zh-CN") {
  finalLang = "zh_CN";
} else if (ipc.locale == "zh-TW" || ipc.locale == "zh-HK") {
  finalLang = "zh_HK";
}
// finalLang = ipc.dev ? "zh_CN" : finalLang;
setTimeout(() => {
  changeLang(finalLang);
  setTimeout(() => {
    $("html").attr("lang", finalLang);
  }, 0);
}, 0);
let fn_init_status = () => {
  return {
    running: false,
    error: false,
    starting: false,
    errorContent: ``,
    text: ``,
    textArgs: ``,
    access_link: null,
  };
};
class Cstore {
  @observable desktop = {
    hasDesktop: !_.isNil(window.desktop_utils),
    RUID: _.get(window, "desktop_utils.RUID"),
  };
  @observable sysinfo = {
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
  };
  @observable settings = {
    boot_version: null,
    lang: finalLang,
    max_memory: 4048,
    disable_output_after_boot: true,
    xmx: 750,
    xms: 150,
  };
  @observable forms_data = {
    output_str: ``,
    output_len: 0,
    run_status: fn_init_status(),
    fn_init_status,
    updating_ref_lang: 0,
    running_text: t("Loading..."),
    init_all_status: false,
    is_check_init_before: false,
    version_list: [],
    lang: [
      {
        label: "English",
        value: "en_US",
      },
      {
        label: "简体中文(Simplified Chinese)",
        value: "zh_CN",
        // disabled: true,
      },
      {
        label: "繁體中文(Traditional Chinese)",
        value: "zh_HK",
        // disabled: true,
      },
    ],
  };
}
let cstore = new Cstore();
window.cstore = cstore;
window.gstore = cstore;
window.d_mode = () => {
  return cstore.desktop.hasDesktop;
};
export default cstore;
