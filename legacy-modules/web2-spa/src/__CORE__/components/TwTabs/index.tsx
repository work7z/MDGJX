// LafTools
// 
// Date: Thu, 22 Feb 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

'use client'

import React from 'react'
import _ from 'lodash'
import { useParams, usePathname } from '@/__CORE__/script/preline-init'


export default (props: {
    tabs: { label: string, value: string }[],
    activeId?: string,
    paramName: string
}) => {
    let pathname = usePathname()
    let p = useParams()
    let { tabs } = props;
    let pactiveId = props.activeId || _.get(tabs, '0.value')
    return <>
        <div className="flex">
            <div className="flex bg-gray-100 hover:bg-gray-200 rounded-lg transition p-1 dark:bg-gray-700 dark:hover:bg-gray-600">
                <nav className="flex space-x-2" aria-label="Tabs" role="tablist">
                    {
                        tabs.map(x => {
                            return <a href={`${pathname}?${props.paramName
                                }=${x.value
                                }`}>
                                <button type="button" className={
                                    pactiveId == x.value ? `
                                  hs-tab-active:bg-white hs-tab-active:text-gray-700 hs-tab-active:dark:bg-gray-800 hs-tab-active:dark:text-gray-400 dark:hs-tab-active:bg-gray-800 py-3 px-4 inline-flex items-center gap-x-2 bg-transparent text-sm text-gray-500 hover:text-gray-700 font-medium rounded-lg hover:hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:text-white active
                                  `:

                                        ` hs-tab-active:bg-white hs-tab-active:text-gray-700 hs-tab-active:dark:bg-gray-800 hs-tab-active:dark:text-gray-400 dark:hs-tab-active:bg-gray-800 py-3 px-4 inline-flex items-center gap-x-2 bg-transparent text-sm text-gray-500 hover:text-gray-700 font-medium rounded-lg hover:hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:text-white `


                                } id={`segment-item-${x.value}`} data-hs-tab={`#${x.value}`} aria-controls={x.value} role="tab">
                                    {x.label}
                                </button>
                            </a>
                        })
                    }
                </nav>
            </div>
        </div>
    </>
}
