// LafTools
// 
// Date: Sat, 16 Mar 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

'use client'

import React, { useEffect } from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { Dot } from "@/app/__CORE__/utils/cTranslationUtils";
import { loadDOT } from "@/app/__CORE__/utils/i18n-for-load";
import { useInitFunctionOnceOnly } from "@/app/__CORE__/hooks/cache";
import { hocClientWrapper } from "../../common/hocClientWrapper";

let a = loadDOT("Eitx--UjueC")

let prevEvents = {}

export default hocClientWrapper(() => {
    useEffect(() => {
        if (typeof document == 'undefined') {
            return
        }

        document.querySelectorAll("[data-navid]").forEach(x => {
            let navid = x.getAttribute("data-navid")
            let viewpos = x.getAttribute("data-viewpos")
            if (!navid) return
            let overlap = document.getElementById("navbindid-" + navid)
            if (!overlap) {
                alert('no overlap')
            }
            let cancelHideId = 'EOqvni-md' + navid
            let prevNavEle = 'XltbzkVbL' + navid
            let isOPHoving = "mocWB0BRW" + navid
            let isXHoving = 'krqEcIGgA"' + navid
            let eventObj = {
                x_mouseenter: (e) => {
                    e.preventDefault()
                    let rect = x.getBoundingClientRect()
                    if (!overlap) return
                    overlap.style.top = (rect.y + rect.height + 3) + "px"
                    overlap.style.display = "block"
                    //  ? '0' : 
                    overlap.style.left = (
                        viewpos == 'right' ? (
                            rect.x - overlap.offsetWidth + rect.width
                            //  + (
                            //     0 
                            // )
                        ) : rect.x
                    ) + "px"
                    window[isXHoving] = '1'
                    setTimeout(() => {
                        if (!overlap) return
                    }, 30)
                },
                x_mouseout: (e) => {
                    delete window[isXHoving]
                    e.preventDefault()
                    window[prevNavEle] = x;
                    window[cancelHideId] = setTimeout(() => {
                        if (!overlap) return
                        if (window[isOPHoving]) {
                            return;
                        }
                        window[prevNavEle] = null;
                        overlap.style.display = "none"
                    }, 70)
                },
                op_mouseenter: () => {
                    window[isOPHoving] = '1'
                    window.clearTimeout(window[cancelHideId])
                    let ele: Element = window[prevNavEle]
                    if (ele) {
                        ele.className = ele.className + ' hover '
                    }
                },
                op_mouseout: () => {
                    delete window[isOPHoving]
                    let ele: Element = window[prevNavEle]
                    if (ele) {
                        ele.className = ele.className.replace("hover", "")
                    }
                    window[cancelHideId] = setTimeout(() => {
                        if (!overlap) return
                        if (window[isXHoving]) {
                            return;
                        };
                        overlap.style.display = "none"
                    }, 20)
                }
            }
            // if (prevEvents[navid]) {
            //     x.removeEventListener("mouseenter", prevEvents[navid].x_mouseenter);
            //     overlap?.removeEventListener('mouseenter', prevEvents[navid].op_mouseenter)
            //     overlap?.removeEventListener('mouseleave', prevEvents[navid].op_mouseout)
            //     x.removeEventListener("mouseout", prevEvents[navid].x_mouseout)
            // }
            x.addEventListener("mouseenter", eventObj.x_mouseenter);
            overlap?.addEventListener('mouseenter', eventObj.op_mouseenter)
            overlap?.addEventListener('mouseleave', eventObj.op_mouseout)
            x.addEventListener("mouseout", eventObj.x_mouseout)
        })
    }, ["d9HrtsmHO"])
    return ''
})