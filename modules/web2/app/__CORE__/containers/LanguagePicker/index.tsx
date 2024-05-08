// LafTools
// 
// Date: Thu, 22 Feb 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc


import { fn_Geti18n } from "@/app/[lang]/client/src/i18n-pure";
import CardPanel from "../../components/CardPanel"
import { Dot } from "../../utils/TranslationUtils"
import React from 'react'




export default (props: any) => {
    let i18nItems = fn_Geti18n(Dot);
    let translationLangs: {
        "Label": string,
        "LabelByLang": string,
        "Value": string,
        "Href": string,
        "LabelInEnglish": string
    }[] = i18nItems.map(x => {
        return {
            ...x,
            Href: x.Value
        }
    })
    return (
        <CardPanel children={<div className='p-2 pl-4 text-xs'>

            <div className="hs-accordion-group">
                <div className="hs-accordion hs-accordion-active" id="hs-basic-heading-one">
                    {/* <button className="hs-accordion-toggle active hs-accordion-active:text-blue-600 py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" aria-controls="hs-basic-with-arrow-collapse-two">
                        <svg className="hs-accordion-active:hidden block w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                        <svg className="hs-accordion-active:block hidden w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6" /></svg>
                        Choose Language{props.authInfo.signedIn ? '' : ''}
                    </button> */}
                    <h1 className="text-lg  font-semibold mb-4">
                        {Dot("jRFk519Bj-", "This community is driven by a fully international free open source code project.")}
                    </h1>
                    <h1 className='text-md font-semibold mb-4'>
                        Currently, we are supporting the following languages:
                    </h1>
                    <div id="hs-basic-collapse-one" className=" hs-accordion-content w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-heading-one">
                        {
                            translationLangs.map(x => {
                                return <a href={'/' + x.Href + '/chooseLanguage'}>  <div className='p-2 flex flex-row justify-between items-center hover:bg-slate-100 cursor-pointer transition-all'>
                                    <div>{x.LabelByLang}{x.Value == 'en_US' ? '' : `(${x.LabelInEnglish})`}</div>
                                </div></a>
                            })
                        }
                    </div>
                    <p className="space-y-2 text-sm mt-8">
                        <div>
                            Note that you can choose the language though you have not signed in the system.
                        </div>
                    </p>
                </div>

            </ div>


        </div>}></CardPanel >
    )
}
