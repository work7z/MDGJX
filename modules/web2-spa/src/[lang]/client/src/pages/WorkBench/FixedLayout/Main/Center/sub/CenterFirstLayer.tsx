
// Date: Thu, 16 Nov 2023
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
import { APPINFOJSON, delayFN } from "../../../../../../nocycle";

import React, { useEffect, useMemo, useRef } from "react";
import ReactDOM from "react-dom";
import gutils from "../../../../../../utils/GlobalUtils";
import { logutils } from "../../../../../../utils/LogUtils";
import _ from "lodash";
import {
  withRouter,
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  Redirect,
} from "react-router-dom";
import "allotment/dist/style.css";
import { Allotment, AllotmentHandle } from "allotment";
import exportUtils from "../../../../../../utils/ExportUtils";
import { FunctionalMenu } from "../nav/functional";
import { SidebarMenu } from "../nav/sidebar/Biz_SidebarMenu";
import BottomNavView from "../nav/bottom";
import layoutSlice from "../../../../../../reducers/layoutSlice";
import { InnerCenterView } from "./CenterSecondaryLayer";
import ResizeUtils from "../../../../../../utils/ResizeUtils";
const snapMin = 100;

export let REF_mainstage: {
  inst_ltr: AllotmentHandle | null;
  inst_ttm: AllotmentHandle | null;
} = {
  inst_ltr: null,
  inst_ttm: null,
};
let runOnceForMainStage = {
  ltr: _.once(() => {
    setTimeout(() => {
      REF_mainstage.inst_ltr && REF_mainstage.inst_ltr.reset();
    }, 0);
  }),
  ttm: _.once(() => {
    setTimeout(() => {
      REF_mainstage.inst_ttm && REF_mainstage.inst_ttm.reset();
    }, 0);
  }),
};
gutils.ExposureIt("REF_mainstage", REF_mainstage, true);

export let MainStage = (props: { className: string }) => {
  let hist = useHistory();

  let refMountCountRef = useRef({
    mountCount: 0,
  })

  let v = exportUtils.useSelector((v) => {
    return {
      // show
      left_hide: v.layout.menuHide.left,
      right_hide: v.layout.menuHide.right,
      bottom_hide: v.layout.menuHide.bottom,
      // size
      left_size: v.layout.menuSize.left,
      middle_size: v.layout.menuSize.middle,
      right_size: v.layout.menuSize.right,
      bottom_size: v.layout.menuSize.bottom,
    };
  });

  let dis = exportUtils.dispatch();

  let fn_syncSizes = {
    sync_Vertical: _.throttle((size) => {
      dis(layoutSlice.actions.updateMenuRecord({ menu: "ttm", record: size }));
    }, 100),

    sync_Horizontal: _.throttle((size) => {
      dis(layoutSlice.actions.updateMenuRecord({ menu: "ltr", record: size }));
      // left
      if (v.left_hide && size[0] > 0) {
        dis(
          layoutSlice.actions.updateMenuHide({
            menu: "left",
            hide: false,
          })
        );
      } else if (!v.left_hide && size[0] == 0) {
        dis(
          layoutSlice.actions.updateMenuHide({
            menu: "left",
            hide: true,
          })
        );
      }
      // right
      if (v.right_hide && size[2] > 0) {
        dis(
          layoutSlice.actions.updateMenuHide({
            menu: "right",
            hide: false,
          })
        );
      } else if (!v.right_hide && size[2] == 0) {
        dis(
          layoutSlice.actions.updateMenuHide({
            menu: "right",
            hide: true,
          })
        );
      }
    }, 200),
  };

  return (
    <div className={props.className}>
      <Allotment
        vertical
        ref={(e) => {
          // REF_mainstage.inst_ttm = e;
          // refMountCountRef.current.mountCount++
          // if (refMountCountRef.current.mountCount == 1) {
          // runOnceForMainStage.ttm();
          // }
        }}
        onChange={(size) => {
          logutils.debug("top bottom: size", size);
          fn_syncSizes.sync_Vertical(size);
          ResizeUtils.trigger()
        }}
      >
        <Allotment.Pane>
          <div className="w-full h-full">
            <Allotment
              ref={(e) => {
                gutils.ExposureIt("REF_mainstage", REF_mainstage, true);
                REF_mainstage.inst_ltr = e;
                runOnceForMainStage.ltr();
              }}
              onChange={(size) => {
                logutils.debug("size", size);
                fn_syncSizes.sync_Horizontal(size);
                ResizeUtils.trigger()
              }}
            >
              <Allotment.Pane
                preferredSize={v.left_size}
                visible={!v.left_hide}
                snap
                minSize={snapMin}
              >
                <FunctionalMenu
                  showNavOrContent="content"
                  className="w-full"
                ></FunctionalMenu>
              </Allotment.Pane>
              <Allotment.Pane preferredSize={v.middle_size}>
                <InnerCenterView></InnerCenterView>
              </Allotment.Pane>
              <Allotment.Pane
                visible={!v.right_hide}
                preferredSize={v.right_size}
                snap
                minSize={snapMin}
              >
                <SidebarMenu
                  showNavOrContent="content"
                  className="w-full"
                ></SidebarMenu>
              </Allotment.Pane>
            </Allotment>
          </div>
        </Allotment.Pane>
        <Allotment.Pane
          visible={!v.bottom_hide}
          preferredSize={v.bottom_size}
          snap
          minSize={snapMin}
        >
          <BottomNavView />
        </Allotment.Pane>
      </Allotment>
    </div>
  );
};
