import { useEffect, useMemo, useState } from 'react';
import { UnstyledButton, Tooltip, Title, rem, Stack, TextInput, Code, SegmentedControl } from '@mantine/core';
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
import React from 'react';
import MemorySlice from '@/store/reducers/memorySlice';
import { useHotkeys } from '@mantine/hooks';

export function DoubleNavbar(props: {
    mdParams: TypeMDParams,
    toggle: () => void
}) {
    const hideLeftMenu = exportUtils.useSelector(v => v.settings.hideLeftMenu)
    const { subModuleItem: mainSubModuleItem } = props.mdParams
    const mainModule = props.mdParams.firstRouteId
    const mainModuleItem = props.mdParams.rootModuleItem
    if (!mainSubModuleItem || !mainModuleItem) {
        return <NotFoundPage />
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
                <SecondMenu mdParams={props.mdParams} mainModuleItem={mainModuleItem} />
            </div>
        </nav>
    );
}

export let SecondMenu = (props: {
    mainModuleItem: SystemModuleItem,
    mdParams: TypeMDParams,
}) => {
    const { mainModuleItem } = props
    const [searchCtn, setSearchCtn] = useState('')
    const [actualOpenId, setActualOpenId] = useState(props.mdParams.firstRouteId)
    // const [ scrollPos, setScrollPos ] = useState(0)
    const scrollPos = exportUtils.useSelector(v => v.memory.scrollPos)
    const setScrollPos = (v: number) => {
        FN_GetDispatch()(MemorySlice.actions.updateOneOfParamState({
            scrollPos: v
        }))
    }
    const jsx_linksgroup = useMemo(() => {
        const l2 = _.toLower(searchCtn)
        const hasNoSearch = _.isEmpty(searchCtn)
        const fn_filter_txt = (x: SystemSubModuleItem) => {
            if (hasNoSearch) {
                return true;
            }
            return _.toLower(x.name).indexOf(l2) !== -1
        }
        return (
            (mainModuleItem?.children || []).filter(x => {
                if (x.bodyFn) {
                    return fn_filter_txt(x)
                } else {
                    return true;
                }
            }).map((_item, idx) => {
                const item: SystemSubModuleItem = {
                    ..._item
                }
                if (item.children) {
                    item.children = item.children.filter(xx => {
                        return fn_filter_txt(xx)
                    })
                }
                return (
                    <LinksGroup key={item.id}
                        {...item}
                        setUpdateOpenId={v => {
                            setActualOpenId(v + '')
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
    }, [actualOpenId, props.mdParams.firstRouteId, props.mdParams.secondRouteId, mainModuleItem.children, searchCtn]);
    const ref = React.useRef<{
        ele: HTMLDivElement | null
        eleipt: HTMLDivElement | null
    }>({
        ele: null,
        eleipt: null
    })
    useEffect(() => {
        ref.current?.ele?.scrollTo(0, scrollPos)
    }, [])
    type ControlItem = {
        label: string,
        id: string
    }
    const cfgControls: ControlItem[] = [
        {
            label: '工具',
            id: 'tools'
        },
        {
            label: '文档',
            id: 'docs'
        },
        {
            label: '资源',
            id: 'resources'
        }
    ]
    const [controlId, setControlId] = useState(_.first(cfgControls)?.label)
    useHotkeys([
        ['ctrl+I', () => {
            console.log('Trigger search')
            ref.current.eleipt?.focus()
        }],
    ]);
    return (
        <div onScroll={(e) => {
            setScrollPos(e.currentTarget.scrollTop)
        }} className={classes.main + ' overflow-auto h-[100vh] scrollbar-hide'} ref={e => {
            if (e) {
                ref.current.ele = e 
            }
        }} onClick={e => {

        }}>
            <Title order={4} className={classes.title}>
                {mainModuleItem?.label}
            </Title>
            <div className='mx-2 my-2'>
                <SegmentedControl fullWidth 
                onChange={e=>{
                    setControlId(e)
                }}
                value={controlId} data={cfgControls.map(x=>x.label)} />

            </div>
            <div>
                <div className='px-2'>
                    <TextInput
                        placeholder={
                            `快速搜索` +controlId
                        }
                        ref={e=>{
                            if(e){
                                ref.current.eleipt = e
                            }
                        }}
                        size="xs"
                        value={searchCtn}
                        onChange={e => {
                            setSearchCtn(e.currentTarget.value)
                        }}
                        leftSection={<IconSearch style={{ width: rem(12), height: rem(12) }} stroke={1.5} />}
                        rightSectionWidth={70}
                        rightSection={<Code className={classes.searchCode}>Ctrl + I</Code>}
                        styles={{ section: { pointerEvents: 'none' } }}
                        mb="sm"
                    />
                </div>
                {controlId == '工具'?                jsx_linksgroup : <div className='text-center text-gray-400'>依旧内测中，敬请期待</div>}
            </div>
        </div>
    )
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
