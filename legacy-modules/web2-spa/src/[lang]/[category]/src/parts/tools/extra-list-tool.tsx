// LafTools
// 
// Date: Wed, 28 Feb 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import React, { } from 'react';
import { Autocomplete, AutocompleteItem, CardProps, Listbox, ListboxItem, Tab, Tabs } from "@nextui-org/react";
import { Card, Divider, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { CSS_TW_GRAY_TEXT, border_clz, light_border_clz_all, tw } from '@/__CORE__/meta/styles';
import { Dot } from '@/__CORE__/utils/TranslationUtils';
import SubTabNav from '../nav/nav-sub-tab';
import Link from '@/__CORE__/components/Link';
import { fmtURL_Server } from '@/__CORE__/utils/routeUtils';
import { useConstructedKeyAndInit } from '@/[lang]/client/src/initapp';
import FundrasingPlanBtn from '../cpt/cpt-fundrasing-btn';
import Sidebar from './main-sidebar';
import { ToolProp } from '.';
import { getCardsProps } from './main-part';
import { fmtURL_ToolSubPage, } from '../../../types';
import _ from 'lodash';
import { URL_SUBCATEGORY_GO_PATH } from '@/__CORE__/meta/url';
import { getToolSubCategory } from '@/[lang]/client/src/impl/tools/d_subcategory';
import { useListenMainDot } from '@/__CORE__/utils/i18n-for-dynamic-loadDOT';

export default (props: ToolProp) => {
    let subCategory = getToolSubCategory()
    useListenMainDot()

    return <div className='flex-1  space-y-2'>
        {
            subCategory.map(x => {
                return <Card {...getCardsProps()} className={light_border_clz_all + ' py-4 mark-st-wrapper'} key={x.id} >
                    <div className='flex flex-row items-start justify-between mx-3'>
                        <h1 className='m-0  text-[15px] mb-3 font-semibold  mark-title border-l-4 px-2 '>{x.longLabel}</h1>
                        <div className={CSS_TW_GRAY_TEXT + ' text-xs'}>{Dot("hbvxdivMHi", "{0} tools in total", _.size(x.subTabs))}</div>
                    </div>
                    <ul className='space-y-[4px]  block px-9 '>
                        {
                            (x.subTabs || []).map(xx => {
                                return <li className=' gray-list-item  w-1/4 xl:w-1/5 list-item list-disc  float-left'>
                                    <Link className='black-anchor-text   list-disc  text-left ' href={fmtURL_ToolSubPage([URL_SUBCATEGORY_GO_PATH, x.id, xx.id])} key={xx.id}>
                                        {xx.label}
                                    </Link>
                                </li>
                            })
                        }
                    </ul>
                </Card>
            })
        }
    </div>
}