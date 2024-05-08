// LafTools
// 
// Date: Thu, 22 Feb 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

'use server'




import { getWebsiteName } from "../../common/config";
import { TopNav } from "../TopNav";
import CenterPart from "../CenterPart";
import CardPanel from '../../components/CardPanel'
import NodeHorizontalBar from "../TabGroupHorizontalBar";
import _, { random } from "lodash";

import React, { } from "react";
import getAuthInfo, { AuthInfo } from "./actions/handleAuthInfo";
import Footer from "../Footer";
// import { fn_getCardPanelForTelephoneFAQ } from "@/[lang]/register/page";
import { Dot } from "../../utils/TranslationUtils";
import LanguagePicker from "../LanguagePicker";
import { AuthInfoProps } from "@/[lang]/[category]/page";
import { CombindSearchProps } from "@/[lang]/[category]/opt/page";

export type Jsx_fn_type = (props: AuthInfoProps) => any;

export default async (props: {
    combindSearchProps: CombindSearchProps
} & { sidebarViewMode?: any, main: Jsx_fn_type, sidebar?: Jsx_fn_type, extraInSidebar?: Jsx_fn_type }) => {
    return ''
}

