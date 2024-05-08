
// Date: Wed, 15 Nov 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
// License: AGPLv3

import _ from "lodash";
import { FN_GetState } from "../nocycle";
import layoutSlice from "../reducers/layoutSlice";
import { REF_mainstage } from "../pages/WorkBench/FixedLayout/Main/Center/sub/CenterFirstLayer";

type MenuOpenCloseOper = {
  menuRecordKey: string;
  menuKey: string;
};

export function FN_ACTION_OpenMenu_ttm(arg: MenuOpenCloseOper): any {
  return async (dis) => {
    let mainStage = REF_mainstage.inst_ttm;
    let prevSize = FN_GetState().layout.menuRecord[arg.menuRecordKey + "_old"];
    dis(
      layoutSlice.actions.updateMenuHide({
        menu: arg.menuKey,
        hide: false,
      }),
    );
    if (prevSize) {
      setTimeout(() => {
        mainStage?.resize(prevSize as any);
      }, 0);
    }
  };
}

export function FN_ACTION_OpenMenu_ltr(arg: MenuOpenCloseOper): any {
  return async (dis) => {
    let mainStage_ltr = REF_mainstage.inst_ltr;
    let prevSize = FN_GetState().layout.menuRecord[arg.menuRecordKey + "_old"];
    dis(
      layoutSlice.actions.updateMenuHide({
        menu: arg.menuKey,
        hide: false,
      }),
    );
    if (prevSize) {
      setTimeout(() => {
        mainStage_ltr?.resize(prevSize as any);
      }, 0);
    }
  };
}

export function FN_ACTION_CloseMenu_ttm(arg: MenuOpenCloseOper): any {
  return async (dis) => {
    let mainStage = REF_mainstage.inst_ttm;
    let crtSize = FN_GetState().layout.menuRecord[arg.menuRecordKey];
    let newSize: number[] | null = null;
    if (!_.isEmpty(crtSize)) {
      if (arg.menuKey == "bottom") {
        newSize = [crtSize[0] + crtSize[1], 0];
      }
    }
    dis(
      layoutSlice.actions.updateMenuHide({
        menu: arg.menuKey,
        hide: true,
      }),
    );
    if (newSize != null) {
      setTimeout(() => {
        newSize && mainStage?.resize(newSize as any);
      }, 0);
    }
    dis(
      layoutSlice.actions.updateMenuRecord({
        menu: arg.menuRecordKey + "_old",
        record: crtSize,
      }),
    );
  };
}

export function FN_ACTION_CloseMenu_ltr(arg: MenuOpenCloseOper): any {
  return async (dis) => {
    let mainStage_ltr = REF_mainstage.inst_ltr;
    let crtSize = FN_GetState().layout.menuRecord[arg.menuRecordKey]; // e.g. ttm
    let newSize: number[] | null = null;
    if (!_.isEmpty(crtSize)) {
      if (arg.menuKey == "left") {
        newSize = [0, crtSize[0] + crtSize[1], crtSize[2]];
      } else if (arg.menuKey == "right") {
        newSize = [crtSize[0], crtSize[1] + crtSize[2], 0];
      }
      // if it's bottom, then ignore it
    }
    dis(
      layoutSlice.actions.updateMenuHide({
        menu: arg.menuKey,
        hide: true,
      }),
    );
    if (newSize != null) {
      setTimeout(() => {
        newSize && mainStage_ltr?.resize(newSize as any);
      }, 0);
    }
    dis(
      layoutSlice.actions.updateMenuRecord({
        menu: arg.menuRecordKey + "_old",
        record: crtSize,
      }),
    );
  };
}
