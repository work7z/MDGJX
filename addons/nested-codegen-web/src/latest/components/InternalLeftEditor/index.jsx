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
import GEditor from "../GEditor";

export default observer(
  ({ crtStoreName, viewmode, direct, language, initEditorByLeftOrRight }) => {
    console.log("intenral-left-editor");
    return (
      <GEditor
        viewmode={viewmode}
        noAutoFocus={true}
        otherConfig={{
          callFuncName: "create",
          enableSplitViewResizing: true,
          originalEditable: true,
          readOnly: false,
          followsCaret: true,
          ignoreCharChanges: true,
        }}
        id={crtStoreName + "id"}
        language={language}
        key={crtStoreName + "id"}
        //
        onRef={(editor) => {
          console.log("intenral-left-editor, onRef");
          initEditorByLeftOrRight({
            editor,
            direct: direct || "left",
          });
        }}
        style={{ width: "100%", height: "100%" }}
      ></GEditor>
    );
  }
);
