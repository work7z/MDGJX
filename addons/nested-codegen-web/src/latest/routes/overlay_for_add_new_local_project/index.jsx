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
import classNames from "classNames";
import {
  INTENT_PRIMARY,
  INTENT_SUCCESS,
} from "@blueprintjs/core/lib/esm/common/classes";
import DialogCommon from "../dialog_common";
import GFormFilePathSelect from "../../components/GFormFilePathSelect";
import GFormInput from "../../components/GFormInput";
import GFormSelect from "../../components/GFormSelect";
import TextAreaWithExample from "../../components/TextAreaWithExample";

export default observer(() => {
  let validConditions = [
    {
      label: "Folder Type",
      tooltip: "Please select related types to locate its usage",
      prop: "RECORD_TYPE",
      need: true,
      defaultValue: "global",
      jsx: (props) => (
        <GFormSelect
          {...props}
          list={gstore.common_app.localProjects.static.recordTypes}
        />
      ),
    },
    {
      label: "Folder FilePath",
      prop: "FILEPATH",
      tooltip:
        "Support inputting multiple folders by the line break, which is to say each line means each folder.",
      need: true,
      max: 450,
      jsx: (props) => {
        return (
          <TextAreaWithExample
            example={
              `# Windows \n# folders for testing\nC:\\testing\\2016-10\n \n` +
              `# Linux/Unix \n# folders for testing\n/users/jerry/testing/2022/10/1\n# folders for development\n/users/jerry/dev/2016/01`
            }
            {...props}
          />
        );
        // return <GFormFilePathSelect {...props} />;
      },
    },
    {
      label: "Name",
      need: true,
      max: 180,
      placeholder: "e.g. My Test Folder",
      prop: "NAME",
      tooltip: "Please give a name for this record",
      // If the value hadn't specified by user, then will be replaced with the folder name automatically.
      jsx: (props) => {
        return <GFormInput {...props} />;
      },
    },
    {
      label: "Description",
      need: false,
      max: 180,
      placeholder: "e.g. the folder is a test folder",
      prop: "BRIEF",
      tooltip: "Please give a brief description for this record",
      // If the value hadn't specified by user, then will be replaced with the folder name automatically.
      jsx: (props) => {
        return <GFormInput {...props} />;
      },
    },
  ];
  return (
    <div>
      <DialogCommon
        clzname=" myview"
        // resize={true}
        // noBackdrop={true}
        confirm={() => {
          gutils.api.common_app.localProjects.add();
        }}
        pageData={gstore.common_app.localProjects.addForm}
        obj={gstore.common_app.localProjects.overlay_addLocalProjects}
        // extraForm={gstore.common_app.localProjects.addForm}
        // confirmDisable={!gstore.common_app.localProjects.addForm.isAddModelPass}
        jsx={observer(() => {
          return gutils.createForm(
            gstore.common_app.localProjects.addForm,
            {
              model: "addModel",
              failures: "addModelFailures",
              isAllPass: "isAddModelPass",
              obj: gstore.common_app.localProjects.overlay_addLocalProjects,
              // wakekey: "rulexxxx",
              // obj: gstore.proxyOverlay.addRule,
            },
            validConditions
          );
          // return gutils.createForm2(
          //   gstore.common_app.localProjects.addForm,
          //   "s_local_project_addform",
          //   validConditions
          // );
        })}
      />
    </div>
  );
});
