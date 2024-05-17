import { ActionIcon, Affix, AppShell, Box, Burger, Button, Group, HoverCard, LoadingOverlay, Transition, rem } from '@mantine/core';
import { useDisclosure, useWindowScroll } from '@mantine/hooks';
import imgFile from '/src/favicon.png'
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
import { IconArrowUp, IconBrandGithub, IconBrandGithubFilled, IconSourceCode } from '@tabler/icons-react';
import SourceCodeLink from '../SourceCodeLink';
import { DoubleNavbar as SideBar, useMDParams } from '@/containers/SideBar';
import GetAppInfo from '@/AppInfo';
import BackToTop from './BackToTop';
import Header from './Header';
import GenCodeMirror from '../GenCodeMirror';
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
import React from 'react';
import LoadingView from '../LoadingView';
import { FooterCentered } from './Footer';
import LoadableWrapper from '../LoadableWrapper';

export function GeneralLayout(props) {
    const mdParams = useMDParams()
    const { mainModuleItem, mainSubModuleItem } = mdParams
    const [opened, { toggle }] = useDisclosure();
    let appInfo = GetAppInfo()
    let bodyJSX: JSX.Element = (
        <div>当前页面正在重构中，敬请期待 </div>
    );
    if (mainSubModuleItem.bodyFn) {
        bodyJSX = (
            <LoadableWrapper fn={mainSubModuleItem.bodyFn} />
        )
    }
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
        >
            { /** app header */}
            <Header opened={opened} toggle={toggle} />

            { /** app sidebar */}
            <AppShell.Navbar p="md" px={0} py={0} mb={0} style={{
                height: '100%',
            }}>
                <SideBar mdParams={mdParams} />
            </AppShell.Navbar>

            { /** app main */}
            <AppShell.Main >
                {bodyJSX}

            </AppShell.Main>
            <FooterCentered />
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
