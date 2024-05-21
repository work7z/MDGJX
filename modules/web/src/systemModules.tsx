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
import { TypeMDParams } from '@/containers/SideBar';

export type SystemSubModuleItem = {
    id: string,
    href?: string,
    name: string,
    bodyFn?: () => any
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
                name: "网络安全助手",
                id: 'cyber',
                bodyFn: () => import('./loadable/CyberSecurity/index.tsx')
            },
            {
                name: "通用格式转换",
                id: 'converter'
            },
            {
                name: "Web开发工具",
                id: 'web'
            },
            {
                name: "图像视频处理",
                id: 'video'
            },
            {
                name: "运维开发专用工具",
                id: 'devops'
            },
            {
                name: "网络通信协议",
                id: 'network'
            },
            {
                name: "数学运算工具",
                id: 'math'
            },
            {
                name: "快速测量工具",
                id: 'measure'
            },
            {
                name: "文本处理工具",
                id: 'text'
            },
            // {
            //     name: "计算机编程类(233)",
            //     id: 'overview'
            // },
            // {
            //     name: "金融银行证券类(233)",
            //     id: 'other'
            // },
            // {
            //     name: '我的收藏(0)',
            //     id: 'collection'
            // }
        ]
    },
    {
        id: 'api',
        icon: IconApiApp,
        label: 'API联调联试',
        children: [
            // {
            //     name: 'API 客户端',
            //     id: 'client'
            // },
            {
                name: '常用 API',
                id: 'common'
            },
            {
                name: '模拟 API (Mock)',
                id: 'mock'
            },
        ]
    },
    {
        id: 'i18n',
        icon: IconLanguage, label: '翻译助手',
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
            // {
            //     name: 'Markdown 文档翻译',
            //     id: 'md',
            //     bodyFn: () => import('./loadable/TLNMarkdown/index.tsx')
            // },
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