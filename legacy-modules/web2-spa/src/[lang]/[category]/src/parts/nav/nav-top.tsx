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
import { CSS_BG_DARK_1ST, border_clz, border_clz_top, row_pad_clz } from "@/__CORE__/meta/styles";
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

    fn_rightCategoryArr

} from "@/[lang]/client/src/impl/tools/d_portal";
import { CategorySearchProps } from "@/[lang]/page";
import { URL_SUBCATEGORY_GO_PATH } from "@/__CORE__/meta/url";
import { fmtURL_ToolSubPage } from "@/__CORE__/meta/common";
import { NavigatorPassProp } from "..";
import { useListenMainDot } from "@/__CORE__/utils/i18n-for-dynamic-loadDOT";

export default (props: NavigatorPassProp) => {
    useListenMainDot()
    let rightNav = fn_rightNav()
    let categoryList = getCategoryList()

    return <div className={
        border_clz + ' py-2  bg-white ' + CSS_BG_DARK_1ST
    } style={{
    }}>
        <div className={row_pad_clz + ' items-center justify-between flex flex-row '}>
            <NavCategory
                activeId={props.params.category || categoryList[0].id} {...props} nav={categoryList}></NavCategory>
            <NavCategory {...props} extraLeft={
                <div className="flex items-center">
                    <LightDarkButton />
                    <GitHubButton></GitHubButton>
                </div>
            } nav={rightNav} extraRight={
                ''
                // <div className="flex items-center">
                //     <CptWidePageToggle />
                // </div>
            }></NavCategory>
        </div>
    </div>
}