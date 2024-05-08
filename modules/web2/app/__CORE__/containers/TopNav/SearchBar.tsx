// LafTools
// 
// Date: Thu, 22 Feb 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

'use client'

import { loadDOT } from "@/app/__CORE__/utils/i18n-for-load"
import { useState } from "react"
import { Dot } from "../../utils/cTranslationUtils"

let a = loadDOT("Q9l0BNwtm")

export default () => {
    a()
    let [value, setValue] = useState("")
    return <div className="text-sm ml-6">
        <input
            type="search"
            name="eq"
            value={value}
            onChange={(e) => {
                setValue(e.target.value)
            }}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50   focus:outline-none focus:ring-2 focus:ring-offset-2 dark:border-solarized-base03 focus:ring-indigo-500 dark:focus:ring-indigo-800 dark:bg-solarized-base03Dark dark:text-white "
            placeholder={Dot("_ncx4GSft", "Search Topics")}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    window.open(`https://www.baidu.com/s?wd=${encodeURIComponent(value + " site:elb3.com")}`)
                }
            }}
        >
        </input>
    </div>
}