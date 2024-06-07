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
import Simple_table from "../simple_table";

window.fn_logout = async (e) => {
  if (e.forceQuit) {
  } else {
    if (
      !(await gutils.win_confirm(
        "Are you sure that you want to logout this account?"
      ))
    ) {
      return;
    }
  }
  localStorage.removeItem("crt_premium_user");

  try {
    await gutils.optCentreWithDeviceInfo("/user/log-out");
  } catch (e) {
    console.log("e", e);
  }
  gstore.localSettings.userInfo = fn_raw_local_set().userInfo;
  gutils.alert(`System will reload later, please wait a moments.`);
  await gutils.saveLocalSettings(_.cloneDeep(gstore.localSettings));
  setTimeout(() => {
    location.reload();
  }, 1500);
};

export default observer(() => {
  return (
    <div>
      <DialogCommon
        width="500px"
        noFoot={true}
        obj={gstore.user.overlayForUserInfo}
        jsx={observer(() => {
          return (
            <div>
              <FormGroup label={t(`Profile`)}>
                <Simple_table
                  data={[
                    {
                      label: t(`Username`),
                      value: _.get(get_user_info(), "username"),
                    },
                    {
                      label: t(`Email`),
                      value: _.get(get_user_info(), "email"),
                    },
                  ]}
                  column={[
                    {
                      label: t("Name"),
                      value: (x) => x["label"],
                    },
                    {
                      label: t("Value"),
                      value: (x) => x["value"],
                    },
                  ]}
                ></Simple_table>
              </FormGroup>
              <FormGroup label={t(`Operations`)}>
                <Button
                  style={{ marginRight: "5px" }}
                  intent={"none"}
                  text={t("User Centre")}
                  onClick={() => {
                    window.open(`https://codegen.cc/user/centre`);
                  }}
                ></Button>
                <Button
                  style={{ marginRight: "5px" }}
                  intent={"none"}
                  text={t("Reset Password")}
                  onClick={() => {
                    window.open(`http://codegen.cc/user/find-my-password`);
                  }}
                ></Button>
                <Button
                  intent={"warning"}
                  text={t("Log Out")}
                  onClick={fn_logout}
                ></Button>
              </FormGroup>
            </div>
          );
        })}
        confirm={gutils.api.user.login}
        // confirmDisable={!gstore.user.loginPageData.isAddModelPass}
        pageData={gstore.user.loginPageData}
      />
    </div>
  );
});
