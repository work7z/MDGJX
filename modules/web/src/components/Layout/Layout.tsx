import { ActionIcon, Affix, AppShell, Burger, Button, Group, Transition, rem } from '@mantine/core';
import { useDisclosure, useWindowScroll } from '@mantine/hooks';
import imgFile from '/src/favicon.png'
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
import { IconArrowUp, IconBrandGithub, IconBrandGithubFilled, IconSourceCode } from '@tabler/icons-react';
import SourceCodeLink from '../SourceCodeLink';
import { DoubleNavbar as AppNavbar } from '@/containers/AppNavbar/navbar';
export function Layout(props: { body: any }) {
    const [opened, { toggle }] = useDisclosure();
    const [scroll, scrollTo] = useWindowScroll();

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
            <AppShell.Header className='flex flex-row justify-between px-2 sm:px-5 ' >
                <Group>
                    <Burger
                        opened={opened}
                        onClick={toggle}
                        hiddenFrom="sm"
                        size="sm"
                    />
                    <img src={imgFile} className='w-[30px]' />
                    <div className='ml-[-7px] font-bold text-xl hidden sm:block'>索道工具箱(LafTools)</div>
                    <div className='ml-[-7px] font-bold text-xl block sm:hidden'>索道工具箱</div>
                </Group>
                <Group gap={6}>
                    <SourceCodeLink />
                    <ColorSchemeToggle />
                </Group>
            </AppShell.Header>

            <AppShell.Navbar p="md" style={{
                padding: 0,
                height: '100%',
            }}>
                <AppNavbar />
            </AppShell.Navbar>

            <AppShell.Main>
                <div style={{
                    height: '200vh',
                }}>
                    Main
                </div>


                <Affix position={{ bottom: 20, right: 20 }}>
                    <Transition transition="slide-up" mounted={scroll.y > 0}>
                        {(transitionStyles) => (
                            <Button
                                leftSection={<IconArrowUp style={{ width: rem(16), height: rem(16) }} />}
                                style={transitionStyles}
                                onClick={() => scrollTo({ y: 0 })}
                            >
                                回到顶部
                            </Button>
                        )}
                    </Transition>
                </Affix>
            </AppShell.Main>
        </AppShell>
    );
}