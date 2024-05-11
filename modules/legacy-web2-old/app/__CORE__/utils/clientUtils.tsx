// LafTools
// 
// Date: Sun, 25 Feb 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

export let pushClient = (url: string) => {
    let e = document.getElementById('grouter')
    if (!e) {
        alert("no push grouter element")
        return
    };
    e['href'] = url;
    // e.click()
}