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
  Popover,
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
  PopoverInteractionKind,
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
import GFormInput from "../../components/GFormInput";
import GFormSelect from "../../components/GFormSelect";
import GFormFilePathSelect from "../../components/GFormFilePathSelect";
import GFormSwitch from "../../components/GFormSwitch";
import _ from "lodash";
import GDataTable from "../../components/GDataTable";
import proxy_jsx from "../../jsxs/proxy/proxy_jsx";

export default observer((props) => {
  const validConditions = [
    {
      label: "Group",
      tooltip: "Classify the server into the corresponding group.",
      prop: "FOLDER_ID",
      jsx: (props) => (
        <GFormSelect
          {...props}
          list={gstore.proxyServerPageData.formNeeds.groups}
        />
      ),
    },
    {
      label: "Name",
      prop: "NAME",
      need: true,
      max: 25,
      placeholder: "e.g. test server",
      tooltip: "The value will be used as the name of the proxy server.",
      jsx: (props) => {
        return <GFormInput {...props} />;
      },
    },
    {
      label: "Description",
      prop: "BRIEF",
      max: 100,
      placeholder: "e.g. as a needs of some projects",
      tooltip: "Write some description about its usage and detail.",
      jsx: (props) => {
        return <GFormInput {...props} />;
      },
    },
    proxy_jsx.table_rules(props),
    {
      label: "Bind Address",
      need: true,
      defaultValue: "127.0.0.1",
      prop: "LOCAL_LISTEN_IPADDR",
      tooltip:
        "The value is used for binding specify network interface while booting the proxy server.",
      jsx: (props) => (
        <GFormSelect
          {...props}
          list={gstore.proxyServerPageData.formNeeds.netcards}
        />
      ),
    },
    {
      label: "Listen Port",
      prop: "LOCAL_LISTEN_PORT",
      need: true,
      validator(x) {
        // // console.log("run work");
        return (
          !_.isNil(x) &&
          x != "" &&
          "" + x === parseInt(x) + "" &&
          _.isNumber(parseInt(x))
        );
      },
      // errorText:        "Value cannot be empty and only allow inputting number and comma character.",
      // placeholder: "e.g. 5000,5001,5002",
      errorText: "Value cannot be empty and only allow inputting number.",
      placeholder: "e.g. 5000",
      tooltip:
        "The server will use the port number while starting the server up.",
      // Support inputting multiple ports by joining them with a comma character (,)
      jsx: (props) => {
        return <GFormInput {...props} />;
      },
    },
    {
      label: "Using SSL?",
      prop: "IS_LOCAL_SSL",
      tooltip:
        "If you turn it on, the proxy server will be use the self-signed certificates as default.",
      jsx: (props) => {
        return <GFormSwitch {...props} />;
      },
    },
    {
      label: `Auto-Run when ${gutils.app_name} is launched?`,
      prop: "BOOT_FLAG",
      tooltip: `The server will be start-up automatically providing that the app is launched.`,
      jsx: (props) => {
        return <GFormSwitch {...props} />;
      },
    },
  ];
  return (
    <div>
      <DialogCommon
        width="820px"
        leftContent={
          gstore.proxyServerPageData.alertType == "update"
            ? (props) => (
                <Popover
                  popoverClassName={Classes.POPOVER_CONTENT_SIZING}
                  interactionKind={PopoverInteractionKind.CLICK_TARGET_ONLY}
                  content={gutils.deleteConfirmPanel(() => {
                    gutils.api.proxy.deleteItem();
                  })}
                  target={
                    <Button intent={"danger"} text={t("Delete")}></Button>
                  }
                ></Popover>
              )
            : null
        }
        left2Content={
          gstore.proxyServerPageData.alertType == "update"
            ? (props) => (
                <Button
                  intent="warning"
                  text={t("Duplicate")}
                  loading={gstore.proxyOverlay.addItem.loading}
                  disabled={!gstore.proxyServerPageData.isAddModelPass}
                  onClick={() => {
                    gutils.api.proxy.duplicateItem();
                  }}
                ></Button>
              )
            : null
        }
        obj={gstore.proxyOverlay.addItem}
        jsx={observer(() => proxy_jsx.createForm(validConditions))}
        confirm={gutils.api.proxy.confirmModalForAddingItem}
        // confirmDisable={!gstore.proxyServerPageData.isAddModelPass}
        pageData={gstore.proxyServerPageData}
      />
    </div>
  );
});
