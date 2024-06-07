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
import GDataTable from "../../components/GDataTable";
import _ from "lodash";

export default observer(() => {
  const validConditions = [
    {
      label: "Rule Name",
      prop: "RULE_NAME",
      need: true,
      max: 25,
      placeholder: "e.g. test rule",
      tooltip: "The value will be used as the name of the proxy rule.",
      jsx: (props) => {
        return <GFormInput {...props} />;
      },
    },
    {
      label: "Rule Description",
      prop: "RULE_BRIEF",
      max: 100,
      placeholder: "e.g. it's used for certain APIs",
      tooltip: "Write some description about its usage and detail.",
      jsx: (props) => {
        return <GFormInput {...props} />;
      },
    },
    {
      label: "Dest Host",
      prop: "DEST_HOST",
      max: 100,
      need: true,
      validator: gutils.validate_http,
      errorText:
        "The host value needs to start with the protocol definition, e.g. http:// or https://",
      placeholder: "e.g. http://127.0.0.1:18080/api",
      tooltip:
        "Please specify the destination host that the proxy server will redirect to.",
      jsx: (props) => {
        return <GFormInput {...props} />;
      },
    },
    {
      label: "Path Rewrite",
      need: true,
      max: 180,
      prop: "EXTRA_DATA_PROXY_RULES_PATH_REWRITE",
      tooltip:
        "Support inputting the text of regex pattern, meanwhile, these rewrite rules permit the proxy server which is able to handle any kind of proxy needs.",
      jsx: (props) => {
        return (
          <GDataTable
            ctlDataObj={{
              fixedColWidthArr: [150, 150, 75, 150],
              col: [
                {
                  label: "Matches Pattern",
                  value: "FROM_URL_PATTERN",
                },
                {
                  label: "Rewrite Pattern",
                  value: "TO_URL_PATTERN",
                },
                gutils.col_disable(props),
                {
                  label: "Operation",
                  value: (x, rowidx) => {
                    return (
                      <div className="between-anchor">
                        <a
                          href={gutils.void_ref}
                          onClick={() => {
                            gutils.api.proxy.openAddRulePathRewritePanel(
                              "update",
                              x,
                              (newval) => {
                                const newarr = [...props.value];
                                newarr[rowidx] = newval;
                                props.onChange(newarr);
                              }
                            );
                          }}
                        >
                          Edit
                        </a>
                        {gutils.jsx_duplicate(x, props, rowidx, {
                          func() {},
                        })}
                        {gutils.jsx_remove(x, props, rowidx)}
                      </div>
                    );
                  },
                },
              ],
              leftfix: 0,
              addText: "Add Path Rewrite Rule",
              addFunc: () => {
                gutils.api.proxy.openAddRulePathRewritePanel();
              },
            }}
            {...props}
          />
        );
      },
    },
    {
      prop: "DISABLE",
      defaultValue: 0,
      label: "Disabled?",
      tooltip:
        "If you turn it on, this config will be neglected automatically while serving all of proxy requests",
      jsx: (props) => {
        return <GFormSwitch {...props} />;
      },
    },
    {
      type: "html",
      prop: "EXTRA_TMP_LOGIC_expand",
      defaultValue: 0,
      value: (x) => (
        <a
          href={gutils.void_ref}
          onClick={() => {
            x.onChange(x["value"] == 1 ? 0 : 1);
          }}
        >
          {t((x["value"] == 1 ? "Hide" : "Show") + " More Proxy Settings")}
        </a>
      ),
    },
    {
      prop: "IS_CHANGE_ORIGIN",
      defaultValue: 0,
      show: (x) => x["EXTRA_TMP_LOGIC_expand"] == 1,
      label: "Change Origin?",
      tooltip:
        "This value will control whether the server will change its origin information or not via updating the header HOST.",
      jsx: (props) => {
        return <GFormSwitch {...props} />;
      },
    },
    {
      prop: "HANDLE_COMPRESS",
      defaultValue: 1,
      show: (x) => x["EXTRA_TMP_LOGIC_expand"] == 1,
      label: "Handle Compress?",
      tooltip:
        "This value will control if the server will return a compressed formatting response. If not, then all of the requests will use traditional request without any compressed action.",
      jsx: (props) => {
        return <GFormSwitch {...props} />;
      },
    },
    {
      prop: "HANDLE_REDIRECT",
      defaultValue: 1,
      show: (x) => x["EXTRA_TMP_LOGIC_expand"] == 1,
      label: "Auto Redirect?",
      tooltip:
        "This value will control if the server will redirect to the new URL automatically according to the HTTP response code and related headers, such as 301 and 302",
      jsx: (props) => {
        return <GFormSwitch {...props} />;
      },
    },
    {
      prop: "FORWARD_IP",
      defaultValue: 1,
      show: (x) => x["EXTRA_TMP_LOGIC_expand"] == 1,
      label: "Forward IPAddr?",
      tooltip:
        "This value will control if the server will forward its IP address while handling proxy requests",
      jsx: (props) => {
        return <GFormSwitch {...props} />;
      },
    },
    {
      prop: "USE_SYSTEM_PROPERTIES",
      defaultValue: 1,
      show: (x) => x["EXTRA_TMP_LOGIC_expand"] == 1,
      label: "System Network?",
      tooltip:
        "This value will control if the server will use system network configs as default.",
      jsx: (props) => {
        return <GFormSwitch {...props} />;
      },
    },
    {
      prop: "KEEP_COOKIES",
      defaultValue: 1,
      show: (x) => x["EXTRA_TMP_LOGIC_expand"] == 1,
      label: "Keep Cookies?",
      tooltip:
        "This value will control if the server will forward cookies informations while handling proxy requests.",
      jsx: (props) => {
        return <GFormSwitch {...props} />;
      },
    },
    {
      prop: "MAX_CONNECTION",
      defaultValue: -1,
      show: (x) => x["EXTRA_TMP_LOGIC_expand"] == 1,
      label: "Max Connections",
      tooltip:
        "This value will control how many the maximum of connections will be, which is the server's capacity of handling proxy requests in a certain period.",
      jsx: (props) => {
        return <GFormInput type={"number"} {...props} />;
      },
    },
    {
      prop: "CONNECT_TIMEOUT",
      defaultValue: -1,
      show: (x) => x["EXTRA_TMP_LOGIC_expand"] == 1,
      label: "Connect Timeout",
      tooltip:
        "This value will be used as timeout config for the reason that system cannot retrieve the response duly while connecting to the target host.",
      jsx: (props) => {
        return <GFormInput type={"number"} {...props} />;
      },
    },
    {
      prop: "READ_TIMEOUT",
      defaultValue: -1,
      show: (x) => x["EXTRA_TMP_LOGIC_expand"] == 1,
      label: "Read Timeout",
      tooltip:
        "This value will be used as timeout config for the reason that system cannot retrieve the response duly while reading its response value.",
      jsx: (props) => {
        return <GFormInput type={"number"} {...props} />;
      },
    },
  ];

  return (
    <div>
      <DialogCommon
        zIndex={100}
        width="615px"
        portalClz="modal-100"
        obj={gstore.proxyOverlay.addRule}
        pageData={gstore.proxyServerPageDataForRule}
        jsx={observer(() =>
          gutils.createForm(
            gstore.proxyServerPageDataForRule,
            {
              model: "addModel",
              failures: "addModelFailures",
              isAllPass: "isAddModelPass",
              wakekey: "rule",
              obj: gstore.proxyOverlay.addRule,
            },
            validConditions
          )
        )}
        confirm={gutils.api.proxy.confirmModalForAddingItemRule}
        // confirmDisable={!gstore.proxyServerPageDataForRule.isAddModelPass}
      />
    </div>
  );
});
