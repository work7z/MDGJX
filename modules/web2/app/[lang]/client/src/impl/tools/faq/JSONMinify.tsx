// LafTools
// 
// Date: Sat, 27 Jan 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import { loadDOT } from "@/app/[lang]/client/src/reducers/systemSlice";
import { Dot } from "@/app/[lang]/client/src/utils/cTranslationUtils";
import CommonMinify from "./CommonMinify";
import sameFAQs from "./JSONBeautify";

import { FAQItem } from "./types";
import React from "react";

loadDOT("mvsT7ts_V")

export default (): FAQItem[] => {
    return [
        ...CommonMinify(),
        ...sameFAQs()
    ]
}