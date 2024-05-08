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
import _, { random } from "lodash";
import { useParams, useSearchParams } from "next/navigation";
import InnerHome from '../../../../home'
import { usePathname } from 'next/navigation';
import React, { } from "react";
import { PageProps, } from '@/app/__CORE__/meta/pages'
import getAuthInfo, { AuthInfo } from "@/app/__CORE__/containers/GrailLayoutWithUser/actions/handleAuthInfo";
import { Dot } from "../../../../__CORE__/utils/TranslationUtils";
import Link from "next/link";
import { NextUIProvider } from "@nextui-org/react";

import { getAppDevIcon, getAppKeywords } from "../../../../__CORE__/config/imgconfig";
import Tools, { CategorySearchProps, generateMetadata as toolMetaDataFn } from '@/app/[lang]/page'
import ToolPart from '../../src/parts/tools'
import AIPart from '../../src/parts/ai'
import UserPart from '../../src/parts/user'
import DocsPart from '../../src/parts/docs'
import ResourcesPart from '../../src/parts/resources'
import NavigatorPage from '../../src/parts/index'
import { ifnil } from "@/app/__CORE__/meta/fn";
import { getToolSubCategory } from "@/app/[lang]/client/src/impl/tools/d_subcategory";
import M from "./test";
export type AuthInfoProps = { authInfo: AuthInfo }
export type CombindSearchProps = PageProps<any, any>


export default async function Home(props: CategorySearchProps) {
    let { subCategory, category } = props.params
    if (_.isEmpty(subCategory)) {
        subCategory = getToolSubCategory()[0].id
        props = {
            ...props,
            params: {
                ...props.params,
                subCategory
            }
        }
    }
    let whatPartForChildren = <span>it is undefined so far</span>
    if (ifnil(category, '') == '' || category == 'tools') {
        whatPartForChildren = (
            <ToolPart {...props} />
        )
    } else if (category == 'docs') {
        whatPartForChildren = (
            <DocsPart {...props} />
        )
    } else if (category == 'resources') {
        whatPartForChildren = (
            <ResourcesPart {...props} />
        )
    } else if (category == 'ai') {
        whatPartForChildren = (
            <AIPart {...props} />
        )
    } else if (category == 'user') {
        whatPartForChildren = <UserPart {...props} />
    } else {
        whatPartForChildren = (
            <div>sorry, I have no idea for this category {category}</div>
        )
    }
    return (
        <main>
            <NavigatorPage {...props} innerContent={whatPartForChildren}></NavigatorPage>
        </main>
    )
}


export { generateMetadata } from '@/app/[lang]/page'