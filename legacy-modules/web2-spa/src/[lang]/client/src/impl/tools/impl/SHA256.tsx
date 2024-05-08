// LafTools
// 
// Date: Wed, 13 Mar 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import { Dot } from "@/[lang]/client/src/utils/cTranslationUtils.tsx";
import Operation from "../../core/Operation.tsx";
import fn from "./conversion/SHA3.tsx";
import { ToolHandler, ToolMetaInfo } from "../r_handler.tsx";
import { AppOpFnMapTypeKeys } from "../g_optlist.tsx";

export default class MeHandler extends ToolHandler {
  getMetaInfo(): ToolMetaInfo {
    return {
      hideCodePanel: true,
      description: Dot(
        "N8_QO8jAt",
        "Generates a SHA-3 hash from a text. SHA-3 is the latest member of the Secure Hash Algorithm family. It is not vulnerable to the same types of attacks as SHA-1 and SHA-2."
      ),
    }
  }

  getOperationsByName(): AppOpFnMapTypeKeys[] {
    return (
      [
        "SHA256",
      ]
    )
  }
}