// LafTools
// 
// Date: Thu, 22 Feb 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc


import _ from "lodash";
import React, { } from "react";
import { Dot, getXHostname } from "@/app/__CORE__/utils/TranslationUtils";
import Link from "next/link";
import { NavCategory as NavCategory } from "./nav/nav-category";
import { getAppDevIcon } from "@/app/__CORE__/config/imgconfig";
import { ClosableText } from "@/app/__CORE__/components/ClosableText";
import RedirectToOtherBanner from "@/app/__CORE__/components/RedirectToOtherBanner/index";
import { CSS_BG_COLOR_WHITE, border_clz, border_clz_top, light_border_clz_all, light_border_clz_all_no_define_border, row_pad_clz } from "@/app/__CORE__/meta/styles";
import LightDarkButton from "@/app/__CORE__/components/LightDarkButton";
import GitHubButton from "@/app/__CORE__/components/GitHubButton";
import SysBreadCrumbs from './cpt/cpt-breadcrumbs'
// import {

// } from '../../../../../../types'
import { GitHubRepoIssueLink } from "@/app/__CORE__/meta/constants";
import Footer from "@/app/__CORE__/containers/Footer";
import PossiblePathname from "@/app/__CORE__/components/PossiblePathname";
import {
    getCategoryList as getCategoryList,
    fn_rightNav,

    fn_rightCategoryArr

} from "@/app/[lang]/client/src/impl/tools/d_portal";
import { CategorySearchProps } from "@/app/[lang]/page";
import { URL_SUBCATEGORY_GO_PATH } from "@/app/__CORE__/meta/url";
import { fmtURL_ToolSubPage } from "@/app/__CORE__/meta/common";
import NavTop from "./nav/nav-top";
import NavSubCategory from './nav/nav-subcategory'
import NavBanner from "./nav/nav-banner";
import Main from "./main";
import Sidebar from "./sidebar";
import './index.scss'
import ClientCollapseBtn from "./sidebar/client-collapse-btn";
export type LabelHrefType = {
    refId?: string;
    label: string | JSX.Element,
    id?: string,
    href?: string
}
export type NavigatorPassProp = CategorySearchProps & {
    innerContent: JSX.Element
}

export default (props: NavigatorPassProp) => {
    let category = props.params.category || 'tools'
    return <div className={'category-' + category}>
        <div className="w-full h-full flex flex-row  " id={'partswrapper'}>
            <div style={{
                // width: leftWidth
            }} className={"fixed left-part left-0 top-0  transition-all duration-75 " + ' shadow-md z-50  h-screen'}>
                <Sidebar {...props} />
            </div>
            <div className="flex-1 right-part h-screen   duration-300 transition-all" style={{
                // marginLeft: leftWidth
            }}>
                <div className="sticky top-0  z-40">
                    <NavTop {...props} />
                    <RedirectToOtherBanner optionalText=""></RedirectToOtherBanner>
                    <NavSubCategory {...props}></NavSubCategory>
                </div>
                {/* <NavBanner {...props} /> */}
                <Main {...props} />
                <Footer />
            </div>
        </div>
        <div className={"fixed left-0 bottom-0 w-[39px] h-[39px] " + CSS_BG_COLOR_WHITE + ' opacity-80 duration-100 transition-all hover:opacity-100 floatbtnview ' + light_border_clz_all}>
            <ClientCollapseBtn />
        </div>
    </div>
}