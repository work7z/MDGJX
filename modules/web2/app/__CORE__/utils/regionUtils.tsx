// LafTools
// 
// Date: Sun, 10 Mar 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

'use client'

let regionUtils = {
    getCNHosts(): string[] {
        // return ["laftools.cn"]
        return ['laftools.cn']
    },
    getUSHosts(): string[] {
        return ["laftools.dev"]
    },
    isCNHost(): boolean {
        let host = location.hostname
        return this.getCNHosts().includes(host)
    },
    isUSHost(): boolean {
        let host = location.hostname
        return this.getUSHosts().includes(host)
    },
    isCurrentUserPossibleChinese(): boolean {
        let arr = navigator.languages
        return arr.includes("zh-CN")
    }
}

export default regionUtils