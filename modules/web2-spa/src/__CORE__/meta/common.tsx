// LafTools
// 
// Date: Wed, 6 Mar 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import { fmtURL_Client } from "../utils/cRouteUtils";
import { fmtURL_Server } from "../utils/routeUtils";
import { URL_TOOL_CATEGORY } from "./url";


export type LafPathIDParams = {
    locale: string,
    category?: string,
    subCategory?: string,
    id?: string
}

export * from "@/[lang]/client/src/impl/tools/d_portal";


export let fmtURL_Category = (x: string[]) => {
    return fmtURL_Server(x)
}

export let fmtURL_ToolSubPage = (x: string[]) => {
    return fmtURL_Category([URL_TOOL_CATEGORY, ...x])
}


export type SystemConfig = {
    database: {
        link: string
    },
    sms: {
        appId: string,
        secretId: string,
        secretKey: string
    }
}


export type PageProps<T, K> = {
    params: T,
    searchParams: K
}