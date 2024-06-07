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

export default observer((props) => {
  return (
    <div className={"loading-box "}>
      <Card
        style={{
          background: `url("../static/waterflow.jpg")`,
          backgroundSize: "100% 100%",
          backgroundColor: "#0b4050",
          position: "relative",
        }}
      >
        <h1>CODE-GEN</h1>
        <div className="listview-wrapper">
          <div>
            {t(`App Version`)}: {gutils.app_version}
          </div>
          <div>{t(`App Platform`)}: Windows/Darwin/Linux</div>
          <div>
            {t(`Contact Developer`)}:{" "}
            <span href="mailto:work7z@outlook.com" target="_blank">
              work7z@outlook.com
            </span>
          </div>
          <div>
            {t(`Official Website Link`)}:{" "}
            <span href="https://codegen.cc" target="_blank">
              https://codegen.cc
            </span>
          </div>
        </div>
        <div className="mybtmpos">
          <div className="viewtextbtm">{props.text}</div>
          <Example className="myexample-for-loading">
            <ProgressBar intent={"primary"} value={null} />
          </Example>
        </div>
      </Card>
      {/* <div> */}
      {/* Application is Loading */}
      {/* <Blink /> */}
      {/* </div> */}
    </div>
  );
});
