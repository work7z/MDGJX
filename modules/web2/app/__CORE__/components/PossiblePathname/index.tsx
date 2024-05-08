// LafTools
// 
// Date: Sun, 10 Mar 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

'use client'

import { border_clz } from "@/app/__CORE__/meta/styles"
import { useState } from "react"
import regionUtils from "../../utils/regionUtils"
import TranslationUtils, { Dot } from "../../utils/cTranslationUtils"


type ReturnType = [string, (value: string) => void]
export let useLocalStorage = (key: string, initialValue: string): ReturnType => {
    let [value, setValue] = useState(() => {
        let value = localStorage.getItem(key)
        if (value) {
            return value
        } else {
            return initialValue
        }
    })
    let setLocalStorageValue = (value: string) => {
        setValue(value)
        localStorage.setItem(key, value)
    }
    return [value, setLocalStorageValue]
}

export default (props) => {
    return Dot("bjaEuT-cU", "Hosted on {0}", location.hostname)
    // return regionUtils.getUSHosts()[0]
    // if (regionUtils.isCurrentUserPossibleChinese()) {
    //     return regionUtils.getCNHosts()[0]
    // } else {
    //     return regionUtils.getUSHosts()[0]
    // }
}