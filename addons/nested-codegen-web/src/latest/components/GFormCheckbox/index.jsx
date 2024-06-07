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
  Slider,
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
  Switch,
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
  const state = {
    inline: true,
  };
  let { value, onChange } = props;
  let valueArr = _.split(value, ",");
  if (value == "@all") {
    valueArr = _.chain(props.list)
      .map((x) => x.value)
      .value();
  }
  return (
    <div>
      {_.map(props.list, (x, d, n) => {
        let isCanFindThat =
          _.findIndex(valueArr, (xx) => xx + "" == x.value + "") != -1;
        let checked = isCanFindThat;
        return (
          <Checkbox
            key={d}
            checked={checked}
            onChange={(chkval) => {
              // // console.log("chk", chkval, chkval.target.value);
              let isOn = chkval.target.value == "on";
              const newarr = [];
              if (isOn) {
              } else {
              }
              for (let k1 of valueArr) {
                if (k1 + "" == "" + x.value) {
                  if (!checked) {
                    newarr.push(k1);
                  }
                } else {
                  newarr.push(k1);
                }
              }
              if (
                !checked &&
                _.findIndex(newarr, (xx) => xx + "" == x.value + "") == -1
              ) {
                newarr.push(x.value);
              }
              onChange(_.join(newarr, ","));
              // const newarr = []
              // if(value == '@all'){
              //    newarr.push()
              // }
            }}
            {...state}
            label={x.label}
          />
        );
      })}
    </div>
  );
});
