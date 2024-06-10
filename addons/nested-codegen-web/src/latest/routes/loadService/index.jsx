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
import CommonLoadPage from "../CommonLoadPage";

export default observer(() => {
  if (gstore.sysBootServer.err) {
    return (
      <div className={"load-service-box"}>
        <div>
          <div className="showloading">{gstore.sysBootServer.text}</div>
          {gstore.sysBootServer.err ? (
            <p style={{ color: "red" }}>{gstore.sysBootServer.err}</p>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  } else {
    return <CommonLoadPage text={<span>{gstore.sysBootServer.text}</span>} />;
  }
});
