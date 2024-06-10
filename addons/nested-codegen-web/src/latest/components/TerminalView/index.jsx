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
import { autorun, observable }  from 'mobx';
import gstore from "../../store.jsx";
import "./index.less";
import {
  Classes as Popover2Classes,
  ContextMenu2,
  Tooltip2,
} from "@blueprintjs/popover2";
// import { Terminal } from "xterm";
// import "xterm/css/xterm.css";
import VirtualBigDataLineContainer from "../VirtualBigDataLineContainer";

export default observer((props) => {
  return (
    <VirtualBigDataLineContainer
      clzname="terminalview"
      changeFactor={[1]}
      rowHeight={18}
      noDataView={<div>{t(`It's empty at present`)}</div>}
      rowCount={_.size(props.list)}
      rowRenderer={({ key, index, isScrolling, isVisible, style }) => {
        let x = _.get(props.list, index, {});
        let finalstr = `[${x.CREATE_TIME_STR}][${_.toUpper(x.TYPE)}] ${
          x.CONTENT
        }`;
        return (
          <div
            className={" eachlinefortext " + "textline-" + x.TYPE}
            key={key}
            style={{
              ...style,
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
            title={finalstr}
          >
            {finalstr}
          </div>
        );
      }}
    />
  );
});
