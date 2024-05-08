// LafTools
// 
// Date: Thu, 22 Feb 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

"use client"
import * as React from "react";
import { ThemeProvider as NextThemesProvider, } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";
import $ from 'jquery';
import { useTheme } from "./__CORE__/components/LightDarkButton/theme";
import _ from 'lodash'
import { hocClientWrapper } from "./[lang]/[category]/src/common/hocClientWrapper";
if (typeof window !== 'undefined') _.set(window, '$', $)

let CustomerInner = hocClientWrapper(({ children, ...props }: ThemeProviderProps) => {
    const { theme, setTheme } = useTheme()
    React.useEffect(() => {

    }, [
        theme
    ])
    return <div className={"customerinner w-full h-full " + (
        // theme == 'dark' ? 'bp5-dark' : 'bp5-light'
        ''
    )}>{children}</div>
})

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    let [mounted, setMounted] = React.useState(false)
    React.useEffect(() => {
        setMounted(true)
    }, [])
    if (!mounted) return ''
    return <CustomerInner>{children}</CustomerInner>
    // return <NextThemesProvider enableSystem={false}  {...props}>
    //     <CustomerInner>{children}</CustomerInner>
    // </NextThemesProvider>
}