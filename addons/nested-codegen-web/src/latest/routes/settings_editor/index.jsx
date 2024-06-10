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
import gutils from "../../utils";
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
import gstore from "../../store.jsx";
import "./index.less";
import GFormInput from "../../components/GFormInput";
import GFormSelect from "../../components/GFormSelect";
import GFormFilePathSelect from "../../components/GFormFilePathSelect";
import GFormSwitch from "../../components/GFormSwitch";
import GDataTable from "../../components/GDataTable";
import GFormSlider from "../../components/GFormSlider";
import GFormCheckbox from "../../components/GFormCheckbox";
import _ from "lodash";
import constants from "../../constants";
import GEditor from "../../components/GEditor";

export default observer(() => {
  let themeLists = [];
  _.chain(constants.finalThemeObj)
    .forEach((x, d, n) => {
      let name = x.name;
      themeLists.push({
        label: t(name) + `(${name})`,
        value: d,
      });
    })
    .value();
    let not_reg =window.not_reg()
  return (
    <div className="settings_general_wrapper" style={{ width: "100%" }}>
      {
        not_reg?       <div className="each-settings">
        <h2 className="each-setting-title">{t("Some functions are unavailable due to the non-activated status")}</h2>
        <div>{
          t(`To enjoy the complete features, please activate this device at first.`)
          }</div>
</div>: ''
      }
      <div className="each-settings">
        {/* <h2 className="each-setting-title">{t("TextEditor - PreView")}</h2>
        <div
          className="each-setting-content"
          style={{ width: "100%", height: "250px" }}
        >
          <GEditor
            noAutoFocus={true}
            otherConfig={{
              callFuncName: "create",
              enableSplitViewResizing: true,
              originalEditable: true,
              readOnly: false,
              wordWrap: false,
              followsCaret: true,
              ignoreCharChanges: true,
            }}
            id={"exampid"}
            language={"javascript"}
            key={"exampid"}
            onRef={(editor) => {
              if (editor) {
                editor.getModel().setValue(gutils.example_code);
              }
            }}
            style={{ width: "100%", height: "100%" }}
          ></GEditor>
        </div> */}
      </div>
      <div className="each-settings">
        {/* <h2 className="each-setting-title">{t("Editor Mode")}(TEXT/VIM/EMACS)</h2>
        <div className="each-setting-content">
          <GFormSelect
          disabled={not_reg}
            value={gstore.localSettings.editor_mode}
            list={[
              {
                label: t("General"),
                value: "general",
              },
              {
                label: t("Vim"),
                value: "vim",
              },
              {
                label: t("Emacs"),
                value: "emacs",
              },
            ]}
            onChange={(e) => {
              console.log("chg", e.target, e.target.value);
              gstore.localSettings.editor_mode = e.target.value;
              // gutils.callAllUpdateModel();
              // window.callInvokeDark();
              // gutils.alertOk(
              //   `Update the config successfully, the mode will be used after reloading the page.`
              // );
              // gutils.ask_reload();
            }}
          ></GFormSelect>
        </div> */}
      </div>
      <div className="each-settings">
        <h2 className="each-setting-title">
          {t("TextEditor - Current Theme")}
        </h2>
        <div className="each-setting-content">
          <GFormSelect
          disabled={not_reg}
            value={gstore.localSettings.crt_theme}
            list={themeLists}
            onChange={(e) => {
              console.log("chg", e.target, e.target.value);
              gstore.localSettings.crt_theme = e.target.value;
            }}
          ></GFormSelect>
        </div>
      </div>

      <div className="each-settings">
        <h2 className="each-setting-title">
          {t("TextEditor - Default Light Theme")}
        </h2>
        <div className="each-setting-content">
          <GFormSelect
          disabled={not_reg}

            value={gstore.localSettings.default_theme_light}
            list={themeLists}
            onChange={(e) => {
              console.log("chg", e.target, e.target.value);
              gstore.localSettings.default_theme_light = e.target.value;
            }}
          ></GFormSelect>
        </div>
      </div>
      <div className="each-settings">
        <h2 className="each-setting-title">
          {t("TextEditor - Default Dark Theme")}
        </h2>
        <div className="each-setting-content">
          <GFormSelect
          disabled={not_reg}
            value={gstore.localSettings.default_theme_dark_more}
            list={themeLists}
            onChange={(e) => {
              console.log("chg", e.target, e.target.value);
              gstore.localSettings.default_theme_dark_more = e.target.value;
            }}
          ></GFormSelect>
        </div>
      </div>
      <div className="each-settings hidden">
        <h2 className="each-setting-title">
          {t("System - Auto Switch Dark/Light Theme?")}
        </h2>
        <div className="each-setting-content">
          <GFormSelect
          disabled={not_reg}
            value={gstore.localSettings.is_auto_switch_dark_mode}
            list={[
              {
                label: t("Yes"),
                value: "yes",
              },
              {
                label: t("No"),
                value: "no",
              },
            ]}
            onChange={(e) => {
              console.log("chg", e.target, e.target.value);
              gstore.localSettings.is_auto_switch_dark_mode = e.target.value;
              window.callInvokeDark();
            }}
          ></GFormSelect>
        </div>
      </div>
    </div>
  );
});
