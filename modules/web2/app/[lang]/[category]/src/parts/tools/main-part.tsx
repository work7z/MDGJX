// LafTools
// 
// Date: Wed, 28 Feb 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import React from 'react';
import { Autocomplete, AutocompleteItem, CardProps, Listbox, ListboxItem, Tab, Tabs } from "@nextui-org/react";
import { Card, Divider, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { border_clz, light_border_clz_all, tw } from '@/app/__CORE__/meta/styles';
import { Dot } from '@/app/__CORE__/utils/TranslationUtils';
import SubTabNav from '../nav/nav-sub-tab';
import Link from 'next/link';
import { fmtURL_Server } from '@/app/__CORE__/utils/routeUtils';
import { useConstructedKeyAndInit } from '@/app/[lang]/client/src/initapp';
import FundrasingPlanBtn from '../cpt/cpt-fundrasing-btn';
import Sidebar from './main-sidebar';
import { ToolProp } from '.';
import ExtraListTool from './extra-list-tool';
import PkgToolMain from './pkg-tool-main'
import PkgToolExtra from './pkg-tool-extra'
import PkgRecentUsedTool from './pkg-recent-used-tool';
import { getSearchDetailBySearchProps } from '@/app/[lang]/page';
import PkgQuickaccess from './pkg-quickaccess';
export let getCardsProps = (): CardProps => {
    return {
        radius: "none", shadow: "none", className: light_border_clz_all
    }
}

export type CrtToolProp = ToolProp
export default (props: CrtToolProp) => {
    let searchDetail = getSearchDetailBySearchProps(props)
    return <div className='flex-1  space-y-2 '>
        <PkgToolMain {...props} {...searchDetail} />
        <PkgRecentUsedTool {...props} />
        <PkgToolExtra {...props} />
    </div>
}