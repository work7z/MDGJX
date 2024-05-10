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
import { systemModulesList } from '@/meta/systemModules';



export function DoubleNavbar() {
    const mainLinksMockdata = systemModulesList

    const [active, setActive] = useState(mainLinksMockdata[0].label);
    const activeMainLink = mainLinksMockdata.find(x => x.label == active)
    let [activeLink, setActiveLink] = useState<string | null>(null);
    if (!activeLink) {
        activeLink = activeMainLink?.children && activeMainLink?.children[0].id || null
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
        let link = item.id

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