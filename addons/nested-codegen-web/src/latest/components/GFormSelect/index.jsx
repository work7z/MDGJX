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
import Html_select from "../html_select";
import _ from "lodash";

export default observer((props) => {
  // // console.log("gformselect", props);
  console.log("gform_select_props", props);
  if (!_.isEmpty(props.list)) {
    if (
      (!_.isEmpty(props.list) && _.isNil(props.value)) ||
      (!_.isEmpty(props.list) &&
        _.findIndex(props.list, (x) => x.value == props.value) == -1)
    ) {
      let nextVal = _.get(props, "list.0.value");
      if (!_.isNil(nextVal) && nextVal != props.value) {
        props.onChange({
          target: {
            value: nextVal,
          },
        });
      }
    }
  }
  return (
    <div>
      <Html_select
      disabled={props.disabled}
        value={props.value}
        list={props.list}
        onChange={props.onChange}
      />
    </div>
  );
});
