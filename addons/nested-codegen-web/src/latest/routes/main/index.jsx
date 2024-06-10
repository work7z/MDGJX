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
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


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
import MainNavBar from "../main_navbar/index";
import MainMenuFrame from "../main_menu_frame";
import Overlay_playground from "../overlay_playground";
import gapi from "../../gapi.jsx";
import GetBaidu from "../../GetBaidu";

export default () => {
  gutils.defer(() => {
    let doneFunc = () => {
      gutils.once("once_api_run", () => {
        _.forEach(gapi.system.init, (x, d, n) => {
          x();
        });
      });
    };
    const isBrandNewAndNeedDownloadInfra =
      window.ipc.isBrandNewAndNeedDownloadInfra();
    if (
      isBrandNewAndNeedDownloadInfra ||
      window.ipc.isLocalServerNotStartedUp()
    ) {
      gutils.waitInitializeRefFunc.push(async function () {
        doneFunc();
      });
    } else {
      doneFunc();
    }
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <Overlay_playground />
        <MainNavBar />
        <MainMenuFrame />
      </div>
    </DndProvider>
  );
};
