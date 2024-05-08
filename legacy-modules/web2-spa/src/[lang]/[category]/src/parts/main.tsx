// LafTools
// 
// Date: Thu, 22 Feb 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc


import _ from "lodash";
import React, { } from "react";
import { Dot, getXHostname } from "@/__CORE__/utils/TranslationUtils";
import Link from "@/__CORE__/components/Link";
import { NavCategory as NavCategory } from "./nav/nav-category";
import { getAppDevIcon } from "@/__CORE__/config/imgconfig";
import { ClosableText } from "@/__CORE__/components/ClosableText";
import RedirectToOtherBanner from "@/__CORE__/components/RedirectToOtherBanner/index";
import { CSS_BG_DARK_1ST, border_clz, border_clz_top, row_pad_clz } from "@/__CORE__/meta/styles";
import LightDarkButton from "@/__CORE__/components/LightDarkButton";
import GitHubButton from "@/__CORE__/components/GitHubButton";
import SysBreadCrumbs from './cpt/cpt-breadcrumbs'
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
import { CategorySearchProps, CategoryTypeSearchDetail, getSearchDetailBySearchProps } from "@/[lang]/page";
import { URL_SUBCATEGORY_GO_PATH } from "@/__CORE__/meta/url";
import { fmtURL_ToolSubPage } from "@/__CORE__/meta/common";
import NavTop from "./nav/nav-top";
import NavSubCategory from './nav/nav-subcategory'
import NavBanner from "./nav/nav-banner";
import AlertUtils from "@/[lang]/client/src/utils/AlertUtils";
import { FN_REF_ID_SHARE_THIS_PAGE } from "../fnref";
import { ifnil } from "@/__CORE__/meta/fn";
export type LabelHrefType = {
    label: string | JSX.Element,
    id?: string,
    href?: string
}
export type NavigatorPassProp = CategorySearchProps & {
    innerContent: JSX.Element
}

export default (props: NavigatorPassProp) => {
    let { innerContent } = props;
    return (
        <div className={'  bg-slate-50  pb-10 ' + CSS_BG_DARK_1ST}>
            <div className={` app-minmax-size mx-[7px] `}>
                {innerContent}
            </div>
        </div>

    )
}