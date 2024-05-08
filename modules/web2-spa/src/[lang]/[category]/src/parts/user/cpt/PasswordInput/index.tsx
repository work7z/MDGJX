'use client'

import React, { useEffect } from 'react';
import _ from 'lodash';
import { loadDOT } from '@/__CORE__/utils/i18n-for-dynamic-loadDOT';
import { Dot } from '@/__CORE__/utils/cTranslationUtils';
import PrelineScript from '@/__CORE__/script/preline-init';
let a = loadDOT("jZs50tnTD")

export default (props: { ph?: string, label?: string, strongMode?: boolean, name: string }) => {
  a()
  let clz = `py-3 px-4 pl-11 block w-full border-gray-200  border-[1px] rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600`
  let [value, onValue] = React.useState('')
  let keyPW = 'passwordipt' + props.name;
  useEffect(() => {
    onValue(localStorage.getItem(keyPW) || '')
  }, [])
  if (props.strongMode) {
    return (
      <div className="w-full">
        <label className="block text-sm mb-2 dark:text-white w-full ">{props.label || Dot("CqhsJp", "Password")}</label>
        <div className="flex">
          <div className="relative flex-1">
            <input value={value} onChange={(e) => {
              onValue(e.target.value)
              localStorage.setItem(keyPW, e.target.value)
            }} name={props.name} type="password" id="hs-strong-password-with-indicator-and-hint-in-popover" className="border-gray-200 rounded-lg border-[1px] py-3 px-10 font-sm block w-full  dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 text-sm " placeholder={Dot("W2iMX", "Enter Complex Password to protect your password")} />

            {/* <button type="button" data-hs-toggle-password='{
        "target": "#hs-toggle-password"
      }' className="absolute hidden top-0 end-0 p-3.5 rounded-e-md dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
              <svg className="flex-shrink-0 w-3.5 h-3.5 text-gray-400 dark:text-neutral-600" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path className="hs-password-active:hidden" d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                <path className="hs-password-active:hidden" d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                <path className="hs-password-active:hidden" d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                <line className="hs-password-active:hidden" x1="2" x2="22" y1="2" y2="22" />
                <path className="hidden hs-password-active:block" d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle className="hidden hs-password-active:block" cx="12" cy="12" r="3" />
              </svg>
            </button> */}
            <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
              <svg className="flex-shrink-0 w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z" /><circle cx="16.5" cy="7.5" r=".5" /></svg>
            </div>

            <div id="hs-strong-password-popover" className="z-30 hidden absolute  w-full bg-white shadow-md rounded-lg p-4 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700">
              <div id="hs-strong-password-in-popover" data-hs-strong-password='{
                        "target": "#hs-strong-password-with-indicator-and-hint-in-popover",
                        "hints": "#hs-strong-password-popover",
                        "stripClasses": "hs-strong-password:opacity-100 hs-strong-password-accepted:bg-teal-500 h-2 flex-auto rounded-full bg-blue-500 opacity-50 mx-1",
                        "mode": "popover"
                      }' className="flex mt-2 -mx-1">
              </div>

              <h4 className="mt-3 text-sm font-semibold text-gray-800 mb-2 dark:text-white">
                {Dot("zVBf-", "Your password must contain:")}
              </h4>

              <ul className="space-y-1 text-sm text-gray-500">
                <li data-hs-strong-password-hints-rule-text="min-length" className="hs-strong-password-active:text-teal-500 flex items-center gap-x-2">
                  <span className="hidden" data-check>
                    <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </span>
                  <span data-uncheck>
                    <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                  </span>
                  {Dot("NyIfE", "Minimum number of characters is 6.")}
                </li>
                <li data-hs-strong-password-hints-rule-text="lowercase" className="hs-strong-password-active:text-teal-500 flex items-center gap-x-2">
                  <span className="hidden" data-check>
                    <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </span>
                  <span data-uncheck>
                    <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                  </span>
                  {Dot("bgjp-", "Should contain lowercase.")}
                </li>
                <li data-hs-strong-password-hints-rule-text="uppercase" className="hs-strong-password-active:text-teal-500 flex items-center gap-x-2">
                  <span className="hidden" data-check>
                    <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </span>
                  <span data-uncheck>
                    <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                  </span>
                  {Dot("3MVMy", "Should contain uppercase.")}
                </li>
                <li data-hs-strong-password-hints-rule-text="numbers" className="hs-strong-password-active:text-teal-500 flex items-center gap-x-2">
                  <span className="hidden" data-check>
                    <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </span>
                  <span data-uncheck>
                    <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                  </span>
                  {Dot("amY0r", "Should contain numbers.")}
                </li>
                <li data-hs-strong-password-hints-rule-text="special-characters" className="hs-strong-password-active:text-teal-500 flex items-center gap-x-2">
                  <span className="hidden" data-check>
                    <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </span>
                  <span data-uncheck>
                    <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                  </span>
                  {Dot("5kSqA", "Should contain special characters.")}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="">
      <label className="block text-sm mb-2 dark:text-white w-full ">{props.label || Dot("CqhsJp", "Password")}</label>
      <div className="relative">
        <input value={value} onChange={(e) => {
          onValue(e.target.value)
          localStorage.setItem(keyPW, e.target.value)
        }} name={props.name} id={"hs-toggle-password" + props.name} type="password" className={clz} placeholder={props.ph || Dot("SVQdwv", "Enter password")} />
        <button type="button" data-hs-toggle-password={`{
        "target": "#hs-toggle-password${props.name}"
      }`} className="absolute top-0 end-0 p-3.5 rounded-e-md dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
          <svg className="flex-shrink-0 w-3.5 h-3.5 text-gray-400 dark:text-neutral-600" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path className="hs-password-active:hidden" d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
            <path className="hs-password-active:hidden" d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
            <path className="hs-password-active:hidden" d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
            <line className="hs-password-active:hidden" x1="2" x2="22" y1="2" y2="22" />
            <path className="hidden hs-password-active:block" d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle className="hidden hs-password-active:block" cx="12" cy="12" r="3" />
          </svg>
        </button>
        <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
          <svg className="flex-shrink-0 w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z" /><circle cx="16.5" cy="7.5" r=".5" /></svg>
        </div>
      </div>
    </div>
  )
}