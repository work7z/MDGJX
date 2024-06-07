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
  let crtWorkspaceItem = _.find(
    gstore.preliAllData.configs.workspace_list,
    (x) => x.value == gstore.localSettings.pre_currentWorkspaceId
  );
  const validConditions = [
    {
      type: "html",
      prop: "EXTRA_TMP_LOGIC_abcd",
      defaultValue: Math.random(),
      value: (x) => {
        return (
          <Callout>
            {t(
              `For the sake of the security of your data, the workspace data has been encrypted. Before start accessing the workspace {0}, please provide the private key at first.`,
              _.get(crtWorkspaceItem, "label")
            )}
          </Callout>
        );
      },
    },
    {
      label: t("Name"),
      prop: "name",
      max: 500,
      placeholder: t("The workplace name"),
      value: "sk",
      tooltip: `The workspace you will access`,
      jsx: (props) => {
        return (
          <GFormInput
            disabled={true}
            value={_.get(crtWorkspaceItem, "label")}
          />
        );
      },
    },
    {
      label: t("Private Key"),
      prop: "private_key",
      need: true,
      max: 500,
      placeholder: t(
        "Please input the private key that encrypted your workspace data"
      ),
      tooltip: `Please be noted the private key should be given when you start accessing the workspace data, meanwhile, we will NOT save or cache your private key at server side, it means there's no another way to reset the private key if you forgot its value.`,
      jsx: (props) => {
        return <GFormInput type="password" {...props} />;
      },
    },
    {
      label: `Save Private Key Locally?`,
      prop: "SAVE_PRIVATE_KEY_LOCALLY",
      tooltip: `Please be noted that we will only save the private key value on your browser side, it's not stored at server side.`,
      jsx: (props) => {
        return <GFormSwitch {...props} />;
      },
    },
  ];
  return (
    <div>
      <DialogCommon
        width="500px"
        theTitle={t(
          `Enter Private Key - {0}`,
          _.get(crtWorkspaceItem, "label", "N/A")
        )}
        obj={gstore.user.overlayForInputtingPrivateKey}
        jsx={observer(() => {
          return gutils.createForm(
            gstore.user.enterPrivatePageData,
            {
              model: "addModel",
              failures: "addModelFailures",
              isAllPass: "isAddModelPass",
              obj: gstore.user.overlayForInputtingPrivateKey,
            },
            validConditions
          );
        })}
        confirm={async () => {
          let thatObj = gstore.user.overlayForInputtingPrivateKey;
          thatObj.loading = true;
          let crtWorkId = gstore.localSettings.pre_currentWorkspaceId;
          let crtWorkKey =
            gstore.user.enterPrivatePageData.addModel.private_key;
          try {
            await gutils.opt("/ws/verifyRequest", {
              ...gstore.user.enterPrivatePageData.addModel,
              USER_OPT_WS_ID: crtWorkId,
              USER_OPT_WS_KEY: crtWorkKey,
            });
            await gutils.api.user.refreshWorkspaceList();
            let thatval = gstore.user.enterPrivatePageData.addModel.private_key;
            if (
              gstore.user.enterPrivatePageData.addModel[
                "SAVE_PRIVATE_KEY_LOCALLY"
              ] == 1
            ) {
              gstore.localSettings.private_key_ws_obj[crtWorkId] = thatval;
            } else {
              window.mem_private_key_ws_obj[crtWorkId] = thatval;
            }
            gstore.localSettings.currentWorkspaceId = crtWorkId;
            gutils.alertOk(`Verified.`);
            // -----------
            thatObj.open = false;
            thatObj.loading = false;
          } catch (e) {
            thatObj.loading = false;
            console.log("err", e);
          }
        }}
        pageData={gstore.user.enterPrivatePageData}
      />
    </div>
  );
});
