'use client'

import React from "react"
import ClientWrapper from "./clientWrapper"

import PageLoadingEffect from "@/__CORE__/containers/PageLoadingEffect";
import Blink from "@/[lang]/client/src/components/Blink";

export let HocClientWrapperClient = (props: { children: any }) => {
    let [mounted, setMounted] = React.useState(false)
    React.useEffect(() => {
        setMounted(true)
    }, [])
    if (!mounted) return <PageLoadingEffect />
    return props.children
}

export function hocClientWrapper<T extends React.ComponentType<any>>(Cpt: T, needLoading?: boolean): T {

    return (
        (props) => {
            let [mounted, setMounted] = React.useState(false)
            React.useEffect(() => {
                setMounted(true)
            }, [])
            if (!mounted) {
                if (needLoading) {
                    // return <PageLoadingEffect />
                    // return <CircularProgress label="Loading..." />
                    return ''
                    // <div className="p-2">
                    //     Loading<Blink
                    //         min={2}
                    //         max={5}
                    //     />
                    // </div>
                } else {
                    return ''
                }
            }
            return <ClientWrapper>
                <Cpt {...props} />
            </ClientWrapper>
        }
    ) as T
}