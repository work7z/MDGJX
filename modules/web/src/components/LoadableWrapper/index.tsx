import React, { useEffect } from "react";
import LoadingView from "../LoadingView";

// const LoadRes: { key: any, value: any }[] = [];
const LoadResObj = {}

export default (props: { id: string, fn: any }) => {
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
        return 'loading...'
    } else {
        const ExistCpt = existCpt
        return <ExistCpt />
    }

    // const JohanComponent: any = React.lazy(props.fn);

    // return <React.Suspense fallback={
    //     // <LoadingView />
    //     'loading...'
    // } >
    //     <JohanComponent />
    // </ React.Suspense >
}