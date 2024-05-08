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
import { CSS_TEXT_ANCHOR_CSS } from "@/app/__CORE__/meta/styles";
import { Dot, getXSubPath } from "../../utils/TranslationUtils";
import { fn_Geti18n } from "@/app/[lang]/client/src/i18n-pure";

interface PassProp { }
export default (props: PassProp): any => {
  let i18n = fn_Geti18n(Dot)
  let splitArr = getXSubPath().split("/").filter(x => x) // // location.pathname.split("/")
  return <div>
    <div className='bp5-text-muted space-x-2 '>
      {i18n?.map(x => {
        // let m = [...splitArr]
        // m[2] = x.LangInExplicitURL || ''//getFormattedLang(x.Value)
        let hrefVal = '/' + x.LangInExplicitURL //+ m.filter(x => x).join("/")
        return <a className={CSS_TEXT_ANCHOR_CSS} href={hrefVal}>{x.LabelByLang}</a>
      })}
    </div>
  </div>;
};
