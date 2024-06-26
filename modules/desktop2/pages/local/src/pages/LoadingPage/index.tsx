import { APP_GET_BRIDGE } from '@/lib2-copy/bridge'
import icon from '../../assets/icon.png'
import { Button, Progress } from '@mantine/core'
import { APP_GET_MSG, APP_SET_MSG, MSG_REF, OBJ_MSG_TYPE_IPC_RENDER } from '@/lib2-copy/msg'
import { useCallback, useEffect, useRef, useState } from 'react'
import _ from 'lodash'
import { RES_PushMDGJXStatus } from '@/lib2-copy/types'



export default () => {
    const bridgeRef = APP_GET_BRIDGE(window)
    const [currentMsg, setCurrentMsg] = useState('等待启动本地核心服务中...')
    const [updateCtn, setUpdateCtn] = useState(2)
    // const timeoutRef = useRef<{ timer: any, loadRate: number }>({
    //     timer: null,
    //     loadRate: 0
    // })
    const run_mdgjx_minimal_fn = useCallback(_.throttle(() => {
        APP_GET_MSG(window)?.ipcRender_send('startRunMDGJXMinimal').then(x => {
            console.log('startRunMDGJXMinimal', x)
        }).catch(e => {
            console.error('startRunMDGJXMinimal', e)
        })
    }, 1000), [])
    useEffect(() => {
        APP_GET_MSG(window)?.registerIpcRenderOn('loading-pages', async (key, value) => {
            if (key == 'pushInitStatusToRender') {
                const body: RES_PushMDGJXStatus = value;
                console.log(body)
                setCurrentMsg(body?.msg)
                setUpdateCtn(body?.pct)
                return true;
            } else {
                return false;
            }
        })
    }, [])
    useEffect(() => {
        run_mdgjx_minimal_fn()
    }, [])
    // useEffect(() => {
    //     const updateIt = () => {
    //         if (timeoutRef.current.loadRate >= 81.8) {
    //             clearTimeout(timeoutRef.current.timer)
    //             return
    //         }
    //         timeoutRef.current.loadRate = timeoutRef.current.loadRate + 1
    //         timeoutRef.current.timer = setTimeout(updateIt, Math.random() * 600 + 10)
    //         setUpdateCtn(timeoutRef.current.loadRate)
    //     }
    //     timeoutRef.current.timer = setTimeout(updateIt, 100)
    //     return () => {
    //     }
    // }, [])

    return <div style={{
        WebkitAppRegion: 'drag'
    } as any} className=" shadow-xl bg-gray-50 p-2 w-[620px] h-[330px] relative">
        <div>
            <h1 className="text-4xl text-center py-16 pb-6 items-center justify-center flex mx-auto space-x-4">
                <img src={icon} className='w-[50px] h-[50px]' />
                <span>
                    秒达工具箱
                </span>
            </h1>
            <div className=' mx-auto w-[80%] text-center space-y-2'>
                <div className='space-y-2'>
                    基于AI智能分析，一秒即达各类工具、文档及笔记等资源
                </div>
                <div className='text-sky-500 text-base font-semibold'>
                    免费 / 安全 / 开源 / 智能
                </div>
                <div className=' mx-auto w-full text-sm text-center'>
                    www.MDGJX.com
                </div>
            </div>
        </div>
        <div className='left-0 w-full flex justify-between items-center text-xs text-gray-500 px-2  absolute bottom-[42px]'>
            <div>
                {currentMsg}
            </div>
            <div>{updateCtn.toFixed(0)}%</div>
        </div>
        <div className='left-0 w-full  absolute bottom-[29px]'>
            <Progress key={updateCtn} value={updateCtn} striped animated />
        </div>
        <div
            style={{
                WebkitAppRegion: 'no-drag'
            } as any}
            className='bg-gray-200 w-full text-right mx-auto text-[12px] text-gray-500 p-1  flex justify-between items-center text-center absolute bottom-0 right-0 '>
            <div>
                <Button variant='outline' size='compact-xs' className='border-none' color='gray' onClick={() => {
                    APP_GET_MSG(window)?.ipcRender_send('openLogDir')
                }}>查看日志</Button>
                {/* <Button onClick={() => {
                    if (confirm("很抱歉错误的产生，我们将发送错误报告到服务器，以便调查修复，是否继续？")) {
                        // send error report
                        MSG_REF.ipcRender_send('reportLogToServer')
                    }
                }} variant='outline' size='compact-xs' className='border-none' color='gray'>报告错误</Button> */}
                <Button onClick={() => {
                    alert(`技术QQ群: 106038310  或 电子邮件: work7z@outlook.com`)
                }} variant='outline' size='compact-xs' className='border-none' color='gray'>联系我们</Button>
                <Button variant='outline' size='compact-xs' className='border-none' color='gray' onClick={() => {
                    window.open(`https://github.com/work7z/MDGJX`)
                }}>源代码</Button>
            </div>
            <div>
                构建信息: {bridgeRef?.getConfig()?.buildInfo || 'v5.3.31 & v3.1.23 on 2032-10-21'}
            </div>
        </div>
    </div>
}