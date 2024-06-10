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
import _ from "lodash";

export default observer((props) => {
  const [iptVal = props.value, onIptVal] = useState(props.value);
  const [showPassword, onShowPassword] = useState(false);
  useEffect(() => {
    // debugger;
    onIptVal(props.value);
    return () => {};
  }, [props.value]);
  const lockButton = (
    <Button
      small={props.small}
      icon={showPassword ? "unlock" : "lock"}
      intent={Intent.WARNING}
      minimal={true}
      onClick={() => {
        onShowPassword(showPassword ? false : true);
      }}
    />
  );
  let FinalVal = InputGroup;
  if (props.type == "textarea") {
    FinalVal = TextArea;
  }
  // console.log("rendering logic for ", iptVal, props.value);
  if (_.isNil(iptVal) && !_.isEmpty(props.value)) {
    gutils.defer(() => {
      onIptVal(props.value);
    });
  }
  return (
    <div>
      <FinalVal
        disabled={props.disabled}
        small={props.small}
        title={props.placeholder}
        placeholder={props.placeholder}
        type={
          (props.type == "password"
            ? showPassword
              ? "text"
              : "password"
            : props.type) || "text"
        }
        {...gutils.propsForInput(props, iptVal, onIptVal)}
        rightElement={
          props.type == "password" ? lockButton : props.rightElement
        }
      />
    </div>
  );
});
