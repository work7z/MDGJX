import "../latest/preinit";
import "../latest/index.less";
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
import "./index.less";
import { FocusStyleManager } from "@blueprintjs/core";
import { Omnibar } from "@blueprintjs/select";
import gapi from "./utils/gapi.js";
import MainBootFrame from "./main/MainBootFrame";
import cstore from "./store/cstore";
import $ from "jquery";
import "../latest/vars.less";
import SystemAlertOrPrompt from "../latest/SystemAlertOrPrompt";
window.$ = $;
window.cstore = cstore;
window.ct = cstore;
window.gapi = gapi;
window.gutils = gapi;
window.failed_times = 0;
window.refresh_obj = {};
window.whenChangeLang = () => {
  // document.title = t(`Launch Page`);
};
async function initFromParam(query_str) {
  window.failed_times++;
  if (!_.isNil(query_str) && (query_str + "").trim().length != 0) {
    window.PAD_VALUE_FOR_QUERY = query_str;
  } else {
    window.PAD_VALUE_FOR_QUERY = null;
  }
  if (_.isNil(query_str)) {
    query_str = (location.search || "").replace("?", "");
  }
  document.title = `Verifying`;
  if (query_str == "") {
    query_str = localStorage.getItem(`query_str`) || "";
  } else {
    localStorage.setItem(`query_str`, query_str);
  }
  window.query_str = query_str + ` ` + localStorage.getItem(`query_str`);
  let m_res = await gapi.opt(`/n_auth/check`, {});
  let {
    data: {
      content: { isAuth, filepath },
    },
  } = m_res;
  window.unable_to_sign = isAuth != true;
  console.log(m_res, isAuth, filepath);
  if (!isAuth) {
    localStorage.removeItem("LAST_OK_TOKEN");
    if (window.failed_times != 1) {
      window.unable_to_sign = true;
      gutils.win_alert(
        t(
          `Unable to sign in, please check your token and refresh this page again`
        )
      );
      return;
    }
    window.file_path = filepath;
    gapi.defer(async () => {
      let token_value = await gapi.win_prompt(
        t(
          `Cannot identify your credential, please input token value which can be found in the file {0}. You can find that file in CodeGen installation folder.`,
          filepath
        ) +
          t(
            `In other words, please read the content of that file, and input its file content into this text field below.`
          )
      );
      await initFromParam(_.trim(token_value));
      await gapi.sleep(2000);
      if (window.unable_to_sign != true) {
        location.reload();
      }
    });
  }
  document.title = `Verified.`;
}

async function initFn() {
  document.title = `Loading Language Data...`;
  const i18nObj = _.keys({
    en_US: {},
    zh_CN: {},
    zh_HK: {},
    en_US_overwrite: {},
    zh_CN_overwrite: {},
    zh_HK_overwrite: {},
  });
  for (let eachJsonName of i18nObj) {
    document.title = `Loading ${eachJsonName}...`;
    let baseObject = {};
    let lang_link = "/static/lang/" + eachJsonName + ".json";
    // console.log("lang_link", lang_link);
    let langObject = await gapi.optStatic(lang_link);
    if (_.isString(langObject.data)) {
      //   langObject.data = JSON.parse(langObject.data);
    }
    // console.log("langObject", langObject);
    if (!_.isEmpty(baseObject)) {
      // console.log("mres merging", langObject.data, baseObject);
      _.merge(langObject.data, baseObject);
    }
    window.pkgInfo.i18n[eachJsonName] = langObject.data;
  }
  try {
    await initFromParam();
  } catch (e) {
    console.log("e", e);
  }
  let Root = (props) => <MainBootFrame />;
  if (window.unable_to_sign) {
    Root = observer((props) => (
      <div
        style={{
          padding: "10px",
          width: "500px",
          margin: "0 auto",
          marginTop: "20px",
          background: "white",
        }}
      >
        <h3>{t(`Launch Platform for CodeGen`)}</h3>
        <SystemAlertOrPrompt />
        <p>
          {t(
            `Since you cannot provide access token, CodeGen couldn't let you sign in launch page. Please check your token and input its value according to our verification steps, thanks for your kindly understanding. `
          )}
        </p>
        <p>{t(`Token file path: {0}`, window.file_path)}</p>
        <p>
          <a
            href={"javascript:void(0);"}
            onClick={() => {
              gapi.opt(`/n_auth/open_file_path_folder`);
            }}
          >
            {t(`Open the Folder`)}
          </a>
          <a
            href="javascript:void(0);"
            style={{ marginLeft: "5px" }}
            onClick={() => {
              location.reload();
            }}
          >
            {t(`Reload this Page`)}
          </a>
        </p>
      </div>
    ));
  } else {
    let {
      data: {
        content: { sysmap },
      },
    } = await gapi.opt(`/nav/read_settings`, {
      settings: cstore.settings,
    });
    _.defaultsDeep(sysmap, cstore.settings);
    cstore.settings = sysmap;
    window.updateFn();
    cstore.forms_data.updating_ref_lang++;
  }
  ReactDOM.render(
    <Root key={cstore.settings.lang} />,
    document.querySelector("#root")
  );
  setTimeout(() => {
    window.changeLang(cstore.settings.lang);
    window.FIX_HEADER_VALUE = `Launch Page`;
    document.title = t(window.FIX_HEADER_VALUE);
    cstore.forms_data.updating_ref_lang++;
  });
}

initFn();
