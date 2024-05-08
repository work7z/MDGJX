// LafTools
// 
// Date: Tue, 19 Mar 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import { fmtURL_Client } from "../utils/cRouteUtils"
import { URL_TOOL_CATEGORY } from "./url"


export let fmtURL_ToolSubPageClient = (x: string[]) => {
    return fmtURL_Client([URL_TOOL_CATEGORY, ...x])
}

