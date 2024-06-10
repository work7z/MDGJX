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
import HalfResizeForTwoHorizontal from "../HalfResizeForTwoHorizontal";
import HalfResizeForTwo from "../HalfResizeForTwo";
import Blink from "../Blink/index";
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
import GEditor from "../GEditor";
import InternalLeftEditor from "../InternalLeftEditor";

export default observer((props) => {
  let { crtStoreName, otherprefix, language, initEditorByLeftOrRight } = props;
  let resizeForSnippet =
    "resizeForSnippet" + crtStoreName + (otherprefix || "");
  return (
    <HalfResizeForTwo
      containerClz={props.containerClz}
      heightValue={gstore.localSettings[resizeForSnippet]}
      onHeightValue={(val) => {
        gstore.localSettings[resizeForSnippet] = val;
      }}
      topJsx={props.topJsxCtn}
      btmJsx={
        <div className="my-top-box" onDrop={props.onDropFnForBtmJsx}>
          <div className="my-top-title">{t(props.btmTitle)}</div>
          <div className="my-top-ctn">{props.btmJsxCtn}</div>
        </div>
      }
      defaultPercent={props.rightTopBtmPercent}
    />
  );
});
