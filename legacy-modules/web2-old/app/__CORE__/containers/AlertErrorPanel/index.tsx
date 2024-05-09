// LafTools
// 
// Date: Thu, 22 Feb 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import { Dot } from "../../utils/cTranslationUtils"

export default (props: { noVCode?: boolean, errorMsg: string[] }) => {
    if (props.errorMsg.length === 0) return ''
    return (
        <div className="mb-4  w-[600px] mt-2 bg-red-50 border border-red-200 text-sm text-red-800 rounded-lg p-4 dark:bg-red-800/10 dark:border-red-900 dark:text-red-500" role="alert">
            <div className="flex">
                <div className="flex-shrink-0">
                    <svg className="flex-shrink-0 h-4 w-4 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg>
                </div>
                <div className="ms-4">
                    <h3 className="text-sm font-semibold">
                        {Dot("IugAFc4OT", "A problem has been occurred while submitting your data.")}
                    </h3>
                    <div className="mt-2 text-sm text-red-700 dark:text-red-400">
                        <ul className="list-disc space-y-1 ps-5">
                            {
                                props.errorMsg.map((x, d) => {
                                    return <li key={d}>
                                        {x}
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                    {
                        props.noVCode ? '' : (
                            <div className='text-xs mt-6'>
                                {Dot("ZaS8MP8cr", "Note: The verification code is refreshed, please adjust your form values and re-input the code to continue with.")}
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}