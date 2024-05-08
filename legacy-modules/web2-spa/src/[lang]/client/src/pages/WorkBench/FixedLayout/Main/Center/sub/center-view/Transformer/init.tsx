// LafTools
// 
// Date: Fri, 19 Jan 2024
// Author: Ryan Laf <get>
// Description: 
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import { ExtensionAction, ToolDefaultOutputType } from "../../../../../../../../types/purejs-types-READ_ONLY";

export let getInitValueForRuntimeStatus = (): ToolDefaultOutputType => {
  return {
    latestViewPanelId: "tools",
    toolTabIndex: "tools",
    collapseConfig: false,
    collapseOutput: false,
    ignoreEmptyStr: "true",
    autoRun: "true"
  }
}