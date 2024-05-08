'use client'

import React, { useCallback, useEffect, useState } from 'react';
import _ from 'lodash';
import { loadDOT } from '@/__CORE__/utils/i18n-for-dynamic-loadDOT';
import { Dot } from '@/__CORE__/utils/cTranslationUtils';
let a = loadDOT("8O1oTYJ-Z")

export let checkIfStrOnlyHasAlphanumeric = (str: string) => {
    return /^[a-zA-Z0-9]*$/.test(str)
}

export default (props: { placeholder?: string, checkIfHas?: boolean, checkDuplicate?: boolean, name: string }) => {
    a()
    let [value, setValue] = React.useState('')
    useEffect(() => {
        setValue(localStorage.getItem(props.name) || '')
    }, [])
    let [loading, onLoading] = useState(false)
    let [hasThatName, setHasThatName] = React.useState(false)

    let fn_find = useCallback(_.throttle(async (v: string) => {
        // TODO: to be completed
        onLoading(true)
        // try {
        //     let user = await getUserInfoByUserAcctId(v)
        //     if (user) {
        //         setHasThatName(true)
        //     } else {
        //         setHasThatName(false)
        //     }
        // } finally {
        //     onLoading(false)
        // }
    }), [])

    useEffect(() => {
        fn_find(value)
    }, [value])

    let onlyAlphValue = checkIfStrOnlyHasAlphanumeric(value)
    console.log('onlyAlphValue', onlyAlphValue, value)

    return (
        <div className=''>
            <label htmlFor="hs-leading-icon" className="block text-sm font-medium mb-2 dark:text-white">{Dot("J0VEign6J", "Username")}</label>
            <div className="relative">
                <input value={value} onChange={e => {
                    setValue(e.target.value)
                    localStorage.setItem(props.name, e.target.value)
                }} name={props.name} type="text" id="hs-leading-icon" className={
                    `py-3 px-4 ps-11 block w-full  border-gray-200 border-[1px]  rounded-lg text-sm  focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 ${props.checkDuplicate && value != '' ? !hasThatName ? ' border-green-500 focus:!ring-green-500 ' : ' border-red-300 focus:ring-red-500 ' : ''}`
                } placeholder={props.placeholder || Dot("Vy1ZPV9iuPKIn", "Enter Username")} />
                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                    <svg className="flex-shrink-0 w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                </div>
            </div>
            <div className="text-right text-xs text-gray-400 mt-2" id="hs-input-helper-text">
                <div>
                    {props.checkDuplicate ? Dot("9D3kOlRJP", "Username is consisted of alphanumeric characters and should be unique.") : ''}
                </div>
                {/* <div>
                    {
                        props.checkIfHas && loading ? 'checking...' : props.checkIfHas && value != '' ? hasThatName ? <div className='text-green-500'>[{Dot("Ri2H3dkqwk", "Welcome back to the community")}]</div> : <div className='text-red-500'>[{Dot("qw3DtugPB", "Sorry, no such a user in system.")}]</div> : ''
                    }
                </div>
                <div>
                    {
                        props.checkDuplicate && loading ? 'checking...' : props.checkDuplicate && value != '' ? !onlyAlphValue ? <div className='text-red-500'>{Dot("-mwFO_9", "Contain invalid characters. We only accept alphanumeric characters!")}</div> : !hasThatName ? <div className='text-green-500'>[{Dot("YZdRNcuy", "Congratulations! It is not yet used.")}]</div> : <div className='text-red-500'>[{Dot("RI3DtugPB", "Sorry, it is used already.")}]</div> : ''
                    }
                </div> */}
            </div>
        </div>
    )
}

