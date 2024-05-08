
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
  Spinner,
} from "@blueprintjs/core";
import {
  ColumnHeaderCell,
  Cell,
  Column,
  Table,
  Regions,
} from "@blueprintjs/table";
import { APPINFOJSON, delayFN } from "../nocycle";

import React, { useEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import gutils from "../utils/GlobalUtils";
import { logutils } from "../utils/LogUtils";
import _ from "lodash";
import RouteMem from "../types/router-mem";
import statusSlice from "../reducers/statusSlice";
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
import PageUtils from "../utils/PageUtils";
import TranslationUtils, { Dot } from "../utils/cTranslationUtils";
import "allotment/dist/style.css";
import { Allotment } from "allotment";
import exportUtils from "../utils/ExportUtils";
import forgeSlice, {
  ACTION_UPDATE_LANG_AND_APPLY_CHANGE,
} from "../reducers/forgeSlice";
import { ACTION_callRefreshAll } from "../reducers/systemSlice";
import {
  ID_FILES,
  ID_HISTORY as ID_MANUAL,
  ID_NOTES,
  ID_TOOLS,
} from "../types/constants";
import { type } from "jquery";
import apiSlice from "../reducers/apiSlice";
import { SysTabPaneProp } from "../types/workbench-types";
import Blink from "./Blink";
import '@/[lang]/client/src/pages/WorkBench/FixedLayout/Main/index.scss'
import { CSS_TEXT_ANCHOR_CSS } from "../types/constants";
import { ClientPortalContext } from "../pages/WorkBench/FixedLayout/Main/Center/sub/center-view/Transformer/types";

export let SysTabPane = (props: {} & SysTabPaneProp) => {
  // let [clickFocus, onClickFocus] = useState<boolean>(false);
  let [refId, onRefId] = useState(_.uniqueId(""));
  let hasMultipleList = _.size(props.leftNavList) != 1;
  let crtObjectIdx = _.chain(props.leftNavList)
    .findIndex((x) => x.value == props.crtLeftNavId)
    .value();
  if (crtObjectIdx == -1) {
    crtObjectIdx = 0;
  }
  let crtObject = props.leftNavList[crtObjectIdx];
  let activeId = crtObject?.value;
  let crtObjLabel: any = crtObject?.label;
  if (props.loading) {
    crtObjLabel = (
      <span>
        Loading
        <Blink max={2} min={5} />
      </span>
    );
  }
  let extraProps = crtObject?.icon
    ? {
      icon: crtObject?.icon as any,
    }
    : {};
  let jsx_btn = (
    <Button
      small
      className={
        "bp5-popover-dismiss  bp3-popover-dismiss " +
        (!hasMultipleList
          ? "hover:!bg-transparent hover:!cursor-default"
          : "")
      }
      minimal
      {...extraProps}
      text={crtObjLabel}
      rightIcon={hasMultipleList ? "caret-down" : undefined}
    ></Button>
  )


  const [showPop, onShowPop] = useState(false);

  const [focusCrt, onFocusCrt] = useState(false);

  // if the user click out of this container, then set clickFocus as false
  useEffect(() => {
    let fn = (e) => {
      let target = e.target;
      let isInside = false;
      while (target) {
        try {
          if (
            target.className &&
            // target.className.indexOf("sys-tab-pane-wp") > -1
            target.id == refId
          ) {
            isInside = true;
            break;
          }
          target = target.parentNode;
        } catch (e) {
          isInside = true;
          break;
        }
      }
      if (!isInside) {
        onFocusCrt(false);
      } else {
        onFocusCrt(true);
      }
    };
    document.body.addEventListener("click", fn);
    return () => {
      document.body.removeEventListener("click", fn);
    };
  }, []);

  let clientCtx = useContext(ClientPortalContext)

  return (
    <div
      className={
        ` ${focusCrt ? ` wp-focus-p ` : ""} ` + " sys-tab-pane-wp "
      }
      id={refId}
      onClick={() => { }}
    >
      <div className={`${false ? "wp-active" : ""} sys-tab-pane-wp-title`}>
        <div>
          {hasMultipleList ? (
            <Popover
              placement="bottom-start"
              captureDismiss={true}
              minimal
              canEscapeKeyClose
              interactionKind="click"
              shouldReturnFocusOnClose
              // usePortal={false}
              // isOpen={showPop}
              // enforceFocus={false}
              // onOpening={() => {
              //   onShowPop(true);
              // }}
              // onClosing={() => {
              //   onShowPop(false);
              // }}
              content={
                <Menu>
                  {props.leftNavList.map((x) => {
                    let isCrt = x.value == activeId;
                    let onclk = x.onClick ? x.onClick : (e) => {
                      // e.stopPropagation();
                      //
                    };
                    let menuItem = (
                      <MenuItem
                        key={x.value}
                        text={x.label}
                        onClick={onclk}
                        intent={isCrt ? "primary" : "none"}
                      />
                    );
                    // tailwindcss remove anchor style

                    return x.pathname && !clientCtx.portalMode ? (
                      <Link
                        key={x.label}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className={CSS_TEXT_ANCHOR_CSS}
                        to={x.pathname}
                      >
                        {menuItem}
                      </Link>
                    ) : (
                      menuItem
                    );
                  })}
                </Menu>
              }
            >
              {jsx_btn}
            </Popover>
          ) : (
            jsx_btn
          )}
        </div>
        <div>{props.rightCtrls}</div>
      </div>
      <div className="sys-tab-pane-wp-body">
        {props.children || "No Child Node"}
      </div>
    </div>
  );
};
