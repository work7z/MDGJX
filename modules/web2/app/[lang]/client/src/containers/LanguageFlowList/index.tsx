// LafTools
// 
// Date: Sun, 7 Jan 2024
// Author: Ryan Laf <work7z@outlook.com>
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
import React, { useEffect, useState } from "react";
import _ from "lodash";
import { CSS_TEXT_ANCHOR_CSS } from "../../types/styles";
import { getFormattedLang } from "../../i18n";
import { useGetI18nLangList } from "../UserAskMultipleDialogs";

interface PassProp { }
export default (props: PassProp): any => {
  let i18n = useGetI18nLangList()
  let splitArr = location.pathname.split("/")
  return <div>
    <div className='bp5-text-muted space-x-2 '>
      {i18n?.map(x => {
        let m = [...splitArr]
        m[2] = getFormattedLang(x.Value)
        return <a className={CSS_TEXT_ANCHOR_CSS} href={m.join("/")}>{x.LabelByLang}</a>
      })}
    </div>
  </div>;
};
