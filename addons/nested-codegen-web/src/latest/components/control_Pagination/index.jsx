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
import {
  Classes as Popover2Classes,
  ContextMenu2,
  Tooltip2,
} from "@blueprintjs/popover2";

export default observer((props) => {
  const { pageCount, pageInfo } = props.tableInfo;
  const totalPageNum = gutils.noNaN(Math.ceil(pageCount / pageInfo.pageSize));
  return (
    <div className="control-pagin-wrapper">
      <div className="left-desc">
        {props.tableInfo.loading
          ? t("Loading...")
          : t(
              "{0} Records, {1} of {2} pages",
              pageCount,
              pageInfo.pageCount === 0 ? 0 : pageInfo.pageIndex,
              totalPageNum
            )}
      </div>
      <div className="right-desc">
        <ButtonGroup>
          <Button
            disabled={pageInfo.pageIndex == 1}
            icon="caret-left"
            loading={pageInfo.loading}
            onClick={() => {
              pageInfo.pageIndex--;
              props.tableInfo.func.search();
            }}
          ></Button>
          <Button
            disabled={pageInfo.pageIndex >= totalPageNum}
            loading={pageInfo.loading}
            icon="caret-right"
            onClick={() => {
              pageInfo.pageIndex++;
              props.tableInfo.func.search();
            }}
          ></Button>
        </ButtonGroup>
      </div>
    </div>
  );
});
