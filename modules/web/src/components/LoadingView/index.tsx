import { ActionIcon, Affix, AppShell, Box, Burger, Button, Group, HoverCard, LoadingOverlay, Transition, rem } from '@mantine/core';
import { useDisclosure, useWindowScroll } from '@mantine/hooks';
import imgFile from '/src/favicon.png'
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
import { IconArrowUp, IconBrandGithub, IconBrandGithubFilled, IconSourceCode } from '@tabler/icons-react';
import SourceCodeLink from '../SourceCodeLink';
import { DoubleNavbar as SideBar, useMDParams } from '@/containers/SideBar';
import GetAppInfo from '@/AppInfo';
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
export default () => {
    return (
        <Box pos="relative" className='h-[100px]'>
            <LoadingOverlay visible={true} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
            loading...
        </Box>
    )
}