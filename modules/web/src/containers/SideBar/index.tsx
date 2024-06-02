import { useState } from 'react';
import { UnstyledButton, Tooltip, Title, rem, Stack, TextInput, Code } from '@mantine/core';
import {
    IconHome2,
    IconUser,
    IconSettings,
    IconNotebook,
    IconMapSearch,
    IconBook,
    IconLanguage,
    IconApiApp,
    IconLogout,
    IconSwitchHorizontal,
    IconSearch,

} from '@tabler/icons-react';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './DoubleNavbar.module.css';
import _ from 'lodash';
import GetAppInfo from '@/AppInfo';
import { SystemModuleItem, SystemSubModuleItem, systemModulesList } from '@/systemModules';
import { Link, useHistory } from 'react-router-dom';
import AuthUtils from '@/utils/AuthUtils';
import {
    IconNotes,
    IconCalendarStats,
    IconGauge,
    IconPresentationAnalytics,
    IconFileAnalytics,
    IconAdjustments,
    IconLock,
} from '@tabler/icons-react';

import { LinksGroup } from './NavbarLinksGroup';
import exportUtils from '@/utils/ExportUtils';
import { FN_GetDispatch } from '@/store/nocycle';
import settingsSlice from '@/store/reducers/settingsSlice';
const latestReadForEachModule: {
    [key: string]: SystemSubModuleItem
} = {

}
export type TypeMDParams = {
    mainModuleItem: SystemModuleItem,
    mainSubModuleItem: SystemSubModuleItem,
    mainSubToolID?: string
}
export const useMDParams = (): TypeMDParams => {
    const hist = useHistory()
    const justSysModuleList = systemModulesList
    const splitArr = hist.location.pathname.split('/')
    console.log('splitArr', splitArr)
    const tmp_mainModule = (splitArr && splitArr[1] ? splitArr[1] : justSysModuleList[0].id)
    const mainModuleItem = justSysModuleList.find(x => x.id == tmp_mainModule) || justSysModuleList[0]
    const tmp_mainSubModule = (splitArr && splitArr[2] ? splitArr[2] :
        latestReadForEachModule[mainModuleItem.id] ?
            latestReadForEachModule[mainModuleItem.id].id
            :
            mainModuleItem?.children && mainModuleItem?.children[0].id)
    const mainSubModuleItem = (
        mainModuleItem?.children && mainModuleItem?.children.find(x => x.id == tmp_mainSubModule) || mainModuleItem?.children && mainModuleItem?.children[0]
    ) as SystemSubModuleItem // can never be null, so cast it to SystemSubModuleItem
    const tmp_mainSubToolsID = (splitArr && splitArr[3] ? splitArr[3] : '')
    return {
        mainModuleItem,
        mainSubModuleItem,
        mainSubToolID: tmp_mainSubToolsID
    }
}
const mockdata = [
    { label: 'Dashboard', icon: IconGauge },
    {
        label: 'Market news',
        icon: IconNotes,
        initiallyOpened: true,
        links: [
            { label: 'Overview', link: '/' },
            { label: 'Forecasts', link: '/' },
            { label: 'Outlook', link: '/' },
            { label: 'Real time', link: '/' },
        ],
    },
    {
        label: 'Releases',
        icon: IconCalendarStats,
        links: [
            { label: 'Upcoming releases', link: '/' },
            { label: 'Previous releases', link: '/' },
            { label: 'Releases schedule', link: '/' },
        ],
    },
    { label: 'Analytics', icon: IconPresentationAnalytics },
    { label: 'Contracts', icon: IconFileAnalytics },
    { label: 'Settings', icon: IconAdjustments },
    {
        label: 'Security',
        icon: IconLock,
        links: [
            { label: 'Enable 2FA', link: '/' },
            { label: 'Change password', link: '/' },
            { label: 'Recovery codes', link: '/' },
        ],
    },
];

