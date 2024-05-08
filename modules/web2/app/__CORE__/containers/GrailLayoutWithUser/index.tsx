// LafTools
// 
// Date: Thu, 22 Feb 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

'use server'
import Image from "next/image";
import type { Metadata, ResolvingMetadata } from "next";
import Head from 'next/head'
import { Props } from "next/script";
import { getWebsiteName } from "../../common/config";
import { TopNav } from "../TopNav";
import CenterPart from "../CenterPart";
import CardPanel from '../../components/CardPanel'
import NodeHorizontalBar from "../TabGroupHorizontalBar";
import _, { random } from "lodash";
import { redirect, useParams, useSearchParams } from "next/navigation";
import { usePathname } from 'next/navigation';
import React, { } from "react";
import { getCookie } from "cookies-next";
import getAuthInfo, { AuthInfo } from "./actions/handleAuthInfo";
import Footer from "../Footer";
// import { fn_getCardPanelForTelephoneFAQ } from "@/app/[lang]/register/page";
import { Dot } from "../../utils/TranslationUtils";
import LanguagePicker from "../LanguagePicker";
import { AuthInfoProps } from "@/app/[lang]/[category]/page";
import { CombindSearchProps } from "@/app/[lang]/[category]/opt/page";

export type Jsx_fn_type = (props: AuthInfoProps) => any;

export default async (props: {
    combindSearchProps: CombindSearchProps
} & { sidebarViewMode?: any, main: Jsx_fn_type, sidebar?: Jsx_fn_type, extraInSidebar?: Jsx_fn_type }) => {
    return ''
}

