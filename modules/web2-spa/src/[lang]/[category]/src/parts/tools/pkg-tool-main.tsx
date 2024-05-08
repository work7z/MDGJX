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
import SubTabNav from '../nav/nav-sub-tab';
import Link from '@/__CORE__/components/Link';
import { fmtURL_Server } from '@/__CORE__/utils/routeUtils';
import ToolView from './view-tools'
import { useConstructedKeyAndInit } from '@/[lang]/client/src/initapp';
import FundrasingPlanBtn from '../cpt/cpt-fundrasing-btn';
import Sidebar from './main-sidebar';
import { ToolProp } from '.';
import ExtraListTool from './extra-list-tool';
import { CategoryTypeSearchDetail } from '@/[lang]/page';
import { Button, Dialog, DialogBody, DialogFooter } from '@blueprintjs/core';
import DialogToolListView from './dialog-tool-list-view';
import { HocClientWrapperClient, hocClientWrapper } from '../../common/hocClientWrapper';
export let getCardsProps = (): CardProps => {
    return {
        radius: "none", shadow: "none", className: light_border_clz_all
    }
}

export type CrtToolProp = ToolProp & CategoryTypeSearchDetail

export default (props: CrtToolProp) => {
    return <Card {...getCardsProps()} className={light_border_clz_all + ' mt-2 rounded shadow-md '} style={{
        height: 'calc(100vh - 91px)'
    }}>
        <SubTabNav  {...props}></SubTabNav>
        <ToolView {...props} />
    </Card >
}