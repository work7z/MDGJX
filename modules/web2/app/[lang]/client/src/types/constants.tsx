
// Date: Fri, 29 Sep 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
// License: AGPLv3


import { TreeNodeInfo } from "@blueprintjs/core";
import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
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
  ButtonProps,
  CardList,
  Divider,
} from "@blueprintjs/core";

export * from './styles'

export const LafTools_HOME = "https://laftools.dev";
export const LafTools_DOC_HOME = `${LafTools_HOME}/documentation/view?id=welcome`;
export const SQ = "'";
export const DQ = '"';
export const AT = "`";

// by default, the first user is working with root permission
export const LAFTOOLS_DEFAULT_USERNAME = "root"

// concurrency 
export const KEY_CONCURRENCY_SYSTEM_INIT = "J9EXO";


// version
export const VER_FORGE_FORM = "v2023.10.05";

// url
export const URL_PREFIX_STATIC = "/static";
export const URL_PREFIX_LOCAL = "/api";

// CacheUtils need to be saved is

// zIndex
export const Z_INDEX_DIALOG = 9990;
export const Z_INDEX_CONFIRM = 9991;

export const URL_PREFIX_ONLINE_API = "/x-v2-api/api"
export const URL_LOGIN = "/login";
export const URL_WORKBENCH = "/main";
export const URL_ENTRY = "/entry";
export const URL_REDIRECT = "/redirect";
export const URL_WORKBENCH_WORKSPACE = URL_WORKBENCH;

export const ID_TOOLS = "tools";
export const ID_FILES = "files";
export const ID_AILah = "ai";
export const ID_NOTES = "notes";
export const ID_HISTORY = "history";
export const ID_RESOURCES = "resources";


export type InitForm = {
  Value: boolean;
};

export const CLZ_ROOT_DARK = `bp5-dark`;
export const CLZ_ROOT_LIGHT = `bp5-light bp5-bg-light`;
export const CLZ_SECOND_TEXT = "bp5-text-muted";
export const CLZ_SMALL_TEXT = "bp5-text-small";

export type IsOKType = PayloadAction<{ isOK: boolean }>;
export type IsLoadingType = PayloadAction<{ isLoading: boolean }>;
export type SendErrorAction = PayloadAction<{ e: Error }>;
export type TextValueAction = PayloadAction<{ value: string }>;
export type LangDefinition = { [key: string]: string };
export type LabelValuePair = { label: string; value: string }
export type PopoverButtonProp = ButtonProps & { overlay?: string };
export type MapKV = { [key: string]: any };

export type PromiseAction = PayloadAction<{
  id: string;
  fn: () => Promise<any>;
}>;

export type PayloadListData<T> = { payload: { list: T[] } };
export type PayloadValueData<T> = { payload: { value: T } };

export type TreeWrapInfo = {
  updateId?: string;
  nodes: TreeNodeInfo[];
};

export type LocalResponse = {};

export const LANG_ZH_CN = "zh_CN";
export const LANG_ZH_HK = "zh_HK";
export const LANG_EN_US = "en_US";

export interface ToolParamType {
  extId: string | null;
  category: string | null;
}
export type AnyMapType = { [key: string]: any };
