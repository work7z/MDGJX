// LafTools
// 
// Date: Thu, 22 Feb 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import { isDevEnv, isTestEnv } from "../share/env"
import { Dot } from "../utils/TranslationUtils"

export let formatStaticResource = (path: string): string => {
    return `/static/${path}`
}

export let getAppDevIcon = (htmlIconImg?: boolean): string => {
    return formatStaticResource((() => {
        if (htmlIconImg || isDevEnv()) {
            return '/icon-dev.png'
        }
        if (isTestEnv()) {
            return '/icon-uat.png'
        }
        return '/icon.png'
    })())
}

export let getAppKeywords = (): string[] => {
    return [
        Dot("wi28h5_S2", "Codecs"),
        Dot("Jbor69IBw", "Formatters"),
        Dot("t8DUz20a-", "JSON Formatter"),
        Dot("2S_7EVIsK", "JSON Validator"),
        Dot("Ibzs2-Ho1", "XML Formatter"),
        Dot("Ibzs2-Ho1", "XML Validator"),
        Dot("Ibzs2-Ho1", "CSV Tools"),
        Dot("9b_7a0feb", "MD5"),
        Dot("9b_7a0fdf", "SHA256"),
        Dot("9b_7a0fqwe", "Base64 Encoder"),
        Dot("9b_7a0sdf", "Base64 Decoder"),
        Dot("q0zA1kML_", "Online Toolbox"),
        Dot("jr_7Y98yZ", "LafTools"),
    ]
}