export function DoubleNavbar(props: {
    mdParams: TypeMDParams,
    toggle: () => void
}) {
    const hideLeftMenu = exportUtils.useSelector(v => v.settings.hideLeftMenu)
    const { mainModuleItem, mainSubModuleItem } = props.mdParams
    const justSysModuleList = systemModulesList

    const mainModule = mainModuleItem.id
    const mainModuleSubItemId = mainSubModuleItem.id

    const fn_mainLinks = (link) => (
        <Tooltip
            label={link.label}
            position="right"
            withArrow
            transitionProps={{ duration: 0 }}
            key={link.label}
        >
            <Link to={`/${link.id}`}>
                <UnstyledButton
                    className={classes.mainLink}
                    data-active={link.id === mainModule || undefined}
                >
                    <link.icon style={{ width: rem(22), height: rem(22) }} stroke={1.5} />
                </UnstyledButton>
            </Link>
        </Tooltip>
    )
    const firstLevel_links = justSysModuleList.filter(x => !x.fixedAtBottom).map(fn_mainLinks);
    const firstLevel_links_btm = justSysModuleList.filter(x => x.fixedAtBottom).map(fn_mainLinks);
    // const jsx_linksgroup = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);
    const jsx_linksgroup = (mainModuleItem?.children || []).map((item,idx) => <LinksGroup key={item.id}
        {...item}
        active={mainModuleSubItemId === item.id || undefined}
        label={item.name}
        href={`/${mainModuleItem.id}/${item.id}${item.defaultSubToolId ? `/${item.defaultSubToolId}` : ''}`}
        initiallyOpened={false}
        links={undefined}
    />);

    const sub_links = (mainModuleItem?.children || []).map((item) => {
        let link = item.id
        if (item.href) {
            return (
                <a
                    className={classes.link}
                    data-active={mainModuleSubItemId === link || undefined}
                    href={item.href}
                    key={link} target='_blank' rel='noreferrer noopener'
                >
                    {item.name}
                </a>
            )
        }
        return (
            <Link
                className={classes.link}
                data-active={mainModuleSubItemId === link || undefined}
                to={

                    `/${mainModuleItem.id}/${item.id}${item.defaultSubToolId ? `/${item.defaultSubToolId}` : ''}`}
                key={link}
                onClick={() => {
                    latestReadForEachModule[mainModuleItem.id] = item
                    props.toggle()
                }}
            >
                {item.name}
            </Link>
        )
    });

    return (
        <nav className={classes.navbar}>
            <div className={classes.wrapper}>
                <div className={classes.aside}>
                    <div className={classes.logo}>
                        <MantineLogo type="mark" size={30} />
                    </div>
                    <div className='flex flex-col  space-y-0 '>
                        {firstLevel_links}
                    </div>
                    <div className='flex flex-col space-y-0 bottom-4 fixed '>
                        <Tooltip
                            label={hideLeftMenu ? '展开左侧目录' : "收起左侧目录"}
                            position="right"
                            withArrow
                            transitionProps={{ duration: 0 }}
                        >
                            <UnstyledButton
                                className={classes.mainLink}
                                onClick={() => {
                                    FN_GetDispatch()(
                                        settingsSlice.actions.updateOneOfParamState({
                                            hideLeftMenu: !hideLeftMenu
                                        })
                                    )
                                }}
                            >
                                <IconSwitchHorizontal style={{ width: rem(22), height: rem(22) }} stroke={1.5} />
                            </UnstyledButton>
                        </Tooltip>

                        {firstLevel_links_btm}
                    </div>

                </div>
                <div className={classes.main}>
                    <Title order={4} className={classes.title}>
                        {mainModuleItem?.label}
                    </Title>
                    <div className='px-2'>
                        <TextInput
                            placeholder={
                                `快速搜索(待发布)`
                            }
                            size="xs"
                            leftSection={<IconSearch style={{ width: rem(12), height: rem(12) }} stroke={1.5} />}
                            rightSectionWidth={70}
                            rightSection={<Code className={classes.searchCode}>Ctrl + K</Code>}
                            styles={{ section: { pointerEvents: 'none' } }}
                            mb="sm"
                        />
                    </div>
                    {jsx_linksgroup}
                    {/* {links} */}
                </div>
            </div>
        </nav>
    );
}