
// Date: Sat, 7 Oct 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
// License: AGPLv3

import localforage from "localforage";
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
  MenuItem,
  Radio,
  ButtonGroup,
  TextArea,
  HotkeysProvider,
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
import React, { useEffect, useState } from "react";
import _ from "lodash";

import { Dot } from "../../utils/cTranslationUtils";
import moment from "moment";
import DateUtils from "../../utils/DateUtils";
import { QueryStatus } from "@reduxjs/toolkit/dist/query";
import {
  MutationState,
  MutationSubState,
  QuerySubState,
} from "@reduxjs/toolkit/dist/query/core/apiState";
import gutils from "../../utils/GlobalUtils";

interface PassProp {
  obj: MutationSubState<any>;
  jsx?: JSX.Element;
}
export default (props: PassProp): any => {
  // QueryStatus.fulfilled
  let obj = props.obj;
  let status = obj.status;
  if (status == QueryStatus.uninitialized) {
    return "";
  } else if (status == QueryStatus.rejected) {
    return (
      <Callout
        intent="danger"
        title={Dot(
          "4wlih",
          "The request was rejected due to unsatisfactory parameters."
        )}
      >
        <p>
          {Dot(
            "UF_Dp",
            "An Error occurred: {0}, rejected time is {1}",
            gutils.getErrMsg(obj.error),
            DateUtils.formatDateTime(obj.fulfilledTimeStamp)
          )}
        </p>
      </Callout>
    );
  } else if (status == QueryStatus.fulfilled) {
    return props.jsx || "";
  } else {
    return "";
  }
};
