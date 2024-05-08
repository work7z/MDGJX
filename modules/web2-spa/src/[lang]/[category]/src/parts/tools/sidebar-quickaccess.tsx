'use client'
// LafTools
// 
// Date: Wed, 28 Feb 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc
'use client'
import React, { } from 'react';
import _ from 'lodash';
import { loadDOT } from '@/__CORE__/utils/i18n-for-dynamic-loadDOT';
import { Button, ButtonGroup } from "@nextui-org/react";
import { border_clz } from '@/__CORE__/meta/styles';
import { Dot } from '@/__CORE__/utils/cTranslationUtils';
import { hocClientWrapper } from '../../common/hocClientWrapper';

let d = loadDOT("g2m9MYK-u")

export let IconLabel = (props: { icon: string, label: string }) => {
    // javascript:void(0)
    return <a href=''>
        <div className="">
            <img src={'/static/controls/' + props.icon} className="w-5 h-5 mr-2" />
            {/* <span>{props.label}</span> */}
        </div>
    </a>
}

export let getQuickAccessList = () => {
    d()
    return [
        {
            id: 'translation',
            icon: 'translation.png',
            label: Dot("mWljvLU5c", "Translation")
        },
        // {
        //     id: 'todo',
        //     icon: 'to-do-list.png',
        //     label: Dot("QDhYHZeBO", "TODO")
        // },
        // {
        //     id: 'stopwatch',
        //     icon: 'stopwatch.png',
        //     label: Dot("BRrOAMTG7", "Timer")
        // },
        // {
        //     id: 'dictionary',
        //     icon: 'dictionary.png',
        //     label: Dot("8TA2AYbhv", "Dictionary")
        // }
    ]
}

export let QuickAccess = hocClientWrapper((props) => {
    let Dot = d()
    let quickAccessList = getQuickAccessList()
    return <div className='space-y-2'>
        <div className='flex flex-row space-x-1'>
            {quickAccessList.map(x => {
                return <IconLabel key={x.id} icon={x.icon} label={x.label} />
            })}
        </div>
        <div className='mt-4 space-y-2' style={{
            marginTop: '14px'
        }}>
            <Button onClick={(e) => {
                // scroll to page bottom
                // window.scrollTo(0, document.body.scrollHeight);
                window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: 'smooth'
                });
            }} color="primary" variant='ghost' size='sm' fullWidth >
                {Dot("mFsDijzjI", "Jump to Quick Access")}
            </Button>
            <Button onClick={(e) => {
                localStorage.clear()
                location.href = '/'
            }} color="default" variant='ghost' size='sm' fullWidth >
                {Dot("_8w6UsXTY", "Clear Local Storage")}
            </Button>
        </div>
    </div>
}
)

export default (props) => {
    return <QuickAccess {...props} />
}