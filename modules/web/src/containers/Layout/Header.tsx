import {
    ActionIcon,
    Text, Affix, Anchor, AppShell, Box, Burger, Button, Center, Divider, Group, HoverCard, SimpleGrid, Transition, rem, useMantineTheme,
    UnstyledButton,
    ThemeIcon,
    Tooltip,
    Autocomplete
} from '@mantine/core';
import { useDisclosure, useWindowScroll } from '@mantine/hooks';
import imgFile from '/src/favicon.png'
import { ColorSchemeToggle } from '../../components/ColorSchemeToggle/ColorSchemeToggle';
import {
    IconNotification,
    IconBook,
    IconChartPie3,
    IconFingerprint,
    IconCoin,
    IconArrowUp, IconBrandGithub, IconBrandGithubFilled, IconChevronDown, IconCode, IconSourceCode,
    IconUser,
    IconUserCircle,
    IconSearch
} from '@tabler/icons-react';
import SourceCodeLink from '../../components/SourceCodeLink';
import { DoubleNavbar as SideBar } from '@/containers/SideBar';
import GetAppInfo from '@/AppInfo';
import BackToTop from './BackToTop';
import classes from './Header.module.css'
import { Link, useHistory } from 'react-router-dom';
import exportUtils from '@/utils/ExportUtils';
import AuthUtils from '@/utils/AuthUtils';
import { isDevEnv } from '@/env';
import settingsSlice from '@/store/reducers/settingsSlice';
import { FN_GetDispatch } from '@/store/nocycle';

const mockdata = [
    {
        icon: IconCode,
        title: 'Open source',
        description: 'This Pokémon’s cry is very loud and distracting',
    },
    {
        icon: IconCoin,
        title: 'Free for everyone',
        description: 'The fluid of Smeargle’s tail secretions changes',
    },
    {
        icon: IconBook,
        title: 'Documentation',
        description: 'Yanma is capable of seeing 360 degrees without',
    },
    {
        icon: IconFingerprint,
        title: 'Security',
        description: 'The shell’s rounded shape and the grooves on its.',
    },
    {
        icon: IconChartPie3,
        title: 'Analytics',
        description: 'This Pokémon uses its flying ability to quickly chase',
    },
    {
        icon: IconNotification,
        title: 'Notifications',
        description: 'Combusken battles with the intensely hot flames it spews',
    },
];
export default (props: {
    opened: boolean,
    toggle: () => void,
}) => {
    let { opened, toggle } = props
    let appInfo = GetAppInfo()
    const theme = useMantineTheme();
    const hist = useHistory()
    const userObj = exportUtils.useSelector(v => {
        return v.users
    })
    const devConfig_usingLocalExtViewConfig = exportUtils.useSelector(v => v.settings.devConfig_usingLocalExtViewConfig)
    const updateUsingLocalExtViewOrNot = (type: boolean) => {
        FN_GetDispatch()(
            settingsSlice.actions.updateOneOfParamState({
                devConfig_usingLocalExtViewConfig: type
            })
        )
    }

    const links = mockdata.map((item) => (
        <UnstyledButton className={classes.subLink} key={item.title}>
            <Group wrap="nowrap" align="flex-start">
                <ThemeIcon size={34} variant="default" radius="md">
                    <item.icon style={{ width: rem(22), height: rem(22) }} color={theme.colors.blue[6]} />
                </ThemeIcon>
                <div>
                    <Text size="sm" fw={500}>
                        {item.title}
                    </Text>
                    <Text size="xs" c="dimmed">
                        {item.description}
                    </Text>
                </div>
            </Group>
        </UnstyledButton>
    ));
    // TODO: 在header处发送获取所有菜单栏导航栏的信息，并且一次性patch到store里
    // 这里所有菜单栏的信息，是通过各个插件下的miaoda-dist.json去获取的
    const userAcctJSX = <Link to={'/settings/my-account?type=usercenter'}>   <ActionIcon size='lg' variant="default" className=' '>{
        <IconUserCircle stroke={1.5} />
    }</ActionIcon></Link>
    return <AppShell.Header className='flex flex-row justify-between px-2 sm:px-5 ' >
        <Group justify='space-between' className='w-full'>
            <Group className='flex flex-row'  >
                <Burger
                    opened={opened}
                    onClick={toggle}
                    hiddenFrom="sm"
                    size="sm"
                />
                <img src={imgFile} className='w-[30px]' />
                <div className='ml-[-7px] cursor-pointer font-bold text-xl hidden sm:block' onClick={() => {
                    hist.push('/tools/index')
                }}>{appInfo.name}({appInfo.version})</div>
                <div className='ml-[-7px] font-bold text-xl block sm:hidden'>{appInfo.name}</div>
            </Group>

            {
                isDevEnv() ? <Group h="100%" gap={0} 
                // className=' absolute left-[50%]  ' style={{
                //     transform: 'translateX(-50%)'
                // }}
                 visibleFrom="sm">
                    {/* <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
                    <HoverCard.Target>
                        <a href="#" className={classes.link}>
                            <Center inline>
                                <Box component="span" mr={5}>
                                    收藏夹(0)
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
                            <Text fw={500}>收藏夹</Text>
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
                </HoverCard> */}

                    <a href="#" className={classes.link}>
                        随记
                    </a>
                    <a href="#" className={classes.link}>
                        翻译
                    </a>
                    

                    {/* <a href="#" className={classes.link}>
                        云空间
                    </a> */}

                    <a href="#" className={classes.link}>
                        轻听自然
                    </a>

                    <a href="#" className={classes.link + ' active '}>
                        智能助手
                    </a>

                </Group> : ''
            }

            <Group gap={6}>

                {
                    isDevEnv() ? <Autocomplete
                        className={classes.search}
                        placeholder="快速搜索"

                        rightSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                        data={['React', 'Angular', 'Vue', 'Next.js', 'Riot.js', 'Svelte', 'Blitz.js']}
                        visibleFrom="xs"
                    />
                        : ''
                }
                <ColorSchemeToggle />
                <SourceCodeLink />
                {
                    userObj.hasSignIn ? [
                        userAcctJSX,
                        isDevEnv() ? <Tooltip label={
                            "开发配置: " + (
                                !devConfig_usingLocalExtViewConfig ? '当前使用云端配置，点击后切换到本地菜单' : '当前使用本地配置，点击后切换到云端菜单'
                            )
                        }>
                            <Button variant={
                                devConfig_usingLocalExtViewConfig ? "light" : "default"
                            } color='orange' onClick={() => {
                                updateUsingLocalExtViewOrNot(!devConfig_usingLocalExtViewConfig)
                            }} className=' hidden sm:block ' > {
                                    !devConfig_usingLocalExtViewConfig ? "云端" : '本地'
                                }</Button>
                        </Tooltip> : '',
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
 */