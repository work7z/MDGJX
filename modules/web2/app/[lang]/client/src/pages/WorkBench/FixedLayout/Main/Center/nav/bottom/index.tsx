
// Date: Tue, 14 Nov 2023
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
} from "../../../../../../../nocycle";

import React, { useEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import gutils from "../../../../../../../utils/GlobalUtils";
import _ from "lodash";
import { SysTabPane } from "../../../../../../../components/SysTabPane";
import { FN_ACTION_CloseMenu_ltr, FN_ACTION_CloseMenu_ttm } from "../../../../../../../actions/layout_action";
import { useSearchQuery } from "../../../../../../../types/workbench-hook";
import { Dot } from "../../../../../../../utils/cTranslationUtils";
// import MultipleSessionLeftView from "../../../containers/MultipleSessionLeftView/index";
import TextTranslator from "./Translator/TextTranslator";
import MultipleSessionLeftView from "../../../../../../../containers/MultipleSessionLeftView";
import MultipleTextTranslator from './Translator/MultipleTextTranslator'
import MultipleTerminal from "./Terminal/MultipleTerminal";
import Overview from "./Overview";
import MultipleDictionary from "./Dictionary/MultipleDictionary";

export default () => {
  let sq = useSearchQuery();
  let bottomId = sq.b;
  let fn_rightCtrl_common = (
    <Button
      onClick={() => {
        let dis = FN_GetDispatch();
        dis(
          FN_ACTION_CloseMenu_ttm({
            menuRecordKey: "ttm",
            menuKey: "bottom",
          })
        );
      }}
      small
      minimal
      rightIcon="minus"
    ></Button>
  );

  // business logic ifelse
  // TODO: dictionary, overview
  if (bottomId == 'dictionary') {
    return (
      <SysTabPane
        crtLeftNavId="drawer"
        leftNavList={[
          {
            label: Dot("kPD22", "Dictionary"),
            value: "dictionary",
          },
        ]}
        rightCtrls={fn_rightCtrl_common}
        children={
          <MultipleDictionary />
        }
      ></SysTabPane>
    );
  }
  if (bottomId == 'overview') {
    return (
      <SysTabPane
        crtLeftNavId="drawer"
        leftNavList={[
          {
            label: Dot("x5tHV", "System Overview"),
            value: "system-overview",
          },
        ]}
        rightCtrls={fn_rightCtrl_common}
        children={
          <Overview />
        }
      ></SysTabPane>
    );
  }
  if (bottomId == "terminal") {
    return (
      <SysTabPane
        crtLeftNavId="drawer"
        leftNavList={[
          {
            label: Dot("8M1wY", "Local Terminal"),
            value: "local-terminal",
          },
        ]}
        rightCtrls={fn_rightCtrl_common}
        children={
          <MultipleTerminal />
        }
      ></SysTabPane>
    );
  }
  if (bottomId == "translation") {
    return (
      <SysTabPane
        crtLeftNavId="drawer"
        leftNavList={[
          {
            label: Dot("qQmBr", "Text Translation"),
            value: "text-translation",
          },
        ]}
        rightCtrls={fn_rightCtrl_common}
        children={
          <MultipleTextTranslator />
        }
      ></SysTabPane>
    );
  }
  return (
    <SysTabPane
      crtLeftNavId="drawer"
      leftNavList={[
        {
          label: Dot("sk123", "Not yet finished"),
          value: "drawer",
        },
      ]}
      rightCtrls={fn_rightCtrl_common}
      children={<div>{Dot("qpDBSWe1", "no available panel")}test</div>}
    ></SysTabPane>
  );
};
