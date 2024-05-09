// LafTools
// 
// Date: Thu, 14 Mar 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import Image from "next/image";
import type { Metadata, ResolvingMetadata } from "next";
import Head from 'next/head'
import { Props } from "next/script";
import { getWebsiteName } from "@/app/__CORE__/common/config";
import { TopNav } from "@/app/__CORE__/containers/TopNav";
import CenterPart from "@/app/__CORE__/containers/CenterPart";
import CardPanel from '@/app/__CORE__/components/CardPanel'
import NodeHorizontalBar from "@/app/__CORE__/containers/TabGroupHorizontalBar";
import _, { random } from "lodash";
import { useParams, useSearchParams } from "next/navigation";
import InnerHome from '../../home'
import { usePathname } from 'next/navigation';
import React, { } from "react";
import { PageProps } from '@/app/__CORE__/meta/pages'
import getAuthInfo, { AuthInfo } from "@/app/__CORE__/containers/GrailLayoutWithUser/actions/handleAuthInfo";
import { Dot } from "../../__CORE__/utils/TranslationUtils";
import Link from "next/link";
import { NextUIProvider } from "@nextui-org/react";

import { getAppDevIcon, getAppKeywords } from "../../__CORE__/config/imgconfig";
import { CategorySearchProps, generateMetadata as toolMetaDataFn } from "../page";
import EntryPage from './go/[subCategory]/page'
import VersionCheck from "@/app/__CORE__/containers/VersionCheck";
import { RegisterSlot } from "./src/fnrefmap";
export type AuthInfoProps = { authInfo: AuthInfo }

export let sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}


export default async function Home(props: CategorySearchProps) {
    return (
        <main>
            <EntryPage {...props} />
        </main>
    )
}


export { generateMetadata } from '@/app/[lang]/page'
