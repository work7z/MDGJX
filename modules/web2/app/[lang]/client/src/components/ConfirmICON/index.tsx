
// Date: Sat, 30 Sep 2023
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

interface PassProp {
  isOK?: boolean;
}
export default (props: PassProp): any => {
  return (
    <span className="ml-8">
      <Button
        small={true}
        intent={props.isOK ? "success" : "none"}
        icon={props.isOK ? "confirm" : "changes"}
        minimal={true}
        loading={!props.isOK}
        title={
          props.isOK
            ? Dot(`pL6qH`, "Completed.")
            : Dot(`4UYIJ`, "Not yet completed.")
        }
      />
    </span>
  );
};
