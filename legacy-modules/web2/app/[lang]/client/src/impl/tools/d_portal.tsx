// LafTools
// 
// Date: Thu, 14 Mar 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc


import { LabelHrefType } from "@/app/[lang]/[category]/src/parts"
import { getAppDevIcon, getAppKeywords } from "@/app/__CORE__/config/imgconfig"
import { Dot } from "@/app/__CORE__/utils/TranslationUtils"
import { fmtURL_Server } from "@/app/__CORE__/utils/routeUtils"
import { Metadata } from "next"
import { cache } from "react"
import appToolInfoObj, { AppToolKeyType } from "./d_meta"
import COMMON_FN_REF from "./common_ref"
import { GitHubRepoIssueLink, GithubRepoLink } from "@/app/__CORE__/meta/constants"
import { URL_SUBCATEGORY_GO_PATH } from "@/app/__CORE__/meta/url"

COMMON_FN_REF.Dot = Dot

export type PortalDefinitionTbabGroup = {
    id: string, // sub tab id, will be used in the URL as path variable (:id)
    toolId?: AppToolKeyType, // it's coming from d_meta
    userTabId?: string, // user tab id, if it's a user tab
    aiTabId?: string, // ai tab id, if it's an ai tab
    resourceTabId?: string, // resource tab id, if it's a resource tab
    docsTabId?: string, // docs tab id, if it's a docs tab
    args?: any[], // arguments for the tool
    label?: string // overwrite the label from tool definition if needed
}
export type SEOMetaData = {
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string[]
}
export type PortalDefinitionType = SEOMetaData & {
    label: string,
    longLabel: string,
    id: string,
    secondBreadcrumbLabel?: string,
    subTabs?: PortalDefinitionTbabGroup[]
}



export type TopMainCategoryNavList = SEOMetaData & LabelHrefType & {
    ready?: boolean
}
export let getCategoryList = ((): TopMainCategoryNavList[] => {
    let leftNav: TopMainCategoryNavList[] = [
        {
            label: Dot("G2dvTUljF", "Tools"),
            ready: true,
            id: 'tools'
        },
        {
            label: Dot("n28g4di0L", "Docs"),
            id: 'docs'
        },
        {
            label: Dot("AvsWiJHLZ", "Resources"),
            id: 'resources',
        },
        // {
        //     label: Dot("ymyfghy1r", "Notes"),
        //     id: ('notes')
        // },
        {
            label: Dot("bWQunyU10", "AI Lab"),
            id: ('ai')
        },
    ].map(x => {
        if (!x.ready) {
            x.label = x.label + "*"
        }
        return x;
    })

    return leftNav
})
export let fn_rightNav = (): LabelHrefType[] => {
    let rightNav: LabelHrefType[] = [
        {
            label: Dot("str.login", "Login"),
            href: fmtURL_Server(['user', URL_SUBCATEGORY_GO_PATH, 'opt', 'sign-in'])
        },
        {
            label: Dot("str.register", "Register"),
            href: fmtURL_Server(['user', URL_SUBCATEGORY_GO_PATH, 'opt', 'sign-up'])
        },
        // {
        //     // label: Dot("str.usercentre", "User Centre"),
        //     // href: 'https://my.laftools.cn'
        //     label: Dot("lBOiJaOU1", "About {0}", 'LafTools'),
        //     href: 'https://github.com/work7z/LafTools'
        // },
    ].map(x => {
        return x
    })
    return rightNav
}

export let fn_rightCategoryArr = (): LabelHrefType[] => {
    let rightCategoryArr: LabelHrefType[] = [
        {
            label: Dot("download-local", "Free Hosting"),
            href: GithubRepoLink
        },
        // {
        //     href: fmtURL_Server(['/client']),
        //     label: Dot("YpFz_Ens_", "Easter Egg")
        // },
        {
            href: GitHubRepoIssueLink,
            label: Dot("YiyTj3bEz", "Help & Feedback")
        },
        // {
        //     label: Dot("str.remarks", "Favorites"),
        //     href: fmtURL_Server(['/']),
        // },
        // {
        //     label: Dot("str.mostused", "Frequently-Used"),
        //     href: fmtURL_Server(['/']),
        // }
    ]
    return rightCategoryArr
}

