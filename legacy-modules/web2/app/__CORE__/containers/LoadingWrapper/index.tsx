// LafTools
// 
// Date: Thu, 22 Feb 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

'use client'
import React from "react";



export default (props: { children?: any, }) => {
    let [mounted, setMounted] = React.useState(false);
    React.useEffect(() => {
        setMounted(true);
    }, [])
    if (!mounted) return <div className="relative opacity-80" suppressHydrationWarning>
        <div className="absolute top-2 right-2">
            <div className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500" role="status" aria-label="loading">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
        <div className="hover:cursor-not-allowed">
            {props.children}
        </div>
    </div>
    return <div>{props.children}</div>
}