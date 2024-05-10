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
import { SystemModuleItem, SystemSubModuleItem, systemModulesList } from '@/systemModules';
import { Link, useHistory } from 'react-router-dom';

const latestReadForEachModule: {
    [key: string]: SystemSubModuleItem
} = {

}
export type TypeMDParams = {
    mainModuleItem: SystemModuleItem,
    mainSubModuleItem: SystemSubModuleItem
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
    return {
        mainModuleItem,
        mainSubModuleItem
    }
}

export function DoubleNavbar(props: {
    mdParams: TypeMDParams
}) {
    const { mainModuleItem, mainSubModuleItem } = props.mdParams
    const justSysModuleList = systemModulesList

    const mainModule = mainModuleItem.id
    const mainModuleSubItemId = mainSubModuleItem.id

    const mainLinks = justSysModuleList.map((link) => (
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
    ));

    const links = (mainModuleItem?.children || []).map((item) => {
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
                to={`/${mainModuleItem.id}/${item.id}`}
                key={link}
                onClick={() => {
                    latestReadForEachModule[mainModuleItem.id] = item
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
                    {mainLinks}
                </div>
                <div className={classes.main}>
                    <Title order={4} className={classes.title}>
                        {mainModuleItem?.label}
                    </Title>
                    {links}
                </div>
            </div>
        </nav>
    );
}