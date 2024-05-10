import { useState } from 'react';
import { UnstyledButton, Tooltip, Title, rem } from '@mantine/core';
import {
    IconHome2,
    IconUser,
    IconSettings,
    IconNotebook,
    IconMapSearch,
    IconBook,
    IconLanguage,
    IconApiApp,

} from '@tabler/icons-react';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './DoubleNavbar.module.css';
import _ from 'lodash';
import GetAppInfo from '@/AppInfo';
export type SystemSubModuleItem = {
    id: string,
    href?: string,
    name: string,
    body?: React.FC<any>
}
export type SystemModuleItem = {
    id: string,
    icon: React.FC<any>;
    label: string,
    children?: SystemSubModuleItem[]
}
export type RedirectLinkItem = {
    path: string
    url: string
}
export const redirectLinks: RedirectLinkItem[] = [
    {
        path: '/base64',
        url: '/tools/chat?text=base64'
    },
    {
        path: '/json',
        url: '/tools/chat?text=json'
    },
]

export const systemModulesList: SystemModuleItem[] = [
    {
        id: 'tools',
        icon: IconHome2, label: '快捷工具', children: [
            {
                name: 'Chat对话框',
                id: 'chat',
                body: () => {
                    return <div>this is chat</div>
                }
            },
            {
                name: "功能总览(233)",
                id: 'overview'
            },
            {
                name: '我的收藏(0)',
                id: 'collection'
            }
        ]
    },
    {
        id: 'api',
        icon: IconApiApp,
        label: 'API联调联试',
        children: [
            {
                name: 'API 客户端',
                id: 'client'
            },
            {
                name: 'Mock API',
                id: 'mock'
            },
            {
                name: '常用API',
                id: 'common'
            },
        ]
    },
    {
        id: 'i18n',
        icon: IconLanguage, label: '翻译助手',
        children: [
            {
                name: '文本翻译',
                id: 'text'
            },
            {
                name: 'JSON 翻译',
                id: 'json'
            }
        ]
    },
    {
        id: 'settings',
        icon: IconSettings, label: '系统设置',
        children: [
            {
                name: '我的账号',
                id: 'my-account'
            },
            {
                name: '工单提交',
                id: 'ticket',
                href: GetAppInfo().githubRepo + '/issues/new'
            },
            {
                name: '使用条款',
                id: 'terms-of-conditions'
            },
            {
                name: '隐私保护协议',
                id: 'privacy-agreement'
            },
            {
                name: '建议与反馈',
                id: 'feedback'
            },
        ]
    },
];



// { icon: IconBook, label: '文档中心' },
// { icon: IconMapSearch, label: '资源检索' },
// { icon: IconNotebook, label: '随手札记' },
// { icon: IconUser, label: '用户中心' },