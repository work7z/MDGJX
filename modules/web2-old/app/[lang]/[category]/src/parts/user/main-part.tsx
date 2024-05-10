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
import { getSearchDetailBySearchProps } from '@/app/[lang]/page';
import LoginPage from './login/LoginPage';
import RegisterPage from './register/RegisterPage';
export let getCardsProps = (): CardProps => {
    return {
        radius: "none", shadow: "none", className: light_border_clz_all
    }
}

export type CrtToolProp = ToolProp
export default (props: CrtToolProp) => {
    let pid = props.params.id
    let finPage: JSX.Element | null = null;
    let passClz = tw(' rounded-sm shadow-sm mt-2 max-w-[600px] w-[600px]  ') + light_border_clz_all
    if (pid == 'sign-in') {
        finPage = (
            <LoginPage type="username" passClz={passClz} />
        )
    } else if (pid == 'sign-up') {
        finPage = (
            <RegisterPage passClz={passClz} />
        )
    } else {
        finPage = (
            <div>404 no page found for {pid}</div>
        )
    }
    return <div className='flex-1  space-y-2 '>
        <div className={'flex justify-center mx-auto mb-32'} style={{

        }}>
            {finPage}
        </div>
    </div>
}