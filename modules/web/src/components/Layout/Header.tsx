import {
    ActionIcon,
    Text, Affix, Anchor, AppShell, Box, Burger, Button, Center, Divider, Group, HoverCard, SimpleGrid, Transition, rem, useMantineTheme,
    UnstyledButton,
    ThemeIcon
} from '@mantine/core';
import { useDisclosure, useWindowScroll } from '@mantine/hooks';
import imgFile from '/src/favicon.png'
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
import {
    IconNotification,
    IconBook,
    IconChartPie3,
    IconFingerprint,
    IconCoin,
    IconArrowUp, IconBrandGithub, IconBrandGithubFilled, IconChevronDown, IconCode, IconSourceCode,
    IconUser,
    IconUserCircle
} from '@tabler/icons-react';
import SourceCodeLink from '../SourceCodeLink';
import { DoubleNavbar as SideBar } from '@/containers/SideBar';
import GetAppInfo from '@/AppInfo';
import BackToTop from './BackToTop';
import classes from './Header.module.css'
import { Link } from 'react-router-dom';
import exportUtils from '@/utils/ExportUtils';
import AuthUtils from '@/utils/AuthUtils';
import info from '@/meta/info';

export default (props: {
    opened: boolean,
    toggle: () => void,
}) => {
    let { opened, toggle } = props
    let appInfo = GetAppInfo()
    const theme = useMantineTheme();

    const userObj = exportUtils.useSelector(v => {
        return v.users
    })
    const userAcctJSX = <Link to={'/settings/my-account?type=usercenter'}>   <ActionIcon size='lg' variant="default" className=' '>{
        <IconUserCircle stroke={1.5} />
    }</ActionIcon></Link>
    return <AppShell.Header className='flex flex-row justify-between px-2 sm:px-5 ' >
        <Group justify='space-between' className='w-full'>
            <Link to={'/tools/index'}>
                <Group>
                    <Burger
                        opened={opened}
                        onClick={toggle}
                        hiddenFrom="sm"
                        size="sm"
                    />
                    <img src={imgFile} className='w-[30px]' />
                    <div className='ml-[-7px] font-bold text-xl hidden sm:block'>{appInfo.name}({info.version})</div>
                    {/* appInfo.link */}
                    <div className='ml-[-7px] font-bold text-xl block sm:hidden'>{appInfo.name}</div>
                </Group>
            </Link>

            {/* <Group h="100%" gap={0} visibleFrom="sm">
                <a href="#" className={classes.link + ' ' + classes.active}>
                    Chat对话框
                </a>
                <a href="#" className={classes.link}>
                    功能总览(193)
                </a>
                <a href="#" className={classes.link}>
                    我的收藏(0)
                </a>
            </Group> */}

            <Group gap={6}>
                <ColorSchemeToggle />
                <SourceCodeLink />
                {
                    userObj.hasSignIn ? [
                        userAcctJSX,
                        <Button variant="default" onClick={() => {
                            AuthUtils.signOut()
                        }} className=' hidden sm:block ' > {
                                "登出"
                            }</Button>
                        // <Link to={'/settings/my-account?type=signin'}>   <Button variant="default" className=' hidden sm:block '>登出</Button></Link>,
                    ] : [
                        <Link className=' block sm:hidden ' to={'/settings/my-account?type=usercenter'}>   <ActionIcon size='lg' variant="default" className=' '>{
                            <IconUserCircle stroke={1.5} />
                        }</ActionIcon></Link>,
                        < Link to={'/settings/my-account?type=signin'} > <Button variant="default" className=' hidden sm:block '>登录账号</Button></Link>,
                        <Link to={'/settings/my-account?type=signup'}>
                            <Button className=' hidden sm:block '>免费注册</Button>
                        </Link>
                    ]
                }
            </Group>
        </Group >
    </AppShell.Header >
}



/**
    <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
                    <HoverCard.Target>
                        <a href="#" className={classes.link}>
                            <Center inline>
                                <Box component="span" mr={5}>
                                    常用功能
                                </Box>
                                <IconChevronDown
                                    style={{ width: rem(16), height: rem(16) }}
                                    color={theme.colors.blue[6]}
                                />
                            </Center>
                        </a>
                    </HoverCard.Target>

                    <HoverCard.Dropdown style={{ overflow: 'hidden' }}>
                        <Group justify="space-between" px="md">
                            <Text fw={500}>Features</Text>
                            <Anchor href="#" fz="xs">
                                View all
                            </Anchor>
                        </Group>

                        <Divider my="sm" />

                        <SimpleGrid cols={2} spacing={0}>
                            {links}
                        </SimpleGrid>

                        <div className={classes.dropdownFooter}>
                            <Group justify="space-between">
                                <div>
                                    <Text fw={500} fz="sm">
                                        Get started
                                    </Text>
                                    <Text size="xs" c="dimmed">
                                        Their food sources have decreased, and their numbers
                                    </Text>
                                </div>
                                <Button variant="default">Get started</Button>
                            </Group>
                        </div>
                    </HoverCard.Dropdown>
                </HoverCard>
 */