import React, { useCallback, useRef } from "react";
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
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
var { autorun, reaction, observable } = require("mobx");
import "./index.less";
import {
  Classes as Popover2Classes,
  ContextMenu2,
  Tooltip2,
} from "@blueprintjs/popover2";
import OperationPanel from "../OperationPanel";
import _ from "lodash";
import fn_getBeautifyCodeCommon from "./fn_getBeautifyCodeCommon";
import main_menu_frame from "../../routes/main_menu_frame";
import { CodeGenDefinition } from "../../routes/main_menu_frame/im";
console.log(`main_menu_frame`, main_menu_frame);

const CrtWrapper = fn_getBeautifyCodeCommon({
  tmp_CodeGenDefinition: CodeGenDefinition,
  OperationPanel,
});

export default CrtWrapper;
