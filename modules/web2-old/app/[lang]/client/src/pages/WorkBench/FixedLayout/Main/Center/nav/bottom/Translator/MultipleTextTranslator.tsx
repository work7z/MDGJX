// LafTools
// 
// Date: Sun, 24 Dec 2023
// Author: LafTools Team - Ubuntu <work7z@outlook.com>
// Description: 
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
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
  Popover,
  Menu,
  MenuDivider,
} from "@blueprintjs/core";
import {
  ColumnHeaderCell,
  Cell,
  Column,
  Table,
  Regions,
} from "@blueprintjs/table";
import {
  APPINFOJSON,
  FN_GetDispatch,
  delayFN,
} from "../../../../../../../../nocycle";

import React, { useEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import gutils from "../../../../../../../../utils/GlobalUtils";
import _ from "lodash";
import { SysTabPane } from "../../../../../../../../components/SysTabPane";
import { FN_ACTION_CloseMenu_ltr } from "../../../../../../../../actions/layout_action";
import { useSearchQuery } from "../../../../../../../../types/workbench-hook";
import { Dot } from "../../../../../../../../utils/cTranslationUtils";
// import MultipleSessionLeftView from "../../../containers/MultipleSessionLeftView/index";
import TextTranslator from "./TextTranslator";
import MultipleSessionLeftView from "../../../../../../../../containers/MultipleSessionLeftView";


export default () => {
  return (
    <MultipleSessionLeftView
      defaultSessionId="t_en2zhcn"
      defaultSessionMap={
        {
          "t_en2zhcn": {
            T_SourceLang: 'en_US',
            T_TargetLang: 'zh_CN'
          },
          "t_zhcn2en": {
            T_SourceLang: 'zh_CN',
            T_TargetLang: 'en_US'
          },
        }
      }
      defaultSessionList={
        // TODO: for other languages, provide corresponding config
        [
          {
            label: Dot("QRAdA", "English to Chinese"),
            id: "t_en2zhcn",
          },
          {
            label: Dot("bVlBN", "Chinese to English"),
            id: "t_zhcn2en",
          }
        ]
      }
      sessionType="translator" body={TextTranslator}></MultipleSessionLeftView>
  )
} 