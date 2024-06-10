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
  Tab,
  Tabs,
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
import React, { useEffect } from "react";
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
import UserLoginPanel from "../overlay_for_user_panel/UserLoginPanel";
import GFormInput from "../../components/GFormInput";
import Simple_table from "../simple_table";
import CallOutAndView from "../../components/CallOutAndView";
import _ from "lodash";
import moment from "moment";
import PluginLoadView from "../PluginLoadView";

const Drawer_for_device_maintenance = observer(() => {
  const drawerConfig = {
    open: gstore.localSettings.showing_terminal_panel,
  };
  const state = {
    autoFocus: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: true,
    enforceFocus: true,
    hasBackdrop: true,
    isOpen: drawerConfig.open,
    size: "90%",
    position: Position.BOTTOM,
    usePortal: true,
    title: t(`System Integrated Terminal`) + `(${t(`Hot Key: {0}`, "T")})`,
  };

  return (
    <Drawer
      className={"mydrawerclz"}
      icon="terminal"
      onClose={() => {
        gstore.localSettings.showing_terminal_panel = false;
      }}
      {...state}
      style={{
        padding: 0,
      }}
    >
      <div className="w100 h100 white-app-view-no-pad">
        <PluginLoadView id="SwiftTerminal" />
      </div>
    </Drawer>
  );
});

export default Drawer_for_device_maintenance;
