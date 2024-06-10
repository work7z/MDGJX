import React, { useCallback, useRef } from "react";
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";

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
import { autorun, reaction,observable } from "mobx";
import "./index.less";
import {
  Classes as Popover2Classes,
  ContextMenu2,
  Tooltip2,
} from "@blueprintjs/popover2";
import OperationPanel from "../OperationPanel";
import _ from "lodash";
import fn_getBeautifyCodeCommon from "./fn_getBeautifyCodeCommon";
import { CodeGenDefinition } from "../../routes/main_menu_frame/im";

const CrtWrapper = fn_getBeautifyCodeCommon({
  tmp_CodeGenDefinition: CodeGenDefinition,
  OperationPanel,
});

export default CrtWrapper;
