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
import { getQuickAccessList } from './sidebar-quickaccess';
import ContentQuickaccess from './content-quickaccess';
export let getCardsProps = (): CardProps => {
    return {
        radius: "none", shadow: "none", className: light_border_clz_all
    }
}
export type CrtToolProp = ToolProp
let recentToolStorageKey = "tyoZa-kdM"
export type TitleLinkType = { title: string, link: string }
let d = loadDOT("K2yJGMppb")
export default (props: CrtToolProp) => {
    d()
    let quickaccessList = getQuickAccessList()
    let [selected, setSelected] = React.useState(quickaccessList[0].id)
    return <Card {...getCardsProps()} className={light_border_clz_all + '  p-2 '} >
        <h1 className='text-lg font-semibold text-center'>{Dot("N9vxAy2Ex", "My Quick Access for Various Tasks")}</h1>
        <div className="flex w-full flex-col">
            <Tabs
                aria-label="Options"
                selectedKey={selected}
                onSelectionChange={(e) => {
                    setSelected(e.toString())
                }}
                className='mxauto-tab'
            >
                {
                    quickaccessList.map(x => {
                        return (
                            <Tab key={x.id} title={x.label}>
                                <Card>
                                    <CardBody className='h-[500px] p-0 '>
                                        <ContentQuickaccess id={x.id} />
                                    </CardBody>
                                </Card>
                            </Tab>
                        )
                    })
                }
                {/* <Tab key="photos" title="Photos">
                    <Card>
                        <CardBody>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="music" title="Music">
                    <Card>
                        <CardBody>
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="videos" title="Videos">
                    <Card>
                        <CardBody>
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </CardBody>
                    </Card>
                </Tab> */}
            </Tabs>
        </div>
    </Card >
}