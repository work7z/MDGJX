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
  ContextMenu,
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
  Tree,
  Icon,
  Card,
  Elevation,
  Button,
  PanelStack2,
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
import { useState, useCallback, useEffect } from "react";

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
import {
  Classes as Popover2Classes,
  ContextMenu2,
  Tooltip2,
} from "@blueprintjs/popover2";
import _ from "lodash";

export default observer((props) => {
  let max = props.max;
  if (_.isNil(max)) {
    max = 8;
  }
  let min = props.min;
  if (_.isNil(min)) {
    min = 1;
  }
  let [viewTextNum, onViewTextNum] = useState(min);
  useEffect(() => {
    // // // console.log("action for timeout ref");
    let tmpval = viewTextNum;
    let timeoutref = window.setInterval(() => {
      let nextval = tmpval + 1;
      if (nextval > max) {
        nextval = min;
      }
      // // // console.log("action for updating its value", nextval);
      tmpval = nextval;
      onViewTextNum(nextval);
    }, 1000);
    return () => {
      // // // console.log("action for cleaning timeout");
      window.clearInterval(timeoutref);
    };
  }, []);
  let totalStr = "";
  for (let i = 0; i < viewTextNum; i++) {
    totalStr += ".";
  }
  return totalStr;
});
