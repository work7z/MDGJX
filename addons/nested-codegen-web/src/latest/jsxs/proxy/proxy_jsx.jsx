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
import classNames from "classNames";
import {
  INTENT_PRIMARY,
  INTENT_SUCCESS,
} from "@blueprintjs/core/lib/esm/common/classes";
import GDataTable from "../../components/GDataTable";

export default {
  createForm(validConditions) {
    return gutils.createForm(
      gstore.proxyServerPageData,
      {
        model: "addModel",
        failures: "addModelFailures",
        isAllPass: "isAddModelPass",
        wakekey: "server",
      },
      validConditions
    );
  },
  table_rules(props = {}) {
    const { readonly = false } = props;
    return {
      noExtraInfo: readonly,
      label: "Proxy Rules",
      need: true,
      max: 180,
      prop: "EXTRA_DATA_PROXY_RULES",
      tooltip:
        "The server will use the rules above as its dynamic proxy config.",
      jsx: (props) => {
        let callFunc = (x, rowidx) => {
          gutils.api.proxy.openAddRulePanel("update", x, (newval) => {
            const newarr = [...props.value];
            newarr[rowidx] = newval;
            props.onChange(newarr);
          });
        };
        return (
          <GDataTable
            noAddBtn={readonly}
            ctlDataObj={{
              col: gutils.filternil([
                {
                  label: "Rule Name",
                  value: "RULE_NAME",
                },
                {
                  label: "Dest Host",
                  value: "DEST_HOST",
                },
                gutils.col_disable(),
                {
                  label: "Path Rewrites",
                  value: (x, rowidx) => {
                    const mysize =
                      _.size(_.get(x, "EXTRA_DATA_PROXY_RULES_PATH_REWRITE")) ||
                      0;
                    return readonly ? (
                      <span>{mysize} defintions</span>
                    ) : (
                      <a
                        href={gutils.void_ref}
                        onClick={() => {
                          callFunc(x, rowidx);
                        }}
                      >
                        {mysize} defintions
                      </a>
                    );
                  },
                },
                readonly
                  ? null
                  : {
                      label: "Operation",
                      value: (x, rowidx) => {
                        return (
                          <div className="between-anchor">
                            <a
                              href={gutils.void_ref}
                              onClick={() => {
                                callFunc(x, rowidx);
                              }}
                            >
                              Edit
                            </a>
                            {gutils.jsx_duplicate(x, props, rowidx)}
                            {gutils.jsx_remove(x, props, rowidx)}
                          </div>
                        );
                      },
                    },
                {
                  label: "Read Timeout",
                  value: "READ_TIMEOUT",
                },
                {
                  label: "Connect Timeout",
                  value: "CONNECT_TIMEOUT",
                },
                {
                  label: "Max Connections",
                  value: "MAX_CONNECTION",
                },
                gutils.col_yesno({
                  label: "Handle Compress?",
                  value: "HANDLE_COMPRESS",
                }),
                gutils.col_yesno({
                  label: "Auto Redirect?",
                  value: "HANDLE_REDIRECT",
                }),
                gutils.col_yesno({
                  label: "Forward IPAddr?",
                  value: "FORWARD_IP",
                }),
                gutils.col_yesno({
                  label: "Change Origin?",
                  value: "IS_CHANGE_ORIGIN",
                }),
                gutils.col_yesno({
                  label: "System Network?",
                  value: "USE_SYSTEM_PROPERTIES",
                }),
                gutils.col_yesno({
                  label: "Keep Cookies?",
                  value: "KEEP_COOKIES",
                }),
              ]),
              leftfix: 1,
              addText: "Add Rule",
              addFunc: () => {
                gutils.api.proxy.openAddRulePanel();
              },
            }}
            {...props}
          />
        );
      },
    };
  },
};
