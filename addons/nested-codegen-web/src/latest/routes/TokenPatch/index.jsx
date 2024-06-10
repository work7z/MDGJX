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
import Qs from "querystring";
import WrapError from "../WrapError/index";
window.Qs = Qs;

let InnerDiv = observer(() => {
  let hist = useHistory();
  gutils.hist = hist;
  console.log(hist);
  window.my_hist = hist;
  try {
    let tokenValue = Qs.parse(my_hist.location.search.replace("?", ""))["p"];
    ipc.store_set("token", tokenValue);
    gutils.defer(() => {
      my_hist.push("/?token=" + tokenValue);
    }, 100);
  } catch (e) {
    throw new Error(
      `Invalid token request, please check whether your parameter contains valid token. The link is ${JSON.stringify(
        my_hist.location
      )} `
    );
  }
  return <div>Received the token, APP is redirect...</div>;
});

export default (props) => {
  return (
    <WrapError>
      <InnerDiv />
    </WrapError>
  );
};
