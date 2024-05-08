// LafTools
// 
// Date: Fri, 23 Feb 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import Link from "@/__CORE__/components/Link"
import { LabelHrefType, NavigatorPassProp } from ".."
import { fmtURL_Server } from "@/__CORE__/utils/routeUtils"
import { nav_text_clz } from './constants'
import { useListenMainDot } from "@/__CORE__/utils/i18n-for-dynamic-loadDOT"
export let NavCategory = (props: NavigatorPassProp & {
    activeId?: string,
    nav: LabelHrefType[],
    extraLeft?: any
    extraRight?: any
}) => {
    useListenMainDot()
    let { nav } = props
    let leftNav = nav
    return <div className={' flex flex-row items-center  space-x-4 font-sm '}>
        {props.extraLeft}
        {
            leftNav.map(x => {
                if (x.refId) {
                    return <span data-refid={x.refId} className={nav_text_clz + ' hover:cursor-pointer  hover:underline'}>{x.label}</span>
                }
                return <Link data-refid={x.refId} href={x.href || fmtURL_Server([x.id || '']) || ''} className={
                    nav_text_clz}>{x.label}</Link>
            })
        }
        {props.extraRight}
    </div>
}