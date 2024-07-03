import { ActionIcon, Affix, AppShell, Box, Burger, Button, Group, HoverCard, LoadingOverlay, Modal, TextInput, Transition, rem } from '@mantine/core';
import { useDisclosure, useDocumentTitle, useWindowScroll } from '@mantine/hooks';
import imgFile from '/src/favicon.png'
import { ColorSchemeToggle, useDarkModeOrNot } from '../../components/ColorSchemeToggle/ColorSchemeToggle';
import { IconArrowUp, IconBrandGithub, IconBrandGithubFilled, IconSearch, IconSourceCode } from '@tabler/icons-react';
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
    const [searchCtn, setSearchCtn] = React.useState('')
    const ref = React.useRef<{
        eleipt: any
    }>({
        eleipt: null
    })
    const whenHello :"早上好"|"中午好"| "下午好" | "晚上好" = (()=>{
        const now = new Date()
        const hours = now.getHours()
        if(hours>=0&&hours<12){
            return "早上好"
        }else if(hours>=12&&hours<14){
            return "中午好"
        }else if(hours>=14&&hours<18){
            return "下午好"
        }else if(hours>=18&&hours<=23){
            return "晚上好"
        }
        return "早上好"
    })()
    return (
        <Modal 
        fullScreen opened={clickQuickSearchInput} onClose={() => {
                FN_GetDispatch()(
                    MemorySlice.actions.updateOneOfParamState({
                        clickQuickSearchInput: false
                    })
                )
        }} title={
            `秒达工具箱 - 快速搜索面板`
        }>
            <div className='flex flex-col w-[100%]'>
                <TextInput
                    name='quicksearch'
                    placeholder={
                        whenHello +`，请输入关键词以搜索您所需的功能，支持拼音大小写`
                    }
                    ref={e => {
                        if (e) {
                            ref.current.eleipt = e
                            setTimeout(()=>{
                                e.focus()
                            },300)
                        }
                    }}
                    autoFocus
                    size="xl"
                    value={searchCtn}
                    onChange={e => {
                        setSearchCtn(e.currentTarget.value)
                    }}
                    leftSection={<IconSearch style={{ width: rem(24), height: rem(24) }} stroke={1.5} />}
                    styles={{ section: { pointerEvents: 'none' } }}
                />
                <div className='flex-1 bg-red-100 ' style={{
                    height: 'calc(100% - 60px)'
                }}>
                    <div>bg</div>
                </div>
            </div>
        </Modal>
    )
}