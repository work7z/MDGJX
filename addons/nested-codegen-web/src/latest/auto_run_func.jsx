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
import gutils from "./utils";
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
import {autorun, observable, reaction}  from 'mobx'
import gstore from "./store.jsx";

export default () => {
  // auto switch
  let lastTheme = null;
  window.callInvokeDark = () => {
    // debugger;
    if (
      lastTheme != null &&
      lastTheme != gstore.localSettings.is_using_dark_mode
    ) {
      // do nothing
    } else {
      if (gstore.localSettings.is_auto_switch_dark_mode != "yes") {
        return;
      }
      let crtHour = new Date().getHours();
      if (crtHour >= 19) {
        gstore.localSettings.is_using_dark_mode = true;
      } else {
        gstore.localSettings.is_using_dark_mode = false;
      }
      lastTheme = gstore.localSettings.is_using_dark_mode;
    }
  };
  setInterval(window.callInvokeDark, window.ipc.dev ? 5000 : 120000);
  // other func
  let $body = $(document.body);
  let $html = $("html");
  let tryTime = 0;
  let prefn1 = () => {
    if (
      window.dark_mode == gstore.localSettings.is_using_dark_mode &&
      tryTime != 0
    ) {
      return;
    }
    tryTime++;
    window.dark_mode = gstore.localSettings.is_using_dark_mode;
    if (gstore.localSettings.is_using_dark_mode) {
      $body.addClass("bp3-dark");
      $html.addClass("bp3-dark");
    } else {
      $body.removeClass("bp3-dark");
      $html.removeClass("bp3-dark");
    }
  };
  reaction(() => {
    return [gstore.localSettings.is_using_dark_mode];
  }, prefn1);
  prefn1();
  // latest route info
  autorun(() => {
    const roadmap = gstore.roadmap.get();
    const latestRoutePath = gstore.sysinfo.latestRoutePath;
    // // console.log("handle latest route info", latestRoutePath);

    const hist = gutils.hist;
    if (hist) {
      let stackPipeList = [];
      gutils.findTree(
        gstore.roadmap.get(),
        (x) => {
          // // console.log("checking", hist.location.pathname, x.pathname);
          return hist.location.pathname == x.pathname && x.pathname ? x : null;
        },
        stackPipeList
      );
      const menu = [
        ..._.chain(stackPipeList || [])
          .reverse()
          .map((x, d, n) => {
            let obj = {
              icon: x.icon,
              text: x.label,
              href: x.pathname ? "" + x.pathname : gutils.void_ref,
              current: _.size(n) === d + 1,
            };
            // // console.log(obj);
            return obj;
          })
          .thru((x) => [
            // {
            //   text: t("Application"),
            //   icon: "page-layout",
            //   href: gutils.void_ref,
            // },
            ...x,
          ])
          .value(),
      ];
      gstore.sysinfo.breadmenu = menu;
    }
  });
};
