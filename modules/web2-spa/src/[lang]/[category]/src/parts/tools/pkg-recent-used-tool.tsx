'use client'
// LafTools
// 
// Date: Wed, 28 Feb 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import React, { useEffect } from 'react';
import { Autocomplete, AutocompleteItem, CardProps, Listbox, ListboxItem, Tab, Tabs } from "@nextui-org/react";
import { Card, Divider, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { border_clz, light_border_clz_all, tw } from '@/__CORE__/meta/styles';
import Sidebar from './main-sidebar';
import { ToolProp } from '.';
import ExtraListTool from './extra-list-tool';
import { Dot } from '@/__CORE__/utils/cTranslationUtils';
import _ from 'lodash';
import gutils from '@/[lang]/client/src/utils/GlobalUtils';
import { loadDOT } from '@/__CORE__/utils/i18n-for-dynamic-loadDOT';
export let getCardsProps = (): CardProps => {
    return {
        radius: "none", shadow: "none", className: light_border_clz_all
    }
}

export type CrtToolProp = ToolProp
let recentToolStorageKey = "tyoZa-kdM"
export type TitleLinkType = { title: string, link: string }
let d = loadDOT("D4tscXwgV")
export default (props: CrtToolProp) => {
    d()
    const [tools, setTools] = React.useState<TitleLinkType[]>([])
    useEffect(() => {
        let value = localStorage.getItem(recentToolStorageKey) || '[]'
        let storage = gutils.safeparse(value)
        let newTools = tools;
        if (storage) {
            newTools = storage as any
            setTools(newTools)
        }
        setTimeout(() => {
            let ele = document.getElementById("tool-current-title")
            if (ele) {
                let crtTitle = ele.innerText
                let crtLink = window.location.href
                let newResults: TitleLinkType[] = [{ title: crtTitle, link: crtLink }, ...newTools]
                let pObj = {}
                let filterValue = _.take(newResults.filter(x => {
                    if (pObj[x.title]) {
                        return false;
                    } else {
                        pObj[x.title] = true
                        return true;
                    }
                }), 25)
                localStorage.setItem(recentToolStorageKey, JSON.stringify(filterValue))
            }
        }, 3500)

    }, [])
    if (_.isEmpty(tools)) { return '' }
    return <Card {...getCardsProps()} className={light_border_clz_all} >
        <div className='px-2 py-2 text-xs'>
            <span>
                {Dot("OUQHhPFdkC5", "You recently used these tools:")}
            </span>
            <span>
                {
                    tools.map((x, i) => {
                        return <a key={i} href={x.link} className='ml-2'>{x.title}</a>
                    })
                }
            </span>
        </div>
    </Card >
}