// LafTools
// 
// Date: Thu, 28 Dec 2023
// Author: LafTools Team - FX <work7z@outlook.com>
// Description: 
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
// License: AGPLv3

import { key } from "localforage"


let fnMap: { [key: string]: () => void } = {

}
let trigger = () => {
    Object.values(fnMap).forEach(fn => {
        fn()
    })
}
window.addEventListener("resize", () => {
    trigger()
})

export default {
    trigger,
    register(id: string, fn: () => void) {
        fnMap[id] = fn
    },
    unregister(id: string) {
        delete fnMap[id]
    }
}