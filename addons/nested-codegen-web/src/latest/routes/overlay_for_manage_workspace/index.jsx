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

export default observer(() => {
  return (
    <div>
      <DialogCommon
        width="500px"
        noConfirm={true}
        obj={gstore.user.overlayForManageWorkspace}
        jsx={observer(() => {
          return (
            <Simple_table
              data={gstore.preliAllData.configs.workspace_list}
              column={[
                {
                  label: t("Name"),
                  value: (x) => (
                    <div>
                      {x["label"]}
                      {gstore.localSettings.currentWorkspaceId == x.value
                        ? "*"
                        : ""}
                    </div>
                  ),
                },
                {
                  label: t("Operation"),
                  value: (x) => {
                    return (
                      <div className="sub-mr-5">
                        {false &&
                        x.value == gstore.localSettings.currentWorkspaceId ? (
                          ""
                        ) : (
                          <a
                            href="javascript:void(0);"
                            onClick={() => {
                              console.log(x);
                              gstore.localSettings.pre_currentWorkspaceId =
                                x.value;
                              window.chk_when_pre_crt();
                            }}
                          >
                            {t("Switch")}
                          </a>
                        )}
                        {getThatPrivateKey(x.value) ? (
                          <a
                            href="javascript:void(0);"
                            onClick={() => {
                              gstore.localSettings.private_key_ws_obj[x.value] =
                                null;
                              window.mem_private_key_ws_obj[x.value] = null;
                              // gutils.defer(() => {
                              //   location.reload();
                              // }, 500);
                            }}
                          >
                            {t("Unset PrivateKey")}
                          </a>
                        ) : (
                          ""
                        )}
                        {x.value == "default" ? (
                          ""
                        ) : (
                          <a
                            href="javascript:void(0);"
                            onClick={async () => {
                              if (await gutils.ask_danger_opt()) {
                                gstore.localSettings.pre_currentWorkspaceId =
                                  x.value;
                                window.chk_when_pre_crt();
                                if (!getThatPrivateKey(x.value)) {
                                  await gutils.win_alert(
                                    `Please input the private key at first before sending your operation.`
                                  );
                                  return;
                                }
                                await gutils.opt("/ws/delete", {
                                  USER_OPT_WS_ID: x.value,
                                  USER_OPT_WS_KEY: window.getThatPrivateKey(
                                    x.value
                                  ),
                                });
                                gstore.localSettings.currentWorkspaceId =
                                  "default";
                                await gutils.api.user.refreshWorkspaceList();
                                gutils.alertOk(
                                  "Deleted. App will redirect to the default workspace."
                                );
                                // gutils.delay_refresh();
                              }
                            }}
                          >
                            {t("Delete")}
                          </a>
                        )}
                      </div>
                    );
                  },
                },
              ]}
            ></Simple_table>
          );
        })}
        pageData={gstore.user.workspacePageData}
      />
    </div>
  );
});
