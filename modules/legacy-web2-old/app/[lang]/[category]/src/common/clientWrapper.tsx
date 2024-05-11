'use client'
// LafTools
// 
// Date: Fri, 8 Mar 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc



import React, { useEffect, useState } from 'react'
import { Provider, } from "react-redux";
import { store } from '@/app/[lang]/client/src/store'
import '@/app/[lang]/client/src/initapp'
import { loadDOT } from '@/app/__CORE__/utils/i18n-for-load'
import SmallScreenDetecter from '@/app/[lang]/client/src/SmallScreenDetecter'
import { ClientPortalContext } from '@/app/[lang]/client/src/pages/WorkBench/FixedLayout/Main/Center/sub/center-view/Transformer/types';
import { createPortal } from "react-dom"
import dynamic from "next/dynamic";
import { type ReactPortal } from "react"
let d = loadDOT("1RH8bdqw")
export let getAppToolHeight = () => {
    return 880
}
interface PortalProps {
    children: React.ReactNode
}

function Portal(props: PortalProps): ReactPortal | null {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    return isMounted ? createPortal(props.children, document.body) : null // createPortal will not be rendered on the server. Only on the client after hydration
}


let ClientWrapper = (props: { children: any, noFULL?: boolean }) => {
    d()
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])
    if (!isMounted) {
        return ''
    }
    return <div className={props.noFULL ? '' : 'w-full h-full'}>
        <ClientPortalContext.Provider value={{
            appToolHeight: getAppToolHeight(),
            portalMode: true
        }}>
            <Provider store={store}>
                {props.children}
                <SmallScreenDetecter />
            </Provider>
        </ClientPortalContext.Provider>
    </div>
}

// export function hocClientWrapper<T extends React.ComponentType<any>>(Cpt: T): T {
//     // return dynamic(() => import('./client'), { ssr: false, loading: () => <PageLoadingEffect /> })
//     return ((props = {}) => {
//         const [isMounted, setIsMounted] = useState(false)

//         useEffect(() => {
//             setIsMounted(true)
//         }, [])
//         if (!isMounted) {
//             return ''
//         }
//         return <Portal><ClientWrapper children={
//             <Cpt {...props} />
//         }>
//         </ClientWrapper>
//         </Portal>
//     }) as T;
// }
export default ClientWrapper 