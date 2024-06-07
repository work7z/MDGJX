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
import React, { useEffect } from "react";
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
  useEffect(() => {
    gutils.defer(async () => {
      if (p_mode()) {
        return;
      }
      let res = await gutils.opt("/updates/list_previous_versions");
      console.log(res.content);
      let myval = res.content;
      if (_.findIndex(myval, (x) => x.value == ipc.version) == -1) {
        myval.push({
          label: "v" + ipc.version,
          value: ipc.version,
        });
      }
      gstore.preliAllData.configs.previous_history_list = myval;
    });
  }, []);
  return (
    <div>
      <DialogCommon
        width="500px"
        noConfirm={true}
        obj={gstore.user.overlayForRollbackVersion}
        jsx={observer(() => {
          return (
            <Simple_table
              data={gstore.preliAllData.configs.previous_history_list}
              column={[
                {
                  label: t("Name"),
                  value: (x) => (
                    <div>
                      {x.label}
                      {window.ipc.version == x.label ? "*" : ""}
                    </div>
                  ),
                },
                {
                  label: t("Operation"),
                  value: (x) => {
                    return (
                      <div className="sub-mr-5">
                        {false && x.value == window.ipc.version ? (
                          ""
                        ) : (
                          <a
                            href="javascript:void(0);"
                            onClick={async () => {
                              if (
                                await gutils.win_confirm(
                                  `Do you want to switch to this version? `
                                )
                              ) {
                                await gutils.opt("/updates/switch", {
                                  version: x.value,
                                });
                                await gutils.win_alert(
                                  `Updated. CodeGen will choose this version as its base logic at the next boot time.`
                                );
                                await gutils.win_alert(
                                  `Please restart CodeGen service manually to implement this changes.`
                                );
                              }
                            }}
                          >
                            {t("Switch")}
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
        pageData={gstore.user.rollbackPageData}
      />
    </div>
  );
});
