
// Date: Sun, 12 Nov 2023
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
import { APPINFOJSON, FN_GetDispatch, delayFN } from "../../../../../../../../../nocycle";

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

import RightCtrlForFunctionalMenu from "../controls/FunctionalControls";
import FunctionalMenu_Panel from "..";
import QueryUtils, {
  getAjaxValueRes as getAjaxValueRes,
} from "../../../../../../../../../utils/QueryUtils";
import {
  useMergeParamWithWorkSpace,
  useSearchQuery,
} from "../../../../../../../../../types/workbench-hook";
import ToolExtensionTree from "../sub/ToolExtensionTree";
import { useGetCategoryList } from "../../../../sub/center-view/Transformer/hooks";
import ParamStateSlice from "@/app/[lang]/client/src/reducers/state/paramStateSlice";
import { PopoverItemProps } from "@/app/[lang]/client/src/components/ActionButton";

// console.log(Dot("1j62a","Do this in other time"))

export let InnerToolPanel = (props: PopoverItemProps): any => {
  let sq = useSearchQuery();
  let categoryList = useGetCategoryList()
  let fc = sq.ls || _.get(categoryList, "[0].id", "all");
  let activeOne = _.find(categoryList, (x) => x.Id == fc);
  let m_ws = useMergeParamWithWorkSpace();
  return (
    <FunctionalMenu_Panel
      loading={false}
      crtLeftNavId={fc}
      {...props}
      leftNavList={
        _.map(categoryList, (x) => {
          return {
            onClick: () => {
              FN_GetDispatch()(
                ParamStateSlice.actions.updateOneOfParamState({
                  ls: x.Id,
                })
              )
            },
            label: x.Label + `(${x.TotalCount})`,
            value: x.Id,
            pathname: m_ws({
              ls: x.Id,
            }),
          };
        }) || []
      }
      children={<ToolExtensionTree {...props} activeOne={activeOne} />}
    ></FunctionalMenu_Panel>
  );
};
