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

import { useEffect } from "react";
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
import Blink from "../../components/Blink";
import CommonLoadPage from "../CommonLoadPage/index";

export default () => {
  gutils.once("checking-network", () => {
    let doFunc = () => {
      gstore.preliAllData.configs.mirror =
        gutils.isChinaUser || ipc.locale == "zh-CN" ? "china" : "global";
    };
    let isChinaUser = ipc.locale == "zh-CN"; //  localStorage.getItem("isChinaUser");
    // isChinaUser == null || window.api.dev
    let beforekey = "beforekeychk";
    if (localStorage.getItem(beforekey)) {
      localStorage.setItem(beforekey, "12");
      // TODO: need cache this result to local
      axios({ url: "https://google.com", method: "HEAD", timeout: 3000 })
        .then((e) => {
          gutils.isChinaUser = false;
          localStorage.setItem("isChinaUser", "false");
          // // console.log("not china user");
          doFunc();
        })
        .catch((e) => {
          gutils.isChinaUser = true;
          localStorage.setItem("isChinaUser", "true");
          // // console.log("china user");
          doFunc();
        });
    } else {
      gutils.isChinaUser = isChinaUser == "yes";
      doFunc();
    }
  });
  var history = useHistory();
  window.store_hist = history;
  gutils.once("verifypagewhenchg", () => {
    history.listen((e) => {
      console.log("page is chaging e", e);
      if (gutils.dev()) {
        // return;
      }

      gutils.optCentreWithDeviceInfo("/release-notes/json/verify-page", {
        ROUTE_PATH: e.pathname,
        CHECKING: true,
      });
    });
  });
  gutils.defer(() => {
    function pushFunc() {
      // if (true) {
      //   return;
      // }
      const defaultHome = "/";
      history.push(defaultHome);
    }
    const notStart = window.ipc.isLocalServerNotStartedUp();
    const isBrandNew = window.ipc.isBrandNewAndNeedDownloadInfra();
    if (isBrandNew || notStart) {
      if (!isBrandNew) {
        if (location.href.indexOf("/prelimnary") != -1) {
          setTimeout(() => {
            // history.push("/");
            location.href = "/";
          }, 0);
        }
      }
      gutils.waitInitializeRefFunc.push(async function () {
        pushFunc();
      });
      if (notStart && !isBrandNew) {
        // history.push("/loadService");
        gutils.once("loadservice-callfunc", () => {
          gutils.api.system.bootService();
        });
      } else if (isBrandNew) {
        history.push("/prelimnary");
      }
    } else {
      pushFunc();
    }
  });
  return (
    <CommonLoadPage
      text={
        <span>
          {t(`Loading local services and resources`)}
          <Blink />
        </span>
      }
    />
  );
};
