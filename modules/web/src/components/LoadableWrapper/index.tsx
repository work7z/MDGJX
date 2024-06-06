import React, { useEffect } from "react";
import LoadingView from "../LoadingView";

// const LoadRes: { key: any, value: any }[] = [];
const LoadResObj = {}

export default (props: {disableLoadingText?:boolean, id: string, fn: any }) => {
    // TODO: do GC later
    const [loadCtn, setLoadCtn] = React.useState<number>(0);
    const existCpt = LoadResObj[props.id];
    useEffect(() => {
        if (!existCpt) {
            props.fn().then(e => {
                LoadResObj[props.id] = e.default
                setLoadCtn(loadCtn + 1)
            })
        }
    }, [props.id])

    if (!existCpt) {
        return props.disableLoadingText ? '': 'loading...'
    } else {
        const ExistCpt = existCpt
        return <ExistCpt />
    }

}