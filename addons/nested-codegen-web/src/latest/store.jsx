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
import {  autorun, observable, computed }  from 'mobx'
import system_store from "./store/system_store";
import static_server_store from "./store/static_server_store";
import proxy_server_store from "./store/proxy_server_store";
import database_store from "./store/database_store";
import preliminary_store from "./store/preliminary_store";
import User_store from "./store/user_store";
import Common_store from "./store/common_app_store";
import Ext_store from "./store/ext_store";

let f = (obj)=>observable(obj)

class SysStore {
  // user
   user = f(User_store);

   scroll_mem_obj =f( {});

  // common app
   common_app = f( Common_store)

  // static
   staticOverlay = f({
    deleteItem: static_server_store.overlay.deleteServer,
    addItem: static_server_store.overlay.addItem,
  });
   static_view_detail_console = f(static_server_store.consoleData);
   staticServerPageData = f(static_server_store.pageData);

  // proxy
   proxyOverlay = f({
    deleteItem: proxy_server_store.overlay.deleteServer,
    addItem: proxy_server_store.overlay.addItem,
    addRule: proxy_server_store.overlay.addRule,
    addRulePathRewrite: proxy_server_store.overlay.addRulePathRewrite,
  });
   proxy_view_detail_console = f(proxy_server_store.consoleData);
   proxyServerPageData = f(proxy_server_store.pageData);
   proxyServerPageDataForRule = f(proxy_server_store.pageDataForRule);
   proxyServerPageDataForPathRewrite =
    f(proxy_server_store.pageDataForPathRewrite);

  // system
   overwrite_roadmap = f([]);
  //  fn_roadmap = system_store.roadmap);
   nav_menu = f(system_store.nav_menu);
   sysinfo =f( system_store.sysinfo);
   omnibusInfo = f(system_store.omnibusInfo);
   apiInfo =f( system_store.apiInfo);
   sysBootServer =f( system_store.bootServer);
   settings = f(system_store.settings);
   licenseConfig = f(system_store.licenseConfig);
   localUserConfig =f( system_store.localUserConfig);
   localDeviceConfig = f(system_store.localDeviceConfig);
   localSettings = f(system_store.localSettings);
   memSettings =f( {});

   show_left_menu_obj = f({
    isOpen: false,
  });

   desktop = f(system_store.desktop);
   msgPanelData = f(system_store.msgPanelData);
   otherParserConfigList = f(system_store.otherParserConfigList);
   databaseAllData =f( database_store);
   preliAllData = f(preliminary_store);

   menu_jsx_definition =f( {});

   ext = f(Ext_store);

   roadmap = f(computed(() => {
    return system_store.roadmap();
  }))

   roadmap_plain = f(computed(() => {
    return _.map(gstore.roadmap.get(), (x, d, n) => {
      let mysubchildren = []
      let parent_x = x
      gutils.iterateTree(x.children, (x, d, n) => {
        if (_.isNil(x.children)) {
          mysubchildren.push({ parent: parent_x, ...x });
        }
      });
      if (_.isEmpty(mysubchildren)) {
        mysubchildren = []
      }
      mysubchildren = _.sortBy(
        mysubchildren,
        (x) => gstore.localSettings.nav_menu_remark[x.pid]
      );
      return {
        ...x,
        children: mysubchildren,
      };
    });
  }));


   parent_roadmap_list = f(computed(() => {
    let finArr = []
    let obj = {
      ref: gstore.sysinfo.updateMenuCount,
    }
    window.test_100 = obj
    gutils.iterateTree(system_store.roadmap(), (x, d, n) => {
      if (!_.isNil(x.children)) {
        finArr.push(x);
      }
    });
    return finArr
  }))
}
let gstore = new SysStore();

window.gstore = gstore;
// gstore.roadmap.get() = gstore.fn_roadmap();

// computed(() => {
//   return gstore.fn_roadmap();
// });

window.initMenuToNavMenu();

export default gstore;
