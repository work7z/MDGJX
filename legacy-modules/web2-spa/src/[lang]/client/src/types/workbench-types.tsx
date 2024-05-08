
// Date: Sun, 12 Nov 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
//
// This     program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import { Intent } from "@blueprintjs/core";
import { ToolHandler, ToolMetaInfo } from "../impl/tools/r_handler.tsx";
import Operation from "../impl/core/Operation.tsx";
import { ParamStateState, TabBottomType, TabLeftType, TabRightType, ToolConfigMap, ToolConfigMapVal, TrueFalseType } from "../reducers/state/paramStateSlice.tsx";
import { OpDetail } from "../impl/tools/s_tools.tsx";
import { PopoverItemProps } from "../components/ActionButton/index.tsx";
import { AppOpDetail } from "../impl/tools/d_meta.tsx";
import { OpButtonStyleProps } from "../pages/WorkBench/FixedLayout/Main/Center/sub/center-view/Transformer/index.tsx";
import { ExtensionVM, ToolCategory } from "../impl/purejs-types.tsx";

export * from './constants';
export type OnProcessFnType = (throttledType?: boolean) => void
export type CommonTransformerPassProp = {
  activeOpBtn: OpButtonStyleProps | undefined,
  otherOpBtns: OpButtonStyleProps[],
  subControlbarTools: AppOpDetail[],
  hideRelatedToolsBar: TrueFalseType,
  fn_isSidebarMenuOpModeNow: (commonPassProp: CommonTransformerPassProp) => any,
  onProcess: OnProcessFnType,
  loadingExtraOpList: boolean,
  crtSideMenuOperaId?: string,
  fn_updateToolConfig: (arg: Partial<ToolConfigMapVal>) => any,
  fn_switchToSideMenuExtraOp: (id: string) => any,
  needFullPageSupport: boolean,
  extId?: string;
  extVM?: ExtensionVM;
  crtToolCfg: ToolConfigMapVal | undefined;
  inputBigTextId: string;
  outputBigTextId: string;
  sessionId: string;
  toolHandler?: ToolHandler
  opDetails: OpDetail[]
  operaList?: Operation[],
  crtDefaultOpera?: Operation,
  originalCrtDefaultOpera?: Operation,
  crtSideMenuOpera?: Operation,
  metaInfo?: ToolMetaInfo,
  crtDefaultOperaId?: string,
};
export type PageQueryType = ParamStateState & {
  // tl?: TabLeftType;
  // tr?: TabRightType;
  // tb?: TabBottomType;
};

export type EachWorkSpace = {
  Label: string;
  Id: string;
  Path: string;
  ShowPath: string;
};

export type WorkSpaceStruct = {
  WorkSpaces: EachWorkSpace[];
};

/**
 {
    "payload": {
        "list": [
            {
                "Id": "all",
                "TotalCount": 87,
                "Label": null,
                "Label": "所有工具(87)",
                "SubCategories": []
            },
          ]
        ]
    }
  }
 */
export type FnPureToolDefinition = ToolCategory & {
  Id: string;
  Label: string;
};
export interface PassToolViewerProp {
  category: string | null | undefined;
  findCurrentPureItem: FnPureToolDefinition | null | undefined;
}

export const fn_GetAllPureMenuArr = (): FnPureToolDefinition[] => {
  return [];
};

export type SystemStatusBarItem = {
  disableLinkMode?: boolean;
  // define a struct for status bar
  text: string;
  icon?: string;
  onClick: () => void;
  active: boolean;
  disabled: boolean;
  tooltip: string;
  intent: Intent;
  id: string;
};
export type RefAlloProp = {
  ref_p: any;
  ref_left: any;
  latest_size?: number[];
};


export type ShowNavOrContentProp = {
  className?: string;
  showNavOrContent: "nav" | "content";
};

type FN_OnItemClicked = (e: EachTabPanelProp, isThisActive: boolean) => any;

export type PropGenTabs = ShowNavOrContentProp & {
  highlightIntent: string;
  activeId: string;
  onActiveIdChange: (arg: EachTabPanelProp) => any;
  onItemClicked?: FN_OnItemClicked;
  tabs: EachTabPanelProp[];
  whichPart: "left" | "right";
};

export type TabNavProp = ShowNavOrContentProp & {
  onItemClicked?: FN_OnItemClicked;
  ref_allo?: RefAlloProp;
};

export type SysTabPaneProp = {
  hasOpacityWhenUnfocus?: boolean;
  loading?: boolean;
  children: any;
  // left nav list
  leftNavList: MenuDropDownListItem[];
  crtLeftNavId: string;
  onCrtLeftNavIdChange?: (newNavId: string) => any;

  rightCtrls: JSX.Element;
};
export type EachTabPanelProp = {
  id: string;
  label: string;
  desc: string;
  icon?: string;
  released?: boolean;
  pathname?: string;
  panel?: (prop: any) => JSX.Element;
  // FIXME: above type should be PropGenTabsPanel
};

export type PropGenTabsPanel = {} & PopoverItemProps;

export type FixedMenuItem = {
  id: string;
  intent?: string;
  label?: string;
  onClick?: () => any;
  icon?: string;
  spliter?: boolean;
  disabled?: boolean;
  tooltip?: string;
  link?: string;
  routerLinkType?: boolean;
  children?: FixedMenuItem[];
};

export type FixedMenuBarProp = {
  leftPart?: JSX.Element;
  menus: FixedMenuItem[];
  requiredPageIcon?: boolean;
  rightShownContent?: string | JSX.Element;
};

export type FocusableProp = {
  focus: boolean;
  onFocus: (boolean) => any;
};

export type MenuDropDownListItem = {
  icon?: string;
  label: string;
  onClick?: () => any;
  pathname?: string;
  value: string;
};
