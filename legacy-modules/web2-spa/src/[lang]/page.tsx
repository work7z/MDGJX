



import _, { random } from "lodash";

import React, { } from "react";
import { PageProps, PortalDefinitionType, TopMainCategoryNavList } from '@/__CORE__/meta/pages'
import { Dot, isChineseByXLocal } from "../__CORE__/utils/TranslationUtils";
import Link from "@/__CORE__/components/Link";

import { getAppDevIcon, getAppKeywords } from "../__CORE__/config/imgconfig";

import SubCategoryPage from '@/[lang]/[category]/page'
import { getCategoryList as getCategoryList, PortalDefinitionTbabGroup } from "./[category]/types";
import { ifnil } from "../__CORE__/meta/fn";
import { isDevEnv } from "../__CORE__/share-spa/env";
import { CategoryType, getSubCategoryByProps } from "./client/src/impl/tools/d_subcategory";
import { Metadata } from "@/layout";

export type CategorySearchProps = PageProps<{
    subCategory: string,
    category: CategoryType,
    id: string
}, {}>;
export default function Home(props: CategorySearchProps) {
    return <SubCategoryPage {...props} />
}

export let notFound = () => {
    console.error('not found')
    // TODO: not found
    throw new Error('not found')
}
export type CategoryTypeSearchDetail = {
    searchToolItem: PortalDefinitionTbabGroup | undefined,
    targetSubCategory: PortalDefinitionType | undefined,
    topCategoryNavItem: TopMainCategoryNavList | undefined
}
export let getSearchDetailBySearchProps = (props: CategorySearchProps): CategoryTypeSearchDetail | null => {
    let topCategoryNavList = getCategoryList()
    let topCategoryNavItem = topCategoryNavList.find(x => x.id == props.params.category)
    if (_.isNil(topCategoryNavItem)) {
        topCategoryNavItem = topCategoryNavList[0]
    }
    let subCategory = props.params.subCategory;
    let toolsPortalDefinitons = getSubCategoryByProps(props)
    if (_.isEmpty(subCategory)) {
        if (toolsPortalDefinitons.length == 0 && !isDevEnv()) {
            notFound()
        } else {
            subCategory = toolsPortalDefinitons[0].id
        }
    }
    let targetSubCategory = toolsPortalDefinitons.find(x => x.id == subCategory)
    if (!targetSubCategory) {
        if (toolsPortalDefinitons) {
            targetSubCategory = toolsPortalDefinitons[0]
        } else {
            notFound()
        }
    }

    let searchToolId = props.params.id;
    if (!searchToolId) {
        if (!targetSubCategory) {
            notFound()
        } else {
            if (!targetSubCategory.subTabs || targetSubCategory.subTabs?.length == 0) {
                notFound()
            } else {
                searchToolId = targetSubCategory.subTabs![0].id
            }
        }
    }
    let searchToolItem = targetSubCategory && (targetSubCategory.subTabs || []).find(x => x.id == searchToolId)
    if (!searchToolItem) {
        notFound()
    }
    return {
        searchToolItem,
        targetSubCategory,
        topCategoryNavItem,
    }
}



export let generateMetadata = async function (props: CategorySearchProps): Promise<Metadata> {
    // fn
    let fn = (obj: Partial<Metadata>) => {
        return _.merge({
            icons: [
                '/icon.png'
            ],
            title: Dot("title-laftools", "LafTools - The Leading All-In-One ToolBox for Programmers"),
            description: Dot("iZXig7E2JF", "LafTools offers a comprehensive suite of development utilities including codecs, formatters, image processing tools, and computer resource management solutions. Designed to streamline and enhance your development workflow, LafTools is your go-to resource for efficient, high-quality software development."),
            keywords: getAppKeywords(),
        } satisfies Metadata, obj)
    };
    let result = fn({})
    let title: string[] = [];

    if (ifnil(props.params.category, 'tools') == 'tools') {
        let item = getSearchDetailBySearchProps(props)
        if (!item) {
            return result
        }
        let { searchToolItem, targetSubCategory, topCategoryNavItem } = item;
        if (!searchToolItem || !targetSubCategory || !topCategoryNavItem) {
            return result
        }

        // title push
        targetSubCategory && targetSubCategory?.seoTitle && title.push(targetSubCategory?.seoTitle)
        title.push(Dot("laftoolstitle", "Free Online LafTools"))
        title.push(searchToolItem.label + " - " + targetSubCategory.label)
        // keywords
        result.keywords = (targetSubCategory?.seoKeywords ? [
            ...(targetSubCategory?.subTabs || []).map(x => x.label || 'N/A'),
            ...targetSubCategory?.seoKeywords,
        ] : []) || []
        result.title = (
            title.reverse().join(" | ")
        )
        if (isCensorShipForWebsiteMode()) {
            result.title = 'LafTools程序员工具箱'
        }
        return result;
    } else {
        return result;
    }
}

export let isCensorShipForWebsiteMode = () => {
    return false && isChineseByXLocal();
}

export type { AuthInfoProps } from './[category]/page'