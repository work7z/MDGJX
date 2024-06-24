import React, { useEffect } from "react";
import LoadingView from "../LoadingView";
import { Anchor, Skeleton } from "@mantine/core";
import Blink from "../Blink";

// const LoadRes: { key: any, value: any }[] = [];
const LoadResObj = {}

export default (props: {disableLoadingText?:boolean, id: string, fn: any }) => {
    // TODO: do GC later
    const [loadCtn, setLoadCtn] = React.useState<number>(0);
    const existCpt = LoadResObj[props.id];
    useEffect(() => {
        let runIt = ()=>{
            props.fn().then(e => {
                LoadResObj[props.id] = e.default
                setLoadCtn(loadCtn + 1)
            }).catch(e => {
                console.error(e)
            })
            if(!existCpt){
                setTimeout(()=>{
                    runIt()
                },400)
            }
        }
        if (!existCpt) {
            runIt()
        }
    }, [props.id])

    if ( !existCpt) {
        return props.disableLoadingText ? '': 
           <LoadingTmpView/>
    } else {
        const ExistCpt = existCpt
        return <ExistCpt />
    }

}
export const LoadingTmpView = ()=>{
        const [waitTooLong, setWaitTooLong] = React.useState(false)
    useEffect(() => {
        setTimeout(() => {
            setWaitTooLong(true)
        }, 5000)
    }, [])
    return (
         <>
            <div className="mb-2 text-sm">
                正在加载数据中，请稍候<Blink max={8} min={2} />
                {
                        waitTooLong ? <div className="text-red-500">抱歉，如果加载时间过长，可能是当前网络不稳定，请<Anchor onClick={()=>{
                            location.reload()
                        }}>刷新页面</Anchor></div> : ''
                }
            </div>
                <Skeleton height={8} radius="xl" />
                <Skeleton height={8} mt={6} radius="xl" />
                <Skeleton height={8} mt={6} width="70%" radius="xl" />
                </>
    )
}