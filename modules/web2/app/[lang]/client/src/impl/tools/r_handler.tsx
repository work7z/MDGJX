// LafTools
// 
// Date: Thu, 18 Jan 2024
// Author: LafTools Team - FX <work7z@outlook.com>
// Description: 
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import Operation from "../core/Operation.tsx";
import { CodeImplMap } from "./code/types.tsx";
import { FAQItem } from "./faq/types.tsx";
import appToolInfoObj from "./d_meta.tsx";
import { AppOpFnMapTypeKeys } from "./g_optlist.tsx";
import _ from "lodash";

export type ShowExampleType = "text-short" | "text-medium" | "text-long" | "js-short" | "js-medium" | "css-short"


export type ToolMetaInfo = {
    hideCodePanel?: boolean;
    hideFAQPanel?: boolean;
    description: string;
    exampleType?: ShowExampleType
}

export abstract class ToolHandler {
    loadedOps: { [key in AppOpFnMapTypeKeys]?: Operation } = {}

    id: string = "";
    abstract getMetaInfo(): ToolMetaInfo;
    abstract getOperationsByName(): AppOpFnMapTypeKeys[]
    getOperations = (): Operation[] => {
        return _.values(this.loadedOps)
    }
    addOperation(name: string, nameFN: Operation) {
        this.loadedOps[name] = nameFN;
    }
    getFAQ = async (): Promise<() => FAQItem[]> => {
        let o = appToolInfoObj[this.id]
        if (!o.ImportFAQ) {
            return () => [];
        }
        let r = await o.ImportFAQ()
        let r2 = r.default
        return r2;
    }
    getCode = async (): Promise<() => CodeImplMap | null> => {
        let o = appToolInfoObj[this.id]
        if (!o.ImportCode) {
            return () => null;
        }
        let r = await o.ImportCode()
        let r2 = r.default
        return r2;
    }
}


export type ToolHandlerClass = typeof ToolHandler;