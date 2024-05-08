// LafTools
// 
// Date: Mon, 22 Jan 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import _ from "lodash";
import { ExtensionVM } from "@/app/[lang]/client/src/types/purejs-types-READ_ONLY.ts";
import gutils from "@/app/[lang]/client/src/utils//GlobalUtils.tsx";
import Operation from "../core/Operation.tsx";
// import Chef from "./core/Chef.mjs";
import Utils from "../core/Utils.mjs";
import setupApp from "../setupApp.ts";
import DishBigNumber from "../core/dishTypes/DishBigNumber.mjs";
import Chef from "../core/Chef.mjs";
import { Dot } from "../../utils/cTranslationUtils.tsx";
// import ToBase64 from "./core/impl/ToBase64.js";
setupApp();

export type ProcessReturnType = {
  result: string;
  error?: string;
};

export type RecipeConfig = { op: Operation, args: string[] }

let LibIndex = {
  process: async (
    originalValue: string,
    param: {
      recipeConfigs: RecipeConfig[];
      extVM: ExtensionVM;
      extId: string;
    },
  ): Promise<ProcessReturnType> => {
    try {


      let inputValue: string = originalValue
      let recipeConfig: RecipeConfig[] = param.recipeConfigs

      const chef = new Chef();
      const result = await chef.bake(
        inputValue,
        recipeConfig,
        { returnType: "string" }
      );

      if (result.error) {
        return {
          result: "",
          error: result.error.displayStr
        }
      } else {
        return {
          result: result.result,
        }
      }


    } catch (e) {
      console.log("err", e);
      return {
        result: "",
        error: _.toString(gutils.getErrMsg(e)),
      };
    }
  },
};

export default LibIndex;
