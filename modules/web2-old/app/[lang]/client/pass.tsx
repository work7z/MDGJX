// LafTools
// 
// Date: Thu, 29 Feb 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

'use client'

import TranslationUtils, { sysLocale } from "@/app/__CORE__/utils/cTranslationUtils"
import { useEffect } from "react"

export default (props: { xlocaleJSON: string }) => {
    useEffect(() => {
        TranslationUtils.ExtraMap = {
            ...TranslationUtils.ExtraMap,
            ...JSON.parse(props.xlocaleJSON)
        }
    }, [])
    return <span></span>
}