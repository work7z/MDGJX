// LafTools
// 
// Date: Sat, 6 Jan 2024
// Author: LafTools Team - FX <work7z@outlook.com>
// Description: 
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

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
import "./index.scss";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import DateUtils from "../../utils/DateUtils";
import _ from "lodash";
import AlertUtils from "../../utils/AlertUtils";

import exportUtils from "../../utils/ExportUtils";
import onlineAPISlice from "../../reducers/onlineAPISlice";
import { CLZ_FORM_SINGLE_CLZ } from "../../types/styles";
import { Dot } from "../../utils/cTranslationUtils";
import { URL_NAV_FORM_SIGN_UP, URL_NAV_FORM_USER_PASSWORD, getOnlineFullLink } from "../../types/online";
import VerifyCodeFormGroup from "../../containers/VerifyCodeFormGroup";
import OnlineHookUtils, { getPayloadValue } from "../../utils/OnlineHookUtils";
import PasswordInput from "../../components/PasswordInput";

export default function SignInForm() {
  return ''
}
