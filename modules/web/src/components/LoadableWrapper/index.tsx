import React, { useEffect } from "react";
import LoadingView from "../LoadingView";

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

    if (!existCpt) {
        return props.disableLoadingText ? '': 'loading...'
    } else {
        const ExistCpt = existCpt
        return <ExistCpt />
    }

}