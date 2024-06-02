import { useState } from 'react';
import { Center, Tooltip, UnstyledButton, Stack, rem } from '@mantine/core';
import {
    IconHome2,
    IconGauge,
    IconDeviceDesktopAnalytics,
    IconFingerprint,
    IconCalendarStats,
    IconUser,
    IconSettings,
    IconLogout,
    IconSwitchHorizontal,
    IconTagStarred,
    IconBuildingStore,
    IconDna,
    IconStar,
} from '@tabler/icons-react';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './SetupLayout.module.css';
import AuthUtils from '@/utils/AuthUtils';
import imgFile from '/src/favicon.png'
interface NavbarLinkProps {
    icon: typeof IconHome2;
    label: string;
    active?: boolean;
    onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
    return (
        <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
            <UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}>
                <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
            </UnstyledButton>
        </Tooltip>
    );
}

const mockdata = [
    { icon: IconHome2, label: '首页' },
    { icon: IconBuildingStore, label: '插件市场' },
    { icon: IconStar, label: '收藏夹' },
    // { icon: IconDeviceDesktopAnalytics, label: 'Analytics' },
    // { icon: IconCalendarStats, label: 'Releases' },
    // { icon: IconUser, label: '用户中心' },
    // { icon: IconSettings, label: '系统设置' },
];

export function SetupLayout() {
    const [active, setActive] = useState(2);

    const links = mockdata.map((link, index) => (
        <NavbarLink
            {...link}
            key={link.label}
            active={index === active}
            onClick={() => setActive(index)}
        />
    ));

    return (
        <nav className={classes.navbar}>
            <Center>
                <MantineLogo type="mark" size={30} />
                {/* <div>秒</div> */}
                {/* <img src={imgFile} className='w-[30px]' /> */}
            </Center>

            <div className={classes.navbarMain}>
                <Stack justify="center" gap={0}>
                    {links}
                </Stack>
            </div>

            <Stack justify="center" gap={0}>
                <NavbarLink icon={IconSettings} label="系统设置" />
                <NavbarLink icon={IconLogout} onClick={()=>{
                    AuthUtils.signOut()
                }} label="登出" />
            </Stack>
        </nav>
    );
}