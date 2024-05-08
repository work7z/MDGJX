
// Date: Sun, 1 Oct 2023
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

interface BlinkProp {
  max: number;
  min: number;
  interval?: number;
}
export default (props: BlinkProp): any => {
  return (
    <div className="pure-g">
      <div className="pure-u-3-5 marginauto">
        <h1>{Dot("DtlAc", "Loading System Resources")}</h1>
        <div className="bp5-running-text bp5-text-large">
          <p>
            {Dot(
              "vWqac",
              "Before entering your workbench, we would like to preload required system resources at first. Please wait for a while, it will be completed soon, whose detail are viewable as below.",
              "LafTools ToolBox"
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
