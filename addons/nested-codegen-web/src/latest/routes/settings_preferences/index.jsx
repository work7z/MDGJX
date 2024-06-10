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
  Icon,
  Card,
  Elevation,
  Button,
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
import GFormInput from "../../components/GFormInput";
import GFormSelect from "../../components/GFormSelect";
import GFormFilePathSelect from "../../components/GFormFilePathSelect";
import GFormSwitch from "../../components/GFormSwitch";
import GDataTable from "../../components/GDataTable";
import GFormSlider from "../../components/GFormSlider";
import GFormCheckbox from "../../components/GFormCheckbox";

export default observer(() => {
  const validConditions = [
    {
      label: "Line View Mode",
      prop: "LOGGING_VIEW_LINE_BREAK",
      need: true,
      tooltip:
        "The value will be used as the line wrap logic of displaying each line of logs.",
      jsx: (props) => {
        return (
          <GFormSelect
            list={[
              {
                label: "Line Break",
                value: "normal",
              },
              {
                label: "No Wrap",
                value: "nowrap",
              },
              {
                label: "Break Spaces",
                value: "break-spaces",
              },
              {
                label: "Pre Line",
                value: "pre-line",
              },
              {
                label: "Pre Wrap",
                value: "pre-wrap",
              },
            ]}
            {...props}
          />
        );
      },
    },
    {
      prop: "LOGGING_VIEW_RETRIEVE_LINES_NUMBER",
      defaultValue: 15,
      need: true,
      label: "Lines within a single page",
      tooltip:
        "The value will decide how many logging lines a page will display while retrieving logs from local services.",
      jsx: (props) => {
        // return <GFormSlider min={2} max={200} stepSize={1} labelStepSize={20}  {...props} />;
        return <GFormInput type={"number"} {...props} />;
      },
    },
    {
      prop: "LOGGING_VIEW_SEARCH_LOG_TYPE",
      need: true,
      label: "Displaying logging types",
      tooltip:
        "The value will be used as what kinds of logging content will be displayed",
      jsx: (props) => {
        // return <GFormInput type={"number"} {...props} />;
        return <GFormCheckbox list={gutils.logging_list()} {...props} />;
      },
    },
    {
      prop: "LOGGING_VIEW_FONT_SIZE",
      defaultValue: 15,
      need: true,
      label: "Font Size",
      tooltip: "The value will decide the font size of the logging content",
      jsx: (props) => {
        // return <GFormInput type={"number"} {...props} />;
        return <GFormSlider min={8} max={50} labelStepSize={5} {...props} />;
      },
    },
    {
      prop: "LOGGING_VIEW_HEIGHT",
      defaultValue: 620,
      need: true,
      label: "View Height",
      tooltip:
        "The value will decide the view height of displaying logging content",
      jsx: (props) => {
        // return <GFormInput type={"number"} {...props} />;
        return (
          <GFormSlider
            min={50}
            max={2000}
            labelStepSize={200}
            stepSize={10}
            {...props}
          />
        );
      },
    },
    {
      label: "Realtime Logging View?",
      prop: "LOGGING_VIEW_REALTIME_LOAD",
      tooltip:
        "If you turn it on, the logging view will be refreshed immediately once any new logging content is found.",
      jsx: (props) => {
        return <GFormSwitch valtype="tf" {...props} />;
      },
    },
  ];
  const formJSX = gutils.createForm(
    gstore.settings.other,
    {
      model: "temp_model",
      failures: "addModelFailures",
      isAllPass: "isAddModelPass",
      wakekey: "setting_preferences",
    },
    validConditions
  );
  return (
    <div>
      <h2>{t("Logging View Settings")}</h2>
      <div>{formJSX}</div>
    </div>
  );
});
