import { ActionIcon, Affix, AppShell, Box, Burger, Button, Group, HoverCard, LoadingOverlay, Transition, rem } from '@mantine/core';
import { useDisclosure, useDocumentTitle, useWindowScroll } from '@mantine/hooks';
import imgFile from '/src/favicon.png'
import { ColorSchemeToggle, useDarkModeOrNot } from '../../components/ColorSchemeToggle/ColorSchemeToggle';
import { IconArrowUp, IconBrandGithub, IconBrandGithubFilled, IconSourceCode } from '@tabler/icons-react';
import SourceCodeLink from '../../components/SourceCodeLink';
import { DoubleNavbar as SideBar,  } from '@/containers/SideBar';
import GetAppInfo from '@/AppInfo';
import BackToTop from './BackToTop';
import Header from './Header';
import GenCodeMirror from '../../components/GenCodeMirror';
import {
    withRouter,
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    Redirect,
    useParams,
    useRouteMatch,
} from "react-router-dom";
import React, { useMemo } from 'react';
import LoadingView from '../../components/LoadingView';
import { FooterCentered } from './Footer';
import LoadableWrapper from '../../components/LoadableWrapper';
import { getBridgeRef, isDesktopMode } from '@/utils/DesktopUtils';
import exportUtils from '@/utils/ExportUtils';
import { useMDParams } from '@/systemHooks';

export let useWrapWithTitle = (title: string) => {
    const finalTitle = isDesktopMode()?`${title} - 秒达工具箱`:`${title}`
    useDocumentTitle(`${finalTitle}`)
    if(isDesktopMode()){
        getBridgeRef()?.updateTitle(finalTitle)
    }
}
const FIXED_COLUMN_WIDTH=60
export function GeneralLayout(props) {
    const mdParams = useMDParams()
    const { rootModuleItem: rootModuleItem, subModuleItem: mainSubModuleItem } = mdParams
    const darkOrNot = useDarkModeOrNot()
    const [opened, { toggle }] = useDisclosure();
    let bodyFn = mainSubModuleItem.bodyFn
    useWrapWithTitle(mainSubModuleItem.name + ` - ${rootModuleItem.label}`)
    const hist = useHistory()
    const hideLeftMenu = exportUtils.useSelector(v => v.settings.hideLeftMenu)
    let bodyJSX: JSX.Element = useMemo(() => {
        if (bodyFn) {
            const loadFn = mainSubModuleItem.bodyFn
            return (
                <LoadableWrapper id={`${mdParams.firstRouteId}-${mainSubModuleItem.id}`} fn={loadFn} />
            )
        } else {
            return <div>当前页面正在重构中，敬请期待 </div>
        }
    }, [bodyFn, hist.location.pathname])

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
            }}
            transitionDuration={500}
            transitionTimingFunction="ease"
            padding="sm"
            className={darkOrNot ? 'dark' : ''}
        >
            { /** app header */}
            <Header opened={opened} toggle={toggle} />

            { /** app sidebar */}
            <AppShell.Navbar p="md" px={0} py={0} mb={0} style={{
                height: '100%',
                ...(hideLeftMenu?{
                    width: FIXED_COLUMN_WIDTH+'px',
                    overflow:'hidden'
                }:{})
            }}>
                <SideBar mdParams={mdParams} toggle={toggle} />
            </AppShell.Navbar>

            { /** app main */}
            <AppShell.Main style={{
                ...(hideLeftMenu ? {
                    // paddingLeft: (FIXED_COLUMN_WIDTH+10) + 'px',
                } : {})
            }} className={
            `pl-[10px] `+(
                hideLeftMenu? (`  sm:pl-[70px] `):' sm:pl-[310px] '
            )
            }>
                {bodyJSX}
            </AppShell.Main>
            {
                mainSubModuleItem.disableFooter ? '' : <FooterCentered />
            }
        </AppShell>
    );
}

{/* <div className='flex flex-col h-full'>
                    <div className='flex-1'>
                        <div>this is flex content</div>
                    </div>
                    <div className='h-[100px]'>
                        <GenCodeMirror bigTextId='' />
                    </div>
                </div> */}
