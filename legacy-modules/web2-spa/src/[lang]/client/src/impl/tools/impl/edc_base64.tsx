// LafTools
// 
// Date: Thu, 18 Jan 2024
// Author: LafTools Team - FX <work7z@outlook.com>
// Description: 
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import { Dot } from "@/[lang]/client/src/utils/cTranslationUtils";
import Operation from "../../core/Operation.tsx";
import FromBase64 from "./conversion/FromBase64";
import ToBase64 from "./conversion/ToBase64";

import { ToolHandler, ToolMetaInfo } from "../r_handler.tsx";
import { AppOpFnMapTypeKeys } from "../g_optlist.tsx";

export default class Base64Handler extends ToolHandler {
    getMetaInfo(): ToolMetaInfo {
        return {
            exampleType: "text-short",
            description: Dot(
                "0Ceqru",
                "Base64 is a notation for encoding arbitrary byte data using a restricted set of symbols that can be conveniently used by humans and processed by computers.",
            ),
        }
    }
    getOperationsByName(): AppOpFnMapTypeKeys[] {
        return (
            [
                "ToBase64",
                "FromBase64",
            ]
        )
    }
}