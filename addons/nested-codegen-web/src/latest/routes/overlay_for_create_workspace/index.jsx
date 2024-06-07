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
import GFormInput from "../../components/GFormInput";
import GFormSelect from "../../components/GFormSelect";
import GFormFilePathSelect from "../../components/GFormFilePathSelect";
import GFormSwitch from "../../components/GFormSwitch";
import _ from "lodash";

export default observer(() => {
  const validConditions = [
    {
      label: t("Name"),
      prop: "name",
      need: true,
      max: 100,
      placeholder: t("Choose a name for the workspace you will create"),
      // tooltip: "The value will be used as the name of the static server.",
      jsx: (props) => {
        return <GFormInput {...props} />;
      },
    },
    {
      label: t("Private Key"),
      prop: "private_key",
      need: true,
      max: 500,
      placeholder: t(
        "Please define a private key that will encrypt your workspace data"
      ),
      tooltip: `Please be noted the private key should be given when you start accessing the workspace data, meanwhile, we will NOT save or cache your private key at server side, it means there's no another way to reset the private key if you forgot its value.`,
      jsx: (props) => {
        return <GFormInput type="password" {...props} />;
      },
    },
    {
      label: "Private Key Confirmation",
      prop: "confirm_private_key",
      need: true,
      max: 500,
      placeholder: "Please confirm your private key value here",
      tooltip: `Please confirm your private key, its value will be used as encrypting your personal workspace data. We will not limit the length of your private key, you can input a brief but complex password, such as m@129#& `,
      jsx: (props) => {
        return <GFormInput type="password" {...props} />;
      },
    },
  ];
  return (
    <div>
      <DialogCommon
        left2Content={(props) => (
          <Button
            intent="success"
            text={t("Manage")}
            onClick={() => {
              gstore.user.overlayForManageWorkspace.open = true;
            }}
          ></Button>
        )}
        width="500px"
        obj={gstore.user.overlayForCreateWorkspace}
        jsx={observer(() => {
          return gutils.createForm(
            gstore.user.workspacePageData,
            {
              model: "addModel",
              failures: "addModelFailures",
              isAllPass: "isAddModelPass",
              obj: gstore.user.overlayForCreateWorkspace,
            },
            validConditions
          );
        })}
        confirm={async () => {
          let thatObj = gstore.user.overlayForCreateWorkspace;
          thatObj.loading = true;
          try {
            let thatModel = gstore.user.workspacePageData.addModel;
            let myres = await gutils.opt("/ws/new", {
              ...thatModel,
              USER_OPT_WS_KEY: thatModel.private_key,
            });
            gutils.alertOk(
              `Created the workspace successfully, app will redirect to the workspace.`
            );
            await gutils.api.user.refreshWorkspaceList();
            gstore.localSettings.pre_currentWorkspaceId = myres.content;
            // gstore.user.workspacePageData.addModel.name;
            window.chk_when_pre_crt();
            thatObj.open = false;
            thatObj.loading = false;
          } catch (e) {
            thatObj.loading = false;
            console.log("err", e);
          }
        }}
        // confirmDisable={!gstore.user.loginPageData.isAddModelPass}
        pageData={gstore.user.workspacePageData}
      />
    </div>
  );
});
