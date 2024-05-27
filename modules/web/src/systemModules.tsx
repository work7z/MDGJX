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
    IconNetwork,
    IconSuperscript,

} from '@tabler/icons-react';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './DoubleNavbar.module.css';
import _ from 'lodash';
import GetAppInfo from '@/AppInfo';
import { TypeMDParams } from '@/containers/SideBar';
import { toolsNavInfo } from './toolsNavInfo.tsx';
import AppConstants from './AppConstants.tsx';

export type LoadModuleType = () => any
export type SystemSubModuleItem = {
    id: string,
    href?: string,
    name: string,
    disableFooter?: boolean,
    defaultSubToolId?: string,
    bodyFn?: LoadModuleType
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

export const Fn_MyAccount = () => import('./loadable/MyAccount/index.tsx')

export const systemModulesList: SystemModuleItem[] = [
    {
        id: 'tools',
        icon: IconHome2, label: '快捷工具', children: [
            GetAppInfo().isInLafToolsCOM ? {
                name: 'Chat对话框',
                id: 'chat',
                bodyFn: () => import('./loadable/ChatBot/index.tsx')
            } : {
                name: "首页",
                id: 'index',
                bodyFn: () => import('./loadable/XToolsView/index.tsx')
            },
            ...toolsNavInfo.map(x => {
                return {
                    name: x.name,
                    id: x.id,
                    disableFooter: true,
                    defaultSubToolId: x.defaultSubToolId,
                    bodyFn: () => import('./loadable/XToolsDetail/index.tsx')
                } satisfies SystemSubModuleItem
            })
        ]
    },
    // {
    //     id: 'api',
    //     icon: IconApiApp,
    //     label: 'API联调联试',
    //     children: [
    //         // {
    //         //     name: 'API 客户端',
    //         //     id: 'client'
    //         // },
    //         {
    //             name: '常用 API',
    //             id: 'common'
    //         },
    //         {
    //             name: '模拟 API (Mock)',
    //             id: 'mock'
    //         },
    //     ]
    // },
    {
        id: 'i18n',
        icon: IconLanguage,
        label: '翻译助手',
        children: [
            {
                name: '文本翻译',
                id: 'text',
                bodyFn: () => import('./loadable/TLNText/index.tsx')
            },
            {
                name: 'JSON 格式翻译',
                id: 'json',
                bodyFn: () => import('./loadable/TLNJSON/index.tsx')
            },
            {
                name: 'JSON 中英文对照',
                id: 'json-cn-en',
                bodyFn: () => import('./loadable/TLNJSONComparison/index.tsx')
            },
            {
                name: 'Markdown 文档翻译',
                id: 'md',
                bodyFn: () => import('./loadable/TLNMarkdown/index.tsx')
            },
            {
                name: '简繁中文对照翻译',
                id: 'ftzt',
                bodyFn: () => import('./loadable/TLNZTFT/index.tsx')
            },
        ]
    },
    {
        id: 'network',
        icon: IconNetwork,
        label: '网络运维',
        children: [
            {
                name: 'IP/域名质量监测',
                id: 'ipstats',
                bodyFn: () => import('./loadable/IPDomainQualityStat/index.tsx')
            },
        ]
    },
    {
        id: 'settings',
        icon: IconSettings, label: '系统设置',
        children: [
            {
                name: '我的账号',
                id: 'my-account',
                bodyFn: Fn_MyAccount
            },
            {
                name: '常见问题',
                id: 'faq',
                bodyFn: () => import('./loadable/FAQ/index.tsx')
            },
            {
                name: '使用条款',
                id: 'terms-of-conditions',
                bodyFn: () => import('./loadable/TermsOfConditions/index.tsx')
            },
            {
                name: '隐私保护协议',
                id: 'privacy-agreement',
                bodyFn: () => import('./loadable/PrivacyAgreement/index.tsx')
            },
            {
                name: '建议与反馈',
                bodyFn: () => import('./loadable/Feedback/index.tsx'),
                id: 'feedback'
                // we can put ticket button in this page -> href: GetAppInfo().githubRepo + '/issues/new'
            },
            {
                name: '关于软件',
                id: 'about',
                bodyFn: () => import('./loadable/AboutSoftware/index.tsx'),
            },
        ]
    },
];



// { icon: IconBook, label: '文档中心' },
// { icon: IconMapSearch, label: '资源检索' },
// { icon: IconNotebook, label: '随手札记' },
// { icon: IconUser, label: '用户中心' },