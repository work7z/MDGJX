// LafTools
// 
// Date: Sat, 16 Mar 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc



import _ from "lodash";
import React, { } from "react";
import { Dot, getXHostname } from "@/__CORE__/utils/TranslationUtils";
import Link from "@/__CORE__/components/Link";
import { NavCategory as NavCategory } from "../nav/nav-category";
import { getAppDevIcon } from "@/__CORE__/config/imgconfig";
import { ClosableText } from "@/__CORE__/components/ClosableText";
import RedirectToOtherBanner from "@/__CORE__/components/RedirectToOtherBanner/index";
import { CSS_BG_COLOR_WHITE, border_clz, border_clz_top, light_border_clz_all, row_pad_clz, tw } from "@/__CORE__/meta/styles";
import LightDarkButton from "@/__CORE__/components/LightDarkButton";
import GitHubButton from "@/__CORE__/components/GitHubButton";
import SysBreadCrumbs from '../cpt/cpt-breadcrumbs'
// import {

// } from '../../../../../../types'
import { GitHubRepoIssueLink } from "@/__CORE__/meta/constants";
import Footer from "@/__CORE__/containers/Footer";
import PossiblePathname from "@/__CORE__/components/PossiblePathname";
import {
    getCategoryList as getCategoryList,
    fn_rightNav,

    fn_rightCategoryArr,
    PortalDefinitionTbabGroup

} from "@/[lang]/client/src/impl/tools/d_portal";
import { CategorySearchProps } from "@/[lang]/page";
import { URL_SUBCATEGORY_GO_PATH } from "@/__CORE__/meta/url";
import { fmtURL_ToolSubPage } from "@/__CORE__/meta/common";
import { LabelHrefType, NavigatorPassProp } from "..";
import PreinitNavbind from "../js/preinit-navbind";
import { ifnil } from "@/__CORE__/meta/fn";
import { getCategoryParentTwClz, getSubCategoryByProps, getToolSubCategory } from "@/[lang]/client/src/impl/tools/d_subcategory";
import { useListenMainDot } from "@/__CORE__/utils/i18n-for-dynamic-loadDOT";

export default (props: NavigatorPassProp) => {
    useListenMainDot()
    let leftCategoryArr = getSubCategoryByProps(props)
    let rightCategoryArr = fn_rightCategoryArr()
    let subCategory = props.params.subCategory
    let currentSubTabId = props.params.id
    let category = props.params.category
    let parentClz = getCategoryParentTwClz(category)
    return (
        <div className={border_clz + parentClz}>
            <div className={row_pad_clz + ' flex-justify-between '}>
                <div>
                    {
                        leftCategoryArr.map(x => {
                            return <Link data-navid={x.id} href={fmtURL_ToolSubPage([URL_SUBCATEGORY_GO_PATH, x.id])} className={
                                " white-anchor-text anchor-text-in-category cursor-pointer   " + (
                                    x.id == subCategory ? ' active ' : ''
                                )
                            }>{x.label}({_.size(x.subTabs)})</Link>
                        })
                    }
                </div>
                <div className="flex flex-row items-center">
                    {
                        rightCategoryArr.map((x: LabelHrefType) => {
                            return <Link target='_blank' href={x.href + ""} className={" white-anchor-text anchor-text-in-category cursor-pointer "}>{x.label}</Link>
                        })
                    }
                </div>
            </div>
            {
                leftCategoryArr.map(x => {
                    return <div id={`navbindid-${x.id}`} style={{
                        display: 'none'
                    }} className={
                        'fixed z-50 '
                    }>
                        <OverlapSubTabsPanelView currentSubTabId={currentSubTabId} subTabs={x.subTabs} subCategoryId={x.id} />
                    </div>
                })
            }
            <PreinitNavbind />
        </div>

    )
}

export let OverlapSubTabsPanelView = (props: { currentSubTabId: string, subTabs: PortalDefinitionTbabGroup[] | undefined, subCategoryId: string }) => {
    let { subTabs } = props;
    return <div className={'w-[450px]  left-2 top-2  min-w-10 transition-all duration-75 shadow-xl rounded-sm p-2 ' + CSS_BG_COLOR_WHITE + ' ' + light_border_clz_all}>
        {(subTabs || []).map(xx => {
            return <a className={' text-xs black-anchor-text inline-block w-1/3 text-center rounded-sm  py-2 hover:bg-slate-200 dark:hover:bg-slate-600 ' + (
                xx.id == props.currentSubTabId ? ' bg-slate-200 dark:bg-slate-600 ' : ''
            )} href={fmtURL_ToolSubPage([URL_SUBCATEGORY_GO_PATH, props.subCategoryId, xx.id])}>{xx.label}</a>
        })}
    </div>
}