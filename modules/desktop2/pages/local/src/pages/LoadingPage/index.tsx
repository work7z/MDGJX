import { APP_GET_BRIDGE } from '@/lib2-copy/bridge'
import icon from '../../assets/icon.png'
import { Button, Progress } from '@mantine/core'

export default ()=>{
    const bridgeRef = APP_GET_BRIDGE(window)

    return <div style={{
        '-webkit-app-region':'drag'
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
                    基于AI智能分析，秒级送达各类工具、文档及笔记等资源
                </div>
                <div className='text-sky-500 text-base font-semibold'>
                    免费 / 安全 / 开源 / 智能
                </div>
                <div className=' mx-auto w-full text-sm text-center'>
                    www.MDGJX.com
                </div>
            </div>
        </div>
        
        <div className='left-0 w-full  absolute bottom-[29px]'>
            <Progress value={50} striped animated />
        </div>
        <div className='bg-gray-200 w-full text-right mx-auto text-[12px] text-gray-500 p-1  flex justify-between items-center text-center absolute bottom-0 right-0 '>
            <div>
                <Button variant='outline' size='compact-xs' className='border-none' color='gray' onClick={()=>{
                    //
                }}>查看日志</Button>
                <Button onClick={()=>{
                    if(confirm("很抱歉错误的产生，我们将发送错误报告到服务器，以便调查修复，是否继续？")){
                        // send error report
                    }
                }} variant='outline' size='compact-xs' className='border-none' color='gray'>报告错误</Button>
            </div>
            <div>
                构建信息: {bridgeRef?.getConfig()?.buildInfo || 'v5.3.31 & v3.1.23 on 2032-10-21'}
            </div>
        </div>
    </div>
}