
// LafTools
// 
// Date: Thu, 22 Feb 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import { Dot } from "@/app/__CORE__/utils/TranslationUtils";
import React from "react";
import { CSS_BG_DARK_1ST, CSS_TEXT_ANCHOR_CSS, border_clz_top } from "@/app/__CORE__/meta/styles";
import APPINFOJSON from '@/app/[lang]/[category]/info'
import LanguageFlowList from "../LanguageFlowList";
import MottoLine from "../MottoLine";
import { isCensorShipForWebsiteMode } from "@/app/[lang]/page";
import { fmtURL_Server } from "../../utils/routeUtils";

export let FooterContent = () => {
    return <div className={"w-full bg-slate-100  " + CSS_BG_DARK_1ST}>

        <div className=' text-center   w-8/12 space-y-3 mx-auto bp5-text-muted  break-words pt-8 flex flex-col pb-6 ' style={{
            minWidth: '50vw'
        }} >
            <LanguageFlowList></LanguageFlowList>
            <i className="text-xs">
                <MottoLine singleLineMode={true}></MottoLine>
            </i>
            <div className='space-x-3'>
                {
                    [
                        isCensorShipForWebsiteMode() ? {
                            label: '粤ICP备2022042390号',
                            link: 'https://beian.miit.gov.cn/'
                        } : null,
                        {
                            label: Dot("V6U_f", "Terms of Service"),
                            link: "https://codegen.cc/main/license/main"
                        },
                        {
                            label: Dot("OQWm4", "Report a Bug"),
                            link: "https://github.com/work7z/LafTools/issues"
                        },
                        {
                            // label: Dot("d5LAU", "Licensed under AGPLv3"),
                            label: Dot("4PIqD", "Code Review"),
                            link: "https://github.com/work7z/LafTools/"
                            // link: 'https://en.wikipedia.org/wiki/Affero_General_Public_License'
                        },
                        {
                            label: Dot("zmDWx", "Contact Us"),
                            link: "mailto:work7z@outlook.com"
                        },
                        {
                            label: Dot("13pmE", "Support Us"),
                            // link: "javascript:void(0);",
                            // link: "javascript:void(0);",
                            link: "https://github.com/work7z/LafTools/",
                            onClick: () => {
                                // AlertUtils.win_alert({
                                //     id: "W1z_B",
                                //     msg: <p>
                                //         <h1>{Dot("qHoktx", "Thank You!")}</h1>
                                //         <p>
                                //             {Dot("CidOqAZ", "As the creator of LafTools, I am so touched that you are willing to support us. We have good people on our team who work hard to continuously improve LafTools.")}
                                //         </p>
                                //         <p>
                                //             {Dot("6hsnqWe", "Although LafTools is free and open source, maintaining it still requires a significant amount of time and energy. In particular, we need funds to pay for certain cloud APIs. If you appreciate LafTools, please consider supporting us.")}
                                //         </p>
                                //         <p>
                                //             {Dot("5qPOJL", "To support LafTools, consider either giving a star to our repository on GitHub or upgrading to our professional version through a monthly subscription. We would greatly appreciate your help, and we promise that LafTools will become even better with the funds raised.")}</p>
                                //         <p
                                //             className='bp5-text-muted'
                                //         >{'Ryan Laf'}
                                //             <br />
                                //             {Dot("qWemXE4", "Jan, 1st, 2024")}
                                //         </p>
                                //     </p>
                                // })
                            }
                        },
                        {
                            label: Dot("TET4xnxBT", "Easter Egg"),
                            link: fmtURL_Server(['/client']),
                        }
                    ].filter(x => x).map(x => {
                        if (!x) { return '' }
                        return <a href={x.link} className={CSS_TEXT_ANCHOR_CSS} target={x.onClick ? '' : '_blank'}>{x.label}</a>
                    })
                }
            </div>
            <div>
                <b>
                    <a className={CSS_TEXT_ANCHOR_CSS} href="https://laftools.dev" target='_blank'>{''} {

                        Dot("ZbD3F", "{0}, crafted by the LafTools team", "LafTools@" + APPINFOJSON.version + "")
                        // Dot("rK6cx", "{0}, designed and developed by the LafTools team", "LafTools@" + APPINFOJSON.version + "")


                    }</a>
                </b>
            </div>
            {/* <div>
        LafTools <a href="https://laftools.dev">https://laftools.dev</a>
    </div> */}
        </div>
    </div>
}

export default (props) => {
    return <div className={
        border_clz_top + " min-h-20 "
    }><FooterContent />
    </div>
}