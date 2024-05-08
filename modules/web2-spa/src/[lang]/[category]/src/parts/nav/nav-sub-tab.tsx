// LafTools
// 
// Date: Mon, 11 Mar 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc


import React from "react";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import Link from "@/__CORE__/components/Link";
import { Dot, getXSearchParams } from "@/__CORE__/utils/TranslationUtils";
import { PortalDefinitionTbabGroup, PortalDefinitionType, } from "@/[lang]/client/src/impl/tools/d_portal";
import { ToolProp } from "../tools";
import _ from "lodash";
import { fmtURL_ToolSubPage } from "@/[lang]/[category]/types";
import { URL_SUBCATEGORY_GO_PATH } from "@/__CORE__/meta/url";
import { CrtToolProp } from "../tools/main-part";
import { getSubCategoryByProps } from "@/[lang]/client/src/impl/tools/d_subcategory";
import { CSS_BG_COLOR_WHITE } from "@/__CORE__/meta/styles";
import { useListenMainDot } from "@/__CORE__/utils/i18n-for-dynamic-loadDOT";
export let getSubTabs = (props: CrtToolProp): PortalDefinitionTbabGroup[] => {
    useListenMainDot()

    let subCategory = props.params.subCategory
    let sp = {
        id: props.params.id
    }

    let subTabs: PortalDefinitionTbabGroup[] = [];
    let toolsPortalDefinitions = getSubCategoryByProps(props)
    toolsPortalDefinitions.forEach(x => {
        if (x.id == subCategory) {
            subTabs = _.take(x.subTabs || [], 7)
        }
    })
    let currentSubTabId = sp["id"]
    // if it's not empty and not included in subTabs, then set it to more
    if (!_.isEmpty(currentSubTabId)) {
        let found = false
        subTabs.every(x => {
            if (x.id == currentSubTabId) {
                found = true
            }
            return !found
        })
        if (!found) {
            currentSubTabId = 'more'
        }
    }

    subTabs = [
        ...subTabs,
        {
            id: 'more',
            label: Dot("HckK__LH2", 'More')
        }
    ]
    return subTabs;
}
export default function (props: CrtToolProp) {
    useListenMainDot()
    let subCategory = props.params.subCategory
    let sp = {
        id: props.params.id
    }
    let subTabs = getSubTabs(props)
    let currentSubTabId = sp["id"]
    // defaults to id
    if (_.isEmpty(currentSubTabId) && subTabs.length > 0) {
        currentSubTabId = subTabs[0].id
    }

    return (
        <div className={"flex w-full  flex-col " + CSS_BG_COLOR_WHITE}>
            <div className="border-b border-gray-200 dark:border-gray-700">

                <nav className="flex space-x-2 justify-center" aria-label="Tabs" role="tablist">
                    {
                        subTabs.map(x => {
                            let extraProps = {}
                            let isMore = x.id == 'more'
                            if (isMore) {
                                extraProps = {
                                    'data-navid': props.params.subCategory,
                                    'data-viewpos': 'right'
                                }
                            }
                            let Ele = isMore ? Link : Link
                            let children = <button type="button" className={
                                ((currentSubTabId) == x.id ? "active " : ' ') +
                                'hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:text-blue-500 '
                            } id="card-type-tab-item-2" data-hs-tab="#card-type-tab-2" aria-controls="card-type-tab-2" role="tab">
                                {x.label}
                            </button>
                            return isMore ? <span {...extraProps} key={x.id} className="inline-block">
                                {children}
                            </span> : <Ele  {...extraProps} key={x.id} href={isMore ? 'javascript:void(0);' : fmtURL_ToolSubPage([URL_SUBCATEGORY_GO_PATH, subCategory, '' + x.id])}>
                                {children}
                            </Ele>
                        })
                    }
                </nav>
            </div>

        </div >
    );
}