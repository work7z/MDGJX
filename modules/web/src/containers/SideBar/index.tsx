import { useMemo, useState } from 'react';
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
import { ROUTE_CPT_MAPPING, SystemModuleItem, SystemSubModuleItem, systemModulesList } from '@/systemModules';
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
import { TypeMDParams } from '@/systemHooks';
import { NotFoundPage } from '@/pages/NotFound.page';

export function DoubleNavbar(props: {
    mdParams: TypeMDParams,
    toggle: () => void
}) {
    const hideLeftMenu = exportUtils.useSelector(v => v.settings.hideLeftMenu)
    const {  subModuleItem: mainSubModuleItem  } = props.mdParams
    const mainModule = props.mdParams.firstRouteId
    const mainModuleItem = props.mdParams.rootModuleItem
    const [searchCtn, setSearchCtn] = useState('')
    if(!mainSubModuleItem || !mainModuleItem){
        return <NotFoundPage/>
    }
    const fn_mainLinks = (item: SystemModuleItem) => (
        <Tooltip
            label={item.label}
            position="right"
            withArrow
            transitionProps={{ duration: 0 }}
            key={item.label}
        >
            <Link to={`${item.defaultHref}`}>
                <UnstyledButton
                    className={classes.mainLink}
                    data-active={item.id === props.mdParams.rootModuleItem.id || undefined}
                >
                    {
                        item.icon ? <item.icon style={{ width: rem(22), height: rem(22) }} stroke={1.5} /> : ''
                    }
                </UnstyledButton>
            </Link>
        </Tooltip>
    )

    const { firstLevel_links, firstLevel_links_btm } = useMemo(() => {
        return {
            firstLevel_links: systemModulesList.filter(x => !x.fixedAtBottom).map(fn_mainLinks),
            firstLevel_links_btm: systemModulesList.filter(x => x.fixedAtBottom).map(fn_mainLinks)
        }
    }, [systemModulesList]);
    const [actualOpenId,setActualOpenId] = useState(props.mdParams.firstRouteId)
    const jsx_linksgroup = useMemo(() => {
        const l2 =_.toLower(searchCtn)
        const hasNoSearch = _.isEmpty(searchCtn)
        const fn_filter_txt = (x: SystemSubModuleItem) => {
            if (hasNoSearch){
                return true;
            }
            return  _.toLower(x.name).indexOf(l2) !== -1
        }
        return (
            (mainModuleItem?.children || []).filter(x=>{
                if(x.bodyFn){
                    return fn_filter_txt(x)
                }else{
                    return true;
                }
            }).map((_item, idx) => {
                const item: SystemSubModuleItem = {
                    ..._item
                }
                if (item.children){
                    item.children = item.children.filter(xx => {
                        return fn_filter_txt(xx)
                    })
                }
                return (
                    <LinksGroup key={item.id}
                        {...item}
                        setUpdateOpenId={v=>{
                            setActualOpenId(v+'')
                        }}
                        forceOpen={!hasNoSearch}
                        actualOpenId={actualOpenId}
                        // initiallyOpened={isOpenedByDefault}
                        isItActive={item => {
                            return item.id == props.mdParams.secondRouteId && item.firstRouteId == props.mdParams.firstRouteId
                        }}
                        getHrefValue={item => {
                            return item.href + '';
                        }}
                    />
                )
            })
        )
    }, [actualOpenId,props.mdParams.firstRouteId, props.mdParams.secondRouteId, mainModuleItem.children, searchCtn]);

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
                <div className={classes.main + ' overflow-auto h-[100vh] scrollbar-hide'}>
                    <Title order={4} className={classes.title}>
                        {mainModuleItem?.label}
                    </Title>
                    <div>
                        <div className='px-2'>
                            <TextInput
                                placeholder={
                                    `快速搜索`
                                }
                                size="xs"
                                value={searchCtn}
                                onChange={e => {
                                    setSearchCtn(e.currentTarget.value)
                                }}
                                leftSection={<IconSearch style={{ width: rem(12), height: rem(12) }} stroke={1.5} />}
                                rightSectionWidth={70}
                                rightSection={<Code className={classes.searchCode}>Ctrl + K</Code>}
                                styles={{ section: { pointerEvents: 'none' } }}
                                mb="sm"
                            />
                        </div>
                        {jsx_linksgroup}
                    </div>
                </div>
            </div>
        </nav>
    );
}

// const sub_links = (mainModuleItem?.children || []).map((item) => {
//     let link = item.id
//     if (item.href) {
//         return (
//             <a
//                 className={classes.link}
//                 data-active={mainModuleSubItemId === link || undefined}
//                 href={item.href}
//                 key={link} target='_blank' rel='noreferrer noopener'
//             >
//                 {item.name}
//             </a>
//         )
//     }
//     return (
//         <Link
//             className={classes.link}
//             data-active={mainModuleSubItemId === link || undefined}
//             to={

//                 `/${mainModuleItem.id}/${item.id}${item.defaultSubToolId ? `/${item.defaultSubToolId}` : ''}`}
//             key={link}
//             onClick={() => {
//                 latestReadForEachModule[mainModuleItem.id] = item
//                 props.toggle()
//             }}
//         >
//             {item.name}
//         </Link>
//     )
// });
