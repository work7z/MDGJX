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
import { Example, IExampleProps } from "@blueprintjs/docs-theme";
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
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import _ from "lodash";
var { autorun, observable, computed } = require("mobx");
import system_store from "./store/system_store";
import static_server_store from "./store/static_server_store";
import proxy_server_store from "./store/proxy_server_store";
import database_store from "./store/database_store";
import preliminary_store from "./store/preliminary_store";
import User_store from "./store/user_store";
import Common_store from "./store/common_app_store";
import Ext_store from "./store/ext_store";

class SysStore {
  // user
  @observable user = User_store;

  @observable scroll_mem_obj = {};

  // common app
  @observable common_app = Common_store;

  // static
  @observable staticOverlay = {
    deleteItem: static_server_store.overlay.deleteServer,
    addItem: static_server_store.overlay.addItem,
  };
  @observable static_view_detail_console = static_server_store.consoleData;
  @observable staticServerPageData = static_server_store.pageData;

  // proxy
  @observable proxyOverlay = {
    deleteItem: proxy_server_store.overlay.deleteServer,
    addItem: proxy_server_store.overlay.addItem,
    addRule: proxy_server_store.overlay.addRule,
    addRulePathRewrite: proxy_server_store.overlay.addRulePathRewrite,
  };
  @observable proxy_view_detail_console = proxy_server_store.consoleData;
  @observable proxyServerPageData = proxy_server_store.pageData;
  @observable proxyServerPageDataForRule = proxy_server_store.pageDataForRule;
  @observable proxyServerPageDataForPathRewrite =
    proxy_server_store.pageDataForPathRewrite;

  // system
  @observable overwrite_roadmap = [];
  // @observable fn_roadmap = system_store.roadmap;
  @observable nav_menu = system_store.nav_menu;
  @observable sysinfo = system_store.sysinfo;
  @observable omnibusInfo = system_store.omnibusInfo;
  @observable apiInfo = system_store.apiInfo;
  @observable sysBootServer = system_store.bootServer;
  @observable settings = system_store.settings;
  @observable licenseConfig = system_store.licenseConfig;
  @observable localUserConfig = system_store.localUserConfig;
  @observable localDeviceConfig = system_store.localDeviceConfig;
  @observable localSettings = system_store.localSettings;
  @observable memSettings = {};

  @observable show_left_menu_obj = {
    isOpen: false,
  };

  @observable desktop = system_store.desktop;
  @observable msgPanelData = system_store.msgPanelData;
  @observable otherParserConfigList = system_store.otherParserConfigList;
  @observable databaseAllData = database_store;
  @observable preliAllData = preliminary_store;

  @observable menu_jsx_definition = {};

  @observable ext = Ext_store;

  @observable roadmap = computed(() => {
    return system_store.roadmap();
  });

  @observable roadmap_plain = computed(() => {
    return _.map(gstore.roadmap.get(), (x, d, n) => {
      let mysubchildren = [];
      let parent_x = x;
      gutils.iterateTree(x.children, (x, d, n) => {
        if (_.isNil(x.children)) {
          mysubchildren.push({ parent: parent_x, ...x });
        }
      });
      if (_.isEmpty(mysubchildren)) {
        mysubchildren = [];
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
  });

  // @observable cpt_node_map = computed(() => {
  //   let all_map = {};
  //   gutils.iterateTree(gstore.nav_menu, (node) => {
  //     if (node.label && node.pathname) {
  //       all_map[node.pathname] = node;
  //     }
  //   });
  //   return all_map;
  // });

  @observable parent_roadmap_list = computed(() => {
    let finArr = [];
    let obj = {
      ref: gstore.sysinfo.updateMenuCount,
    };
    window.test_100 = obj;
    gutils.iterateTree(system_store.roadmap(), (x, d, n) => {
      if (!_.isNil(x.children)) {
        finArr.push(x);
      }
    });
    return finArr;
  });
}
let gstore = new SysStore();

window.gstore = gstore;
// gstore.roadmap.get() = gstore.fn_roadmap();

// computed(() => {
//   return gstore.fn_roadmap();
// });

window.initMenuToNavMenu();

export default gstore;
