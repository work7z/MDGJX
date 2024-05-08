'use client'

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
import { loadDOT } from "@/__CORE__/utils/i18n-for-dynamic-loadDOT";
import { hocClientWrapper } from "@/[lang]/[category]/src/common/hocClientWrapper";

let a = loadDOT("pv92PGN1H", true)

interface BlinkProp {
}
export default hocClientWrapper((props: BlinkProp): any => {
  a()
  return (
    <div className="pure-g min-h-screen">
      <div className="pure-u-3-5 marginauto">
        <h1 className="text-lg">{Dot("RRhfWtFQP", "This part is still under development")}</h1>
        <div className="bp5-running-text bp5-text-large">
          {Dot("Q-fTyELbm", "Hi there, this part is still under development. We would let you know once it is done. Thank you!")}
        </div>
      </div>
    </div>
  );
}
)