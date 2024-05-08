// LafTools
// 
// Date: Tue, 19 Mar 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

'use client'

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
import MultipleTextTranslator from '@/[lang]/client/src/pages/WorkBench/FixedLayout/Main/Center/nav/bottom/Translator/MultipleTextTranslator';
export type TitleLinkType = { title: string, link: string }
let d = loadDOT("6ar89C-Fh")

export default (props: { id: string }) => {
    d()
    let { id } = props;
    if (id == 'translation') {
        return <MultipleTextTranslator />
    }
    if (id == 'todo') {
        return 'this is todo'
    }
    if (id == 'stopwatch') {
        return 'this is stopwatch'
    }
    if (id == 'dictionary') {
        return <iframe src={'https://dict.youdao.com/result?word=hello&lang=en'} className='w-full h-[1200px]'></iframe>
    }
    return ''
}