
import { Dot } from '@/app/[lang]/client/src/utils/cTranslationUtils';
import { loadDOT } from '@/app/__CORE__/utils/i18n-for-load';
import React, { useEffect } from 'react';
let a = loadDOT("BndmTuDXy")
export default (props: { disabled?: boolean, name: string, defaultValue?: string, onChange?: (e: string) => any }) => {
    a()

    let [value, setValue] = React.useState('')
    useEffect(() => {
        setValue(props.defaultValue || localStorage.getItem(props.name) || '')
    }, [])

    return (
        <div className=''>
            <label htmlFor="hs-leading-icon" className="block text-sm font-medium mb-2 dark:text-white">{Dot("-YjLGS", "Telephone Number")}</label>
            <div className="relative">
                <input
                    disabled={props.disabled}
                    value={value} onChange={e => {
                        setValue(e.target.value)
                        props.onChange && props.onChange(e.target.value)
                        localStorage.setItem(props.name, e.target.value)
                    }}
                    name={props.name} type="number" id="hs-leading-icon" className="py-3 px-4 ps-11 block w-full border-gray-200 border-[1px] shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder={Dot("VzKInd", "Enter telephone number")} />
                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                    <svg className="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                    </svg>
                    {/* <svg className="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg> */}
                </div>
            </div>
        </div>
    )
}