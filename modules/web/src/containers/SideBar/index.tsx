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

const mainLinksMockdata: {
    icon: React.FC<any>;
    label: string,
    children?: {
        pathname: string,
        name: string
    }[]
}[] = [
        {
            icon: IconHome2, label: '快捷工具', children: [
                {
                    name: 'Chat对话框',
                    pathname: 'chat'
                },
                {
                    name: "功能总览(233)",
                    pathname: 'overview'
                },
                {
                    name: '我的收藏(0)',
                    pathname: 'collection'
                }
            ]
        },
        {
            icon: IconApiApp,
            label: 'API联调联试',
            children: [
                {
                    name: 'API 客户端',
                    pathname: 'api-client'
                },
                {
                    name: 'Mock API',
                    pathname: 'mock-api'
                },
                {
                    name: '常用API',
                    pathname: 'common-api'
                },
            ]
        },
        {
            icon: IconLanguage, label: '翻译助手',

            children: [
                {
                    name: '文本翻译',
                    pathname: 'text-translation'
                },
                {
                    name: 'JSON 翻译',
                    pathname: 'json-translation'
                }
            ]
        },
        // { icon: IconBook, label: '文档中心' },
        // { icon: IconMapSearch, label: '资源检索' },
        // { icon: IconNotebook, label: '随手札记' },
        // { icon: IconUser, label: '用户中心' },
        {
            icon: IconSettings, label: '系统设置',
            children: [
                {
                    name: '我的账号',
                    pathname: 'my-account'
                },
                {
                    name: '使用条款',
                    pathname: 'terms-of-conditions'
                },
                {
                    name: '隐私保护协议',
                    pathname: 'privacy-agreement'
                },
                {
                    name: '建议与反馈',
                    pathname: 'feedback'
                },
                {
                    name: '提交工单',
                    pathname: GetAppInfo().githubRepo + '/issues/new'
                },
            ]
        },
    ];

export function DoubleNavbar() {
    const [active, setActive] = useState(mainLinksMockdata[0].label);
    const activeMainLink = mainLinksMockdata.find(x => x.label == active)
    let [activeLink, setActiveLink] = useState<string | null>(null);
    if (!activeLink) {
        activeLink = activeMainLink?.children && activeMainLink?.children[0].pathname || null
    }
    const mainLinks = mainLinksMockdata.map((link) => (
        <Tooltip
            label={link.label}
            position="right"
            withArrow
            transitionProps={{ duration: 0 }}
            key={link.label}
        >
            <UnstyledButton
                onClick={() => setActive(link.label)}
                className={classes.mainLink}
                data-active={link.label === active || undefined}
            >
                <link.icon style={{ width: rem(22), height: rem(22) }} stroke={1.5} />
            </UnstyledButton>
        </Tooltip>
    ));

    const links = (activeMainLink?.children || []).map((item) => {
        let link = item.pathname

        return (
            <a
                className={classes.link}
                data-active={activeLink === link || undefined}
                href="#"
                onClick={(event) => {
                    event.preventDefault();
                    setActiveLink(link);
                }}
                key={link}
            >
                {item.name}
            </a>
        )
    });

    return (
        <nav className={classes.navbar}>
            <div className={classes.wrapper}>
                <div className={classes.aside}>
                    <div className={classes.logo}>
                        <MantineLogo type="mark" size={30} />
                    </div>
                    {mainLinks}
                </div>
                <div className={classes.main}>
                    <Title order={4} className={classes.title}>
                        {active}
                    </Title>

                    {links}
                </div>
            </div>
        </nav>
    );
}