// LafTools
// 
// Date: Wed, 17 Jan 2024
// Author: LafTools Team - FX <work7z@outlook.com>
// LafTools Team - Ubuntu < work7z@outlook.com>
//   LafTools Team < work7z@outlook.com>
//     Ryan Laf<get>
// Description: 
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import { IconName } from "@blueprintjs/icons";
import { AppToolKeyType } from "./tools/d_meta";


export type NodeReq = {
  Lang: string;
  Id: string;
  Type: string;
  InputValue: any;
};

export type InputOutputEditorLang = {
  inputLang: string;
  outputLang: string;
}
export type FileValueMatcher = {
  Name: string;
  Value: any;
};

export type EachLang = {
  LabelInEnglish?: string;
  Label: string;
  LabelByLang?: string;
  Value: string;
};

/**
 * RuntimeSlice, contains below status
 * 1. Collapse or not
 * 2. Translation Selector
 * 3. Sessions and Related Config
 */
export type Val_ToolTabIndex = "output" | "tools" | "wiki" | "code" | "faq" | "moreopt";
export type ToolDefaultOutputType = {
  // key refers to sessionId
  collapseOutput?: boolean;
  activeActionId?: string;
  collapseConfig?: boolean;
  latestViewPanelId?: string;
  toolTabIndex?: Val_ToolTabIndex;
  defaultOperationId?: string;
  autoRun?: string;
  ignoreEmptyStr?: string;
  // process status
  processError?: string;
  processText?: string;
  processOK?: boolean;
  processing?: boolean;
};

export type ExtensionInfoFormatted = {
  Id: string;
  Label: string;
  Description: string;
};

export type FlushIdValuePair = {
  id: string;
  value: any;
};

export type NodeRes<T extends any> = {
  Id: string;
  Lang: string;
  Type: string;
  OutputValue: T;
};

export type TranslatePassArg = string;

export type ToolCategory = {
  Id: string;
  Label: TranslatePassArg;
  TotalCount?: number;
  SubCategories: ToolSubCategory[];
};

export type ToolChildrenSetByInit = {
  Id?: string;
  Label?: TranslatePassArg;
  LabelByInit?: string;
  Description?: TranslatePassArg;
  DescriptionByInit?: string;
};


export type ToolSubCategory = {
  Id: string;
  Label: TranslatePassArg;
  Icon: IconName;
  ChildrenIdSet: AppToolKeyType[]; // collect id only
};

export type ExtensionInfo = {
  Id: string;
  Label: TranslatePassArg;
  Description: TranslatePassArg;
  LabelByInit?: string;
  DescriptionByInit?: string;
};

export type ValueReq = {
  InputText: string;
  InputFile: string; // if it's not empty, then it means user specified a file to process
  ExtraConfigMap: Record<string, string>;
  ReturnAsFile: boolean; // by default false
};

export type ValueRes = {
  Err?: Error;
  OutputText: string;
  OutputFile: string;
};

export type ValueHandler = {
  ConvertText: (req: ValueReq) => ValueRes;
  ConvertFile: (req: ValueReq) => ValueRes;
};

export type ExtensionFuncMap = Record<string, ValueHandler>;

export type FormModel = Record<string, any>;

export type ExtensionAction = {
  Id: string;
  Label: TranslatePassArg;
  LabelByInit?: string;
  Tooltip?: TranslatePassArg;
  TooltipByInit?: string;
  CallFuncList: string[];
};

export type ExtensionVM = {
  Layout?: string;
  InitialFormModel?: FormModel;
  Info?: ExtensionInfo;
  Actions?: ExtensionAction[];
  DefaultRuntimeStatus?: ToolDefaultOutputType;
};

export type SubExtCategory = {
  Id: string;
  Label: TranslatePassArg;
  Icon: string;
  Children: ExtensionVM[];
};

// define a export type that input NodeReq and output NodeRes
export type JobProcesser = (req: NodeReq) => Promise<NodeRes<any> | null>;
