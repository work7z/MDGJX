// LafTools
// 
// Date: Fri, 1 Mar 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

'use server'

import mottoList from "@/__CORE__/config/motto"
import _ from "lodash"

export let getOneMotto = async (): Promise<string> => {
    let idx = _.random(0, mottoList.length - 1)
    return mottoList[idx]()
}