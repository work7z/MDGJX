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
import {
  Example,
  ReactDocsTagRenderer,
} from "@blueprintjs/docs-theme";
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

const UserLoginPanel = observer(() => {
  const validConditions = [
    {
      label: "Username",
      prop: "username",
      need: true,
      max: 100,
      placeholder: "Username or Email",
      // tooltip: "The value will be used as the name of the static server.",
      jsx: (props) => {
        return <GFormInput {...props} />;
      },
    },
    {
      label: "Password",
      prop: "password",
      need: true,
      max: 500,
      placeholder: "Password or SecureKey",
      // tooltip: "The value will be used as the name of the static server.",
      jsx: (props) => {
        return <GFormInput type="password" {...props} />;
      },
    },
    {
      type: "html",
      prop: "EXTRA_TMP_LOGIC_expand_2",
      value: (x) => {
        return (
          <div style={{ textAlign: "right" }}>
            <a
              style={{ marginRight: "15px" }}
              href={gutils.void_ref}
              onClick={() => {
                window.open(gutils.getCentreLinkWithGo("/user/sign-up"));
              }}
            >
              {t("Create Account")}
            </a>
            <a
              href={gutils.void_ref}
              onClick={() => {
                window.open(
                  gutils.getCentreLinkWithGo("/user/find-my-password")
                );
              }}
            >
              {t("Forgot Password?")}
            </a>
          </div>
        );
      },
    },
    {
      label: "Image Verification Code",
      prop: "verificationCode",
      need: true,
      max: 500,
      placeholder: "Please input the code which is shown the image below",
      // tooltip: "The value will be used as the name of the static server.",
      jsx: (props) => {
        return <GFormInput {...props} />;
      },
    },
    {
      type: "html",
      prop: "EXTRA_TMP_LOGIC_vcode",
      defaultValue: Math.random(),
      value: (x) => {
        return (
          <div style={{ float: "left", textAlign: "right" }}>
            <div>
              {" "}
              <img
                onClick={() => {
                  x.onChange(Math.random());
                }}
                style={{ cursor: "pointer" }}
                src={gutils.getCentreLink(
                  "/blob/verify-code/get?timestamp=" + x.value
                )}
              />
            </div>
            <div>
              <a
                href="javascript:void(0);"
                onClick={() => {
                  x.onChange(Math.random());
                }}
              >
                {t("Refresh Code")}
              </a>
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      {React.createElement(
        observer(() => {
          return gutils.createForm(
            gstore.user.loginPageData,
            {
              model: "addModel",
              failures: "addModelFailures",
              isAllPass: "isAddModelPass",
              obj: gstore.staticOverlay.addItem,
            },
            validConditions
          );
        })
      )}
    </div>
  );
});
export default UserLoginPanel;
