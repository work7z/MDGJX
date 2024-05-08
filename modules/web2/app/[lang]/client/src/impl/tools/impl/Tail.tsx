// LafTools
// 
// Date: Wed, 13 Mar 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import { Dot } from "@/app/[lang]/client/src/utils/cTranslationUtils.tsx";
import Operation from "../../core/Operation.tsx";
import fn from "./conversion/Tail.tsx";
import { ToolHandler, ToolMetaInfo } from "../r_handler.tsx";
import { AppOpFnMapTypeKeys } from "../g_optlist.tsx";

export default class MeHandler extends ToolHandler {
  getMetaInfo(): ToolMetaInfo {
    return {
      hideCodePanel: true,
      description: Dot(
        "aVjps8d6V",
        "Displays the last part of a file or text."
      ),
    }
  }

  getOperationsByName(): AppOpFnMapTypeKeys[] {
    return (
      [
        "Tail",
      ]
    )
  }
}