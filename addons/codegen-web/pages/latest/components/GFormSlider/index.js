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
import { Example, IExampleProps } from "@blueprintjs/docs-theme";
import {
  ColumnHeaderCell,
  Cell,
  Column,
  Table,
  Regions,
} from "@blueprintjs/table";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import gutils from "../../utils";
import { useState } from "react";
import {
  useStores,
  useAsObservableSource,
  useLocalStore,
  useObserver,
} from "mobx-react-lite";
import { Provider, observer, inject } from "mobx-react";
var createHistory = require("history").createBrowserHistory;
import {
  withRouter,
  BrowserRouter as Router,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
var { autorun, observable } = require("mobx");
import gstore from "../../store.js";
import "./index.less";
import {
  Classes as Popover2Classes,
  ContextMenu2,
  Tooltip2,
} from "@blueprintjs/popover2";

export default observer((props) => {
  const [tmpVal = props.value, onTmpVal] = useState(props.value);
  useEffect(() => {
    if (props.value != tmpVal) {
      gutils.defer(() => {
        onTmpVal(props.value);
      });
    }
  }, [props.value]);
  return (
    <div
      {..._.get(props, "divProps", {})}
      style={_.get(props, "divStyles", {})}
    >
      <Slider
        min={props.min}
        max={props.max}
        stepSize={props.stepSize || 1}
        labelStepSize={props.labelStepSize || props.stepSize || 1}
        onChange={(val) => {
          onTmpVal(val);
          if (props.updateWhenDrag) {
            props.onChange(val);
          }
        }}
        onRelease={(val) => {
          props.onChange(val);
        }}
        ref={(e) => {
          window.t1 = e;
        }}
        value={parseInt(tmpVal)}
        vertical={false}
      />
    </div>
  );
});
