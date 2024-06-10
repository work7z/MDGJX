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
import HSelect from "../../components/html_select/index.jsx";

export default observer((props) => {
  const folderObj = gstore[props.folderkey];
  return (
    <div className="control-bar-wrapper">
      <h2 className="bar-label">{props.text}</h2>
      <div className="form-hori-flow-wrapper">
        <div>
          <FormGroup label={t("Group")} inline={true} labelFor="text-input">
            <HSelect
              list={folderObj.formNeeds.groups}
              value={folderObj.formModel.FOLDER_ID}
              onChange={(x) => {
                folderObj.formModel.FOLDER_ID = x;
              }}
            />
          </FormGroup>
        </div>
        <div>
          <ButtonGroup>
            <Button
              icon="search"
              onClick={() => {
                _.invoke(props, "onSearch");
                _.invoke(props, "tableInfo.func.search");
              }}
              intent="primary"
              loading={props.tableInfo.loading}
              outlined={true}
            >
              {t("Search")}
            </Button>
            <Button
              onClick={() => {
                _.invoke(props, "onCreate");
                _.invoke(props, "tableInfo.func.create");
              }}
              icon="folder-new"
              intent="success"
              loading={props.tableInfo.loading}
              outlined={true}
            >
              {t("Create")}
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
});
