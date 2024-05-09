import { useState } from 'react';
import { UnstyledButton, Tooltip, Title, rem } from '@mantine/core';
import {
    IconHome2,
    IconUser,
    IconSettings,
    IconNotebook,
    IconMapSearch,
    IconBook,

} from '@tabler/icons-react';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './DoubleNavbar.module.css';

const mainLinksMockdata: {
    icon: React.FC<any>;
    label: string
}[] = [
        { icon: IconHome2, label: '快捷工具', },
        { icon: IconBook, label: '文档中心' },
        { icon: IconMapSearch, label: '资源检索' },
        { icon: IconNotebook, label: '随手札记' },
        { icon: IconUser, label: '用户中心' },
        // { icon: IconFingerprint, label: 'Security' },
        { icon: IconSettings, label: '系统设置' },
    ];

const linksMockdata = [
    'Security',
    'Settings',
    'Dashboard',
    'Releases',
    'Account',
    'Orders',
    'Clients',
    'Databases',
    'Pull Requests',
    'Open Issues',
    'Wiki pages',
];

export function DoubleNavbar() {
    const [active, setActive] = useState('快捷工具');
    const [activeLink, setActiveLink] = useState('Security');

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

    const links = linksMockdata.map((link) => (
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
            {link}
        </a>
    ));

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