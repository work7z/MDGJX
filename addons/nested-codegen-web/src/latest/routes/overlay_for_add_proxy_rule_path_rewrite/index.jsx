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

export default observer(() => {
  const validConditions = [
    {
      label: "Matches Pattern(Source Value)",
      prop: "FROM_URL_PATTERN",
      need: true,
      max: 100,
      placeholder: "e.g. ^/api/old-path",
      tooltip:
        "Its value is used as the pattern for matching specify text of origin URL, and will be replaced by the rewrite pattern immediately.",
      jsx: (props) => {
        return <GFormInput {...props} />;
      },
    },
    {
      label: "Rewrite Pattern(Destination Value)",
      need: true,
      prop: "TO_URL_PATTERN",
      max: 100,
      placeholder: "e.g. /api/new-path",
      tooltip:
        "Its value is used as the pattern for replacing the matched text so that the proxy server can redirect the URL the user wanted to.",
      jsx: (props) => {
        return <GFormInput {...props} />;
      },
    },
    {
      prop: "DISABLE",
      label: "Disabled?",
      defaultValue: 0,
      tooltip:
        "If you turn it on, this config will be neglected automatically while serving all of proxy requests",
      jsx: (props) => {
        return <GFormSwitch {...props} />;
      },
    },
  ];

  return (
    <div>
      <DialogCommon
        zIndex={200}
        width={"500px"}
        portalClz="modal-200"
        obj={gstore.proxyOverlay.addRulePathRewrite}
        jsx={observer(() =>
          gutils.createForm(
            gstore.proxyServerPageDataForPathRewrite,
            {
              model: "addModel",
              failures: "addModelFailures",
              isAllPass: "isAddModelPass",
              wakekey: "path_rewrite",
              obj: gstore.proxyOverlay.addRulePathRewrite,
            },
            validConditions
          )
        )}
        confirm={gutils.api.proxy.confirmModalForAddingItemPathRewrite}
        // confirmDisable={
        //   !gstore.proxyServerPageDataForPathRewrite.isAddModelPass
        // }
        pageData={gstore.proxyServerPageDataForPathRewrite}
      />
    </div>
  );
});
