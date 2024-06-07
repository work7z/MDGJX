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
import _ from "lodash";
import AlertForStaticDelete from "../alert_for_static_delete/index";
import AlertForProxyDelete from "../alert_for_proxy_delete/index";
import OverlayForAddStaticServer from "../overlay_for_add_static_server/index";
import OverlayForAddProxyServer from "../overlay_for_add_proxy_server/index";
import Overlay_for_add_proxy_rule from "../overlay_for_add_proxy_rule";
import Overlay_for_add_proxy_rule_path_rewrite from "../overlay_for_add_proxy_rule_path_rewrite";
import Drawer_for_settings from "../drawer_for_settings";
import Overlay_for_user_panel from "../overlay_for_user_panel/index";
import Overlay_for_user_info_login from "../overlay_for_user_info_login/index";
import Overlay_for_add_new_conn from "../overlay_for_add_new_conn/index";
import Overlay_for_add_new_folder from "../overlay_for_add_new_folder/index";
import Overlay_for_alertaction from "../overlay_for_alertaction";
import Overlay_for_add_new_local_project from "../overlay_for_add_new_local_project";
import Overlay_for_conn_recent_scripts from "../overlay_for_conn_recent_scripts";
import Overlay_for_update_tab_name from "../overlay_for_update_tab_name";
import Overlay_for_create_workspace from "../overlay_for_create_workspace";
import Overlay_for_manage_workspace from "../overlay_for_manage_workspace";
import Overlay_for_enter_private_key from "../overlay_for_enter_private_key";
import Overlay_for_rollback_version from "../overlay_for_rollback_version";
import Drawer_for_menu from "./Drawer_for_menu";
import Drawer_for_activation from "../Drawer_for_activation";
import Drawer_for_local_user from "../Drawer_for_local_user";
import Drawer_for_device_maintenance from "../Drawer_for_device_maintenance";
import Drawer_for_terminal_view from "../Drawer_for_terminal_view";
export default observer(() => {
  return (
    <div>
      {/* <Drawer_for_terminal_view /> */}
      <Drawer_for_device_maintenance />
      <Drawer_for_menu />
      <Overlay_for_rollback_version />
      {/* <Overlay_for_enter_private_key /> */}
      {/* <Overlay_for_manage_workspace /> */}
      {/* <Overlay_for_create_workspace /> */}
      {/* <AlertForStaticDelete /> */}
      {/* <AlertForProxyDelete /> */}
      {/* <OverlayForAddStaticServer /> */}
      {/* <OverlayForAddProxyServer /> */}
      {/* <Overlay_for_add_proxy_rule /> */}
      {/* <Overlay_for_add_proxy_rule_path_rewrite /> */}
      <Drawer_for_settings />
      <Drawer_for_activation />
      <Drawer_for_local_user />
      <Overlay_for_user_panel />
      <Overlay_for_user_info_login />
      <Overlay_for_add_new_conn />
      <Overlay_for_add_new_folder />
      <Overlay_for_alertaction />
      {/* <Overlay_for_add_new_local_project /> */}
      {/* <Overlay_for_conn_recent_scripts /> */}
      <Overlay_for_update_tab_name />
    </div>
  );
});
