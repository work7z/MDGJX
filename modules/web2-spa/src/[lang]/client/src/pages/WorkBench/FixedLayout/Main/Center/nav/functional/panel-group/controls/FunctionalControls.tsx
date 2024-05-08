
// Date: Wed, 15 Nov 2023
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
  FN_GetState,
  delayFN,
} from "../../../../../../../../../nocycle";

import React, { useEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import gutils from "../../../../../../../../../utils/GlobalUtils";
import { logutils } from "../../../../../../../../../utils/LogUtils";
import _ from "lodash";

import statusSlice from "../../../../../../../../../reducers/statusSlice";
import { useState, useContext, useCallback, useRef } from "react";
import {
  withRouter,
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  Redirect,
} from "react-router-dom";
import PageUtils from "../../../../../../../../../utils/PageUtils";
import TranslationUtils, {
  Dot,
} from "../../../../../../../../../utils/cTranslationUtils";
import "allotment/dist/style.css";
import { Allotment } from "allotment";

import { type } from "jquery";
import apiSlice from "../../../../../../../../../reducers/apiSlice";

import layoutSlice from "../../../../../../../../../reducers/layoutSlice";
import {
  FN_ACTION_CloseMenu_ltr,
  FN_ACTION_OpenMenu_ltr,
} from "../../../../../../../../../actions/layout_action";
import exportUtils from "../../../../../../../../../utils/ExportUtils";
import { ClientPortalContext } from "../../../../sub/center-view/Transformer/types";
import { PopoverItemProps } from "@/[lang]/client/src/components/ActionButton";

export let FN_SHOW_LTR_MENU = (menuKey: string) => {
  let dis = FN_GetDispatch();
  dis(
    FN_ACTION_OpenMenu_ltr({
      menuRecordKey: "ltr",
      menuKey: menuKey,
    })
  );
};

export let FN_CLOSE_LTR_MENU = (menuKey: string): any => {
  let dis = FN_GetDispatch();
  dis(
    FN_ACTION_CloseMenu_ltr({
      menuRecordKey: "ltr",
      menuKey: menuKey,
    })
  );
};

export let FN_TAB_ITEM_CLICKED_FN = (menuKey: string, isCurrentActive) => {
  let thatHide = FN_GetState().layout.menuHide[menuKey];
  if (thatHide) {
    // do show logic
    FN_SHOW_LTR_MENU(menuKey);
  } else {
    // if current is not hide, and click on current, do hide for this case only
    if (isCurrentActive) {
      FN_CLOSE_LTR_MENU(menuKey);
    } else {
      // otherwise, do nothing
    }
  }
};

export default (props: PopoverItemProps & {
}) => {
  let dis = exportUtils.dispatch();
  let clientCtx = useContext(ClientPortalContext)
  return (
    <Button
      onClick={() => {
        if (clientCtx.portalMode) {
          if (props.onPopClose) {
            props.onPopClose()
          }
          return;
        }
        FN_CLOSE_LTR_MENU("left");
      }}
      small
      minimal
      rightIcon="minus"
    ></Button>
  );
};
