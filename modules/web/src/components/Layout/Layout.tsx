import { ActionIcon, Affix, AppShell, Burger, Button, Group, HoverCard, Transition, rem } from '@mantine/core';
import { useDisclosure, useWindowScroll } from '@mantine/hooks';
import imgFile from '/src/favicon.png'
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
import { IconArrowUp, IconBrandGithub, IconBrandGithubFilled, IconSourceCode } from '@tabler/icons-react';
import SourceCodeLink from '../SourceCodeLink';
import { DoubleNavbar as SideBar } from '@/containers/SideBar';
import GetAppInfo from '@/AppInfo';
import BackToTop from './BackToTop';
import Header from './Header';
import GenCodeMirror from '../GenCodeMirror';
export function Layout(props: { body: any }) {
    const [opened, { toggle }] = useDisclosure();
    let appInfo = GetAppInfo()
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
                <SideBar />
            </AppShell.Navbar>

            { /** app main */}
            <AppShell.Main >
                <div className='flex flex-col h-full'>
                    <div className='flex-1'>
                        <div>this is flex content</div>
                    </div>
                    <div className='h-[100px]'>
                        <GenCodeMirror bigTextId='' />
                    </div>
                </div>
                <BackToTop />
            </AppShell.Main>
        </AppShell>
    );
}