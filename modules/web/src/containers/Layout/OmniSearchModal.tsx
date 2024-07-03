import { ActionIcon, Affix, AppShell, Box, Burger, Button, Group, HoverCard, LoadingOverlay, Modal, Transition, rem } from '@mantine/core';
import { useDisclosure, useDocumentTitle, useWindowScroll } from '@mantine/hooks';
import imgFile from '/src/favicon.png'
import { ColorSchemeToggle, useDarkModeOrNot } from '../../components/ColorSchemeToggle/ColorSchemeToggle';
import { IconArrowUp, IconBrandGithub, IconBrandGithubFilled, IconSourceCode } from '@tabler/icons-react';
import SourceCodeLink from '../../components/SourceCodeLink';
import { DoubleNavbar as SideBar, } from '@/containers/SideBar';
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
import { FN_GetDispatch } from '@/store/nocycle';
import MemorySlice from '@/store/reducers/memorySlice';

export default ()=>{
    const clickQuickSearchInput = exportUtils.useSelector(v => {
        return v.memory.clickQuickSearchInput
    })
    return (
        <Modal 
        fullScreen opened={clickQuickSearchInput} onClose={() => {
                FN_GetDispatch()(
                    MemorySlice.actions.updateOneOfParamState({
                        clickQuickSearchInput: false
                    })
                )
        }} title={
            `秒达工具箱 - 智能全局搜索`
        }>
            <div className='w-[80vw]'>
                <div>are you ok?</div>
            </div>
        </Modal>
    )
}