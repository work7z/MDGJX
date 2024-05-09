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
    IconArrowUp, IconBrandGithub, IconBrandGithubFilled, IconChevronDown, IconCode, IconSourceCode
} from '@tabler/icons-react';
import SourceCodeLink from '../SourceCodeLink';
import { DoubleNavbar as SideBar } from '@/containers/SideBar';
import GetAppInfo from '@/AppInfo';
import BackToTop from './BackToTop';
import classes from './Header.module.css'

export default (props: {
    opened: boolean,
    toggle: () => void,
}) => {
    let { opened, toggle } = props
    let appInfo = GetAppInfo()
    const theme = useMantineTheme();

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
    return <AppShell.Header className='flex flex-row justify-between px-2 sm:px-5 ' >
        <Group justify='space-between' className='w-full'>
            <Group>
                <Burger
                    opened={opened}
                    onClick={toggle}
                    hiddenFrom="sm"
                    size="sm"
                />
                <img src={imgFile} className='w-[30px]' />
                <div className='ml-[-7px] font-bold text-xl hidden sm:block'>{appInfo.name}({appInfo.link})</div>
                <div className='ml-[-7px] font-bold text-xl block sm:hidden'>{appInfo.name}</div>
            </Group>

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

                <Button variant="default" className=' hidden sm:block '>登录账号</Button>
                <Button className=' hidden sm:block '>免费注册</Button>
            </Group>
        </Group>
    </AppShell.Header>
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