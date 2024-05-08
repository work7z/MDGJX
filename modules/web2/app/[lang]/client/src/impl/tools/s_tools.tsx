
// LafTools
// 
// Date: Fri, 22 Mar 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc


import _ from "lodash"
import { Dot } from "../../utils/cTranslationUtils"
import { AppOptFnMap } from "./g_optlist"
import { Intent } from "@blueprintjs/core"
import { tw } from "../../types/styles"
import { IconName } from "@blueprintjs/icons"
export type OpDetail = {
    id: string,
    twBgClz: string,
    sortType: number,
    twClz: string,
    intent: Intent,
    icon?: IconName,
    label: string,
    description: string
}
export let getAllOperationDetails = (): OpDetail[] => {
    let opDetails: OpDetail[] = []

    _.forEach(AppOptFnMap, (x, d, n) => {
        let xobj = x({ Dot: Dot })
        let whatIntent: Intent = 'none'
        let twClz = ''
        let twBgClz = ''
        let sortType = 99
        let xid = d;
        let lowerId = _.toLower(xid)
        let startsWithTo = xid.startsWith('To')
        if (startsWithTo) {
            sortType = 97
            whatIntent = 'success'
        } else if (lowerId.startsWith('from')) {
            sortType = 98
            whatIntent = 'warning'
        } else if (lowerId.indexOf("beautify") != -1 || lowerId.indexOf("format") != -1) {
            sortType = 96
            twClz = tw` !border-lime-700 dark:!border-lime-600 !text-lime-600 dark:!text-lime-500   `
            twBgClz = tw` !bg-lime-700 !text-white  `
        }

        opDetails.push({
            id: d,
            intent: whatIntent,
            twBgClz: twBgClz,
            twClz: twClz,
            sortType,
            label: xobj.optName || "N/A",
            description: xobj.optDescription
        })
    })
    // x.id.replace("From", "").replace("To", ""),
    return _.sortBy(opDetails, x => [x.sortType,])
}