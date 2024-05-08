// LafTools
// 
// Date: Wed, 28 Feb 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import React from 'react';
import { Autocomplete, AutocompleteItem, CardProps, Listbox, ListboxItem, Tab, Tabs } from "@nextui-org/react";
import { Card, Divider, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { border_clz, light_border_clz_all, tw } from '@/__CORE__/meta/styles';
import { Dot } from '@/__CORE__/utils/TranslationUtils';
import Link from '@/__CORE__/components/Link';
import { fmtURL_Server } from '@/__CORE__/utils/routeUtils';
import { useConstructedKeyAndInit } from '@/[lang]/client/src/initapp';
import FundrasingPlanBtn from '../cpt/cpt-fundrasing-btn';
import Sidebar from './main-sidebar';
import Main from './main-part';
import { NavigatorPassProp } from '../main';
import { CategorySearchProps } from '@/[lang]/page';
import { LafPathIDParams } from '@/[lang]/[category]/types';
import { useParams } from 'react-router-dom';
export let getCardsProps = (): CardProps => {
    return {
        radius: "none", shadow: "none", className: light_border_clz_all
    }
}


export type ToolProp = CategorySearchProps
export default (props: CategorySearchProps) => {
    let p: LafPathIDParams = useParams()
    debugger;
    return <div>
        <div className='flex flex-row space-x-2'>
            <Main {...props} />
        </div>
    </div>
}