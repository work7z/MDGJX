
// Date: Sun, 8 Oct 2023
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
import gutils from "../../utils/GlobalUtils";
import "./index.scss";
import { Dot } from "../../utils/cTranslationUtils";
import { useHistory } from "react-router";
import { useEffect } from "react";
import { URL_LOGIN, URL_WORKBENCH } from "../../types/constants";

export default () => {
  // router redirect to /workbench/tools in the useEffect code
  const history = useHistory();
  useEffect(() => {
    setTimeout(() => {
      history.push(URL_LOGIN);
    }, 0);
  }, []);

  return (
    <div className="entry-wrapper">
      {Dot("OrCt5", "Redirecting to the workbench...")}
    </div>
  );
};
