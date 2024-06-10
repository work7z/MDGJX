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
import React, { useRef } from "react";
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
  return (
    <div className="settings_general_wrapper" style={{ width: "100%" }}>
      <div className="each-settings hidden">
        <h2 className="each-setting-title">{t("TextEditor - PreView")}</h2>
        <div
          className="each-setting-content"
          style={{ width: "100%", height: "300px" }}
        >
          <GEditor
            key={gstore.localSettings.editor_mode}
            viewmode={gstore.localSettings.editor_mode}
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
            onRef={(editor) => {
              if (editor) {
                editor.getModel().setValue(gutils.example_code);
              }
            }}
            style={{ width: "100%", height: "100%" }}
          ></GEditor>
        </div>
      </div>
    </div>
  );
});
