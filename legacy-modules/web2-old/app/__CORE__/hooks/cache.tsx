// LafTools
// 
// Date: Sun, 10 Mar 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import { useEffect } from "react";
import _ from 'lodash'

let cacheIdObj: { [key: string]: boolean } = {}
// listen when the page is shallow routed
// window.addEventListener('popstate', (e) => {
//     cacheIdObj = {}
// })
export let useInitFunctionOnceOnly = (fn: () => void, keyarr: string[]) => {
    let key = keyarr.join('-')
    let callInitOnce = _.once(fn);
    useEffect(() => {
        if (cacheIdObj[key]) {
            return
        }
        cacheIdObj[key] = true
        callInitOnce()
    }, [1]);
}