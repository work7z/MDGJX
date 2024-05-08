// LafTools
// 
// Date: Thu, 22 Feb 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

'use client'

import { COMMON_CLZ_ANCHOR_TEXT } from "@/app/__CORE__/common/clz"
import RegularLink from "@/app/__CORE__/components/RegularLink"
import { MoonIcon, Cog8ToothIcon, SunIcon } from '@heroicons/react/24/solid'
import { Dot } from "@/app/__CORE__/utils/cTranslationUtils"
// import { useTheme } from "next-themes";
import { useTheme } from "@/app/__CORE__/components/LightDarkButton/theme";

import { useEffect, useState } from "react"
import { loadDOT } from "../../utils/i18n-for-load"
import { hocClientWrapper } from "@/app/[lang]/[category]/src/common/hocClientWrapper"

let a = loadDOT("6xOX9cfLT")

export default hocClientWrapper((props: { labelMode?: boolean }) => {
    a()
    const { theme, setTheme } = useTheme();

    let [mounted, setMount] = useState(false)
    useEffect(() => {
        setMount(true)
    }, [])

    if (!mounted) {
        return <span></span>;
    }

    return <span className='flex space-x-2 items-center justify-start flex-row '>
        {
            theme == "dark" ? (
                <SunIcon className="cursor-pointer h-5 w-5 text-yellow-300" onClick={() => {
                    setTheme('light')
                }} />
            ) : (
                <MoonIcon className=" cursor-pointer h-5 w-5 text-solarized-cyan-400 mt-[2px] " onClick={() => {
                    setTheme('dark')
                }} />
            )
        }
        <span onClick={() => {
            setTheme(theme == 'dark' ? 'light' : 'dark')
        }} className={' cursor-pointer text-sm ' + (theme == 'dark' ? ' text-yellow-400 ' : ' text-solarized-cyan ')}>
            {props.labelMode ? theme == 'dark' ? Dot("JAbVG", "Light Theme") : Dot("OnP4s", "Dark Theme") : ''}</span>
    </span>
})