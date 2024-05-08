// LafTools
// 
// Date: Sat, 27 Jan 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import { loadDOT } from "@/[lang]/client/src/reducers/systemSlice";
import { Dot } from "@/[lang]/client/src/utils/cTranslationUtils";
import CommonMinify from "./CommonMinify";
import sameFAQs from "./XMLBeautify";

import { FAQItem } from "./types";
import React from "react";

loadDOT("Wa61-ZCLs")

export default (): FAQItem[] => {
    return [
        ...CommonMinify(),
        ...sameFAQs()
    ]
}