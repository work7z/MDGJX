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
  Switch,
  MenuItem,
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
  Tabs,
  Tab,
  Icon,
  Card,
  Elevation,
  Button,
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
import _ from "lodash";
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
  HashRouter as Router,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
var { autorun, observable, reaction } = require("mobx");
import "./index.less";
import { FocusStyleManager } from "@blueprintjs/core";
import { Omnibar } from "@blueprintjs/select";
import HtmlSelect from "../C_HtmlSelect";
import cstore from "../../store/cstore";
import { Slider } from "@blueprintjs/core/lib/cjs/components/slider/slider";
import gapi from "../../utils/gapi";

const LoggingWrapper = observer((props) => {
  let [tab_idx, onTabIdx] = useState("view");
  return (
    <div style={{ padding: "10px" }}>
      <FormGroup
        label={t(`Disable Output After Launching`)}
        helperText={t(
          `By Default, when Local Service is ready, CodeGen will stop writing the latest log content into the log file to avoid the log file exhausting system resources. But if you want to check the real-time output, you can turn this option off and restart the service.`
        )}
      >
        <Switch
          checked={
            "" + cstore.settings.disable_output_after_boot == "true"
              ? true
              : false
          }
          onChange={(e) => {
            cstore.settings.disable_output_after_boot =
              !cstore.settings.disable_output_after_boot;
          }}
          innerLabelChecked="on"
          innerLabel="off"
        />
      </FormGroup>
    </div>
  );
});

export default LoggingWrapper;
