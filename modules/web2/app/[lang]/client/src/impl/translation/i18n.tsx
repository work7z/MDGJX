// LafTools
// 
// Date: Wed, 17 Jan 2024
// Author: LafTools Team - FX <work7z@outlook.com>
// LafTools Team - Ubuntu <work7z@outlook.com>
// Description: 
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import { I18nItem } from "@/app/__CORE__/config/i18n";
import { Dot } from "@/app/[lang]/client/src/utils/cTranslationUtils";
import { EachLang, FileValueMatcher } from "../purejs-types";
import { fn_Geti18n } from "../../i18n-pure";
export default (): EachLang[] => {
  let i18nItems = fn_Geti18n(Dot);

  let langList: EachLang[] = i18nItems.map((x: I18nItem) => {
    return {
      LabelInEnglish: x.LabelInEnglish,
      Label: x.Label + "",
      LabelByLang: x.LabelByLang,
      Value: x.Value
    } satisfies EachLang
    // x.LabelInEnglish = x.Label[1];
    // return x;
  });

  return langList;
}
